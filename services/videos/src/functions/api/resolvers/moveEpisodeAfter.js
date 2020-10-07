const {
  getVideoNode,
  listVideoNodesByParent,
  updateVideoNode,
} = require('../../../lib/models');

module.exports = async (event) => {
  const {
    arguments: { episodeVideoNodeId, previousEpisodeVideoNodeId },
  } = event;

  const videoNode = await getVideoNode(episodeVideoNodeId);
  console.log('VideoNode', videoNode);

  const seriesEpisodes = await listVideoNodesByParent(
    videoNode.videoNodeParentNodeId,
  );
  console.log('Series episodes', JSON.stringify(seriesEpisodes, null, 2));
  const initialPreviousVideoNode = seriesEpisodes.find(
    ({ videoNodeNextNodeId }) => videoNodeNextNodeId === episodeVideoNodeId,
  );
  console.log('InitialPreviousVideoNode', initialPreviousVideoNode);

  if (initialPreviousVideoNode) {
    await updateVideoNode({
      id: initialPreviousVideoNode.id,
      videoNodeNextNodeId: videoNode.videoNodeNextNodeId,
    });
  }

  if (previousEpisodeVideoNodeId) {
    const newPreviousVideoNode = await getVideoNode(previousEpisodeVideoNodeId);
    console.log('NewPreviousVideoNode', newPreviousVideoNode);
    await updateVideoNode({
      id: previousEpisodeVideoNodeId,
      videoNodeNextNodeId: episodeVideoNodeId,
    });
    await updateVideoNode({
      id: episodeVideoNodeId,
      videoNodeNextNodeId: newPreviousVideoNode.videoNodeNextNodeId,
    });
  } else {
    console.log('No NewPreviousVideoNode');
    await updateVideoNode({
      id: episodeVideoNodeId,
      videoNodeNextNodeId: undefined,
    });
  }

  return getVideoNode(episodeVideoNodeId);
};
