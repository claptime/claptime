const importVideo = require('../../../lib/import');
const { getVideoNode } = require('../../../lib/models');

module.exports = async (event) => {
  const {
    arguments: { videoNodeId, videoLink },
    identity: { username },
  } = event;

  await importVideo(username, videoNodeId, videoLink);
  return getVideoNode(videoNodeId);
};
