import React from 'react';

export const nl2br = (text) =>
  text
    .split('\n')
    .map((item, i) =>
      React.createElement('span', { key: item || i }, [
        item,
        React.createElement('br', { key: 'br' }),
      ]),
    );

export const text2span = (text) =>
  text
    .split('\n')
    .map((item, i) =>
      React.createElement('span', { key: item || i }, [
        item
          .split(' ')
          .map((itemBis, j) =>
            React.createElement('span', { key: itemBis || j }, `${itemBis} `),
          ),
        React.createElement('br', { key: 'br' }),
      ]),
    );

export const nl2li = (text) =>
  text
    .split('\n')
    .map((item) => React.createElement('li', { key: item }, item));

export default {
  nl2br,
  nl2li,
};
