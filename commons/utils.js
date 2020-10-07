const uuidV4 = require('uuid/v4');

const chunkArray = (array, size) => {
  const chunkedArray = [];
  let index = 0;
  while (index < array.length) {
    chunkedArray.push(array.slice(index, size + index));
    index += size;
  }
  return chunkedArray;
};

const getSearchableValue = (str) =>
  str
    .toLowerCase()
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[æ]/g, 'ae')
    .replace(/[ç]/g, 'c')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[ñ]/g, 'n')
    .replace(/[òóôõöø]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[ýÿ]/g, 'y');

module.exports = {
  chunkArray,
  getSearchableValue,
  uuidV4,
};
