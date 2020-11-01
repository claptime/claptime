const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const { getDomain } = require('../env');
const { sendEmail } = require('../ses');

const { FROM_EMAIL, HELP_CENTER_URL } = process.env;

const getCompiledTemplate = (type, name, output) =>
  Handlebars.compile(
    fs
      .readFileSync(
        path.join(__dirname, 'templates', type, `${name}.${output}.hbs`),
      )
      .toString(),
  );

// TODO i18n
const getTitle = (templateName, params) =>
  ({
    approve: `${params.videoNode.title} a été accepté dans la collection ${params.collection.name}`,
    reject: `${params.videoNode.title} n'a pas été accepté dans la collection ${params.collection.name}`,
    submit: `Nouvelle soumission pour ${params.collection.name} : ${params.videoNode.title}`,
  }[templateName]);

Handlebars.registerPartial(
  'includes/footer.html',
  getCompiledTemplate('partials', 'includes/footer', 'html'),
);
Handlebars.registerPartial(
  'includes/footer.txt',
  getCompiledTemplate('partials', 'includes/footer', 'txt'),
);
Handlebars.registerPartial(
  'layouts/base.html',
  getCompiledTemplate('partials', 'layouts/base', 'html'),
);
Handlebars.registerPartial(
  'layouts/base.txt',
  getCompiledTemplate('partials', 'layouts/base', 'txt'),
);

Handlebars.registerHelper('getVideoNodeLink', (videoNode) => {
  const types = {
    FILM: 'video',
    SERIES: 'series',
  };
  return `${getDomain()}/${types[videoNode.type]}/${videoNode.id}`;
});

Handlebars.registerHelper('getCollectionLink', (collection) => {
  return `${getDomain()}/collection/${collection.slug}`;
});

Handlebars.registerHelper('getCollectionSubmissionsLink', (collection) => {
  return `${getDomain()}/collection/${collection.slug}/submissions`;
});

const sendEmailToUser = async (
  templateName,
  identity,
  customParams,
  toEmail,
) => {
  const params = {
    ...customParams,
    user: {
      firstName: identity.given_name,
    },
    helpCenterUrl: HELP_CENTER_URL,
  };
  params.title = getTitle(templateName, params);

  await sendEmail({
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: getCompiledTemplate('emails', templateName, 'txt')(params),
        },
        Html: {
          Charset: 'UTF-8',
          Data: getCompiledTemplate('emails', templateName, 'html')(params),
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: params.title,
      },
    },
    Destination: {
      BccAddresses: [FROM_EMAIL],
      ToAddresses: [toEmail],
    },
    Source: FROM_EMAIL,
    ReplyToAddresses: [FROM_EMAIL],
  });
};

module.exports = {
  sendEmailToUser,
};
