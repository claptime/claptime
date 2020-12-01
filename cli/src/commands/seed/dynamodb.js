const { Command, flags } = require('@oclif/command');
const fs = require('fs');
const path = require('path');
const slugify = require('slugify');
const AWS = require('claptime-commons/aws');
const dynamodb = require('claptime-commons/dynamodb');
const { getApiConfig, getCurrentEnv } = require('claptime-commons/dev/amplify');
const { moment } = require('claptime-commons/time');
const { getSearchableValue } = require('claptime-commons/utils');
const { commonFlags, confirm } = require('../../utils');
const FlushDynamodbCommand = require('../flush/dynamodb');

const FIXTURES_PATH = '../../../../fixtures/dynamodb';
const USERS_PATH = path.join(
  __dirname,
  '../../../../fixtures/cognito/users.json',
);

class DynamodbCommand extends Command {
  async seedFromFixtures(name, apiId, env) {
    const tableName = `${name}-${apiId}-${env}`;
    try {
      this.log(`Importing ${name} into DynamoDB. Please wait.`);
      const users = JSON.parse(fs.readFileSync(USERS_PATH))[env];
      const now = moment();
      const getRandomInt = (min, max) =>
        Math.floor(Math.random() * (max - min + 1) + min);
      const getRandomDatetime = () =>
        moment(now)
          .subtract(getRandomInt(0, 10), 'days')
          .subtract(getRandomInt(0, 10), 'hours')
          .subtract(getRandomInt(0, 10), 'minutes')
          .subtract(getRandomInt(0, 10), 'seconds')
          .toISOString();
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const items = require(`${FIXTURES_PATH}/${name}`)({
        users,
        getRandomDatetime,
        getSearchableValue,
        slugify,
      });
      await dynamodb.putItems(tableName, items);
      this.log(`table ${tableName}: items added`);
    } catch (e) {
      this.error(`error while adding items in table ${tableName}: ${e}`);
    }
  }

  async getApiIdFrom(env) {
    const appsync = new AWS.AppSync();
    const apis = [];
    let nextToken;
    do {
      const { graphqlApis } = await appsync
        .listGraphqlApis({
          nextToken,
        })
        .promise();
      apis.push(...graphqlApis);
    } while (nextToken);
    const { apiId } = apis.find(({ name }) => name.endsWith(env));
    this.log(`apiId = ${apiId}`);
    return apiId;
  }

  async run() {
    const { flags: currentFlags } = this.parse(DynamodbCommand);
    if (!(await confirm(currentFlags, true))) return;
    const { id: apiId } = getApiConfig();
    const tables = [
      'Collection',
      'CollectionVideoNode',
      'Credit',
      'News',
      'Profile',
      'StarringVideoNode',
      'UserCollection',
      'UserProfile',
      'UserSettings',
      'UserVideoNode',
      'VideoNode',
      'View',
    ];
    if (currentFlags.flush) {
      await FlushDynamodbCommand.run(['--yes']);
    }
    for (const table of tables) {
      if (currentFlags.from) {
        const env = getCurrentEnv();
        try {
          const fromApiId = await this.getApiIdFrom(currentFlags.from);
          const items = await dynamodb.getAllItems(
            `${table}-${fromApiId}-${currentFlags.from}`,
          );
          await dynamodb.putItems(`${table}-${apiId}-${env}`, items);
          this.log(`table ${table}: copied from ${currentFlags.from}`);
        } catch (e) {
          this.log(
            `table ${table}: unable to copy from ${currentFlags.from} (maybe the table does not exist yet?)`,
            e,
          );
        }
      } else {
        await this.seedFromFixtures(table, apiId, getCurrentEnv());
      }
    }
  }
}

DynamodbCommand.description = `Seed dynamodb

Seed (and optionnally flush) dynamodb tables.
`;

DynamodbCommand.flags = {
  flush: flags.boolean({
    char: 'f',
    description: 'Flush table before inserting items',
  }),
  from: flags.string({
    description: 'Seed data from an existing env instead of fixtures',
  }),
  yes: commonFlags.yes,
};

module.exports = DynamodbCommand;
