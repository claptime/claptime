const { getHandler } = require('claptime-commons/appsync');

const setNotificationPreference = require('./resolvers/setNotificationPreference');

module.exports.handler = getHandler({
  Mutation: {
    setNotificationPreference: {
      handler: setNotificationPreference,
    },
  },
});
