import React from 'react';

export const joinElements = (array, separator = <>,&nbsp;</>) =>
  array.reduce((acc, cur, i) => {
    if (cur) {
      // filter null/false values
      if (acc.length) {
        // eslint-disable-next-line react/no-array-index-key
        acc.push(<span key={i}>{separator}</span>);
      }
      acc.push(cur);
    }
    return acc;
  }, []);

export default {
  joinElements,
};
