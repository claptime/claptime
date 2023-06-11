const { Command, flags } = require('@oclif/command');
const fs = require('fs');
const path = require('path');
const AWS = require('claptime-commons/aws');
const {
  getCognitoPoolConfig,
  getCurrentEnv,
} = require('claptime-commons/dev/amplify');
const { attachUserToGroup, commonFlags, confirm } = require('../../utils');
const FlushCognitoCommand = require('../flush/cognito');

const USERS_PATH = path.join(
  __dirname,
  '../../../../fixtures/cognito/users.json',
);

class CognitoCommand extends Command {
  getClient() {
    if (!this.client) {
      this.client = new AWS.CognitoIdentityServiceProvider({
        region: getCognitoPoolConfig().region,
      });
    }
    return this.client;
  }

  async createUser(user) {
    const { email, firstName, lastName, birthDate, password } = user;
    let Username;
    const client = this.getClient();
    const { id: poolId } = getCognitoPoolConfig();
    try {
      // Create user
      ({
        User: { Username },
      } = await client
        .adminCreateUser({
          UserPoolId: poolId,
          Username: email,
          DesiredDeliveryMediums: ['EMAIL'],
          ForceAliasCreation: true,
          TemporaryPassword: password,
          UserAttributes: [
            {
              Name: 'email_verified',
              Value: 'true',
            },
            {
              Name: 'email',
              Value: email,
            },
            {
              Name: 'given_name',
              Value: firstName,
            },
            {
              Name: 'family_name',
              Value: lastName,
            },
            {
              Name: 'birthdate',
              Value: birthDate,
            },
          ],
        })
        .promise());

      // Change password
      await client
        .adminSetUserPassword({
          Password: password,
          UserPoolId: poolId,
          Username,
          Permanent: true,
        })
        .promise();

      this.log(`User ${email} created: ${Username}`);
      return {
        ...user,
        username: Username,
      };
    } catch (err) {
      if (err.code !== 'UsernameExistsException') {
        throw err;
      }
      this.log(`User ${email} already exists`);
      return null;
    }
  }

  async createUsers() {
    const env = getCurrentEnv();
    const users = JSON.parse(fs.readFileSync(USERS_PATH));
    const { id: userPoolId, region: userPoolRegion } = getCognitoPoolConfig();
    const admin = await this.createUser({
      email: 'contact.claptime+user-admin@gmail.com',
      password: 'Crackers#18032019',
      firstName: 'Admin',
      lastName: 'Claptime',
      birthDate: '2019-03-18',
    });
    let updated = false;
    users[env] = users[env] || {};
    if (admin) {
      await attachUserToGroup(
        userPoolId,
        userPoolRegion,
        admin.username,
        'admin',
      );
      users[env].admin = admin;
      updated = true;
    }
    const regular = await this.createUser({
      email: 'contact.claptime+user-regular@gmail.com',
      password: 'Crackers#18032019',
      firstName: 'Regular',
      lastName: 'Claptime',
      birthDate: '2019-03-18',
    });
    if (regular) {
      users[env].regular = regular;
      updated = true;
    }
    if (updated) {
      fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2));
      this.log(`${USERS_PATH} updated, this should be committed.`);
    }
  }

  async run() {
    const { flags: currentFlags } = this.parse(CognitoCommand);
    if (!(await confirm(currentFlags, true))) return;
    if (currentFlags.flush) {
      await FlushCognitoCommand.run(['--yes']);
    }
    await this.createUsers();
  }
}

CognitoCommand.description = `Seed cognito

Create two users: admin and regular.
`;

CognitoCommand.flags = {
  flush: flags.boolean({
    char: 'f',
    description: 'Flush users before creating new ones',
  }),
  yes: commonFlags.yes,
};

module.exports = CognitoCommand;
