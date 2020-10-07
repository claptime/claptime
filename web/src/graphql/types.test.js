import { Collection, LEVELS } from './types';

const removeMultipleWhitespaces = (str) =>
  str.replace(/\s/g, ' ').replace(/  +/g, ' ').trim();

it('Levels', () => {
  expect(
    removeMultipleWhitespaces(
      Collection({
        level: LEVELS.MINIMAL,
      }),
    ),
  ).toEqual(removeMultipleWhitespaces('{ id slug name createdAt owner }'));
  expect(
    removeMultipleWhitespaces(
      Collection({
        level: LEVELS.REGULAR,
      }),
    ),
  ).toEqual(
    removeMultipleWhitespaces(
      '{ id slug name createdAt owner tagline collectionProfileId description links { type url } categories { id category description } }',
    ),
  );
  expect(
    removeMultipleWhitespaces(
      Collection({
        level: LEVELS.COMPLETE,
      }),
    ),
  ).toEqual(
    removeMultipleWhitespaces(
      '{ id slug name createdAt owner tagline collectionProfileId description links { type url } categories { id category description } searchField createdBy }',
    ),
  );
});

it('Nested', () => {
  expect(
    removeMultipleWhitespaces(
      Collection({
        level: LEVELS.MINIMAL,
        videoNodes: {
          level: LEVELS.MINIMAL,
        },
      }),
    ),
  ).toEqual(
    removeMultipleWhitespaces(
      '{ id slug name createdAt owner videoNodes { items { id categoryId collectionVideoNodeCollectionId collectionVideoNodeVideoNodeId createdAt owner } nextToken } }',
    ),
  );
  expect(
    removeMultipleWhitespaces(
      Collection({
        level: LEVELS.MINIMAL,
        videoNodes: {
          level: LEVELS.MINIMAL,
          views: {
            level: LEVELS.MINIMAL,
          },
        },
      }),
    ),
  ).toEqual(
    removeMultipleWhitespaces(
      '{ id slug name createdAt owner videoNodes { items { id categoryId collectionVideoNodeCollectionId collectionVideoNodeVideoNodeId createdAt owner } nextToken } }',
    ),
  );
});

it('Variables', () => {
  expect(
    removeMultipleWhitespaces(
      Collection({
        level: LEVELS.MINIMAL,
        videoNodes: {
          level: LEVELS.MINIMAL,
          variables: {
            filter: '$videoNodesFilter',
          },
        },
      }),
    ),
  ).toEqual(
    removeMultipleWhitespaces(
      '{ id slug name createdAt owner videoNodes (filter: $videoNodesFilter) { items { id categoryId collectionVideoNodeCollectionId collectionVideoNodeVideoNodeId createdAt owner } nextToken } }',
    ),
  );
});
