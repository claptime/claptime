const {
  graphql: { formatSuccess },
} = require('claptime-commons/api-responses');
const { getParam } = require('claptime-commons/ssm');
const { appSyncClient, gql } = require('claptime-commons/appsync');
const { updateMailchimp } = require('../lib/mailchimp');

const getNotificationPreferences = async (username) => {
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

const updateNotificationPreferences = async (username, preferences) => {
  await appSyncClient.mutate({
    mutation: gql(`mutation UpdateUserSettings($input: UpdateUserSettingsInput!) {
      updateUserSettings(input: $input) {
        id
      }
    }`),
    variables: {
      input: {
        id: username,
        notifications: preferences,
      },
    },
  });
};

const updateNotificationPreference = async (
  identity,
  type,
  channel,
  frequency,
) => {
  const currentPreferences = await getNotificationPreferences(
    identity.username,
  );
  console.log(
    `Current notification preferences for ${identity.username}:`,
    currentPreferences,
  );

  const updatedPreferences = currentPreferences.map((item) => ({
    type: item.type,
    channel: item.channel,
    frequency:
      item.type === type && item.channel === channel
        ? frequency
        : item.frequency,
  }));
  if (
    updatedPreferences.findIndex(
      (item) => item.type === type && item.channel === channel,
    ) === -1
  ) {
    updatedPreferences.push({
      type,
      channel,
      frequency,
    });
  }

  await updateNotificationPreferences(identity.username, updatedPreferences);
  console.log(
    `Updated notification preferences for ${identity.username}:`,
    updatedPreferences,
  );
};

const handleEmail = async (identity, type, frequency) => {
  switch (type) {
    case 'NEWSLETTER':
      return updateMailchimp(
        await getParam('mailchimp-audience-id', false),
        identity,
        frequency === 'ALWAYS',
      );
    default:
      throw new Error(`UnhandledNotificationType ${type}`);
  }
};

module.exports = async ({
  arguments: { type, channel, frequency },
  identity,
}) => {
  let response;
  switch (channel) {
    case 'EMAIL':
      response = await handleEmail(identity, type, frequency);
      break;
    default:
      throw new Error(`UnhandledNotificationChannel ${channel}`);
  }

  await updateNotificationPreference(identity, type, channel, frequency);

  return formatSuccess(response);
};
