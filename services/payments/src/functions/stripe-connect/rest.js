const {
  rest: { formatError, formatSuccess },
} = require('claptime-commons/api-responses');
const { deleteByStripeId } = require('../dynamodb');

// Webhook
const handleRest = async ({ body }) => {
  let event;
  try {
    event = JSON.parse(body);
  } catch (err) {
    return formatError(400, { error: 'UnparsableBody' });
  }
  console.log(event);
  switch (event.type) {
    case 'account.application.deauthorized': {
      try {
        await deleteByStripeId(event.account);
      } catch (err) {
        console.error(err);
      }
      break;
    }
    default:
      return formatError(400, { error: 'UnhandledEventType' });
  }

  return formatSuccess({
    received: true,
  });
};

module.exports = handleRest;
