const { IncomingWebhook } = require('@slack/webhook');
const { getDomain } = require('claptime-commons/env');
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

const slackVideoNode = async (action, videoNode) => {
  const webhook = await getWebhook();
  const { id: videoNodeId, type, title } = videoNode;
  const routeItem = {
    SERIES: 'series',
    FILM: 'video',
  };
  const domain = getDomain();
  return webhook.send({
    icon_emoji: ':face_with_monocle:',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*${title}* ${action} <${domain}/${routeItem[type]}/${videoNodeId}|*View more*>`,
        },
      },
    ],
    username: 'Big Brother',
    channel: '#creators-updates',
  });
};

module.exports = {
  slackStepFunctionStatus,
  slackVideoNode,
};
