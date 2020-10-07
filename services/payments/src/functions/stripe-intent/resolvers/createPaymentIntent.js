const Stripe = require('stripe');
const {
  graphql: { formatError, formatSuccess },
} = require('claptime-commons/api-responses');
const { appSyncClient, gql } = require('claptime-commons/appsync');
const { getParam } = require('claptime-commons/ssm');
const { getByProfileId } = require('../../dynamodb');

const MIN_CLAP_AMOUNT = 1.0;
const DEFAULT_CLAP_AMOUNT = 2.0;
const APP_FEE_PERCENTAGE = 0.25;
const STRIPE_PERCENTAGE = 0.029; // Frais Stripe = 2.9% + 25c
const STRIPE_FIXED = 0.25; // Frais Stripe = 2.9% + 25c

const getUserSettings = `query GetUserSettings($id: ID!) {
  getUserSettings(id: $id) {
    id
    clapValue
  }
}
`;

/**
 * Returns by priority:
 * 1. Value if passed in arguments
 * 2. Value from user settings
 * 3. Default value
 * @param   {Number} value
 * @param   {String} username
 * @returns {Number}
 */
const getUserClapAmount = async (value, username) => {
  if (typeof value === 'number') {
    return value;
  }
  const {
    data: {
      getUserSettings: { clapValue },
    },
  } = await appSyncClient.query({
    query: gql(getUserSettings),
    variables: {
      id: username,
    },
  });
  return clapValue || DEFAULT_CLAP_AMOUNT;
};

const computeStripeFees = (amount, percentage, fixed) => {
  return amount * percentage + fixed;
};

module.exports = async (event) => {
  const {
    arguments: { profileId, videoNodeId, value },
    identity: { username = null, claims: { email = null } = {} },
  } = event;
  const [
    stripeSecretKey,
    {
      credentials: { stripe_user_id: destinationAccountId },
    },
  ] = await Promise.all([
    getParam('stripe-secret-key', true),
    getByProfileId(profileId),
  ]);
  const amount = await getUserClapAmount(value, username);
  if (amount < MIN_CLAP_AMOUNT) {
    return formatError(
      `Amount of ${amount} is less than the minimum amount of ${MIN_CLAP_AMOUNT}`,
    );
  }
  const stripe = Stripe(stripeSecretKey);
  // https://stripe.com/docs/api/payment_intents/create
  /* Stripe Connect prélève les frais Stripe sur la part perçu par claptime
   * Ceux-ci doivent être inclus dans la quantité qui revient à Claptime (application_fee_amount)
   *
   * La part de Claptime doit être calculée ainsi :
   *       Part_Claptime = Frais_Stripe + Pourcentage_Claptime * ( Total - Frais_Stripe )
   *
   * Dans notre cas, avec 25% pour Claptime :
   *       Part_Claptime = 0.25 * Total + 0.75 * Frais_Stripe
   *
   * Exemple : l'utilisateur veut donner 2€ au réal, il paie 2.32€ (0.32€ de frais Stripe)
   *       Part_Claptime = 0.25 * 2.32 + 0.75 * 0.32 = 0.58 + 0.24 = 0.82€
   *
   */
  const fees = computeStripeFees(amount, STRIPE_PERCENTAGE, STRIPE_FIXED);
  const claptimePart =
    APP_FEE_PERCENTAGE * amount + (1 - APP_FEE_PERCENTAGE) * fees;

  const payload = {
    amount: Math.round(amount * 100), // value is in cents
    currency: 'eur',
    application_fee_amount: Math.round(claptimePart * 100),
    on_behalf_of: destinationAccountId,
    transfer_data: {
      destination: destinationAccountId,
    },
    metadata: {
      userId: username,
      videoNodeId,
    },
  };

  if (email !== null) {
    payload.receipt_email = email;
  }
  console.log('Sending payload:', payload);
  const paymentIntent = await stripe.paymentIntents.create(payload);
  console.log('Payment intent response:', paymentIntent);
  return formatSuccess({ clientSecret: paymentIntent.client_secret });
};
