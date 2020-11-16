import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18n } from 'aws-amplify';
import moment from 'moment';
import 'moment/locale/fr';
import fr from 'antd/lib/locale-provider/fr_FR';

import translationFR from 'claptime-translations/fr-FR/web';
import { getDefault } from './languages';

// the translations
const resources = {
  'fr-FR': {
    translation: translationFR,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: getDefault(),
    interpolation: {
      escapeValue: false, // react already safes from xss
      format: (value, format) => {
        if (format === 'secondsAsMinutes')
          return Math.round(moment.duration(value, 'seconds').asMinutes()) || 1;
        return value;
      },
    },
  });

const setLanguage = (languageArg) => {
  const language = languageArg || getDefault();
  const short = language.substring(0, 2);
  I18n.setLanguage(short);
  i18n.changeLanguage(language);
  moment.locale(short);
};
setLanguage(getDefault());

const getAntDesignLocale = (language) => {
  switch (language) {
    case 'fr_FR':
    default:
      return fr;
  }
};

export default {
  getAntDesignLocale,
  setLanguage,
  i18n,
};
