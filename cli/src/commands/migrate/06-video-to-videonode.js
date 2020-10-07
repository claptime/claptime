const { Command } = require('@oclif/command');
const s3 = require('claptime-commons/s3');
const dynamodb = require('claptime-commons/dynamodb');
const {
  getApiConfig,
  getBucketConfig,
  getCurrentEnv,
} = require('claptime-commons/dev/amplify');
const { commonFlags, confirm } = require('../../utils');

class VideoToVideoNodeCommand extends Command {
  static async mvS3() {
    const bucketName = getBucketConfig().name;
    const from = 'public/videos';
    const to = 'public/videoNodes';
    await s3.moveDirectory(bucketName, from, to);
    console.log(`[S3][${bucketName}] files moved from ${from} to ${to}`);
  }

  static async dumpDynamoDbTable(fromTable, toTable, getNewItem) {
    console.log(fromTable);

    const items = await dynamodb.getAllItems(fromTable);
    await dynamodb.putItems(toTable, items.map(getNewItem));
    console.log(`[DynamoDB][${fromTable}] Data dumped into  ${toTable} table`);
  }

  static async renameDynamoDbField(table, fromField, toField) {
    await VideoToVideoNodeCommand.dumpDynamoDbTable(table, table, (item) => {
      /* eslint-disable no-param-reassign */
      item[toField] = item[fromField];
      delete item[fromField];
      return item;
    });
    console.log(
      `[DynamoDB][${table}] field ${fromField} renamed to ${toField}`,
    );
  }

  static async copyDynamoDb() {
    const { id: apiId } = getApiConfig();
    const env = getCurrentEnv();
    await VideoToVideoNodeCommand.dumpDynamoDbTable(
      `Video-${apiId}-${env}`,
      `VideoNode-${apiId}-${env}`,
      (item) => {
        /* eslint-disable no-param-reassign */
        item.videoNodeProfileId = item.videoProfileId;
        item.nodeType = 'ROOT';
        item.type = 'FILM';
        item.__typename = 'VideoNode'; // eslint-disable-line no-underscore-dangle
        delete item.videoProfileId;
        return item;
      },
    );
    await VideoToVideoNodeCommand.dumpDynamoDbTable(
      `UserVideo-${apiId}-${env}`,
      `UserVideoNode-${apiId}-${env}`,
      (item) => {
        /* eslint-disable no-param-reassign */
        item.userSettingsVideoNodesId = item.userSettingsVideosId;
        item.userVideoNodeVideoNodeId = item.userVideoVideoId;
        item['list#userVideoNodeVideoNodeId'] = item['list#userVideoVideoId'];

        item.__typename = 'UserVideoNode'; // eslint-disable-line no-underscore-dangle
        delete item.userSettingsVideosId;
        delete item.userVideoVideoId;
        delete item['list#userVideoVideoId'];
        return item;
      },
    );
    await VideoToVideoNodeCommand.dumpDynamoDbTable(
      `CollectionVideo-${apiId}-${env}`,
      `CollectionVideoNode-${apiId}-${env}`,
      (item) => {
        /* eslint-disable no-param-reassign */
        item.collectionVideoNodeVideoNodeId = item.collectionVideoVideoId;
        item.collectionVideoNodeCollectionId = item.collectionVideoCollectionId;

        item.__typename = 'CollectionVideoNode'; // eslint-disable-line no-underscore-dangle
        delete item.collectionVideoVideoId;
        delete item.collectionVideoCollectionId;
        return item;
      },
    );
    await VideoToVideoNodeCommand.renameDynamoDbField(
      `Credit-${apiId}-${env}`,
      'creditVideoId',
      'creditVideoNodeId',
    );
  }

  async run() {
    const { flags } = this.parse(VideoToVideoNodeCommand);
    if (!(await confirm(flags))) return;
    await VideoToVideoNodeCommand.mvS3();
    await VideoToVideoNodeCommand.copyDynamoDb();
  }
}

VideoToVideoNodeCommand.description = `Rename Video to VideoNode
https://github.com/claptime/claptime/pull/329
- S3 Storage bucket: move public/videos to public/videoNodes
- AppSync model changes:
  - Video: dump data into VideoNode table, change videoProfileId to videoNodeProfileId
  - UserVideo: dump data into UserVideoNode table, change userSettingsVideosId to userSettingsVideoNodesId, userVideoVideoId to userVideoNodeVideoNodeId, ist#userVideoVideoId to list#userVideoNodeVideoNodeId
  - CollectionVideo: dump data into CollectionVideoNode table, change collectionVideoVideoId to collectionVideoNodeVideoNodeId, collectionVideoCollectionId to collectionVideoNodeCollectionId
  - Credit: rename creditVideoId field into creditVideoNodeId
`;

VideoToVideoNodeCommand.flags = {
  yes: commonFlags.yes,
};

module.exports = VideoToVideoNodeCommand;
