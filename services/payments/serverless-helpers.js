const { getApiConfig, getAwsConfig } = require('claptime-commons/dev/amplify');

exports.getAccountId = async (serverless) =>
  (await getAwsConfig(serverless.getProvider('aws').sdk)).accountId;

exports.getApiEndpoint = () => getApiConfig().endpoint;

exports.getApiId = () => getApiConfig().id;

exports.getApiSubDomain = (serverless) => {
  switch (serverless.service.provider.stage) {
    case 'prod':
      return 'api';
    default:
      return `api-${serverless.service.provider.stage}`;
  }
};
