const fs = require('fs');
const path = require('path');
const { sendEmail } = require('../../ses');
const { sendEmailToUser } = require('..');

const { FROM_EMAIL, REPLY_TO_EMAIL } = process.env;

jest.mock('claptime-commons/ses', () => ({
  sendEmail: jest.fn(async (params) => ({
    subject: params.Message.Subject.Data,
    html: params.Message.Body.Html.Data,
    text: params.Message.Body.Text.Data,
  })),
}));

const identity = {
  sub: '1dec54b1-8327-4b5f-a3ff-5803510c7d17',
  email_verified: true,
  birthdate: '2019-03-18',
  iss: 'https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_TiC1wJSsS',
  'cognito:username': '1dec54b1-8327-4b5f-a3ff-5803510c7d17',
  given_name: 'Regular',
  aud: '4i3fi5alrqifvqbvjk0h85160h',
  event_id: '36152130-171b-4d6a-9cb5-52b6fd3cedbc',
  token_use: 'id',
  auth_time: 1595410203,
  exp: 1595513108,
  iat: 1595509508,
  family_name: 'Claptime',
  email: 'contact.claptime+regular@gmail.com',
};

const sampleCollection = {
  name: 'My collection',
  slug: 'my-collection'
};

const sampleVideoNode = {
  title: 'My video node',
  type: 'FILM',
  id: '5ae69e9d-b8e5-4240-b724-9014fd01c2ac',
};

const recipientEmail = 'contact.claptime+test@gmail.com';

const emailSubjects = {
  defaultApprove: `${sampleVideoNode.title} a été publié`,
  approve: `${sampleVideoNode.title} a été accepté dans la collection ${sampleCollection.name}`,
  reject: `${sampleVideoNode.title} n'a pas été accepté dans la collection ${sampleCollection.name}`,
  submit: `Nouvelle soumission pour ${sampleCollection.name} : ${sampleVideoNode.title}`,
};

const getExpectedBody = (name, output) =>
  fs
    .readFileSync(path.join(__dirname, 'expected', `${name}.${output}`))
    .toString();

describe('emails', () => {
  describe('sendEmailToUser', () => {
    beforeEach(() => {
      sendEmail.mockClear();
    });

    Object.keys(emailSubjects).forEach((type) =>
      it(`should send ${type} email`, async () => {
        await sendEmailToUser(
          type,
          identity,
          {
            collection: sampleCollection,
            videoNode: sampleVideoNode,
          },
          'contact.claptime+test@gmail.com',
        );
        expect(sendEmail).toHaveBeenNthCalledWith(
          1,
          expect.objectContaining({
            Destination: {
              ToAddresses: [recipientEmail],
            },
            Source: FROM_EMAIL,
            ReplyToAddresses: [REPLY_TO_EMAIL],
          }),
        );
        const { subject, html, text } = await sendEmail.mock.results[0].value;
        expect(subject).toBe(emailSubjects[type]);
        expect(html).toBe(getExpectedBody(type, 'html'));
        expect(text).toBe(getExpectedBody(type, 'txt'));
      }),
    );
  });
});
