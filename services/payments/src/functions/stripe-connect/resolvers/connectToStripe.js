const Stripe = require('stripe');
const {
  graphql: { formatError, formatSuccess },
} = require('claptime-commons/api-responses');
const { getParam } = require('claptime-commons/ssm');
const { put } = require('../../dynamodb');

module.exports = async (ctx) => {
  const {
    arguments: { profileId, authorizationCode },
  } = ctx;
  console.log(
    `Connecting profile ${profileId} with authorization code ${authorizationCode}`,
  );
  const stripeSecretKey = await getParam('stripe-secret-key', true);
  const stripe = Stripe(stripeSecretKey);
  try {
    const credentials = await stripe.oauth.token({
      grant_type: 'authorization_code',
      code: authorizationCode,
    });
    await put(profileId, credentials, authorizationCode);
    return formatSuccess({});
  } catch (err) {
    console.error(err);
    if (
      err.rawType === 'invalid_grant' &&
      err.message === 'Authorization code expired'
    ) {
      return formatError('AuthorizationCodeExpired');
    }
    throw err;
  }
};
