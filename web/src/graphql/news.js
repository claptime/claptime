import { Connection, News } from './types';

export const listNews = /* GraphQL */ `
  query ListNews(
    $filter: ModelNewsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNews(filter: $filter, limit: $limit, nextToken: $nextToken) ${Connection(
      {
        children: News(),
      },
    )}
  }
`;
