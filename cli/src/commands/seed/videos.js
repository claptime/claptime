const { Command } = require('@oclif/command');
const fs = require('fs');
const path = require('path');
const AWS = require('claptime-commons/aws');
const {
  getAwsConfig,
  getBucketConfig,
  getCurrentEnv,
} = require('claptime-commons/dev/amplify');
const { commonFlags, confirm } = require('../../utils');

const FIXTURES_PATH = '../../../../fixtures/videos';
const USERS_PATH = path.join(
  __dirname,
  '../../../../fixtures/cognito/users.json',
);

class VideosCommand extends Command {
  async getClient() {
    if (!this.client) {
      this.client = new AWS.S3();
    }
    return this.client;
  }

  async seed(region, userId) {
    this.log(`Uploading videos into S3. Please wait.`);
    const client = await this.getClient();
    const dirents = fs.readdirSync(path.join(__dirname, FIXTURES_PATH), {
      withFileTypes: true,
    });

    const allowedSuffixes = ['.mp4', '.mkv', '.flv', '.mov'];

    const videos = dirents
      .filter(dirent => !dirent.isDirectory())
      .filter(({ name }) =>
        allowedSuffixes.some(suffix => name.endsWith(suffix)),
      );
    for (const video of videos) {
      try {
        const filePath = path.join(__dirname, FIXTURES_PATH, video.name);
        const data = fs.readFileSync(filePath);
        await client
          .upload({
            Bucket: getBucketConfig().name,
            Key: `private/${region}:${userId}/uploads/${video.name}`,
            Body: Buffer.from(data, 'binary'),
          })
          .promise();
        this.log(`file uploaded: ${filePath}`);
      } catch (e) {
        this.error(`error while adding file ${video.name}: ${e}`);
      }
    }
  }

  async run() {
    const { flags: currentFlags } = this.parse(VideosCommand);
    if (!(await confirm(currentFlags, true))) return;
    const { region } = await getAwsConfig();
    const users = JSON.parse(fs.readFileSync(USERS_PATH))[getCurrentEnv()];
    await this.seed(region, users.regular.username);
  }
}

VideosCommand.description = `Seed videos

Seed videos and trigger upload process.
`;

VideosCommand.flags = {
  yes: commonFlags.yes,
};

module.exports = VideosCommand;
