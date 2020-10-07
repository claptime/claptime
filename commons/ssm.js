const AWS = require('./aws');

const { STAGE } = process.env;

const FALLBACK_STAGE = 'staging'; // If a parameter is not found in a specific environment, fallback to it's default value
const NO_FALLBACK_STAGES = ['prod']; // When in production, we do not want to fallback to another environment

const ssm = new AWS.SSM();
const cache = {};

const getParam = async (name, withDecryption = false, stage = STAGE) => {
  try {
    const paramPath = `/${stage}/${name}`;
    if (!cache[paramPath]) {
      const {
        Parameter: { Value },
      } = await ssm
        .getParameter({
          Name: paramPath,
          WithDecryption: withDecryption,
        })
        .promise();
      cache[paramPath] = Value;
    }
    return cache[paramPath];
  } catch (e) {
    if (
      e.code === 'ParameterNotFound' &&
      stage !== FALLBACK_STAGE &&
      !NO_FALLBACK_STAGES.includes(stage)
    ) {
      return getParam(name, withDecryption, FALLBACK_STAGE);
    }
    throw e;
  }
};

module.exports = {
  getParam,
};
