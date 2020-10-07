const { Command } = require('@oclif/command');
const s3 = require('claptime-commons/s3');
const dynamodb = require('claptime-commons/dynamodb');
const {
  getApiConfig,
  getBucketConfig,
  getCurrentEnv,
} = require('claptime-commons/dev/amplify');
const { commonFlags, confirm } = require('../../utils');

class PersonToProfileCommand extends Command {
  static async mvS3() {
    const bucketName = getBucketConfig().name;
    const from = 'public/persons';
    const to = 'public/profiles';
    await s3.moveDirectory(bucketName, from, to);
    console.log(`[S3][${bucketName}] files moved from ${from} to ${to}`);
  }

  static async dumpDynamoDbTable(fromTable, toTable, getNewItem) {
    const items = await dynamodb.getAllItems(fromTable);
    await dynamodb.putItems(toTable, items.map(getNewItem));
    console.log(`[DynamoDB][${fromTable}] Data dumped into  ${toTable} table`);
  }

  static async renameDynamoDbField(table, fromField, toField) {
    await PersonToProfileCommand.dumpDynamoDbTable(table, table, (item) => {
      /* eslint-disable no-param-reassign */
      item[toField] = item[fromField];
      delete item[fromField];
      return item;
    });
    console.log(
      `[DynamoDB][${table}] field ${fromField} renamed to ${toField}`,
    );
  }

  static async copyDynamoDb() {
    const { id: apiId } = getApiConfig();
    const env = getCurrentEnv();
    await PersonToProfileCommand.dumpDynamoDbTable(
      `Person-${apiId}-${env}`,
      `Profile-${apiId}-${env}`,
      (item) => {
        /* eslint-disable no-param-reassign */
        item.name = `${item.firstName} ${item.lastName}`;
        item.profileCollectionId = item.personCollectionId;
        item.__typename = 'Profile'; // eslint-disable-line no-underscore-dangle
        delete item.personCollectionId;
        delete item.firstName;
        delete item.lastName;
        return item;
      },
    );
    await PersonToProfileCommand.renameDynamoDbField(
      `Credit-${apiId}-${env}`,
      'creditPersonId',
      'creditProfileId',
    );
    await PersonToProfileCommand.renameDynamoDbField(
      `Credit-${apiId}-${env}`,
      'customPerson',
      'customProfile',
    );
    await PersonToProfileCommand.renameDynamoDbField(
      `Video-${apiId}-${env}`,
      'videoPersonId',
      'videoProfileId',
    );
    await PersonToProfileCommand.renameDynamoDbField(
      `UserSettings-${apiId}-${env}`,
      'collectionId',
      'personId',
    );
  }

  async run() {
    const { flags } = this.parse(PersonToProfileCommand);
    if (!(await confirm(flags))) return;
    await PersonToProfileCommand.mvS3();
    await PersonToProfileCommand.copyDynamoDb();
  }
}

PersonToProfileCommand.description = `Rename Person to Profile
https://github.com/claptime/claptime/pull/286
- S3 Storage bucket: move public/persons to public/profiles
- AppSync model changes:
  - Person: dump data into Profile table, just concatenate firstName and lastName into name
  - Credit: rename creditPersonId/customPerson fields into creditProfileId/customProfile
  - Video: rename videoPersonId field into videoProfileId
  - UserSettings: rename collectionId field into personId
`;

PersonToProfileCommand.flags = {
  yes: commonFlags.yes,
};

module.exports = PersonToProfileCommand;
