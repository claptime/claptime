const { listUserVideoNodesByVideoNodeAndList } = require('../../../lib/models');

module.exports = async (event) => {
  const {
    source: { id: videoNodeId },
  } = event;

  const userVideoNodes = await listUserVideoNodesByVideoNodeAndList(
    videoNodeId,
    { eq: 'LIKED' },
  );

  return userVideoNodes.length;
};
