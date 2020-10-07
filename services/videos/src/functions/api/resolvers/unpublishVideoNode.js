const { pLimit } = require('claptime-commons/promise');

const {
  deleteCollectionVideoNode,
  getVideoNode,
  listCollectionVideoNodes,
  listVideoNodesByParent,
  updateVideoNode,
} = require('../../../lib/models');
const { slackVideoNode } = require('../../../lib/slack');

module.exports = async (event) => {
  const {
    arguments: { videoNodeId },
  } = event;
  const limit = pLimit(10);

  const videoNode = await getVideoNode(videoNodeId);
  if (!videoNode) {
    throw new Error('VideoNodeNotFound');
  }
  if (videoNode.status !== 'PUBLISHED') {
    console.log('VideoNode is not published, cannot unpublish it.');
    throw new Error('CannotUnublishNonPublishedVideoNodes');
  }

  console.log(`Unpublishing VideoNode ${videoNodeId}`);
  const { title, type } = await updateVideoNode({
    id: videoNodeId,
    status: 'DRAFT',
  });
  console.log('-> VideoNode unpublished');

  // CollectionVideoNodes
  console.log('Deleting related CollectionVideoNodes...');
  const collectionVideoNodes = await listCollectionVideoNodes({
    collectionVideoNodeVideoNodeId: {
      eq: videoNode.id,
    },
  });
  await Promise.all(
    collectionVideoNodes.map((collectionVideoNode) =>
      limit(() =>
        deleteCollectionVideoNode({
          id: collectionVideoNode.id,
        }),
      ),
    ),
  );
  console.log('-> related CollectionVideoNodes deleted');

  // ChildNodes
  if (videoNode.nodeType === 'ROOT') {
    console.log('Unlinking ChildNodes...');
    const childNodes = await listVideoNodesByParent(videoNodeId);
    await Promise.all(
      childNodes.map((childNode) =>
        limit(() =>
          updateVideoNode({
            id: childNode.id,
            videoNodeNextNodeId: null,
            videoNodeParentNodeId: null,
          }),
        ),
      ),
    );
    console.log('-> ChildNodes unliked');
  }

  // PreviousNode
  if (videoNode.videoNodeParentNodeId) {
    console.log('Linking PreviousNode to NextNode...');
    const otherEpisodes = await listVideoNodesByParent(
      videoNode.videoNodeParentNodeId,
    );
    const previousEpisode = otherEpisodes.find(
      (episode) => episode.videoNodeNextNodeId === videoNode.id,
    );
    if (previousEpisode) {
      console.log(
        `Found previous episode: ${JSON.stringify(previousEpisode, null, 2)}`,
      );
      await updateVideoNode({
        id: previousEpisode.id,
        videoNodeNextNodeId: videoNode.videoNodeNextNodeId,
      });
      console.log(
        `-> previous episode linked to ${videoNode.videoNodeNextNodeId}`,
      );
    } else {
      console.log('No previous episode found, skipping');
    }
  }

  await slackVideoNode('unpublished', { id: videoNodeId, type, title });

  return getVideoNode(videoNodeId);
};
