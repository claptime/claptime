const {
  collections: { default: defaultCollection },
} = require('../../../lib/consts');
const { getVideoNode, updateVideoNode } = require('../../../lib/models');
const {
  submitToCollection,
  validateSubmission,
} = require('../../../lib/helpers');

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

  // Submit VideoNode to default collection
  const collectionVideoNode = await submitToCollection(
    videoNodeId,
    defaultCollection.slug,
    defaultCollection.categories[category],
    claims,
  );
  console.log(collectionVideoNode);

  // Automatically validate submission to default collection
  await validateSubmission(collectionVideoNode, 'APPROVED', undefined, claims);

  return getVideoNode(videoNodeId);
};
