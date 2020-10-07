export const listProfiles = /* GraphQL */ `
  query ListProfiles(
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        biography
        links {
          type
          url
        }
        searchField
        createdAt
        createdBy
        owner
        videoNodes {
          items {
            id
            status
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getProfile = /* GraphQL */ `
  query GetProfile(
    $id: ID!
    $videoNodesNextToken: String
    $childNodesNextToken: String
  ) {
    getProfile(id: $id) {
      id
      name
      biography
      links {
        type
        url
      }
      searchField
      createdAt
      createdBy
      owner
      collections {
        items {
          id
          slug
          name
          tagline
          profile {
            id
            name
            biography
            links {
              type
              url
            }
          }
        }
        nextToken
      }
      roles {
        items {
          id
          role
          customProfile
          creditVideoNodeId
          owner
          videoNode {
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
            videoNodeNextNodeId
            donationsAvailable
            type
            videoNodeParentNodeId
            nodeType
            childrenCount
          }
        }
        nextToken
      }
      videoNodes(nextToken: $videoNodesNextToken) {
        items {
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
          type
          videoNodeParentNodeId
          nodeType
          childrenCount
          videoNodeNextNodeId
          childNodes(nextToken: $childNodesNextToken) {
            items {
              id
              title
              type
              status
              videoNodeNextNodeId
            }
            nextToken
          }
        }
        nextToken
      }
    }
  }
`;

export const createProfile = /* GraphQL */ `
  mutation CreateProfile($input: CreateProfileInput!) {
    createProfile(input: $input) {
      id
      name
      biography
    }
  }
`;
export const updateProfile = /* GraphQL */ `
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      id
      name
      biography
    }
  }
`;
