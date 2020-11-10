// Queries
export const getVideoNode = /* GraphQL */ `
  query getVideoNode($id: ID!, $collectionsNextToken: String) {
    getVideoNode(id: $id) {
      id
      title
      ttl
      status
      category
      duration
      releaseYear
      createdBy
      synopsis
      festivals
      donationsAvailable
      collections(nextToken: $collectionsNextToken) {
        items {
          id
          status
          categoryId
          createdAt
          updatedAt
          collection {
            id
            name
            slug
            status
            categories {
              id
              category
              description
            }
          }
        }
        nextToken
      }
      credits {
        items {
          id
          role
          profile {
            id
            name
            biography
          }
          customProfile
        }
        nextToken
      }
      profile {
        id
        name
        biography
      }

      type
      nodeType
      childrenCount
      videoNodeParentNodeId
      childNodes(limit: 100) {
        items {
          id
          title
          category
          duration
          status
          videoNodeNextNodeId
          type
        }
        nextToken
      }
      createdAt
      owner
      parentNode {
        id
        title
        childNodes(limit: 100) {
          items {
            id
            title
            category
            duration
            status
            videoNodeNextNodeId
          }
        }
      }
      videoNodeNextNodeId
      nextNode {
        id
        title
        status
      }
    }
  }
`;

export const listVideoNodesByStatusSortByTitle = /* GraphQL */ `
  query ListVideoNodesByStatusSortByTitle(
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
        ttl
        status
        category
        duration
        releaseYear
        credits {
          items {
            id
            role
            profile {
              id
              name
              biography
            }
            customProfile
          }
          nextToken
        }
        synopsis
        festivals
        createdAt
        donationsAvailable
        profile {
          id
          name
          biography
        }
        type
        nodeType
        childrenCount
        videoNodeParentNodeId
        videoNodeNextNodeId
        childNodes(limit: 100) {
          items {
            id
            title
            category
            duration
            status
            videoNodeNextNodeId
          }
        }
        owner
      }
      nextToken
    }
  }
`;

export const listVideoNodesByStatusSortByCreatedAt = /* GraphQL */ `
  query ListVideoNodesByStatusSortByCreatedAt(
    $status: VideoNodeStatus
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelVideoNodeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVideoNodesByStatusSortByCreatedAt(
      status: $status
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        ttl
        status
        category
        duration
        releaseYear
        credits {
          items {
            id
            role
            profile {
              id
              name
              biography
            }
            customProfile
          }
          nextToken
        }
        synopsis
        festivals
        createdAt
        donationsAvailable
        profile {
          id
          name
          biography
        }
        owner
        type
        nodeType
        childrenCount
        videoNodeParentNodeId
        videoNodeNextNodeId
        childNodes(limit: 100) {
          items {
            id
            title
            category
            duration
            status
            videoNodeNextNodeId
          }
        }
      }
      nextToken
    }
  }
`;

// Mutations
// TODO migrate to query builder like for collections
const videoNodeFields = `
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
`;

export const createCredit = /* GraphQL */ `
  mutation CreateCredit($input: CreateCreditInput!) {
    createCredit(input: $input) {
      id
    }
  }
`;

export const deleteCredit = /* GraphQL */ `
  mutation DeleteCredit($input: DeleteCreditInput!) {
    deleteCredit(input: $input) {
      id
    }
  }
`;

export const createView = /* GraphQL */ `
  mutation CreateView($input: CreateViewInput!) {
    createView(input: $input) {
      id
    }
  }
`;

export const addEpisodeToSeries = /* GraphQL */ `
  mutation AddEpisodeToSeries(
    $seriesVideoNodeId: String!
    $episodeVideoNodeId: String!
  ) {
    addEpisodeToSeries(
      seriesVideoNodeId: $seriesVideoNodeId
      episodeVideoNodeId: $episodeVideoNodeId
    ) {
      ${videoNodeFields}
    }
  }
`;

export const addVideoNode = /* GraphQL */ `
  mutation AddVideoNode($profileId: ID!, $type: Type!) {
    addVideoNode(profileId: $profileId, type: $type) {
      ${videoNodeFields}
    }
  }
`;

export const importVideo = /* GraphQL */ `
  mutation ImportVideo($videoNodeId: ID!, $videoLink: String!) {
    importVideo(videoNodeId: $videoNodeId, videoLink: $videoLink) {
      ${videoNodeFields}
    }
  }
`;

export const publishVideoNode = /* GraphQL */ `
  mutation PublishVideoNode($videoNodeId: ID!) {
    publishVideoNode(videoNodeId: $videoNodeId) {
      ${videoNodeFields}
    }
  }
`;

export const removeEpisodeFromSeries = /* GraphQL */ `
  mutation RemoveEpisodeFromSeries($videoNodeId: ID!) {
    removeEpisodeFromSeries(videoNodeId: $videoNodeId) {
      ${videoNodeFields}
    }
  }
`;

export const removeVideoNode = /* GraphQL */ `
  mutation RemoveVideoNode($videoNodeId: ID!) {
    removeVideoNode(videoNodeId: $videoNodeId)
  }
`;

export const moveEpisodeAfter = /* GraphQL */ `
  mutation MoveEpisodeAfter(
    $episodeVideoNodeId: ID!
    $previousEpisodeVideoNodeId: ID!
  ) {
    moveEpisodeAfter(
      episodeVideoNodeId: $episodeVideoNodeId
      previousEpisodeVideoNodeId: $previousEpisodeVideoNodeId
    ) {
      ${videoNodeFields}
    }
  }
`;

export const setVideoNodeMeta = /* GraphQL */ `
  mutation SetVideoNodeMeta(
    $videoNodeId: ID!
    $title: String
    $category: Category
    $releaseYear: Int
    $synopsis: String
    $festivals: String
    $ttl: Int
    $donationsAvailable: Boolean
  ) {
    setVideoNodeMeta(
      videoNodeId: $videoNodeId
      title: $title
      category: $category
      releaseYear: $releaseYear
      synopsis: $synopsis
      festivals: $festivals
      ttl: $ttl
      donationsAvailable: $donationsAvailable
    ) {
      ${videoNodeFields}
    }
  }
`;

export const submitVideoNodeToCollection = /* GraphQL */ `
  mutation SubmitVideoNodeToCollection(
    $videoNodeId: ID!
    $collectionSlug: String!
    $collectionCategoryId: String!
  ) {
    submitVideoNodeToCollection(
      videoNodeId: $videoNodeId
      collectionSlug: $collectionSlug
      collectionCategoryId: $collectionCategoryId
    ) {
      ${videoNodeFields}
    }
  }
`;

export const unpublishVideoNode = /* GraphQL */ `
  mutation UnpublishVideoNode($videoNodeId: ID!) {
    unpublishVideoNode(videoNodeId: $videoNodeId) {
      ${videoNodeFields}
    }
  }
`;

// Subscriptions
export const onUpdateVideoNode = /* GraphQL */ `
  subscription OnUpdateVideoNode($id: String!) {
    onUpdateVideoNode(id: $id) {
      id
      status
    }
  }
`;

export const createStarringVideoNode = /* GraphQL */ `
  mutation CreateStarringVideoNode($input: CreateStarringVideoNodeInput!) {
    createStarringVideoNode(input: $input) {
      id
    }
  }
`;
