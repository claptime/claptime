const { Command } = require('@oclif/command');
const dynamodb = require('claptime-commons/dynamodb');
const { getApiConfig, getCurrentEnv } = require('claptime-commons/dev/amplify');
const { commonFlags, confirm } = require('../../utils');

class VideoNodeDescriptionToSynopsisCommand extends Command {
  async run() {
    const { flags } = this.parse(VideoNodeDescriptionToSynopsisCommand);
    if (!(await confirm(flags))) return;

    const { id: apiId } = getApiConfig();
    const env = getCurrentEnv();

    // VideoNode: description -> synopsis
    const videoNodetableName = `VideoNode-${apiId}-${env}`;
    const videoNodeItems = await dynamodb.getAllItems(videoNodetableName);
    await dynamodb.putItems(
      videoNodetableName,
      videoNodeItems.map((item) => {
        /* eslint-disable no-param-reassign */
        item.synopsis = item.description;
        item.description = undefined;
        return item;
      }),
    );
    console.log(
      `[DynamoDB][${videoNodetableName}] description field renamed to synopsis`,
    );
  }
}

VideoNodeDescriptionToSynopsisCommand.description = `
- VideoNode: description -> synopsis
`;

VideoNodeDescriptionToSynopsisCommand.flags = {
  yes: commonFlags.yes,
};

module.exports = VideoNodeDescriptionToSynopsisCommand;
