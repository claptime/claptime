const { sendEmailToUser } = require('claptime-commons/emails');
const { getCognitoUserById } = require('claptime-commons/cognito');
const { updateCollectionVideoNode } = require('./models');

const { collections } = require('./consts');

const {
  createCollectionVideoNode,
  getCollection,
  getCollectionBySlug,
  getVideoNode,
  listUserCollection,
  notifyUser,
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

  const collectionVideoNode = await createCollectionVideoNode({
    status: 'SUBMITTED',
    collectionVideoNodeVideoNodeId: videoNodeId,
    collectionVideoNodeCollectionId: collection.id,
    categoryId: collectionCategoryId,
    owner: claims.sub,
  });
  console.log('CollectionVideoNode created');

  // Find collection owner email
  const { UserAttributes } = await getCognitoUserById(
    process.env.COGNITO_USERPOOL_ID,
    collection.owner,
  );
  const email = UserAttributes.find(({ Name }) => Name === 'email').Value;
  const firstName = UserAttributes.find(({ Name }) => Name === 'given_name')
    .Value;

  const sendToOwner = !(collections.default.slug === collection.slug);
  // Send email to collection owner
  if (sendToOwner) {
    await sendEmailToUser(
      'submit',
      {
        given_name: firstName,
      },
      {
        videoNode,
        collection,
      },
      email,
    );
    console.log('Email sent to collection owner');
  }

  // TODO send notification

  await slackVideoNode('published', videoNode);
  console.log('Slack message sent');
  return collectionVideoNode;
};

const validateSubmission = async (
  collectionVideoNode,
  status,
  rejectionReason,
  claims,
) => {
  const res = await updateCollectionVideoNode({
    id: collectionVideoNode.id,
    status,
    rejectionReason: (status === 'REJECTED' && rejectionReason) || null,
    // If omitted, these field are overriden in the record
    categoryId: collectionVideoNode.categoryId,
    createdAt: collectionVideoNode.createdAt,
    createdBy: collectionVideoNode.createdBy,
  });

  const collection = await getCollection(
    collectionVideoNode.collectionVideoNodeCollectionId,
  );
  const videoNode = await getVideoNode(
    collectionVideoNode.collectionVideoNodeVideoNodeId,
  );

  const approve =
    collections.default.slug === collection.slug ? 'defaultApprove' : 'approve';

  // Send email to author
  await sendEmailToUser(
    status === 'APPROVED' ? approve : 'reject',
    claims,
    {
      videoNode,
      collection,
      rejectionReason,
    },
    claims.email,
  );
  console.log('Email sent to author');

  if (status === 'APPROVED') {
    const subscribingUsers = await listUserCollection({
      userCollectionCollectionId: {
        eq: collection.id,
      },
    });
    console.log('Create notification for subscribing users');
    const channels = ['WEB'];
    const payload = JSON.stringify({
      collection: {
        name: collection.name,
        id: collection.id,
      },
      videoNode: {
        type: videoNode.type,
        title: videoNode.title,
        id: videoNode.id,
      },
    });
    await Promise.all(
      subscribingUsers.map((user) => {
        const { userSettingsCollectionsId: owner } = user;
        return notifyUser(
          owner,
          'VIDEO_NODE_ADDED_TO_COLLECTION_SUBSCRIBERS',
          channels,
          payload,
        );
      }),
    );
  }

  return res;
};

module.exports = {
  submitToCollection,
  validateSubmission,
};
