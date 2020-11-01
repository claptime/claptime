const { getVideoNode } = require('../../../lib/models');
const { submitToCollection } = require('../../../lib/helpers');

module.exports = async (event) => {
  const {
    arguments: { videoNodeId, collectionSlug, collectionCategoryId },
    identity: { claims },
  } = event;

  // Submit VideoNode to collection
  const collectionVideoNode = await submitToCollection(
    videoNodeId,
    collectionSlug,
    collectionCategoryId,
    claims,
  );
  console.log(collectionVideoNode);

  return getVideoNode(videoNodeId);
};
