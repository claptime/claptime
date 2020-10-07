const AWS = require('./aws');
const { chunkArray } = require('./utils');

const dynamoDoc = new AWS.DynamoDB.DocumentClient();
const MAX_BATCH_ITEMS = 25;

const deleteItem = async (tableName, key) => {
  if (process.env.DRY_RUN) {
    console.debug(`[${tableName}][deleteItem] ${JSON.stringify(key)}`);
    return {};
  }
  return dynamoDoc
    .delete({
      TableName: tableName,
      Key: key,
    })
    .promise();
};

const getAllItems = async (tableName, params = {}) => {
  const items = [];
  let lastEvaluatedKey;
  do {
    const { Items, LastEvaluatedKey } = await dynamoDoc
      .scan({
        TableName: tableName,
        ExclusiveStartKey: lastEvaluatedKey,
        ...params,
      })
      .promise();
    items.push(...Items);
    lastEvaluatedKey = LastEvaluatedKey;
  } while (lastEvaluatedKey);
  return items;
};

const getItem = async (tableName, key) => {
  const { Item } = await dynamoDoc
    .get({
      TableName: tableName,
      Key: key,
    })
    .promise();
  return Item;
};

const putItem = async (tableName, item) => {
  if (process.env.DRY_RUN) {
    console.debug(`[${tableName}][putItem] ${JSON.stringify(item)}`);
    return {};
  }
  return dynamoDoc
    .put({
      TableName: tableName,
      Item: item,
    })
    .promise();
};

const putItems = async (tableName, items) => {
  if (process.env.DRY_RUN) {
    console.debug(`[${tableName}][putItems] ${JSON.stringify(items)}`);
    return;
  }
  const chunked = chunkArray(items, MAX_BATCH_ITEMS);
  while (chunked.length) {
    const chunk = chunked.pop();
    await dynamoDoc
      .batchWrite({
        RequestItems: {
          [tableName]: chunk.map((item) => ({
            PutRequest: {
              Item: item,
            },
          })),
        },
      })
      .promise();
  }
};

const updateItem = async (tableName, params) => {
  if (process.env.DRY_RUN) {
    console.debug(`[${tableName}][updateItem] ${JSON.stringify(params)}`);
    return {};
  }
  return dynamoDoc
    .update({
      ...params,
      TableName: tableName,
    })
    .promise();
};

module.exports = {
  deleteItem,
  getAllItems,
  getItem,
  putItem,
  putItems,
  updateItem,
};
