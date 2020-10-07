const path = require('path');
const { readdirSync } = require('fs');
const { Command } = require('@oclif/command');
const { commonFlags, confirm } = require('../../utils');
const SingleCommand = require('./single');

const SERVICES_PATH = path.join(__dirname, '../../../../services');

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

class AllCommand extends Command {
  async run() {
    const { flags: currentFlags } = this.parse(AllCommand);
    if (!(await confirm(currentFlags))) return;

    for (const service of getDirectories(SERVICES_PATH)) {
      await SingleCommand.run(['--yes', '--service', service]);
    }
  }
}

AllCommand.description = `Deploy all services`;

AllCommand.flags = {
  yes: commonFlags.yes,
};

module.exports = AllCommand;
