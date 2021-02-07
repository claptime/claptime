const { getVideoNode, updateVideoNode } = require('../../../lib/models');

module.exports = async (event) => {
  const {
    arguments: {
      videoNodeId,
      title,
      category,
      releaseYear,
      synopsis,
      festivals,
      ttl,
      donationsAvailable,
    },
  } = event;

  const input = {
    id: videoNodeId,
    title,
    category,
    releaseYear,
    synopsis,
    festivals,
    ttl,
    donationsAvailable,
  };
  console.log(
    `Updating VideoNode ${videoNodeId}, input=${JSON.stringify(
      input,
      null,
      2,
    )}`,
  );
  await updateVideoNode(input);
  console.log('-> VideoNode updated');

  return getVideoNode(videoNodeId);
};
