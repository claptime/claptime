import qs from 'query-string';

export const isAvailable = (feature, { user } = {}) => {
  const queryString = qs.parse(window.location.search);
  switch (feature) {
    case 'clap-animation':
      return Object.prototype.hasOwnProperty.call(
        queryString,
        'clap-animation',
      );
    default:
      throw new Error(`Unknown feature "${feature}"`);
  }
};

export default {
  isAvailable,
};
