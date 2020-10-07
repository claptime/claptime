const s3 = require('s3-node-client');
const yargs = require('yargs');
const youtubedl = require('youtube-dl');
const AWS = require('aws-sdk');

const { AWS_REGION, STORAGE_BUCKET_NAME } = process.env;
const s3Client = s3.createClient();

AWS.config.credentials = new AWS.ECSCredentials();

function getArgs({ username, videoNodeId, videoLink }) {
  if (typeof username !== 'string') {
    console.error('--username must be a string');
    throw new Error('MISSING_USERNAME');
  }
  if (typeof videoNodeId !== 'string') {
    console.error('--video-node-id must be a string');
    throw new Error('MISSING_VIDEO_NODE_ID');
  }
  if (typeof videoLink !== 'string') {
    console.error('--video-link must be a string');
    throw new Error('MISSING_VIDEO_LINK');
  }
  return {
    username,
    videoNodeId,
    videoLink,
  };
}

const uploadFile = (bucketName, key, localFile) =>
  new Promise((resolve, reject) => {
    console.log(bucketName, key, localFile);
    const uploader = s3Client.uploadFile({
      localFile,
      s3Params: {
        Bucket: bucketName,
        Key: key,
      },
    });
    uploader.on('error', reject);
    uploader.on('end', resolve);
  });

const downloadVideo = async (videoLink) => {
  const { description, title, _filename: filename } = await new Promise(
    (resolve, reject) => {
      youtubedl.exec(
        videoLink,
        ['--print-json', '-f', 'best'],
        {},
        (err, output) => {
          try {
            if (err) throw err;
            console.log(output.join('\n'));
            resolve(JSON.parse(output));
          } catch (e) {
            reject(e);
          }
        },
      );
    },
  );

  return {
    title,
    description,
    filename,
  };
};

async function main() {
  try {
    const { username, videoNodeId, videoLink } = getArgs(yargs.argv);
    console.log(
      `Task started: videoNodeId=${videoNodeId} videoLink=${videoLink}`,
    );
    const { filename } = await downloadVideo(videoLink);

    console.log(`now uploading ${filename} to S3`);
    await uploadFile(
      STORAGE_BUCKET_NAME,
      `private/${AWS_REGION}:${username}/uploads/${videoNodeId}.mp4`,
      filename,
    );
    console.log('file uploaded');

    process.exit(0);
  } catch (e) {
    console.error('MAIN ERROR:', e);
    process.exit(1);
  }
}

main();
