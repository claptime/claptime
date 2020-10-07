const { getHandler } = require('claptime-commons/appsync');
const connectToStripe = require('./resolvers/connectToStripe');
const revokeStripe = require('./resolvers/revokeStripe');
const getStripeAccessToken = require('./resolvers/getStripeAccessToken');

module.exports = getHandler({
  Mutation: {
    connectToStripe: {
      handler: connectToStripe,
      checkOwnership: [
        {
          modelName: 'Profile',
          idArgumentName: 'profileId',
        },
      ],
    },
    revokeStripe: {
      handler: revokeStripe,
      checkOwnership: [
        {
          modelName: 'Profile',
          idArgumentName: 'profileId',
        },
      ],
    },
  },
  Query: {
    getStripeAccessToken: {
      handler: getStripeAccessToken,
      checkOwnership: [
        {
          modelName: 'Profile',
          idArgumentName: 'profileId',
        },
      ],
    },
  },
});
