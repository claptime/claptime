const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const AWS = require('claptime-commons/aws');

const { BUCKET_NAME } = process.env;

const s3 = new AWS.S3();

const allowedSuffixes = ['.png', '.jpg', '.jpeg'];

const downloadFile = (bucketName, key, filePath) =>
  new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    s3.getObject({
      Bucket: bucketName,
      Key: key,
    })
      .on('error', reject)
      .on('httpData', (chunk) => file.write(chunk))
      .on('httpDone', () => {
        file.end();
        resolve(filePath);
      })
      .send();
  });

const uploadFile = (bucketName, filePath, s3Path) =>
  s3
    .putObject({
      Body: fs.readFileSync(filePath),
      Bucket: bucketName,
      Key: path.join(s3Path, path.basename(filePath)),
    })
    .promise()
    .then(() => console.log(`${path.basename(filePath)} uploaded`));

const handleVideo = (tmpDir, localPath, s3Path) => {
  const originalFilePath = path.join(tmpDir, 'original.jpg');
  const croppedFilePath = path.join(tmpDir, '600-800.jpg');
  return Promise.all([
    sharp(localPath)
      .toFile(originalFilePath)
      .then(() => uploadFile(BUCKET_NAME, originalFilePath, s3Path)),
    sharp(localPath)
      .resize(600, 800, {
        fit: sharp.fit.contain,
        position: sharp.position.centre,
      })
      .toFile(croppedFilePath)
      .then(() => uploadFile(BUCKET_NAME, croppedFilePath, s3Path)),
  ]);
};

const handleProfile = (tmpDir, localPath, s3Path) => {
  const originalFilePath = path.join(tmpDir, 'original.jpg');
  const croppedFilePath = path.join(tmpDir, '512-512.jpg');
  return Promise.all([
    sharp(localPath)
      .toFile(originalFilePath)
      .then(() => uploadFile(BUCKET_NAME, originalFilePath, s3Path)),
    sharp(localPath)
      .resize(512, 512, {
        fit: sharp.fit.contain,
        position: sharp.position.centre,
      })
      .toFile(croppedFilePath)
      .then(() => uploadFile(BUCKET_NAME, croppedFilePath, s3Path)),
  ]);
};

const handleCollection = (tmpDir, localPath, s3Path) => {
  const originalFilePath = path.join(tmpDir, 'original.jpg');
  const croppedFilePath = path.join(tmpDir, '1500-300.jpg');
  return Promise.all([
    sharp(localPath)
      .toFile(originalFilePath)
      .then(() => uploadFile(BUCKET_NAME, originalFilePath, s3Path)),
    sharp(localPath)
      .resize(1500, 300, {
        fit: sharp.fit.contain,
        position: sharp.position.centre,
      })
      .toFile(croppedFilePath)
      .then(() => uploadFile(BUCKET_NAME, croppedFilePath, s3Path)),
  ]);
};

const handleNews = (tmpDir, localPath, s3Path) => {
  const originalFilePath = path.join(tmpDir, 'original.jpg');
  const croppedFilePath = path.join(tmpDir, '1500-500.jpg');
  return Promise.all([
    sharp(localPath)
      .toFile(originalFilePath)
      .then(() => uploadFile(BUCKET_NAME, originalFilePath, s3Path)),
    sharp(localPath)
      .resize(1500, 500, {
        fit: sharp.fit.contain,
        position: sharp.position.centre,
      })
      .toFile(croppedFilePath)
      .then(() => uploadFile(BUCKET_NAME, croppedFilePath, s3Path)),
  ]);
};

exports.handler = async (event) => {
  console.log('event', JSON.stringify(event));
  const tasks = event.Records.map(
    async ({
      s3: {
        object: { key },
        bucket: { name },
      },
    }) => {
      // key is URL encoded https://stackoverflow.com/a/42184248/3263033
      const decodedKey = decodeURIComponent(key.replace(/\+/g, ' '));
      if (
        !allowedSuffixes.some((suffix) =>
          decodedKey.toLowerCase().endsWith(suffix),
        )
      ) {
        console.log(`${decodedKey}: suffix does not match.`);
        return;
      }
      const tmpDir = fs.mkdtempSync('/tmp/images-');
      const localPath = await downloadFile(
        name,
        decodedKey,
        path.join(tmpDir, `raw.${path.extname(decodedKey)}`),
      );
      const [, , resourceType, resourceId] = decodedKey.split('/');
      console.log(resourceType);

      switch (resourceType) {
        case 'videoNodes':
          await handleVideo(
            tmpDir,
            localPath,
            `public/videoNodes/${resourceId}`,
          );
          break;
        case 'collections':
          await handleCollection(
            tmpDir,
            localPath,
            `public/collections/${resourceId}`,
          );
          break;
        case 'profiles':
          await handleProfile(
            tmpDir,
            localPath,
            `public/profiles/${resourceId}`,
          );
          break;
        case 'news':
          await handleNews(tmpDir, localPath, `public/news/${resourceId}`);
          break;
        default:
          throw new Error(`UnknownType: Unknown type ${resourceType}`);
      }

      await s3
        .deleteObject({
          Bucket: name,
          Key: decodedKey,
        })
        .promise();
      console.log(`${decodedKey} processed and original file deleted.`);
    },
  );
  await Promise.all(tasks);
  console.log('Done');
};
