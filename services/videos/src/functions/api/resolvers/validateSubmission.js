const { getCognitoUserById } = require('claptime-commons/cognito');
const {
  getCollection,
  getCollectionVideoNode,
} = require('../../../lib/models');
const { validateSubmission } = require('../../../lib/helpers');

module.exports = async (event) => {
  const {
    arguments: { collectionVideoNodeId, status, rejectionReason },
    identity: { username, groups },
  } = event;

  let collectionVideoNode = await getCollectionVideoNode(collectionVideoNodeId);
  console.log('CollectionVideoNode', collectionVideoNode);
  const collection = await getCollection(
    collectionVideoNode.collectionVideoNodeCollectionId,
  );
  console.log('Collection', collection);

  // TODO this could be implemented in claptime-commons/appsync.js:checkOwnership
  // But this would require to:
  // - first query the CollectionVideoNode to retrieve the collectionVideoNodeCollectionId
  // - and then query the Collection to check the owner field.
  if (collection.owner !== username && !(groups && groups.includes('admin'))) {
    console.log(`owner = ${collection.owner}, username = ${username}`);
    throw new Error('User is not the Collection owner, mutation forbidden');
  }

  if (!['APPROVED', 'REJECTED'].includes(status)) {
    console.log(`status = ${status}`);
    throw new Error(
      'CollectionVideoNode can only be approved or rejected, invalid status',
    );
  }

  // Retrieve submitter identity
  const { UserAttributes } = await getCognitoUserById(
    process.env.COGNITO_USERPOOL_ID,
    collectionVideoNode.owner,
  );

  collectionVideoNode = await validateSubmission(
    collectionVideoNode,
    status,
    rejectionReason,
    {
      email: UserAttributes.find(({ Name }) => Name === 'email').Value,
      given_name: UserAttributes.find(({ Name }) => Name === 'given_name')
        .Value,
    },
  );

  return collectionVideoNode;
};
