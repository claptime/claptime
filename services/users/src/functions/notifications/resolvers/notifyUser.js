const {
  graphql: { formatSuccess },
} = require('claptime-commons/api-responses');
const { appSyncClient, gql } = require('claptime-commons/appsync');

const createNotification = async (userId, type, payload) => {
  console.log(`Create WEB notification for user ${userId}`);
  console.log(`Type : ${type}`);
  console.log(`Payload : ${JSON.stringify(payload)}`);
  await appSyncClient.mutate({
    mutation: gql(`mutation CreateNotification($input: CreateNotificationInput!) {
      createNotification(input: $input) {
        id
      }
    }`),
    variables: {
      input: {
        userId,
        type,
        payload: JSON.stringify(payload),
      },
    },
  });
};

module.exports = async ({ arguments: { userId, type, channels, payload } }) => {
  let response;
  if (channels.includes('WEB')) {
    await createNotification(userId, type, payload);
  }
  return formatSuccess(response);
};
