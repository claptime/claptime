import Amplify, { Analytics, Storage } from 'aws-amplify';

import awsExports from 'claptime/aws-exports';

export const getEnv = () => {
  const env = awsExports.aws_user_files_s3_bucket.split('-');
  env.splice(0, 2);
  return env.join('-');
};

export const env = getEnv();

export const getBucket = () => {
  return awsExports.aws_user_files_s3_bucket;
};

export const initAmplify = () => {
  Amplify.configure(awsExports);
  Storage.configure({
    track: true,
  });
  Analytics.autoTrack('session', {
    enable: true,
  });
  Analytics.autoTrack('pageView', {
    enable: true,
    type: 'SPA',
  });
};

export default {
  env,
  getBucket,
  initAmplify,
};
