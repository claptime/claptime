const { Command } = require('@oclif/command');
const dynamodb = require('claptime-commons/dynamodb');
const { getApiConfig, getCurrentEnv } = require('claptime-commons/dev/amplify');
const { commonFlags, confirm } = require('../../utils');

class VideoNodeStatusCommand extends Command {
  async run() {
    const { flags } = this.parse(VideoNodeStatusCommand);
    if (!(await confirm(flags))) return;

    const { id: apiId } = getApiConfig();
    const env = getCurrentEnv();

    // VideoNode status: PROCESSED -> DRAFT
    const videoNodetableName = `VideoNode-${apiId}-${env}`;
    const videoNodeItems = await dynamodb.getAllItems(videoNodetableName);
    await dynamodb.putItems(
      videoNodetableName,
      videoNodeItems.map((item) => {
        if (item.status === 'PROCESSED') {
          console.log(`Processing VideoNode ${item.id}`);
          item.status = 'DRAFT'; // eslint-disable-line no-param-reassign
        }
        return item;
      }),
    );
    console.log(
      `[DynamoDB][${videoNodetableName}] PROCESSED status renamed to DRAFT`,
    );

    // CollectionVideoNode: adding a APPROVED status to existing items
    const collectionVideoNodeTableName = `CollectionVideoNode-${apiId}-${env}`;
    const collectionVideoNodeItems = await dynamodb.getAllItems(
      collectionVideoNodeTableName,
    );
    await dynamodb.putItems(
      collectionVideoNodeTableName,
      collectionVideoNodeItems.map((item) => {
        item.status = 'APPROVED'; // eslint-disable-line no-param-reassign
        return item;
      }),
    );
    console.log(
      `[DynamoDB][${collectionVideoNodeTableName}] status added to existing items`,
    );

    // Set childrenCount for existing series
    for (const series of videoNodeItems.filter(
      ({ type }) => type === 'SERIES',
    )) {
      const episodes = await dynamodb.getAllItems(videoNodetableName, {
        FilterExpression: 'videoNodeParentNodeId = :seriesId',
        ExpressionAttributeValues: {
          ':seriesId': series.id,
        },
      });
      console.log(
        `Setting childrenCount = ${episodes.length} for series ${series.id}`,
      );
      await dynamodb.updateItem(videoNodetableName, {
        Key: { id: series.id },
        UpdateExpression: `set childrenCount = :val`,
        ExpressionAttributeValues: {
          ':val': episodes.length,
        },
      });
    }
  }
}

VideoNodeStatusCommand.description = `https://github.com/claptime/claptime/pull/365
- VideoNode status: PROCESSED -> DRAFT
- CollectionVideoNode: adding a APPROVED status to existing items
- VideoNode: Set childrenCount for existing series
`;

VideoNodeStatusCommand.flags = {
  yes: commonFlags.yes,
};

module.exports = VideoNodeStatusCommand;
