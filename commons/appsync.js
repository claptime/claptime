require('isomorphic-fetch');
const AWSAppSyncClient = require('aws-appsync').default;
const { AUTH_TYPE } = require('aws-appsync/lib/link/auth-link');
const gql = require('graphql-tag');
const AWS = require('./aws');
const {
  graphql: { formatError },
} = require('./api-responses');

const { GRAPHQL_ENDPOINT, AWS_REGION } = process.env;

const appSyncClient = new AWSAppSyncClient(
  {
    url: GRAPHQL_ENDPOINT,
    region: AWS_REGION,
    auth: {
      type: AUTH_TYPE.AWS_IAM,
      credentials: AWS.config.credentials,
    },
    disableOffline: true,
  },
  {
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
      },
    },
  },
);

const checkOwnership = async (id, identity, type) => {
  const { username, groups } = identity;
  if (groups && groups.includes('admin')) {
    console.log(`User ${username} is admin, authorized`);
    return;
  }
  const {
    data: {
      [`get${type}`]: { owner },
    },
  } = await appSyncClient.query({
    query: gql(`query Get${type}($id: ID!) {
      get${type}(id: $id) {
        owner
      }
    }`),
    variables: {
      id,
    },
  });
  if (owner !== username) {
    console.log(`owner = ${owner}, username = ${username}`);
    throw new Error(`User is not the ${type} owner, mutation forbidden`);
  }
  console.log(`User ${username} authorized`);
};

const getHandler = (resolvers) => async (event) => {
  console.log(JSON.stringify(event, null, 2));
  try {
    if (
      !resolvers[event.typeName] ||
      !resolvers[event.typeName][event.fieldName]
    ) {
      return formatError('ResolverNotFound');
    }
    for (const ownershipConfig of resolvers[event.typeName][event.fieldName]
      .checkOwnership || []) {
      await checkOwnership(
        event.arguments[ownershipConfig.idArgumentName],
        event.identity,
        ownershipConfig.modelName,
      );
    }
    return await resolvers[event.typeName][event.fieldName].handler(event);
  } catch (err) {
    console.error('Uncatched error', err);
    return formatError('InternalError');
  }
};

module.exports = {
  appSyncClient,
  getHandler,
  gql,
};
