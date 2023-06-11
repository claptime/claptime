const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const { getDomain } = require('../env');
const { sendEmail } = require('../ses');

const { FROM_EMAIL, REPLY_TO_EMAIL, HELP_CENTER_URL } = process.env;

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
    defaultApprove: `${params.videoNode.title} a été publié`,
    approve: `${params.videoNode.title} a été accepté dans la collection ${
      params.collection ? params.collection.name : 'NA'
    }`,
    reject: `${params.videoNode.title} n'a pas été accepté dans la collection ${
      params.collection ? params.collection.name : 'NA'
    }`,
    submit: `Nouvelle soumission pour ${
      params.collection ? params.collection.name : 'NA'
    } : ${params.videoNode.title}`,
    filmmakerPublishedVideoNode: `${
      params.profile ? params.profile.name : 'NA'
    } a mis en ligne un nouveau film`,
    videoNodeAddedToCollection: `Nouvel ajout dans la collection ${
      params.collection ? params.collection.name : 'NA'
    }`,
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

Handlebars.registerHelper('getTranslationType', (videoNodeType, upperCase) => {
  const translation = {
    FILM: 'un nouveau film',
    SERIES: 'une nouvelle série'
  };
  if(upperCase) {
    return translation[videoNodeType].charAt(0).toUpperCase() + translation[videoNodeType].slice(1);
  }
  return translation[videoNodeType];
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
      ToAddresses: [toEmail],
    },
    Source: FROM_EMAIL,
    ReplyToAddresses: [REPLY_TO_EMAIL],
  });
};

module.exports = {
  sendEmailToUser,
};
