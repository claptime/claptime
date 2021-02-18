const AWS = require('claptime-commons/aws');

const { updateVideoNode } = require('./models');

const ecs = new AWS.ECS();
const ec2 = new AWS.EC2();

module.exports = async (username, videoNodeId, videoLink) => {
  const { Subnets } = await ec2
    .describeSubnets({
      Filters: [
        {
          Name: 'default-for-az',
          Values: ['true'],
        },
      ],
    })
    .promise();
  const data = await ecs
    .runTask({
      taskDefinition: `claptime-videos-${process.env.STAGE}`,
      cluster: process.env.FARGATE_CLUSTER_ARN,
      launchType: 'FARGATE',
      networkConfiguration: {
        awsvpcConfiguration: {
          assignPublicIp: 'ENABLED',
          subnets: Subnets.map((subnet) => subnet.SubnetId),
        },
      },
      overrides: {
        containerOverrides: [
          {
            name: `claptime-videos-${process.env.STAGE}`,
            command: [
              'node',
              'importer.js',
              '--username',
              username,
              '--video-node-id',
              videoNodeId,
              '--video-link',
              videoLink,
            ],
          },
        ],
      },
    })
    .promise();
  console.log(JSON.stringify(data, null, 2));

  await updateVideoNode({
    id: videoNodeId,
    status: 'IMPORT',
  });
  console.log('status set to IMPORT');
};
