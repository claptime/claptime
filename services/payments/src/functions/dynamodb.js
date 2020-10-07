const AWS = require('claptime-commons/aws');

const { TABLE_NAME } = process.env;

const dynamoDoc = new AWS.DynamoDB.DocumentClient();

const deleteByProfileId = (profileId) =>
  dynamoDoc
    .delete({
      TableName: TABLE_NAME,
      Key: {
        profileId,
      },
    })
    .promise();

const deleteByStripeId = async (stripeUserId) => {
  const items = [];
  let nextToken;
  do {
    const { Items, LastEvaluatedKey } = await dynamoDoc
      .scan({
        TableName: TABLE_NAME,
        FilterExpression: 'credentials.stripe_user_id = :stripeUserId',
        ExpressionAttributeValues: {
          ':stripeUserId': stripeUserId,
        },
        ExclusiveStartKey: nextToken,
      })
      .promise();
    nextToken = LastEvaluatedKey;
    items.push(...Items);
  } while (nextToken);
  await Promise.all(items.map(({ profileId }) => deleteByProfileId(profileId)));
};

const getByProfileId = (profileId) =>
  dynamoDoc
    .get({
      TableName: TABLE_NAME,
      Key: {
        profileId,
      },
    })
    .promise()
    .then(({ Item }) => Item);

const put = (profileId, credentials, authorizationCode) =>
  dynamoDoc
    .put({
      TableName: TABLE_NAME,
      Item: {
        profileId,
        credentials,
        authorizationCode,
      },
    })
    .promise();

module.exports = {
  deleteByProfileId,
  deleteByStripeId,
  getByProfileId,
  put,
};
