const { Command } = require('@oclif/command');

const dynamodb = require('claptime-commons/dynamodb');
const { getApiConfig, getCurrentEnv } = require('claptime-commons/dev/amplify');
const fs = require('fs');

const { commonFlags, confirm } = require('../../utils');

class ImportViewsFromJSONCommand extends Command {
  static async importDataFromJson(filePath, table, getNewItem) {
    const rawdata = fs.readFileSync(filePath);
    const data = JSON.parse(rawdata);
    await dynamodb.putItems(table, data.map(getNewItem));
  }

  async run() {
    const { flags } = this.parse(ImportViewsFromJSONCommand);
    if (!(await confirm(flags))) return;

    const { id: apiId } = getApiConfig();
    const env = getCurrentEnv();

    await ImportViewsFromJSONCommand.importDataFromJson(
      './data_views.json',
      `View-${apiId}-${env}`,
      (item) => {
        /* eslint-disable no-param-reassign */
        item.viewVideoNodeId = item.viewVideoId;
        delete item.viewVideoId;
        return item;
      },
    );
  }
}

ImportViewsFromJSONCommand.description = `Import data from file into View table`;

ImportViewsFromJSONCommand.flags = {
  yes: commonFlags.yes,
};

module.exports = ImportViewsFromJSONCommand;
