const { Command } = require('@oclif/command');
const dynamodb = require('claptime-commons/dynamodb');
const { getApiConfig, getCurrentEnv } = require('claptime-commons/dev/amplify');
const fs = require('fs');
const { commonFlags, confirm } = require('../../utils');

class CopyViewsCommand extends Command {
  static async copyViewsToJson(table, filePath) {
    console.log(`Copy data from tabe ${table}`);
    const items = await dynamodb.getAllItems(table);
    fs.writeFileSync(filePath, JSON.stringify(items));
    console.log('-> data copied into data.json');
  }

  async run() {
    const { flags } = this.parse(CopyViewsCommand);
    if (!(await confirm(flags))) return;

    const { id: apiId } = getApiConfig();
    const env = getCurrentEnv();
    await CopyViewsCommand.copyViewsToJson(
      `View-${apiId}-${env}`,
      'data_views.json',
    );
  }
}

CopyViewsCommand.description = `Copy data from View table into file`;

CopyViewsCommand.flags = {
  yes: commonFlags.yes,
};

module.exports = CopyViewsCommand;
