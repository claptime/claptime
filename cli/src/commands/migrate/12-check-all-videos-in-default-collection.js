const { Command } = require('@oclif/command');
const dynamodb = require('claptime-commons/dynamodb');
const { getApiConfig, getCurrentEnv } = require('claptime-commons/dev/amplify');
const { uuidV4 } = require('claptime-commons/utils');

const { commonFlags, confirm } = require('../../utils');

const defaultCollection = {
  id: '4e51be7e-f314-4a63-a20f-c3afb4196f00',
  slug: 'la-scene-ouverte',
  categories: {
    FICTION: '2tTUw7PBJ',
    DOCUMENTARY: 'ia3o2wPRS',
    MUSIC_VIDEO: '2hn3AUqdHB',
    PERFORMING_ARTS: 'xjJKt0nG2',
  },
};

const categoriesMapping = {
  FICTION: '2tTUw7PBJ',
  DOCUMENTARY: 'ia3o2wPRS',
  MUSIC_VIDEO: '2hn3AUqdHB',
  PERFORMING_ARTS: 'xjJKt0nG2',
};

class CheckAllVideoInDefaultCollectionCommand extends Command {
  async run() {
    const { flags } = this.parse(CheckAllVideoInDefaultCollectionCommand);
    if (!(await confirm(flags))) return;

    const { id: apiId } = getApiConfig();
    const env = getCurrentEnv();

    const collectionVideoNodeTable = `CollectionVideoNode-${apiId}-${env}`;
    const videoNodeTable = `VideoNode-${apiId}-${env}`;

    const collectionVideoNodes = await dynamodb.getAllItems(
      collectionVideoNodeTable,
    );
    const videoNodes = await dynamodb.getAllItems(videoNodeTable);

    const videoNodesInDefaultCollection = collectionVideoNodes
      .filter(
        (item) => item.collectionVideoNodeCollectionId === defaultCollection.id,
      )
      .map((item) => item.collectionVideoNodeVideoNodeId);
    const videoNodesNotInDefaultCollection = videoNodes.filter(
      (item) =>
        !videoNodesInDefaultCollection.includes(item.id) &&
        item.status === 'PUBLISHED',
    );

    await dynamodb.putItems(
      collectionVideoNodeTable,
      videoNodesNotInDefaultCollection.map(
        ({ id, category, createdAt, createdBy, owner }) => ({
          __typename: 'CollectionVideoNode',
          'categoryId#createdAt': `${categoriesMapping[category]}#${createdAt}`,
          id: uuidV4(),
          collectionVideoNodeCollectionId: defaultCollection.id,
          categoryId: categoriesMapping[category],
          collectionVideoNodeVideoNodeId: id,
          createdAt,
          owner,
          createdBy,
          status: 'APPROVED',
        }),
      ),
    );
  }
}

CheckAllVideoInDefaultCollectionCommand.description = `
- Check that every video is present in default collection
`;

CheckAllVideoInDefaultCollectionCommand.flags = {
  yes: commonFlags.yes,
};

module.exports = CheckAllVideoInDefaultCollectionCommand;
