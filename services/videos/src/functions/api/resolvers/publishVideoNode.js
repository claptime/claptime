const {
  collections: { default: defaultCollection },
} = require('../../../lib/consts');
const { submitToCollection } = require('../../../lib/helpers');
const {
  getVideoNode,
  updateVideoNode,
  notifyUser,
} = require('../../../lib/models');
const {
  submitToCollection,
  validateSubmission,
} = require('../../../lib/helpers');
const { getVideoNode, updateVideoNode } = require('../../../lib/models');

module.exports = async (event) => {
  const {
    arguments: { videoNodeId },
    identity: { claims },
  } = event;

  const { owner, category, status } = await getVideoNode(videoNodeId);
  if (status !== 'DRAFT') {
    throw new Error('VideoNodeMustBeDraft');
  }

  console.log(`Publishing VideoNode ${videoNodeId}`);
  await updateVideoNode({
    id: videoNodeId,
    status: 'PUBLISHED',
  });
  console.log('-> VideoNode published');

  const channels = ['WEB'];
  const payload = JSON.stringify({
    videoNodeId: videoNodeId,
    previousStatus: 'DRAFT',
    newStatus: 'PUBLISHED',
  });
  await notifyUser(owner, 'videoStatusChange', channels, payload);

  const res = await submitToCollection(
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
