const {
  getVideoNode,
  listVideoNodesByParent,
  updateVideoNode,
} = require('../../../lib/models');

module.exports = async (event) => {
  const {
    arguments: { videoNodeId },
  } = event;

  const videoNode = await getVideoNode(videoNodeId);
  console.log('VideoNode', videoNode);

  await updateVideoNode({
    id: videoNodeId,
    videoNodeParentNodeId: null,
    videoNodeNextNodeId: null,
    nodeType: 'ROOT',
  });
  console.log('Episode videoNode updated');

  // Then retrieve previous episode, and update its next item
  const previousVideoNode = (
    await listVideoNodesByParent(videoNode.videoNodeParentNodeId)
  ).find(({ videoNodeNextNodeId }) => videoNodeNextNodeId === videoNodeId);
  if (previousVideoNode) {
    await updateVideoNode({
      id: previousVideoNode.id,
      videoNodeNextNodeId: videoNode.videoNodeNextNodeId,
    });
    console.log('Previous videoNode updated to point on next episode');
  }

  // Decrement parent episodes count
  const series = await getVideoNode(videoNode.videoNodeParentNodeId);
  console.log('Series', series);
  const childrenCount = series.childrenCount--;
  await updateVideoNode({
    id: series.id,
    childrenCount,
  });
  console.log(`Children count updated to ${childrenCount}`);
  return getVideoNode(videoNodeId);
};
