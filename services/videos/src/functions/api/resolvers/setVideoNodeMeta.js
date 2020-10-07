const { getVideoNode, updateVideoNode } = require('../../../lib/models');
const { slackVideoNode } = require('../../../lib/slack');

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
  const { status, type } = await updateVideoNode(input);
  console.log('-> VideoNode updated');

  // Slack alert
  if (status === 'PUBLISHED') {
    await slackVideoNode('meta updated', { id: videoNodeId, type, title });
  }

  return getVideoNode(videoNodeId);
};
