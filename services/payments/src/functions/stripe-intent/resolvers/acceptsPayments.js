const {
  graphql: { formatSuccess },
} = require('claptime-commons/api-responses');
const { getByProfileId } = require('../../dynamodb');

module.exports = async (event) => {
  const {
    arguments: { profileId },
  } = event;
  const data = await getByProfileId(profileId);

  return formatSuccess(
    Boolean(data && data.credentials && data.credentials.stripe_user_id),
  );
};
