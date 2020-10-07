const { sendEmailToUser } = require('claptime-commons/emails');

const {
  createCollectionVideoNode,
  getCollectionBySlug,
  getVideoNode,
} = require('./models');
const { slackVideoNode } = require('./slack');

const submitToCollection = async (
  videoNodeId,
  collectionSlug,
  collectionCategoryId,
  claims,
) => {
  const videoNode = await getVideoNode(videoNodeId);
  console.log('VideoNode', videoNode);
  if (!videoNode) {
    console.log('VideoNode does not exist.');
    throw new Error('VideoNodeDoesNotExist');
  }
  if (videoNode.status !== 'PUBLISHED') {
    console.log('VideoNode is not published, cannot unpublish it.');
    throw new Error('CannotUnublishNonPublishedVideoNodes');
  }

  const collection = await getCollectionBySlug(collectionSlug);
  console.log(`Collection with slug ${collectionSlug}`, collection);
  if (!collection) {
    console.log('Collection does not exist.');
    throw new Error('CollectionDoesNotExist');
  }

  await createCollectionVideoNode({
    status: 'SUBMITTED',
    collectionVideoNodeVideoNodeId: videoNodeId,
    collectionVideoNodeCollectionId: collection.id,
    categoryId: collectionCategoryId,
    owner: claims.sub,
  });
  console.log('CollectionVideoNode created');
  await sendEmailToUser(
    'submit',
    claims,
    { videoNode, collection },
    claims.email,
  );
  console.log('Email sent to user');
  await slackVideoNode('published', videoNode);
  console.log('Slack message sent');
};

module.exports = {
  submitToCollection,
};
