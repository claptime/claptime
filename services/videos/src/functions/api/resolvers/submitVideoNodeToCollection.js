const { getVideoNode, submitToCollection } = require('../../../lib/helpers');

module.exports = async (event) => {
  const {
    arguments: { videoNodeId, collectionSlug, collectionCategoryId },
    identity: { claims },
  } = event;

  await submitToCollection(
    videoNodeId,
    collectionSlug,
    collectionCategoryId,
    claims,
  );
  return getVideoNode(videoNodeId);
};
