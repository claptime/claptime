const { Command } = require('@oclif/command');
const dynamodb = require('claptime-commons/dynamodb');
const { getApiConfig, getCurrentEnv } = require('claptime-commons/dev/amplify');
const { uuidV4 } = require('claptime-commons/utils');
const { commonFlags, confirm } = require('../../utils');

const COLLECTION_ID = '4e51be7e-f314-4a63-a20f-c3afb4196f00';

const categoriesMapping = {
  FICTION: '2tTUw7PBJ',
  DOCUMENTARY: 'ia3o2wPRS',
  MUSIC_VIDEO: '2hn3AUqdHB',
  PERFORMING_ARTS: 'xjJKt0nG2',
};

class SeedInitialCollectionCommand extends Command {
  async run() {
    const { flags } = this.parse(SeedInitialCollectionCommand);
    if (!(await confirm(flags))) return;

    const { id: apiId } = getApiConfig();
    const env = getCurrentEnv();
    const videoNodes = (
      await dynamodb.getAllItems(`VideoNode-${apiId}-${env}`)
    ).filter(
      ({ status, nodeType }) => status === 'PUBLISHED' && nodeType === 'ROOT',
    );
    await dynamodb.putItems(
      `CollectionVideoNode-${apiId}-${env}`,
      videoNodes.map(({ id, category, createdAt, createdBy, owner }) => ({
        __typename: 'CollectionVideoNode',
        'categoryId#createdAt': `${categoriesMapping[category]}#${createdAt}`,
        id: uuidV4(),
        collectionVideoNodeCollectionId: COLLECTION_ID,
        categoryId: categoriesMapping[category],
        collectionVideoNodeVideoNodeId: id,
        createdAt,
        owner,
        createdBy,
      })),
    );
  }
}

SeedInitialCollectionCommand.description = `
  Add all published videos/series to "La scène ouverte" collection, with video category = collection category.
`;

SeedInitialCollectionCommand.flags = {
  yes: commonFlags.yes,
};

module.exports = SeedInitialCollectionCommand;
