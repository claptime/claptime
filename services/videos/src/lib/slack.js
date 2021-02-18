const { IncomingWebhook } = require('@slack/webhook');
const { getParam } = require('claptime-commons/ssm');

const getWebhook = async () => {
  const slackWebhookUrl = await getParam('slack-webhook');
  return new IncomingWebhook(slackWebhookUrl);
};

const slackStepFunctionStatus = async (status, input, consoleUrl) => {
  const webhook = await getWebhook();
  return webhook.send({
    icon_emoji: ':x:',
    text: `StepFunction ${status} with input ${input}. <${consoleUrl}|Click here to see details>`,
    username: 'StepFunction notifier',
  });
};

module.exports = {
  slackStepFunctionStatus,
};
