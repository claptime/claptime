const {
  collections: { default: defaultCollection },
} = require('../../../lib/consts');
const { submitToCollection } = require('../../../lib/helpers');
const { getVideoNode, updateVideoNode } = require('../../../lib/models');

module.exports = async (event) => {
  const {
    arguments: { videoNodeId },
    identity: { claims },
  } = event;

  const { category, status } = await getVideoNode(videoNodeId);
  if (status !== 'DRAFT') {
    throw new Error('VideoNodeMustBeDraft');
  }

  console.log(`Publishing VideoNode ${videoNodeId}`);
  await updateVideoNode({
    id: videoNodeId,
    status: 'PUBLISHED',
  });
  console.log('-> VideoNode published');

  const res = await submitToCollection(
    videoNodeId,
    defaultCollection.slug,
    defaultCollection.categories[category],
    claims,
  );
  console.log(res);
  return getVideoNode(videoNodeId);
};
