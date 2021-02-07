const { appSyncClient, gql } = require('claptime-commons/appsync');

const createCollectionVideoNode = async (input) => {
  const {
    data: { createCollectionVideoNode: collectionVideoNode },
  } = await appSyncClient.mutate({
    mutation: gql(/* GraphQL */ `
      mutation CreateCollectionVideoNode(
        $input: CreateCollectionVideoNodeInput!
      ) {
        createCollectionVideoNode(input: $input) {
          id
          collectionVideoNodeCollectionId
          status
          categoryId
          collectionVideoNodeVideoNodeId
          createdAt
          owner
          updatedAt
        }
      }
    `),
    variables: {
      input,
    },
  });
  return collectionVideoNode;
};

const createCredit = async (input) => {
  const {
    data: { createCredit: credit },
  } = await appSyncClient.mutate({
    mutation: gql(/* GraphQL */ `
      mutation CreateCredit($input: CreateCreditInput!) {
        createCredit(input: $input) {
          id
        }
      }
    `),
    variables: {
      input,
    },
  });
  return credit;
};

const createVideoNode = async (input) => {
  const {
    data: { createVideoNode: videoNode },
  } = await appSyncClient.mutate({
    mutation: gql(/* GraphQL */ `
      mutation CreateVideoNode($input: CreateVideoNodeInput!) {
        createVideoNode(input: $input) {
          id
        }
      }
    `),
    variables: {
      input,
    },
  });
  return videoNode;
};

const deleteCollectionVideoNode = async (input) => {
  const {
    data: { deleteCollectionVideoNode: collectionVideoNode },
  } = await appSyncClient.mutate({
    mutation: gql(/* GraphQL */ `
      mutation DeleteCollectionVideoNode(
        $input: DeleteCollectionVideoNodeInput!
      ) {
        deleteCollectionVideoNode(input: $input) {
          id
        }
      }
    `),
    variables: {
      input,
    },
  });
  return collectionVideoNode;
};

const deleteCredit = async (input) => {
  const {
    data: { deleteCredit: credit },
  } = await appSyncClient.mutate({
    mutation: gql(/* GraphQL */ `
      mutation DeleteCredit($input: DeleteCreditInput!) {
        deleteCredit(input: $input) {
          id
        }
      }
    `),
    variables: {
      input,
    },
  });
  return credit;
};

const deleteVideoNode = async (input) => {
  // LIMITS maximum 1000 childs for a VideoNode
  const {
    data: { deleteVideoNode: videoNode },
  } = await appSyncClient.mutate({
    mutation: gql(/* GraphQL */ `
      mutation DeleteVideoNode($input: DeleteVideoNodeInput!) {
        deleteVideoNode(input: $input) {
          id
          type
          status
          title
          nodeType
          videoNodeNextNodeId
          videoNodeParentNodeId
          childNodes(limit: 1000) {
            items {
              id
            }
          }
        }
      }
    `),
    variables: {
      input,
    },
  });
  return videoNode;
};

const getCollection = async (collectionId) => {
  const {
    data: { getCollection: collection },
  } = await appSyncClient.query({
    query: gql(/* GraphQL */ `
      query GetCollection($id: ID!) {
        getCollection(id: $id) {
          id
          slug
          name
          tagline
          description
          links {
            type
            url
          }
          categories {
            id
            category
            description
          }
          collectionProfileId
          searchField
          createdBy
          createdAt
          owner
        }
      }
    `),
    variables: {
      id: collectionId,
    },
  });
  return collection;
};

const getCollectionBySlug = async (collectionSlug) => {
  const {
    data: {
      listCollectionsBySlug: {
        items: [collection],
      },
    },
  } = await appSyncClient.query({
    query: gql(/* GraphQL */ `
      query ListCollectionsBySlug($slug: String) {
        listCollectionsBySlug(slug: $slug, limit: 1) {
          items {
            id
            slug
            name
            categories {
              id
              category
              description
            }
            owner
          }
        }
      }
    `),
    variables: {
      slug: collectionSlug,
    },
  });
  return collection;
};

const getCollectionVideoNode = async (collectionVideoNodeId) => {
  const {
    data: { getCollectionVideoNode: collectionVideoNode },
  } = await appSyncClient.query({
    query: gql(/* GraphQL */ `
      query GetCollectionVideoNode($id: ID!) {
        getCollectionVideoNode(id: $id) {
          id
          collectionVideoNodeCollectionId
          status
          categoryId
          rejectionReason
          collectionVideoNodeVideoNodeId
          createdAt
          updatedAt
          owner
        }
      }
    `),
    variables: {
      id: collectionVideoNodeId,
    },
  });
  return collectionVideoNode;
};

const getVideoNode = async (videoNodeId) => {
  const {
    data: { getVideoNode: videoNode },
  } = await appSyncClient.query({
    query: gql(/* GraphQL */ `
      query GetVideoNode($id: ID!) {
        getVideoNode(id: $id) {
          id
          title
          status
          videoNodeProfileId
          category
          duration
          releaseYear
          synopsis
          festivals
          searchField
          ttl
          createdBy
          createdAt
          updatedAt
          owner
          donationsAvailable
          videoNodeNextNodeId
          videoNodeParentNodeId
          type
          nodeType
          childrenCount
          profile {
            id
            name
          }
          credits {
            items {
              id
              role
              customProfile
              creditVideoId
              creditVideoNodeId
              owner
              createdAt
              updatedAt
              profile {
                id
                name
                biography
                searchField
                createdAt
                createdBy
                owner
                updatedAt
              }
            }
            nextToken
          }
        }
      }
    `),
    variables: {
      id: videoNodeId,
    },
  });
  return videoNode;
};

const listCollectionVideoNodes = async (filter) => {
  let nextToken;
  const items = [];
  do {
    const {
      data: { listCollectionVideoNodes: collectionVideoNodes },
    } = await appSyncClient.query({
      query: gql(/* GraphQL */ `
        query ListCollectionVideoNodes(
          $filter: ModelCollectionVideoNodeFilterInput
          $limit: Int
          $nextToken: String
        ) {
          listCollectionVideoNodes(
            filter: $filter
            limit: $limit
            nextToken: $nextToken
          ) {
            items {
              id
            }
            nextToken
          }
        }
      `),
      variables: {
        filter,
        nextToken,
      },
    });
    ({ nextToken } = collectionVideoNodes);
    items.push(...collectionVideoNodes.items);
  } while (nextToken);
  return items;
};

const listCredits = async (filter) => {
  let nextToken;
  const items = [];
  do {
    const {
      data: { listCredits: credits },
    } = await appSyncClient.query({
      query: gql(/* GraphQL */ `
        query ListCredits(
          $filter: ModelCreditFilterInput
          $limit: Int
          $nextToken: String
        ) {
          listCredits(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
              id
            }
            nextToken
          }
        }
      `),
      variables: {
        filter,
        nextToken,
      },
    });
    ({ nextToken } = credits);
    items.push(...credits.items);
  } while (nextToken);
  return items;
};

const listUserVideoNodesByVideoNodeAndList = async (videoNodeId, list) => {
  let nextToken;
  const items = [];
  do {
    const {
      data: { listUserVideoNodesByVideoNodeAndList: userVideoNodes },
    } = await appSyncClient.query({
      query: gql(/* GraphQL */ `
        query ListUserVideoNodesByVideoNodeAndList(
          $userVideoNodeVideoNodeId: ID
          $list: ModelStringKeyConditionInput
          $sortDirection: ModelSortDirection
          $filter: ModelUserVideoNodeFilterInput
          $limit: Int
          $nextToken: String
        ) {
          listUserVideoNodesByVideoNodeAndList(
            userVideoNodeVideoNodeId: $userVideoNodeVideoNodeId
            list: $list
            sortDirection: $sortDirection
            filter: $filter
            limit: $limit
            nextToken: $nextToken
          ) {
            items {
              list
              userSettingsVideoNodesId
              userVideoNodeVideoNodeId
              createdAt
              updatedAt
            }
            nextToken
          }
        }
      `),
      variables: {
        userVideoNodeVideoNodeId: videoNodeId,
        list,
        nextToken,
      },
    });
    ({ nextToken } = userVideoNodes);
    items.push(...userVideoNodes.items);
  } while (nextToken);
  return items;
};

const listVideoNodesByParent = async (parentId) => {
  let nextToken;
  const items = [];
  do {
    const {
      data: { listVideoNodesByParent: videoNodes },
    } = await appSyncClient.query({
      query: gql(/* GraphQL */ `
        query ListVideoNodesByParent(
          $videoNodeParentNodeId: ID
          $sortDirection: ModelSortDirection
          $filter: ModelVideoNodeFilterInput
          $limit: Int
          $nextToken: String
        ) {
          listVideoNodesByParent(
            videoNodeParentNodeId: $videoNodeParentNodeId
            sortDirection: $sortDirection
            filter: $filter
            limit: $limit
            nextToken: $nextToken
          ) {
            items {
              id
              videoNodeNextNodeId
            }
          }
        }
      `),
      variables: {
        videoNodeParentNodeId: parentId,
        nextToken,
      },
    });
    ({ nextToken } = videoNodes);
    items.push(...videoNodes.items);
  } while (nextToken);
  return items;
};

const listVideoNodesByStatusSortByTitle = async (status, filter) => {
  let nextToken;
  const items = [];
  do {
    const {
      data: { listVideoNodesByStatusSortByTitle: videoNodes },
    } = await appSyncClient.query({
      query: gql(/* GraphQL */ `
        query listVideoNodesByStatusSortByTitle(
          $status: VideoNodeStatus
          $title: ModelStringKeyConditionInput
          $sortDirection: ModelSortDirection
          $filter: ModelVideoNodeFilterInput
          $limit: Int
          $nextToken: String
        ) {
          listVideoNodesByStatusSortByTitle(
            status: $status
            title: $title
            sortDirection: $sortDirection
            filter: $filter
            limit: $limit
            nextToken: $nextToken
          ) {
            items {
              id
              title
              status
              ttl
            }
            nextToken
          }
        }
      `),
      variables: {
        status,
        filter,
        nextToken,
      },
    });
    ({ nextToken } = videoNodes);
    items.push(...videoNodes.items);
  } while (nextToken);
  return items;
};

const updateCollectionVideoNode = async (input) => {
  const {
    data: { updateCollectionVideoNode: collectionVideoNode },
  } = await appSyncClient.mutate({
    mutation: gql(/* GraphQL */ `
      mutation UpdateCollectionVideoNode(
        $input: UpdateCollectionVideoNodeInput!
      ) {
        updateCollectionVideoNode(input: $input) {
          id
          collectionVideoNodeCollectionId
          status
          categoryId
          rejectionReason
          collectionVideoNodeVideoNodeId
          createdAt
          updatedAt
          owner
        }
      }
    `),
    variables: {
      input,
    },
  });
  return collectionVideoNode;
};

const updateVideoNode = async (input) => {
  const {
    data: { updateVideoNode: videoNode },
  } = await appSyncClient.mutate({
    mutation: gql(/* GraphQL */ `
      mutation UpdateVideoNode($input: UpdateVideoNodeInput!) {
        updateVideoNode(input: $input) {
          id
          title
          status
          category
          type
          owner
        }
      }
    `),
    variables: {
      input,
    },
  });
  return videoNode;
};

const notifyUser = async (userId, type, channels, payload) => {
  await appSyncClient.mutate({
    mutation: gql(/* GraphQL */ `
      mutation NotifyUser(
        $userId: String!
        $type: String!
        $channels: [NotificationChannel]!
        $payload: AWSJSON
      ) {
        notifyUser(
          userId: $userId
          type: $type
          channels: $channels
          payload: $payload
        ) {
          status
        }
      }
    `),
    variables: {
      userId,
      type,
      channels,
      payload,
    },
  });
};

const listUserCollection = async (filter) => {
  let nextToken;
  const items = [];
  do {
    const {
      data: { listUserCollection: userCollection },
    } = await appSyncClient.query({
      query: gql(/* GraphQL */ `
        query ListUserCollection(
          $filter: ModelUserCollectionFilterInput
          $limit: Int
          $nextToken: String
        ) {
          listUserCollection(
            filter: $filter
            limit: $limit
            nextToken: $nextToken
          ) {
            items {
              userSettingsCollectionsId
            }
            nextToken
          }
        }
      `),
      variables: {
        filter,
        nextToken,
      },
    });
    ({ nextToken } = userCollection);
    items.push(...userCollection.items);
  } while (nextToken);
  return items;
};

const listUserProfile = async (filter) => {
  let nextToken;
  const items = [];
  do {
    const {
      data: { listUserProfile: userProfile },
    } = await appSyncClient.query({
      query: gql(/* GraphQL */ `
        query ListUserProfile(
          $filter: ModelUserProfileFilterInput
          $limit: Int
          $nextToken: String
        ) {
          listUserProfile(
            filter: $filter
            limit: $limit
            nextToken: $nextToken
          ) {
            items {
              userProfileProfileId
              userSettingsProfilesId
            }
            nextToken
          }
        }
      `),
      variables: {
        filter,
        nextToken,
      },
    });
    ({ nextToken } = userProfile);
    items.push(...userProfile.items);
  } while (nextToken);
  return items;
};

module.exports = {
  createCollectionVideoNode,
  createCredit,
  createVideoNode,
  deleteCollectionVideoNode,
  deleteCredit,
  deleteVideoNode,
  getCollection,
  getCollectionBySlug,
  getCollectionVideoNode,
  getVideoNode,
  listCollectionVideoNodes,
  listCredits,
  listUserVideoNodesByVideoNodeAndList,
  listVideoNodesByParent,
  listVideoNodesByStatusSortByTitle,
  updateCollectionVideoNode,
  updateVideoNode,
  notifyUser,
  listUserCollection,
  listUserProfile,
};
