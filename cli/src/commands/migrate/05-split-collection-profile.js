const { Command } = require('@oclif/command');
const dynamodb = require('claptime-commons/dynamodb');
const { getApiConfig, getCurrentEnv } = require('claptime-commons/dev/amplify');
const { pLimit } = require('claptime-commons/promise');
const { commonFlags, confirm } = require('../../utils');

class SplitCollectionProfileCommand extends Command {
  static async collectionVideoToProfileVideo(apiId, env) {
    console.log('##### collectionVideoToProfileVideo #####');
    const collectionVideoTableName = `CollectionVideo-${apiId}-${env}`;
    const collectionTableName = `Collection-${apiId}-${env}`;
    const videoTableName = `Video-${apiId}-${env}`;
    const collectionVideoItems = await dynamodb.getAllItems(
      collectionVideoTableName,
    );
    const limit = pLimit(10);
    await collectionVideoItems.map(
      ({ id, collectionVideoCollectionId, collectionVideoVideoId }) =>
        limit(async () => {
          // Check if corresponding collection is of type UPLOADED_VIDEO
          const collection = await dynamodb.getItem(collectionTableName, {
            id: collectionVideoCollectionId,
          });
          if (collection && collection.type === 'UPLOADED_VIDEOS') {
            console.log(
              `Collection ${collectionVideoCollectionId} of type UPLOADED_VIDEOS, processing CollectionVideo ${id}`,
            );
            await dynamodb.updateItem(videoTableName, {
              Key: { id: collectionVideoVideoId },
              UpdateExpression: `set videoProfileId = :val`,
              ExpressionAttributeValues: {
                ':val': collectionVideoCollectionId,
              },
            });
            await dynamodb.deleteItem(collectionVideoTableName, { id });
          } else if (!collection) {
            // In case collection does not exist anymore, we clean as well
            console.log(
              `Collection ${collectionVideoCollectionId} does not exist anymore, just deleting CollectionVideo ${id}`,
            );
            await dynamodb.deleteItem(collectionVideoTableName, { id });
          }
        }),
    );
  }

  static async collectionUserToUserProfile(apiId, env) {
    console.log('##### collectionUserToUserProfile #####');
    const collectionUserTableName = `CollectionUser-${apiId}-${env}`;
    const collectionTableName = `Collection-${apiId}-${env}`;
    const userCollectionTableName = `UserCollection-${apiId}-${env}`;
    const userProfileTableName = `UserProfile-${apiId}-${env}`;
    const collectionUserItems = await dynamodb.getAllItems(
      collectionUserTableName,
    );
    const limit = pLimit(10);
    await collectionUserItems.map(
      ({ id, collectionUserCollectionId, userId, createdAt, updatedAt }) =>
        limit(async () => {
          // Check if corresponding collection is of type UPLOADED_VIDEO
          const collection = await dynamodb.getItem(collectionTableName, {
            id: collectionUserCollectionId,
          });
          console.log(collectionUserCollectionId);
          if (collection && collection.type === 'UPLOADED_VIDEOS') {
            console.log(
              `Collection ${collectionUserCollectionId} of type UPLOADED_VIDEOS, moving CollectionUser ${id} to UserProfile`,
            );
            await dynamodb.putItem(userProfileTableName, {
              __typename: 'UserProfile',
              userSettingsProfilesId: userId,
              userProfileProfileId: collectionUserCollectionId,
              list: 'FOLLOWED',
              'list#userProfileProfileId': `FOLLOWED#${userId}`,
              createdBy: userId,
              owner: userId,
              createdAt,
              updatedAt,
            });
          } else if (collection && collection.type === 'REGULAR') {
            console.log(
              `Collection ${collectionUserCollectionId} of type REGULAR, moving CollectionUser ${id} to UserCollection`,
            );
            await dynamodb.putItem(userCollectionTableName, {
              __typename: 'UserCollection',
              userSettingsCollectionsId: userId,
              userCollectionCollectionId: collectionUserCollectionId,
              list: 'SUBSCRIBED',
              'list#userCollectionCollectionId': `SUBSCRIBED#${userId}`,
              createdBy: userId,
              owner: userId,
              createdAt,
              updatedAt,
            });
          } else {
            console.log(
              `Collection ${collectionUserCollectionId} does not exist anymore, just deleting CollectionUser ${id}`,
            );
          }
          await dynamodb.deleteItem(collectionUserTableName, { id });
        }),
    );
  }

  static async deleteUploadedVideosCollections(apiId, env) {
    console.log('##### deleteUploadedVideosCollections #####');
    const collectionTableName = `Collection-${apiId}-${env}`;
    const collectionItems = await dynamodb.getAllItems(collectionTableName);
    const limit = pLimit(10);
    await collectionItems.map(({ id, type }) =>
      limit(async () => {
        if (type === 'UPLOADED_VIDEOS') {
          await dynamodb.deleteItem(collectionTableName, { id });
        }
      }),
    );
  }

  async run() {
    const { flags } = this.parse(SplitCollectionProfileCommand);
    if (!(await confirm(flags))) return;
    if (flags['dry-run']) {
      process.env.DRY_RUN = true;
    }
    const { id: apiId } = getApiConfig();
    const env = getCurrentEnv();
    await SplitCollectionProfileCommand.collectionVideoToProfileVideo(
      apiId,
      env,
    );
    await SplitCollectionProfileCommand.collectionUserToUserProfile(apiId, env);
    await SplitCollectionProfileCommand.deleteUploadedVideosCollections(
      apiId,
      env,
    );
  }
}

SplitCollectionProfileCommand.description = `Do not anymore use a Collection with UPLOADED_VIDEO type to store profile videos.
https://github.com/claptime/claptime/pull/328
- Convert CollectionVideo of Collection(type=UPLOADED_VIDEOS) to ProfileVideo
- Convert CollectionUsers into UserProfile
`;

SplitCollectionProfileCommand.flags = {
  yes: commonFlags.yes,
  'dry-run': commonFlags.dryRun,
};

module.exports = SplitCollectionProfileCommand;
