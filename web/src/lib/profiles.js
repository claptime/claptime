export const getUrl = (links, desiredType) =>
  links
    .filter(({ type }) => type === desiredType)
    .map(({ url }) => url)
    .shift();

export default {
  getUrl,
};
