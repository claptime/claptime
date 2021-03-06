const { pLimit } = require('claptime-commons/promise');

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
  listUserProfile,
  notifyUser,
} = require('./models');

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

  return collectionVideoNode;
};

const notifyUsers = async (usersList, type, channels, payload) => {
  console.log(`-> Send notification to ${usersList.length} users.`);
  const limit = pLimit(10);

  await Promise.all(
    usersList.map((user) =>
      limit(() => notifyUser(user, type, channels, payload)),
    ),
  );
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
    console.log(
      `Create notification for users who subscribe to collection ${collection.name} (id : ${collection.id}`,
    );
    const channels = ['WEB', 'EMAIL'];
    const payload = JSON.stringify({
      collection: {
        name: collection.name,
        id: collection.id,
        slug: collection.slug,
      },
      videoNode: {
        type: videoNode.type,
        title: videoNode.title,
        id: videoNode.id,
      },
    });

    await notifyUsers(
      subscribingUsers.map((user) => user.userSettingsCollectionsId),
      'VIDEO_NODE_ADDED_TO_COLLECTION_SUBSCRIBERS',
      channels,
      payload,
    );
  }

  return res;
};

// notify users who are following the filmmakers in params
const notifySubscribingUsers = async (videoNode, profile) => {
  console.log(`List users who follow ${profile.name} (id : ${profile.id})`);
  const subscribingUsers = await listUserProfile({
    userProfileProfileId: {
      eq: profile.id,
    },
  });
  console.log(
    `Create notification for users who follow ${profile.name} (profileId : ${profile.id})`,
  );
  const channels = ['WEB', 'EMAIL'];
  const payload = JSON.stringify({
    profile,
    videoNode: {
      title: videoNode.title,
      id: videoNode.id,
      type: videoNode.type
    },
  });
  await notifyUsers(
    subscribingUsers.map((user) => user.userSettingsProfilesId),
    'VIDEO_NODE_ADDED_BY_FILMMAKER',
    channels,
    payload,
  );
};

module.exports = {
  submitToCollection,
  validateSubmission,
  notifySubscribingUsers,
};
