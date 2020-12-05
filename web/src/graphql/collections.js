import { Collection, CollectionVideoNode, Connection, LEVELS } from './types';

export const deleteCollection = /* GraphQL */ `
  mutation DeleteCollection($input: DeleteCollectionInput!) {
    deleteCollection(input: $input) {
      id
    }
  }
`;

export const listCollectionsBySlug = /* GraphQL */ `
  query ListCollectionsBySlug($slug: String) {
    listCollectionsBySlug(slug: $slug, limit: 1) ${Connection({
      children: Collection({
        level: LEVELS.COMPLETE,
        profile: {
          level: LEVELS.REGULAR,
        },
        starringVideoNodes: {
          level: LEVELS.REGULAR,
          videoNode: {
            level: LEVELS.REGULAR,
            profile: {
              level: LEVELS.REGULAR,
            },
          },
        },
      }),
    })}
  }
`;

export const listCollections = /* GraphQL */ `
  query ListCollections(
    $filter: ModelCollectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollections(filter: $filter, limit: $limit, nextToken: $nextToken) ${Connection(
      {
        children: Collection({
          level: LEVELS.REGULAR,
          profile: {
            level: LEVELS.REGULAR,
          },
        }),
      },
    )}
  }
`;

export const createCollection = /* GraphQL */ `
  mutation CreateCollection($input: CreateCollectionInput!) {
    createCollection(input: $input) ${Collection({
      level: LEVELS.REGULAR,
      videoNodes: {
        level: LEVELS.REGULAR,
        videoNode: {
          level: LEVELS.REGULAR,
        },
      },
    })}
  }
`;

export const updateCollection = /* GraphQL */ `
  mutation UpdateCollection($input: UpdateCollectionInput!) {
    updateCollection(input: $input) {
      id
    }
  }
`;

export const createCollectionVideoNode = /* GraphQL */ `
  mutation CreateCollectionVideoNode($input: CreateCollectionVideoNodeInput!) {
    createCollectionVideoNode(input: $input) {
      id
    }
  }
`;

export const deleteCollectionVideoNode = /* GraphQL */ `
  mutation DeleteCollectionVideoNode($input: DeleteCollectionVideoNodeInput!) {
    deleteCollectionVideoNode(input: $input) {
      id
    }
  }
`;

export const listCollectionVideoNodes = /* GraphQL */ `
  query ListCollectionVideoNodes(
    $filter: ModelCollectionVideoNodeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollectionVideoNodes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) ${Connection({
      children: CollectionVideoNode({
        collection: {
          level: LEVELS.COMPLETE,
        },
        videoNode: {
          level: LEVELS.REGULAR,
        },
      }),
    })}
  }
`;

export const listCollectionVideoNodesByCollectionAndCategorySortByCreatedAt = /* GraphQL */ `
  query ListCollectionVideoNodesByCollectionAndCategorySortByCreatedAt(
    $collectionVideoNodeCollectionId: ID
    $categoryIdCreatedAt: ModelCollectionVideoNodeByCollectionAndCategorySortByCreatedAtCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCollectionVideoNodeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollectionVideoNodesByCollectionAndCategorySortByCreatedAt(
      collectionVideoNodeCollectionId: $collectionVideoNodeCollectionId
      categoryIdCreatedAt: $categoryIdCreatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) ${Connection({
      children: CollectionVideoNode({
        collection: {
          level: LEVELS.COMPLETE,
        },
        videoNode: {
          level: LEVELS.COMPLETE,
          profile: {
            level: LEVELS.REGULAR,
          },
          nextNode: {
            level: LEVELS.COMPLETE,
          },
          parentNode: {
            level: LEVELS.COMPLETE,
          },
        },
      }),
    })}
  }
`;

export const validateSubmission = /* GraphQL */ `
  mutation ValidateSubmission(
    $collectionVideoNodeId: ID!
    $status: CollectionVideoNodeStatus!
    $rejectionReason: String
  ) {
    validateSubmission(
      collectionVideoNodeId: $collectionVideoNodeId
      status: $status
      rejectionReason: $rejectionReason
    ) {
      id
    }
  }
`;
