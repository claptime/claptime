const { Command } = require('@oclif/command');
const AWS = require('claptime-commons/aws');
const {
  getApiConfig,
  getAwsConfig,
  getCurrentEnv,
} = require('claptime-commons/dev/amplify');
const { commonFlags, confirm } = require('../utils');

const dynamodb = new AWS.DynamoDB();

class TagResourcesCommand extends Command {
  async tagTable(tableArn, env) {
    const tag = `claptime-${env}-api`;
    const { Tags } = await dynamodb
      .listTagsOfResource({
        ResourceArn: tableArn,
      })
      .promise();
    const usageIndex = Tags.findIndex(({ Key }) => Key === 'usage');
    if (usageIndex > -1) {
      Tags.splice(usageIndex, 1);
    }
    await dynamodb
      .tagResource({
        ResourceArn: tableArn,
        Tags: [
          ...Tags,
          {
            Key: 'usage',
            Value: tag,
          },
        ],
      })
      .promise();

    this.log(`DynamoDB table ${tableArn} tagged: ${tag}`);
  }

  async tagTables() {
    const env = getCurrentEnv();
    const { id: apiId, region: apiRegion } = getApiConfig();
    const { accountId } = await getAwsConfig();

    const tableArns = [
      'Collection',
      'CollectionUser',
      'CollectionVideo',
      'Credit',
      'Profile',
      'UserCollection',
      'UserProfile',
      'UserSettings',
      'UserVideo',
      'Video',
      'View',
    ].map(
      (name) =>
        `arn:aws:dynamodb:${apiRegion}:${accountId}:table/${name}-${apiId}-${env}`,
    );

    for (const tableArn of tableArns) {
      await this.tagTable(tableArn, env);
    }
  }

  async run() {
    const { flags } = this.parse(TagResourcesCommand);
    if (!(await confirm(flags))) return;

    await this.tagTables();
  }
}

TagResourcesCommand.description = `Tag resources (dynamodb tables) for backup plan
Shouldn't be necessary if this issue is resolved: https://github.com/aws-amplify/amplify-cli/issues/2794`;

TagResourcesCommand.flags = {
  yes: commonFlags.yes,
};

module.exports = TagResourcesCommand;
