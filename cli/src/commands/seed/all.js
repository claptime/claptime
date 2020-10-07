const { Command, flags } = require('@oclif/command');
const { commonFlags, confirm } = require('../../utils');
const FlushAllCommand = require('../flush/all');
const CognitoCommand = require('./cognito');
const DynamodbCommand = require('./dynamodb');
const S3Command = require('./s3');

class AllCommand extends Command {
  async run() {
    const { flags: currentFlags } = this.parse(AllCommand);
    if (!(await confirm(currentFlags, true))) return;

    // flush
    if (currentFlags.flush) {
      await FlushAllCommand.run(['--yes']);
    }
    const from = [];
    if (currentFlags.from) {
      from.push('--from', currentFlags.from);
    }

    // cognito
    await CognitoCommand.run(['--yes']);

    // dynamodb
    await DynamodbCommand.run(['--yes', ...from]);

    // s3
    await S3Command.run(['--yes', ...from]);
  }
}

AllCommand.description = `Seed all

Seed cognito, dynamodb and s3.
`;

AllCommand.flags = {
  flush: flags.boolean({
    char: 'f',
    description: 'Flush data before inserting items',
  }),
  from: flags.string({
    description: 'Seed data from an existing env instead of fixtures',
  }),
  yes: commonFlags.yes,
};

module.exports = AllCommand;
