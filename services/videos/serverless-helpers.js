const {
  getApiConfig,
  getAwsConfig,
  getBucketConfig,
  getCognitoPoolConfig,
  getDefaultSubnets,
} = require('claptime-commons/dev/amplify');

exports.getAccountId = async (serverless) =>
  (await getAwsConfig(serverless.getProvider('aws').sdk)).accountId;

exports.getAcmCertificateArn = async (serverless) => {
  const AWS = serverless.getProvider('aws').sdk;
  const acm = new AWS.ACM({
    region: 'us-east-1', // Certificate must be in eu-west-1 to work with CloudFront alias
  });
  let nextToken;
  const certificates = [];
  do {
    const {
      CertificateSummaryList,
      NextToken,
    } = await acm.listCertificates().promise();
    nextToken = NextToken;
    certificates.push(...CertificateSummaryList);
  } while (nextToken);
  return certificates.find(({ DomainName }) => DomainName === '*.clap-time.com')
    .CertificateArn;
};

exports.getApiEndpoint = () => getApiConfig().endpoint;

exports.getApiId = () => getApiConfig().id;

exports.getBucketName = () => getBucketConfig().name;

exports.getCognitoRegion = () => getCognitoPoolConfig().region;

exports.getCognitoUserPoolId = () => getCognitoPoolConfig().id;

exports.getDefaultSubnets = (serverless) =>
  getDefaultSubnets(serverless.getProvider('aws').sdk);
