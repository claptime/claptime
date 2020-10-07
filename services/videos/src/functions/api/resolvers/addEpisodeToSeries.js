const {
  getVideoNode,
  listVideoNodesByParent,
  updateVideoNode,
} = require('../../../lib/models');

module.exports = async (event) => {
  const {
    arguments: { seriesVideoNodeId, episodeVideoNodeId },
  } = event;

  await updateVideoNode({
    id: episodeVideoNodeId,
    videoNodeParentNodeId: seriesVideoNodeId,
    nodeType: 'NODE',
  });
  console.log('Episode videoNode updated');

  // Then retrieve the last episode, and update its next item
  const initialLastVideoNode = (
    await listVideoNodesByParent(seriesVideoNodeId)
  ).find(
    ({ id, videoNodeNextNodeId }) =>
      !videoNodeNextNodeId && id !== episodeVideoNodeId,
  );

  console.log('initialLastVideoNode', initialLastVideoNode);
  if (initialLastVideoNode) {
    await updateVideoNode({
      id: initialLastVideoNode.id,
      videoNodeNextNodeId: episodeVideoNodeId,
    });
    console.log('Initial last videoNode updated to point on new episode');
  }

  // Increment parent episodes count
  const series = await getVideoNode(seriesVideoNodeId);
  console.log('series', series);
  const childrenCount = series.childrenCount + 1;
  await updateVideoNode({
    id: seriesVideoNodeId,
    childrenCount,
  });
  console.log(`Children count updated to ${childrenCount}`);

  return getVideoNode(episodeVideoNodeId);
};
