const { Command } = require('@oclif/command');
const dynamodb = require('claptime-commons/dynamodb');
const { getApiConfig, getCurrentEnv } = require('claptime-commons/dev/amplify');
const { commonFlags, confirm } = require('../../utils');

class FilmToFictionCommand extends Command {
  static async dumpDynamoDbTable(fromTable, toTable, getNewItem) {
    const items = await dynamodb.getAllItems(fromTable);
    await dynamodb.putItems(toTable, items.map(getNewItem));
    console.log(`[DynamoDB][${fromTable}] Data dumped into  ${toTable} table`);
  }

  async run() {
    const { flags } = this.parse(FilmToFictionCommand);
    if (!(await confirm(flags))) return;
    const { id: apiId } = getApiConfig();
    const env = getCurrentEnv();
    const tableName = `Video-${apiId}-${env}`;
    await FilmToFictionCommand.dumpDynamoDbTable(
      tableName,
      tableName,
      (item) => {
        /* eslint-disable no-param-reassign */
        if (item.category === 'FILM') {
          item.category = 'FICTION';
        }
        return item;
      },
    );
    console.log(`[DynamoDB][${tableName}] FILM category renamed to FICTION`);
  }
}

FilmToFictionCommand.description = `Rename FILM category to FICTION
https://github.com/claptime/claptime/pull/290
`;

FilmToFictionCommand.flags = {
  yes: commonFlags.yes,
};

module.exports = FilmToFictionCommand;
