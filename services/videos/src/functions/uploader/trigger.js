const path = require('path');
const AWS = require('claptime-commons/aws');

const stepfunctions = new AWS.StepFunctions();

const allowedSuffixes = ['.mp4', '.mkv', '.flv', '.mov'];

module.exports.handler = async (event) => {
  console.log(JSON.stringify(event, null, 2));

  const tasks = event.Records.map(
    ({
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
        console.log(`${key}: suffix does not match.`);
        return Promise.resolve();
      }
      const params = {
        stateMachineArn: process.env.STATE_MACHINE_ARN,
        input: JSON.stringify({
          bucketName: name,
          key: decodedKey,
        }),
        name: `${new Date()
          .toISOString()
          .replace(/-|:|T/g, '')
          .substring(0, 12)}-${path.basename(decodedKey)}`,
      };
      console.log('Starting execution with params', params);
      return stepfunctions.startExecution(params).promise();
    },
  );

  await Promise.all(tasks);

  console.log('Done');
};
