const {
  getApiConfig,
  getAwsConfig,
  getCurrentEnv,
} = require('claptime-commons/dev/amplify');

exports.getAccountId = async (serverless) =>
  (await getAwsConfig(serverless.getProvider('aws').sdk)).accountId;

exports.getApiEndpoint = () => getApiConfig().endpoint;

exports.getApiId = () => getApiConfig().id;

exports.getEnabled = () => getCurrentEnv() === 'prod';
