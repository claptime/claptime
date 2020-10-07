const fs = require('fs');
const path = require('path');
const AWS = require('../aws');
const amplifyMeta = require('../../web/amplify/backend/amplify-meta');

const awsExports = fs
  .readFileSync(path.join(__dirname, '../../web/src/aws-exports.js'))
  .toString();

const getAwsExportsValue = (key) =>
  new RegExp(`"${key}": "([^"]+)",`).exec(awsExports)[1];

exports.getApiConfig = () => ({
  endpoint: getAwsExportsValue('aws_appsync_graphqlEndpoint'),
  id: amplifyMeta.api.claptimeapi.output.GraphQLAPIIdOutput,
  region: getAwsExportsValue('aws_appsync_region'),
});

exports.getAwsConfig = async (SDK = AWS) => {
  const sts = new SDK.STS();
  const { Account } = await sts.getCallerIdentity().promise();
  return {
    accountId: Account,
    region: getAwsExportsValue('aws_cognito_region'),
  };
};

exports.getBucketConfig = () => ({
  name: getAwsExportsValue('aws_user_files_s3_bucket'),
  region: getAwsExportsValue('aws_user_files_s3_bucket_region'),
});

exports.getCloudFrontConfig = async () => {
  const env = exports.getCurrentEnv();
  const cloudformation = new AWS.CloudFormation();
  const cfExports = [];
  let nextToken;
  do {
    const { Exports, NextToken } = await cloudformation
      .listExports({ NextToken: nextToken })
      .promise();
    cfExports.push(...Exports);
    nextToken = NextToken;
  } while (nextToken);
  const domainName = cfExports.find(
    ({ Name }) => Name === `claptime-videos-${env}-cloudfront-domainname`,
  ).Value;
  return {
    domainName,
    hostedZoneId: 'Z2FDTNDATAQYW2', // https://stackoverflow.com/a/39669786
  };
};

exports.getCognitoPoolConfig = () => ({
  id: getAwsExportsValue('aws_user_pools_id'),
  region: getAwsExportsValue('aws_user_pools_id').split('_')[0],
});

exports.getCurrentEnv = () =>
  getAwsExportsValue('aws_user_files_s3_bucket').match(/.*-(\w+)/)[1];

exports.getDefaultSubnets = async (SDK = AWS) => {
  const ec2 = new SDK.EC2();
  const { Subnets } = await ec2
    .describeSubnets({
      Filters: [
        {
          Name: 'default-for-az',
          Values: ['true'],
        },
      ],
    })
    .promise();
  return Subnets.map((subnet) => subnet.SubnetId);
};
