const { slackStepFunctionStatus } = require('../../lib/slack');

module.exports.handler = async (event) => {
  console.log('event', JSON.stringify(event, null, 2));

  const {
    detail: { input, status },
    region,
    resources: [resource],
  } = event;

  const consoleUrl = `https://${region}.console.aws.amazon.com/states/home?region=${region}#/executions/details/${resource}`;

  await slackStepFunctionStatus(status, input, consoleUrl);

  console.log('Slack message sent');
};
