const { Command } = require('@oclif/command');
const AWS = require('claptime-commons/aws');
const { getBucketConfig } = require('claptime-commons/dev/amplify');
const { commonFlags, confirm } = require('../../utils');

class S3Command extends Command {
  async getClient() {
    if (!this.client) {
      this.client = new AWS.S3();
    }
    return this.client;
  }

  async flush() {
    const bucketName = getBucketConfig().name;
    this.log(`Flushing ${bucketName} bucket`);
    const client = await this.getClient();
    let items;
    do {
      ({ Contents: items } = await client
        .listObjects({
          Bucket: bucketName,
        })
        .promise());
      await Promise.all(
        items.map(item => {
          this.log(`Deleting ${item.Key}`);
          return client
            .deleteObject({
              Bucket: bucketName,
              Key: item.Key,
            })
            .promise();
        }),
      );
    } while (items.length);
  }

  async run() {
    const { flags: currentFlags } = this.parse(S3Command);
    if (!(await confirm(currentFlags, true))) return;
    await this.flush();
  }
}

S3Command.description = `Flush s3

Flush s3 bucket.
`;

S3Command.flags = {
  yes: commonFlags.yes,
};

module.exports = S3Command;
