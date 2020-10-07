const { deleteDirectory } = require('claptime-commons/s3');
const { pLimit } = require('claptime-commons/promise');

const { STORAGE_BUCKET_NAME, VIDEOS_BUCKET_NAME } = process.env;

const {
  deleteCredit,
  deleteVideoNode,
  getVideoNode,
  listCredits,
  listVideoNodesByParent,
  updateVideoNode,
} = require('../../../lib/models');

module.exports = async (event) => {
  const {
    arguments: { videoNodeId },
  } = event;
  const limit = pLimit(10);

  // VideoNode
  const videoNode = await getVideoNode(videoNodeId);
  if (!videoNode) {
    console.log('Video was already deleted.');
    throw new Error('VideoNodeNotFound');
  }
  if (videoNode.status === 'PUBLISHED') {
    console.log('Cannot delete published videoNodes, must unpublish first.');
    throw new Error('CannotRemovePublishedVideoNodes');
  }
  console.log(`Deleting VideoNode id=${videoNodeId}...`);
  const deletedVideoNode = await deleteVideoNode({ id: videoNodeId });
  console.log('-> VideoNode deleted');

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

  // Credits
  console.log('Deleting related Credits...');
  const credits = await listCredits({
    creditVideoNodeId: {
      eq: deletedVideoNode.id,
    },
  });
  await Promise.all(
    credits.map((credit) =>
      limit(() =>
        deleteCredit({
          id: credit.id,
        }),
      ),
    ),
  );
  console.log('-> related Credits deleted');

  // S3 -> Storage
  console.log('Cleaning files on storage bucket...');
  await deleteDirectory(
    STORAGE_BUCKET_NAME,
    `public/videoNodes/${deletedVideoNode.id}`,
  ).catch(console.error);
  console.log('-> storage bucket cleaned');

  // S3 -> Videos
  console.log('Cleaning files on videos bucket...');
  await deleteDirectory(VIDEOS_BUCKET_NAME, deletedVideoNode.id)
    .catch(console.error)
    .catch(console.error);
  console.log('-> videos bucket cleaned');

  return true;
};
