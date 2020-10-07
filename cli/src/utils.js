const { flags } = require('@oclif/command');
const { cli } = require('cli-ux');
const AWS = require('claptime-commons/aws');
const { getCurrentEnv } = require('claptime-commons/dev/amplify');

exports.attachUserToGroup = async (userPoolId, userPoolRegion, user, group) => {
  const client = new AWS.CognitoIdentityServiceProvider({
    region: userPoolRegion,
  });
  await client
    .adminAddUserToGroup({
      GroupName: group,
      UserPoolId: userPoolId,
      Username: user,
    })
    .promise();
  console.log(`Added ${user} to ${group} group`);
};

exports.commonFlags = {
  dryRun: flags.boolean({
    char: 'd',
    description:
      'Run the command with DRY_RUN environment variable, which should skip all write operations.',
  }),
  yes: flags.boolean({
    char: 'y',
    description:
      'Automatic yes to prompts; assume "yes" as answer to all prompts and run non-interactively.',
  }),
};

exports.confirm = async (currentFlags, forbiddenInProduction) => {
  const env = getCurrentEnv();
  if (forbiddenInProduction && env === 'prod') {
    console.warn('command is forbidden in production.');
    return false;
  }
  if (!currentFlags.yes) {
    console.log(`current env: ${env}`);
    if (!(await cli.confirm('do you want to continue? (Y/n)'))) {
      console.log('user cancelled.');
      return false;
    }
  }
  return true;
};

exports.createUserGroup = async (userPoolId, userPoolRegion, name) => {
  const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider(
    {
      region: userPoolRegion,
    },
  );
  try {
    await cognitoidentityserviceprovider
      .createGroup({
        GroupName: name,
        UserPoolId: userPoolId,
      })
      .promise();
    console.log(`Cognito group ${name} created`);
  } catch (e) {
    if (e.name !== 'GroupExistsException') {
      throw e;
    }
    console.log(`Cognito group ${name} already exists`);
  }
};
