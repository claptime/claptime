const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const yargs = require('yargs');
const s3 = require('s3-node-client');

const { VIDEOS_BUCKET_NAME } = process.env;
const s3Options = {};
if (process.env.AWS_ACCESS_KEY_ID) {
  s3Options.accessKeyId = process.env.AWS_ACCESS_KEY_ID;
}
if (process.env.AWS_SECRECT_ACCESS_KEY) {
  s3Options.secretAccessKey = process.env.AWS_SECRECT_ACCESS_KEY;
}
if (process.env.AWS_REGION) {
  s3Options.region = process.env.AWS_REGION;
}
const s3Client = s3.createClient({
  s3Options,
});

function getArgs({ bucketName, key, id }) {
  if (typeof bucketName !== 'string') {
    console.error('--bucket-name must be a string');
    throw new Error('MISSING_BUCKET_NAME');
  }
  if (typeof key !== 'string') {
    console.error('--key must be a string');
    throw new Error('MISSING_KEY');
  }
  if (typeof id !== 'string') {
    console.error('--id must be a string');
    throw new Error('MISSING_KEY');
  }
  return {
    bucketName,
    key,
    id,
  };
}

function downloadFile(bucketName, key) {
  return new Promise((resolve, reject) => {
    const filePath = path.join('/tmp', path.basename(key));
    const downloader = s3Client.downloadFile({
      localFile: filePath,
      s3Params: {
        Bucket: bucketName,
        Key: key,
      },
    });
    downloader.on('error', reject);
    downloader.on('end', () => resolve(filePath));
  });
}

function uploadFileContent(bucketName, key, data) {
  return new Promise((resolve, reject) => {
    const tmpPath = path.join('/tmp', key.split('/').pop());
    fs.writeFileSync(tmpPath, data);
    const uploader = s3Client.uploadFile({
      localFile: tmpPath,
      s3Params: {
        Bucket: bucketName,
        Key: key,
      },
    });
    uploader.on('error', reject);
    uploader.on('end', resolve);
  });
}

async function uploadDirectory(bucketName, localPath, destinationPath) {
  return new Promise((resolve, reject) => {
    const uploader = s3Client.uploadDir({
      localDir: localPath,
      deleteRemoved: true,
      s3Params: {
        Bucket: bucketName,
        Prefix: destinationPath,
      },
    });
    uploader.on('error', reject);
    uploader.on('end', resolve);
  });
}

function convertToHls(filePath, id) {
  return new Promise((resolve, reject) => {
    try {
      const hlsPath = path.join(path.dirname(filePath), id);
      fs.mkdirSync(hlsPath);
      ffmpeg(filePath, {
        timeout: 432000,
      })
        .addOptions([
          '-map 0:v:0',
          '-map 0:a:0',
          '-c:v:1 h264',
          '-profile:v high',
          '-pix_fmt yuv420p',
          '-b:v:1 2000k',
          '-vf scale=-2:480',
          '-map 0:v:0',
          '-map 0:a:0',
          '-c:v:0 h264',
          '-profile:v high',
          '-pix_fmt yuv420p',
          '-vf scale=-2:720',
          '-b:v:0 5000k',
          '-c:a aac',
          '-level 3.0',
          '-start_number 0', // start the first .ts segment at index 0
          '-hls_time 10', // 10 second segment duration
          `-hls_segment_filename ${path.join(
            hlsPath,
            '%v',
            'fileSequence%d.ts',
          )}`,
          '-hls_playlist_type vod',
          '-hls_list_size 0', // Maxmimum number   of playlist entries (0 means all entries/infinite)
          '-f hls', // HLS format
          '-master_pl_name master.m3u8',
        ])
        .outputOptions([
          '-var_stream_map',
          'v:0,a:0,name:480p v:1,a:1,name:720p ',
        ])
        .output(path.join(hlsPath, '%v', 'stream.m3u8'))
        .on('error', (err) => {
          console.error('Received error:', err);
          reject(err);
        })
        .on('end', (exitError, stdoutRing, stderrRing) => {
          if (exitError) {
            console.log('exitError:', exitError);
          }
          if (stderrRing) {
            console.log('stderrRing:', stderrRing);
          }
          console.log(stdoutRing);
          resolve(hlsPath);
        })
        .run();
    } catch (e) {
      reject(e);
    }
  });
}

function getDuration(filePath) {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(metadata.format.duration);
    });
  });
}

async function main() {
  try {
    const { bucketName, key, id } = getArgs(yargs.argv);
    console.log(`Task started: bucketName=${bucketName} key=${key}, id=${id}`);
    const filePath = await downloadFile(bucketName, key);
    console.log(filePath);
    const hlsPath = await convertToHls(filePath, id);
    console.log('Processing finished. Now getting duration...');
    const duration = await getDuration(filePath);
    console.log(`Duration: ${duration} seconds. Now uploading...`);
    await uploadDirectory(VIDEOS_BUCKET_NAME, hlsPath, id);
    await uploadFileContent(
      bucketName,
      `${key}.json`,
      JSON.stringify(
        {
          duration,
        },
        null,
        2,
      ),
    );
    console.log(`Files uploaded.`);
    process.exit(0);
  } catch (e) {
    console.error('MAIN ERROR:', e);
    process.exit(1);
  }
}

main();
