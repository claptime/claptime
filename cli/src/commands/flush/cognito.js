const { Command } = require('@oclif/command');
const AWS = require('claptime-commons/aws');
const { getCognitoPoolConfig } = require('claptime-commons/dev/amplify');
const { commonFlags, confirm } = require('../../utils');

class CognitoCommand extends Command {
  getClient() {
    if (!this.client) {
      this.client = new AWS.CognitoIdentityServiceProvider({
        region: getCognitoPoolConfig().region,
      });
    }
    return this.client;
  }

  async flush() {
    const { id } = getCognitoPoolConfig();
    const client = this.getClient();

    const users = [];
    let paginationToken;
    do {
      const { Users, PaginationToken } = await client
        .listUsers({
          UserPoolId: id,
          PaginationToken: paginationToken,
        })
        .promise();
      users.push(...Users);
      paginationToken = PaginationToken;
    } while (paginationToken);
    await Promise.all(
      users.map(({ Username }) =>
        client
          .adminDeleteUser({
            UserPoolId: id,
            Username,
          })
          .promise(),
      ),
    );
    console.log(`${users.length} users deleted`);
  }

  async run() {
    const { flags: currentFlags } = this.parse(CognitoCommand);
    if (!(await confirm(currentFlags, true))) return;
    await this.flush();
  }
}

CognitoCommand.description = `Flush cognito

Flush cognito users.
`;

CognitoCommand.flags = {
  yes: commonFlags.yes,
};

module.exports = CognitoCommand;
