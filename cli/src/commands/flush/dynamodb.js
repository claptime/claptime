const { Command } = require('@oclif/command');
const AWS = require('claptime-commons/aws');
const {
  getApiConfig,
  getAwsConfig,
  getCurrentEnv,
} = require('claptime-commons/dev/amplify');
const { commonFlags, confirm } = require('../../utils');

const DYNAMODB_BATCH_WRITE_MAX_ITEMS = 25;

class DynamodbCommand extends Command {
  async getClient() {
    if (!this.client) {
      this.client = new AWS.DynamoDB.DocumentClient({
        region: (await getAwsConfig()).region,
      });
    }
    return this.client;
  }

  async flush(name, apiId, env, schema = { hash: 'id' }) {
    this.log(`Flushing ${name} DynamoDB table. Please wait.`);
    const client = await this.getClient();
    const tableName = `${name}-${apiId}-${env}`;
    let lastEvaluatedKey;
    let items = [];
    do {
      const { Items, LastEvaluatedKey } = await client
        .scan({
          TableName: tableName,
          ExclusiveStartKey: lastEvaluatedKey,
        })
        .promise();
      lastEvaluatedKey = LastEvaluatedKey;
      items = [...items, ...Items];
    } while (lastEvaluatedKey);

    while (items.length) {
      await client
        .batchWrite({
          RequestItems: {
            [tableName]: items
              .splice(0, DYNAMODB_BATCH_WRITE_MAX_ITEMS)
              .map((item) => {
                const res = {
                  DeleteRequest: {
                    Key: {
                      [schema.hash]: item[schema.hash],
                    },
                  },
                };
                if (schema.sort) {
                  res.DeleteRequest.Key[schema.sort] = item[schema.sort];
                }
                return res;
              }),
          },
        })
        .promise();
    }
    this.log(`${name} DynamoDB table flushed.`);
  }

  async run() {
    const { flags: currentFlags } = this.parse(DynamodbCommand);
    if (!(await confirm(currentFlags, true))) return;
    const env = getCurrentEnv();
    const { id: apiId } = getApiConfig();
    const tables = [
      { name: 'Collection' },
      { name: 'CollectionVideoNode' },

      { name: 'Credit' },
      { name: 'Profile' },
      { name: 'News' },
      {
        name: 'UserCollection',
        schema: {
          hash: 'userSettingsCollectionsId',
          sort: 'list#userCollectionCollectionId',
        },
      },
      {
        name: 'UserProfile',
        schema: {
          hash: 'userSettingsProfilesId',
          sort: 'list#userProfileProfileId',
        },
      },
      { name: 'UserSettings' },
      {
        name: 'UserVideoNode',
        schema: {
          hash: 'userSettingsVideoNodesId',
          sort: 'list#userVideoNodeVideoNodeId',
        },
      },
      { name: 'VideoNode' },

      { name: 'View', schema: { hash: 'viewVideoNodeId', sort: 'id' } },
    ];
    for (const table of tables) {
      await this.flush(table.name, apiId, env, table.schema);
    }
  }
}

DynamodbCommand.description = `Flush dynamodb

Flush dynamodb tables.
`;

DynamodbCommand.flags = {
  yes: commonFlags.yes,
};

module.exports = DynamodbCommand;
