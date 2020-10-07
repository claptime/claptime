const path = require('path');
const { exec } = require('child_process');
const { Command, flags } = require('@oclif/command');
const { getAwsConfig, getCurrentEnv } = require('claptime-commons/dev/amplify');
const { commonFlags, confirm } = require('../../utils');

const SERVICES_PATH = path.join(__dirname, '../../../../services');

class SingleCommand extends Command {
  async run() {
    const { flags: currentFlags } = this.parse(SingleCommand);
    if (!(await confirm(currentFlags))) return;
    const { region } = await getAwsConfig();
    const env = getCurrentEnv();

    await new Promise((resolve, reject) => {
      const servicePath = path.join(SERVICES_PATH, currentFlags.service);
      const command = `cd ${servicePath} && npm i && npx serverless deploy --stage ${env} --region ${region}`;
      console.log(command);
      const child = exec(command);
      child.stdout.setEncoding('utf8');
      child.stdout.on('data', (chunk) => process.stdout.write(chunk));
      child.stderr.setEncoding('utf8');
      child.stderr.on('data', (chunk) => process.stderr.write(chunk));
      child.on('close', (code) => {
        if (code) {
          reject(code);
        } else {
          resolve();
        }
      });
    });
  }
}

SingleCommand.description = `Deploy images service.`;

SingleCommand.flags = {
  yes: commonFlags.yes,
  service: flags.string({
    char: 's',
    description: 'The service name',
  }),
};

module.exports = SingleCommand;
