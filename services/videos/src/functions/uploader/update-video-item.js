const AWS = require('claptime-commons/aws');
const { moveObject } = require('claptime-commons/s3');

const { updateVideoNode } = require('../../lib/models');

const s3 = new AWS.S3();

const startProcessing = async (event) => {
  const { key, bucketName } = event;

  // video id is the file name without extension
  // private/eu-west-1:47378830-4df9-4ac0-8ff8-491bdb46494c/uploads/0c7d6ea1-01ae-4a3b-9dd2-9bb1f83c73a2.mp4
  // => 0c7d6ea1-01ae-4a3b-9dd2-9bb1f83c73a2
  const id = key
    .split('/')
    .pop()
    .split('.')
    .filter((item, i, arr) => i !== arr.length - 1)
    .join('.');

  const video = await updateVideoNode({
    id,
    status: 'PROCESSING',
  });
  console.log(`Video: ${JSON.stringify(video)}`);

  return {
    ...event,
    video,
    commands: [
      'node',
      'uploader.js',
      '--bucket-name',
      bucketName,
      '--key',
      key,
      '--id',
      id,
    ],
  };
};

const handleProcessingSucceeded = async (event) => {
  const {
    key,
    bucketName,
    video: { id },
  } = event;

  const { Body: fileContent } = await s3
    .getObject({
      Bucket: bucketName,
      Key: `${key}.json`,
    })
    .promise();
  const res = JSON.parse(fileContent.toString());
  console.log(res);

  const video = await updateVideoNode({
    id,
    status: 'DRAFT',
    duration: Math.round(res.duration),
  });
  console.log(`Video: ${JSON.stringify(video)}`);

  const destination = `archives/videos/${id}/${new Date().toISOString()}/${key
    .split('/')
    .pop()}`;
  await Promise.all([
    moveObject(bucketName, key, destination),
    moveObject(bucketName, `${key}.json`, `${destination}.json`),
  ]);

  return {
    ...event,
    video,
  };
};

const handleProcessingFailed = async (event) => {
  const {
    bucketName,
    key,
    video: { id },
    taskError,
  } = event;

  console.log(`Task result: ${JSON.stringify(taskError)}`);

  const video = await updateVideoNode({
    id,
    status: 'PROCESSING_FAILED',
  });
  console.log(`Video: ${JSON.stringify(video)}`);

  const destination = `archives/videos/${id}/${new Date().toISOString()}/${key
    .split('/')
    .pop()}`;
  await moveObject(bucketName, key, destination);

  return {
    ...event,
    video,
  };
};

module.exports.handler = async (event) => {
  console.log(JSON.stringify(event, null, 2));
  try {
    if (!event.commands) {
      console.log('[StartProcessing]');
      return await startProcessing(event);
    }
    if (event.taskResult) {
      console.log('[HandleProcessingSucceeded]');
      return await handleProcessingSucceeded(event);
    }
    if (event.taskError) {
      console.log('[HandleProcessingFailed]');
      return await handleProcessingFailed(event);
    }
  } catch (err) {
    if (/^GraphQL error: The conditional request failed/.test(err.message)) {
      console.log(err);
      console.log(
        'Cannot update item, which must have been deleted while processing. This is normal behaviour.',
      );
      return event;
    }
    throw err;
  }
  console.log('No handler defined.');
  throw new Error('NO_HANDLER');
};
