const {
  graphql: { formatSuccess },
} = require('claptime-commons/api-responses');
const { getByProfileId } = require('../../dynamodb');

module.exports = async (ctx) => {
  const {
    arguments: { profileId },
  } = ctx;
  console.log('Fetching stripe credentials from DynamoDB...');
  const Item = await getByProfileId(profileId);
  if (!Item) {
    return formatSuccess({ accessToken: null });
  }
  return formatSuccess({ accessToken: Item.credentials.access_token });
};
