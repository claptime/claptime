const { Command } = require('@oclif/command');
const dynamodb = require('claptime-commons/dynamodb');
const { getApiConfig, getCurrentEnv } = require('claptime-commons/dev/amplify');
const { commonFlags, confirm } = require('../../utils');

const ROLE_MAPPING = {
  DIRECTOR: 'Réalisateur',
  PRODUCER: 'Producteur',
  ACTOR: 'Acteur',
  COMPOSER: 'Compositeur',
};

class RemoveCustomRoleCommand extends Command {
  static async dumpDynamoDbTable(fromTable, toTable, getNewItem) {
    const items = await dynamodb.getAllItems(fromTable);
    await dynamodb.putItems(toTable, items.map(getNewItem));
    console.log(`[DynamoDB][${fromTable}] Data dumped into  ${toTable} table`);
  }

  async run() {
    const { flags } = this.parse(RemoveCustomRoleCommand);
    if (!(await confirm(flags))) return;
    const { id: apiId } = getApiConfig();
    const env = getCurrentEnv();
    const tableName = `Credit-${apiId}-${env}`;
    await RemoveCustomRoleCommand.dumpDynamoDbTable(
      tableName,
      tableName,
      (item) => {
        /* eslint-disable no-param-reassign, no-template-curly-in-string */
        item.role = (item.role && ROLE_MAPPING[item.role]) || item.customRole;
        delete item.customRole;
        return item;
      },
    );
    console.log(
      `[DynamoDB][${tableName}] customRole field moved to role field`,
    );
  }
}

RemoveCustomRoleCommand.description = `Prior to this script, we had both role (enum) and customRole (string) fields on Credit.
We removed the enum to only keep custom strings in the role field.
`;

RemoveCustomRoleCommand.flags = {
  yes: commonFlags.yes,
};

module.exports = RemoveCustomRoleCommand;
