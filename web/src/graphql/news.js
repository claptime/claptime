import { Connection, News } from './types';

export const createNews = /* GraphQL */ `
  mutation CreateNews($input: CreateNewsInput!) {
    createNews(input: $input) ${News()}
  }
`;

export const getNews = /* GraphQL */ `
  query GetNews($id: ID!) {
    getNews(id: $id) ${News()}
  }
`;

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

export const updateNews = /* GraphQL */ `
  mutation UpdateNews($input: UpdateNewsInput!) {
    updateNews(input: $input) ${News()}
  }
`;
