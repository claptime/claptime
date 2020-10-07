const AWS = require('./aws');

const ses = new AWS.SES();

const sendEmail = async (params) => {
  console.log('Sending email with params:', JSON.stringify(params, null, 2));
  try {
    if (process.env.DRY_RUN) {
      console.log('DRY_RUN, not sending anything');
      return;
    }
    await ses.sendEmail(params).promise();
    console.log(`Email successfully sent`);
  } catch (err) {
    console.log(`sendEmailOnVideoPublished error : ${err}`);
  }
};

module.exports = {
  sendEmail,
};
