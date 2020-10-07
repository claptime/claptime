const { Command } = require('@oclif/command');
const AWS = require('claptime-commons/aws');
const {
  getCloudFrontConfig,
  getCurrentEnv,
} = require('claptime-commons/dev/amplify');
const { commonFlags, confirm } = require('../utils');

class SetupEnvCommand extends Command {
  async createRecordSets() {
    const env = getCurrentEnv();
    const route53 = new AWS.Route53();
    const {
      HostedZones: [{ Id: dnsHostedZoneId }],
    } = await route53
      .listHostedZonesByName({
        DNSName: 'clap-time.com.',
        MaxItems: '1',
      })
      .promise();
    const { domainName, hostedZoneId } = await getCloudFrontConfig();
    const cdnDomainName = `cdn-${env}.clap-time.com`;
    this.log(`Adding record sets ${cdnDomainName} -> ${domainName}`);
    await route53
      .changeResourceRecordSets({
        ChangeBatch: {
          Changes: [
            {
              Action: 'UPSERT',
              ResourceRecordSet: {
                Name: cdnDomainName,
                AliasTarget: {
                  DNSName: domainName,
                  EvaluateTargetHealth: false,
                  HostedZoneId: hostedZoneId,
                },
                Type: 'A', // IPv4
              },
            },
            {
              Action: 'UPSERT',
              ResourceRecordSet: {
                Name: cdnDomainName,
                AliasTarget: {
                  DNSName: domainName,
                  EvaluateTargetHealth: false,
                  HostedZoneId: hostedZoneId,
                },
                Type: 'AAAA', // IPv6
              },
            },
          ],
        },
        HostedZoneId: dnsHostedZoneId,
      })
      .promise();
  }

  async run() {
    const { flags } = this.parse(SetupEnvCommand);
    if (!(await confirm(flags))) return;
    await this.createRecordSets();
  }
}

SetupEnvCommand.description = `Setup Claptime environment
- Create Route 53 record sets
`;

SetupEnvCommand.flags = {
  yes: commonFlags.yes,
};

module.exports = SetupEnvCommand;
