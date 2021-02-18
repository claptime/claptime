const {
  graphql: { formatSuccess },
} = require('claptime-commons/api-responses');
const { appSyncClient, gql } = require('claptime-commons/appsync');
const { sendEmailToUser } = require('claptime-commons/emails');
const { getCognitoUserById } = require('claptime-commons/cognito');
const { emailTemplates } = require('../lib/consts');

const { getUserSettings } = require('../lib/models');

const createNotification = async (userId, type, payload) => {
  console.log(`Create WEB notification for user ${userId}`);
  console.log(`Type : ${type}`);
  console.log(`Payload : ${JSON.stringify(payload)}`);
  await appSyncClient.mutate({
    mutation: gql(`mutation CreateNotification($input: CreateNotificationInput!) {
      createNotification(input: $input) {
        id
        owner
        type
        payload
        isRead
      }
    }`),
    variables: {
      input: {
        owner: userId,
        type,
        payload: JSON.stringify(payload),
        isRead: false,
      },
    },
  });
};

const sendEmailIfEmailNotificationsEnabled = async (userId, type, payload) => {
  console.log(`Check settings for user ${userId}`);
  const settings = await getUserSettings(userId);
  console.log(`Current notification preferences for ${userId}:`, settings);
  if (
    settings.findIndex(
      (item) =>
        item.type === 'EMAIL_NOTIFICATION' && item.frequency === 'ALWAYS',
    )
  ) {
    // find user info
    const { UserAttributes } = await getCognitoUserById(
      process.env.COGNITO_USERPOOL_ID,
      userId,
    );
    const email = UserAttributes.find(({ Name }) => Name === 'email').Value;
    const firstName = UserAttributes.find(({ Name }) => Name === 'given_name')
      .Value;

    await sendEmailToUser(
      emailTemplates[type],
      {
        given_name: firstName,
      },
      payload,
      email,
    );
  }
};

module.exports = async ({ arguments: { userId, type, channels, payload } }) => {
  let response;
  if (channels.includes('WEB')) {
    await createNotification(userId, type, payload);
  }
  if (channels.includes('EMAIL')) {
    await sendEmailIfEmailNotificationsEnabled(userId, type, payload);
  }
  return formatSuccess(response);
};
