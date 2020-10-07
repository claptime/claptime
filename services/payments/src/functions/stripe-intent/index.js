const { getHandler } = require('claptime-commons/appsync');

const createPaymentIntent = require('./resolvers/createPaymentIntent');
const acceptsPayments = require('./resolvers/acceptsPayments');

module.exports.handler = getHandler({
  Mutation: {
    createPaymentIntent: {
      handler: createPaymentIntent,
    },
  },
  Query: {
    acceptsPayments: {
      handler: acceptsPayments,
    },
  },
});
