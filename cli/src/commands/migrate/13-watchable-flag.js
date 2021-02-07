const { Command } = require('@oclif/command');
const dynamodb = require('claptime-commons/dynamodb');
const { getApiConfig, getCurrentEnv } = require('claptime-commons/dev/amplify');
const { commonFlags, confirm } = require('../../utils');

class WatchableFlagCommand extends Command {
  async run() {
    const { flags } = this.parse(WatchableFlagCommand);
    if (!(await confirm(flags))) return;

    const { id: apiId } = getApiConfig();
    const env = getCurrentEnv();

    const videoNodetableName = `VideoNode-${apiId}-${env}`;
    const videoNodeItems = await dynamodb.getAllItems(videoNodetableName);
    await dynamodb.putItems(
      videoNodetableName,
      videoNodeItems.map((item) => {
        /* eslint-disable no-param-reassign */
        item.watchable = true;
        return item;
      }),
    );
    console.log(`[DynamoDB][${videoNodetableName}] Added a watchable flag`);
  }
}

WatchableFlagCommand.description = `
- VideoNode: Adding a watchable flag
`;

WatchableFlagCommand.flags = {
  yes: commonFlags.yes,
};

module.exports = WatchableFlagCommand;
