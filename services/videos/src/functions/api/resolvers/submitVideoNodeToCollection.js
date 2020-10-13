const { getVideoNode } = require('../../../lib/models');
const {
  submitToCollection,
  validateSubmission,
} = require('../../../lib/helpers');

module.exports = async (event) => {
  const {
    arguments: { videoNodeId, collectionSlug, collectionCategoryId },
    identity: { claims },
  } = event;

  // Submit VideoNode to default collection
  const collectionVideoNode = await submitToCollection(
    videoNodeId,
    collectionSlug,
    collectionCategoryId,
    claims,
  );

  // Automatically validate submission to default collection
  await validateSubmission(collectionVideoNode, 'APPROVED', undefined, claims);

  return getVideoNode(videoNodeId);
};
