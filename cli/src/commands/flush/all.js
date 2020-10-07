const { Command } = require('@oclif/command');
const { commonFlags, confirm } = require('../../utils');
const CognitoCommand = require('./cognito');
const DynamodbCommand = require('./dynamodb');
const S3Command = require('./s3');

class AllCommand extends Command {
  async run() {
    const { flags: currentFlags } = this.parse(AllCommand);
    if (!(await confirm(currentFlags, true))) return;

    // cognito
    await CognitoCommand.run(['--yes']);

    // dynamodb
    await DynamodbCommand.run(['--yes']);

    // s3
    await S3Command.run(['--yes']);
  }
}

AllCommand.description = `Flush all

Flush cognito, dynamodb and s3.
`;

AllCommand.flags = {
  yes: commonFlags.yes,
};

module.exports = AllCommand;
