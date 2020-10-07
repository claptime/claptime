const { Command, flags } = require('@oclif/command');
const { copyObject } = require('claptime-commons/s3');
const dynamodb = require('claptime-commons/dynamodb');
const { pLimit } = require('claptime-commons/promise');
const {
  getApiConfig,
  getBucketConfig,
  getCurrentEnv,
} = require('claptime-commons/dev/amplify');
const { commonFlags, confirm } = require('../utils');

class RegenerateThumbnailsCommand extends Command {
  async regenerateThumbnails(object, s3Path) {
    this.log(`Generating thumbnails for ${object}, s3Path=${s3Path}`);
    const env = getCurrentEnv();
    const { id: apiId } = getApiConfig();
    const bucketName = getBucketConfig().name;
    const items = await dynamodb.getAllItems(`${object}-${apiId}-${env}`);
    this.log(`${items.length} items to process`);
    const limit = pLimit(5);
    const datetime = new Date()
      .toISOString()
      .replace(/-|:|T/g, '')
      .substring(0, 12);
    await items.map(({ id }) =>
      limit(async () => {
        try {
          await copyObject(
            bucketName,
            `public/${s3Path}/${id}/original.jpg`,
            bucketName,
            `protected/script/${s3Path}/${id}/${datetime}.jpg`,
          );
          this.log(`${id}: done.`);
        } catch (err) {
          if (err.code === 'NoSuchKey') {
            this.log(`${id}: no cover`);
          } else {
            this.log(id, err);
          }
        }
      }),
    );
  }

  async run() {
    const { flags: currentFlags } = this.parse(RegenerateThumbnailsCommand);
    if (!(await confirm(currentFlags))) return;
    switch (currentFlags.type) {
      case 'videos':
        await this.regenerateThumbnails('Video', 'videos');
        break;
      case 'profiles':
        await this.regenerateThumbnails('Profile', 'profiles');
        break;
      case 'collections':
        await this.regenerateThumbnails('Collection', 'collections');
        break;
      default:
        throw new Error(
          '--type should either be videos, profiles or collections',
        );
    }
  }
}

RegenerateThumbnailsCommand.description = `Regenerate thumbnails by reprocessing the original.jpg file.
Works for Video, Profile and Collection.
`;

RegenerateThumbnailsCommand.flags = {
  yes: commonFlags.yes,
  type: flags.string({
    char: 't',
    description: 'One of videos, profiles and collections',
  }),
};

module.exports = RegenerateThumbnailsCommand;
