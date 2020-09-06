const { getHandler } = require('claptime-commons/appsync');

const setNotificationPreference = require('./resolvers/setNotificationPreference');
const notifyUser = require('./resolvers/notifyUser');

module.exports.handler = getHandler({
  Mutation: {
    setNotificationPreference: {
      handler: setNotificationPreference,
    },
    notifyUser: {
      handler: notifyUser,
    },
  },
});
