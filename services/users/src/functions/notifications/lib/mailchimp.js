const axios = require('axios');
const md5 = require('md5');
const { getParam } = require('claptime-commons/ssm');

const updateMailchimp = async (audienceId, identity, enabled) => {
  const {
    claims: { given_name: givenName, family_name: familyName, email },
  } = identity;
  if (process.env.ENABLED !== 'true') {
    console.log(`disabled in ${process.env.STAGE} environment`);
    return { skipped: true };
  }
  const mailchimpApiKey = await getParam('mailchimp-api-key', true);
  console.log(
    `adding ${givenName} ${familyName} (${email}) to Mailchimp audience ${audienceId}.`,
  );
  const res = await axios.put(
    `https://us4.api.mailchimp.com/3.0/lists/${audienceId}/members/${md5(
      email.toLowerCase(),
    )}`,
    {
      email_address: email,
      status_if_new: enabled ? 'subscribed' : 'unsubscribed',
      status: enabled ? 'subscribed' : 'unsubscribed',
      merge_fields: {
        FNAME: givenName,
        LNAME: familyName,
      },
    },
    {
      headers: {
        Authorization: `apikey ${mailchimpApiKey}`,
      },
    },
  );
  console.log(`statusCode: ${res.status}`);
  return {};
};

module.exports = {
  updateMailchimp,
};
