const Stripe = require('stripe');
const {
  graphql: { formatError, formatSuccess },
} = require('claptime-commons/api-responses');
const { getParam } = require('claptime-commons/ssm');
const { getByProfileId, deleteByProfileId } = require('../../dynamodb');

module.exports = async (ctx) => {
  const {
    arguments: { profileId },
  } = ctx;
  console.log(`Revoking access for profile ${profileId}`);
  const stripeClientId = await getParam('stripe-client-id');
  const stripeSecretKey = await getParam('stripe-secret-key', true);
  const stripe = Stripe(stripeSecretKey);
  console.log('Fetching stripe user id from DynamoDB...');
  const Item = await getByProfileId(profileId);
  if (!Item) {
    return formatError('NoCredentials');
  }
  const {
    credentials: { stripe_user_id: stripeUserId },
  } = Item;
  console.log(`Stripe user id = ${stripeUserId}. Now deauthorizing...`);
  try {
    await stripe.oauth.deauthorize({
      client_id: stripeClientId,
      stripe_user_id: stripeUserId,
    });
  } catch (err) {
    if (err.rawType !== 'invalid_client') {
      throw err;
    }
    console.warn('invalid_client detected', err);
  }
  console.log('Deauthorized. Now deleting item in DynamoDB...');
  await deleteByProfileId(profileId);
  console.log('Done');
  return formatSuccess({});
};
