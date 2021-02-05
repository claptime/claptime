const { Command } = require('@oclif/command');
const dynamodb = require('claptime-commons/dynamodb');
const { getApiConfig, getCurrentEnv } = require('claptime-commons/dev/amplify');
const { commonFlags, confirm } = require('../../utils');

class AcceptSubmissionsCommand extends Command {
  async run() {
    const { flags } = this.parse(AcceptSubmissionsCommand);
    if (!(await confirm(flags))) return;

    const { id: apiId } = getApiConfig();
    const env = getCurrentEnv();

    const tableName = `Collection-${apiId}-${env}`;
    const items = await dynamodb.getAllItems(tableName);
    await dynamodb.putItems(
      tableName,
      items.map((item) => ({
        ...item,
        acceptSubmissions: true,
      })),
    );
    console.log(`[DynamoDB][${tableName}] acceptSubmissions flag added`);
  }
}

AcceptSubmissionsCommand.description = `
- Adding a accept submissions flag
`;

AcceptSubmissionsCommand.flags = {
  yes: commonFlags.yes,
};

module.exports = AcceptSubmissionsCommand;
