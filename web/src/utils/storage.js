import { Storage } from 'aws-amplify';

export const fileExists = async (key) => {
  // Ensure cover is available on S3
  const s3List = [];
  let folder = key.split('/');
  folder.splice(-1, 1); // remove file name to only keep the path
  folder = folder.join('/');
  try {
    // Need to list folder in order to check if key exist
    // https://github.com/aws-amplify/amplify-js/issues/1145
    s3List.push(...(await Storage.list(folder)));
  } catch (e) {
    console.error(e);
    return false;
  }
  return typeof s3List.find((item) => item.key === key) === 'object';
};

export default {
  fileExists,
};
