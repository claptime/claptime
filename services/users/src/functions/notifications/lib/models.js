const { appSyncClient, gql } = require('claptime-commons/appsync');

const getUserSettings = async (username) => {
  const {
    data: {
      getUserSettings: { notifications },
    },
  } = await appSyncClient.query({
    query: gql(`query GetUserSettings($id: ID!) {
        getUserSettings(id: $id) {
          id
          notifications {
            type
            channel
            frequency
          }
        }
      }`),
    variables: {
      id: username,
    },
  });
  return notifications || [];
};

module.exports = {
  getUserSettings,
};
