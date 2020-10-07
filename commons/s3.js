const fs = require('fs');
const path = require('path');
const s3NodeClient = require('s3-node-client');
const { pLimit } = require('./promise');
const AWS = require('./aws');

const s3 = new AWS.S3();

const client = s3NodeClient.createClient({
  s3Client: new AWS.S3(),
});

const copyObject = async (fromBucket, fromKey, toBucket, toKey) =>
  s3
    .copyObject({
      Bucket: toBucket,
      CopySource: encodeURIComponent(`/${fromBucket}/${fromKey}`),
      Key: toKey,
    })
    .promise();

const deleteDirectory = async (bucketName, prefix) =>
  new Promise((resolve, reject) => {
    const task = client.deleteDir({
      Bucket: bucketName,
      Prefix: prefix,
    });
    task.on('error', reject);
    task.on('end', () => {
      console.log(`s3://${bucketName}/${prefix} folder deleted`);
      resolve();
    });
  });

const deleteObjects = (bucketName, keys) =>
  new Promise((resolve, reject) => {
    const task = client.deleteObjects({
      Bucket: bucketName,
      Objects: keys.pop().map((key) => ({ Key: key })),
    });
    task.on('error', reject);
    task.on('end', resolve);
  });

const downloadFile = (bucketName, key) =>
  new Promise((resolve, reject) => {
    const filePath = path.join('/tmp', path.basename(key));
    const task = client.downloadFile({
      localFile: filePath,
      s3Params: {
        Bucket: bucketName,
        Key: key,
      },
    });
    task.on('error', reject);
    task.on('end', () => resolve(filePath));
  });

const listObjects = (bucketName, fromPrefix) =>
  new Promise((resolve, reject) => {
    const objects = [];
    const task = client.listObjects({
      s3Params: {
        Bucket: bucketName,
        Prefix: fromPrefix,
      },
      recursive: true,
    });
    task.on('error', reject);
    task.on('data', ({ Contents }) => objects.push(...Contents));
    task.on('end', () => resolve(objects));
  });

const copyDirectory = async (fromBucket, fromPrefix, toBucket, toPrefix) => {
  const objects = await listObjects(fromBucket, fromPrefix);
  const limit = pLimit(20);
  const tasks = objects.map(({ Key }) =>
    limit(() =>
      copyObject(fromBucket, Key, toBucket, Key.replace(fromPrefix, toPrefix)),
    ),
  );
  await Promise.all(tasks);
};

// s3-node-client is bugged, had to use the official S3 client instead to avoid this error:
// UriParameterError: Expected uri parameter to have length >= 1, but found "" for params.Bucket
// It probably uses the URL encoded key to get the params of DeleteObject, but cannot parse it due to encodeURIComponent
const moveObject = async (bucketName, sourceKey, destinationKey) => {
  await copyObject(bucketName, sourceKey, bucketName, destinationKey);
  await s3
    .deleteObject({
      Bucket: bucketName,
      Key: sourceKey,
    })
    .promise();
};

const moveDirectory = async (bucketName, fromPrefix, toPrefix) => {
  const objects = await listObjects(bucketName, fromPrefix);
  const limit = pLimit(20);
  const tasks = objects.map(({ Key }) =>
    limit(() => moveObject(bucketName, Key, Key.replace(fromPrefix, toPrefix))),
  );
  await Promise.all(tasks);
};

const uploadDirectory = (bucketName, localPath, destinationPath) =>
  new Promise((resolve, reject) => {
    const task = client.uploadDir({
      localDir: localPath,
      deleteRemoved: true,
      s3Params: {
        Bucket: bucketName,
        Prefix: destinationPath,
      },
    });
    task.on('error', reject);
    task.on('end', resolve);
  });

const uploadFileContent = (bucketName, key, data) =>
  new Promise((resolve, reject) => {
    const tmpPath = path.join('/tmp', key.split('/').pop());
    fs.writeFileSync(tmpPath, data);
    const task = client.uploadFile({
      localFile: tmpPath,
      s3Params: {
        Bucket: bucketName,
        Key: key,
      },
    });
    task.on('error', reject);
    task.on('end', resolve);
  });

module.exports = {
  copyDirectory,
  copyObject,
  deleteDirectory,
  deleteObjects,
  downloadFile,
  listObjects,
  moveObject,
  moveDirectory,
  uploadDirectory,
  uploadFileContent,
};
