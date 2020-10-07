const { Command } = require('@oclif/command');
const dynamodb = require('claptime-commons/dynamodb');
const { getApiConfig, getCurrentEnv } = require('claptime-commons/dev/amplify');
const { commonFlags, confirm } = require('../../utils');

class FavoritesCommand extends Command {
  async run() {
    const { flags } = this.parse(FavoritesCommand);
    if (!(await confirm(flags))) return;

    const { id: apiId } = getApiConfig();
    const env = getCurrentEnv();

    // Renaming LIKED list to TO_WATCH
    const tableName = `UserVideoNode-${apiId}-${env}`;
    const items = await dynamodb.getAllItems(tableName);
    await dynamodb.putItems(
      tableName,
      items.map((item) => {
        /* eslint-disable no-param-reassign */
        if (item.list === 'LIKED') {
          item.list = 'TO_WATCH';
          item[
            'list#userVideoNodeVideoNodeId'
          ] = `TO_WATCH#${item.userVideoNodeVideoNodeId}`;
        }
        return item;
      }),
    );
    console.log(`[DynamoDB][${tableName}] LIKED -> TO_WATCH`);
  }
}

FavoritesCommand.description = `
- Renaming LIKED list to TO_WATCH
`;

FavoritesCommand.flags = {
  yes: commonFlags.yes,
};

module.exports = FavoritesCommand;
