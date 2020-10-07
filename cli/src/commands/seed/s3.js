const { Command, flags } = require('@oclif/command');
const fs = require('fs');
const path = require('path');
const AWS = require('claptime-commons/aws');
const { copyDirectory } = require('claptime-commons/s3');
const {
  getBucketConfig,
  getCurrentEnv,
} = require('claptime-commons/dev/amplify');
const FlushS3Command = require('../flush/s3');
const { commonFlags, confirm } = require('../../utils');

const FIXTURES_PATH = '../../../../fixtures/s3';

class S3Command extends Command {
  async getClient() {
    if (!this.client) {
      this.client = new AWS.S3();
    }
    return this.client;
  }

  async seedFromFixtures(folder) {
    this.log(`Importing file from ${folder} into S3. Please wait.`);
    const client = await this.getClient();
    const dirents = fs.readdirSync(
      path.join(__dirname, FIXTURES_PATH, folder),
      {
        withFileTypes: true,
      },
    );

    const fileTasks = dirents
      .filter((dirent) => !dirent.isDirectory())
      .map(async ({ name }) => {
        try {
          const filePath = path.join(__dirname, FIXTURES_PATH, folder, name);
          const data = fs.readFileSync(filePath);
          const s3Path = folder ? `${folder}/${name}` : name;
          await client
            .upload({
              Bucket: getBucketConfig().name,
              Key: s3Path,
              Body: Buffer.from(data, 'binary'),
            })
            .promise();
          this.log(`file uploaded: ${filePath} -> ${s3Path}`);
        } catch (e) {
          this.error(`error while adding file ${name}: ${e}`);
        }
      });

    const folderTasks = dirents
      .filter((dirent) => dirent.isDirectory())
      .map(({ name }) =>
        this.seedFromFixtures(path.join(folder, name)).catch(this.error),
      );

    return Promise.all([...(fileTasks || []), ...(folderTasks || [])]);
  }

  async run() {
    const { flags: currentFlags } = this.parse(S3Command);
    if (!(await confirm(currentFlags, true))) return;
    if (flags.flush) {
      await FlushS3Command.run(['--yes']);
    }
    if (currentFlags.from) {
      const env = getCurrentEnv();
      await copyDirectory(
        getBucketConfig().name.replace(env, currentFlags.from),
        'public',
        getBucketConfig().name,
        'public',
      );
      this.log(`s3 bucket: copied from ${currentFlags.from}`);
    } else {
      await this.seedFromFixtures('');
    }
  }
}

S3Command.description = `Seed s3

Seed (and optionnally flush) s3 bucket.
`;

S3Command.flags = {
  flush: flags.boolean({
    char: 'f',
    description: 'Flush bucket before inserting items',
  }),
  from: flags.string({
    description: 'Seed data from an existing env instead of fixtures',
  }),
  yes: commonFlags.yes,
};

module.exports = S3Command;
