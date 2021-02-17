const { createVideoNode, getVideoNode } = require('../../../lib/models');

module.exports = async (event) => {
  const {
    arguments: { type, profileId },
    identity: { username },
  } = event;
  const status = {
    FILM: 'UPLOAD',
    SERIES: 'DRAFT',
  };
  const { id } = await createVideoNode({
    status: status[type],
    videoNodeProfileId: profileId,
    watchable: true,
    title: ' ',
    createdBy: username,
    owner: username,
    type,
    nodeType: 'ROOT',
    childrenCount: type === 'SERIES' ? 0 : undefined,
  });
  console.log(`VideoNode created ${id}`);
  return getVideoNode(id);
};
