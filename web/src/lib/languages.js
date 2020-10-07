export const availableLanguages = {
  'fr-FR': ['fr', 'fr-BE', 'fr-CA', 'fr-CH', 'fr-FR', 'fr-LU', 'fr-MC'],
};
const defaultLanguage = 'fr-FR';

export const getDefault = () => {
  if (typeof navigator === 'undefined') {
    return defaultLanguage;
  }
  const navigatorLanguage = navigator.language || navigator.userLanguage;
  return (
    Object.keys(availableLanguages).find((main) =>
      availableLanguages[main].find(
        (secondary) => secondary === navigatorLanguage,
      ),
    ) || defaultLanguage
  );
};

export default {
  availableLanguages,
  getDefault,
};
