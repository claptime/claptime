const { Command } = require('@oclif/command');
const dynamodb = require('claptime-commons/dynamodb');
const { getApiConfig, getCurrentEnv } = require('claptime-commons/dev/amplify');
const { commonFlags, confirm } = require('../../utils');

class AddVideoIndexesCommand extends Command {
  static async dumpDynamoDbTable(fromTable, toTable, getNewItem) {
    const items = await dynamodb.getAllItems(fromTable);
    await dynamodb.putItems(toTable, items.map(getNewItem));
    console.log(`[DynamoDB][${fromTable}] Data dumped into  ${toTable} table`);
  }

  async run() {
    const { flags } = this.parse(AddVideoIndexesCommand);
    if (!(await confirm(flags))) return;
    const { id: apiId } = getApiConfig();
    const env = getCurrentEnv();
    const tableName = `Video-${apiId}-${env}`;
    await AddVideoIndexesCommand.dumpDynamoDbTable(
      tableName,
      tableName,
      (item) => {
        /* eslint-disable no-param-reassign, no-template-curly-in-string */
        item['createdAt#category'] = `${item.createdAt}#${
          item.category || '${ctx.args.input.category}'
        }`;
        item['title#category'] = `${item.title}#${
          item.category || '${ctx.args.input.category}'
        }`;
        return item;
      },
    );
    console.log(`[DynamoDB][${tableName}] Indexes added on table`);
  }
}

AddVideoIndexesCommand.description = `Add 2 indexes on Video table:
- createdAt#category
- title#category
Need to backfill values for all items.
Hasn't beend used in the end, keeping code for later.
`;

AddVideoIndexesCommand.flags = {
  yes: commonFlags.yes,
};

module.exports = AddVideoIndexesCommand;
