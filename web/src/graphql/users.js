export const getUserSettings = /* GraphQL */ `
  query GetUserSettings($id: ID!) {
    getUserSettings(id: $id) {
      id
      clapValue
      uiState
      profileId
      notifications {
        type
        channel
        frequency
      }
    }
  }
`;

export const createUserSettings = /* GraphQL */ `
  mutation CreateUserSettings($input: CreateUserSettingsInput!) {
    createUserSettings(input: $input) {
      id
    }
  }
`;

export const updateUserSettings = /* GraphQL */ `
  mutation UpdateUserSettings($input: UpdateUserSettingsInput!) {
    updateUserSettings(input: $input) {
      id
      clapValue
      uiState
      profileId
      notifications {
        type
        channel
        frequency
      }
    }
  }
`;

export const setNotificationPreference = /* GraphQL */ `
  mutation SetNotificationPreference(
    $type: NotificationType!
    $channel: NotificationChannel!
    $frequency: NotificationFrequency!
  ) {
    setNotificationPreference(
      type: $type
      channel: $channel
      frequency: $frequency
    ) {
      status
      reason
      data
    }
  }
`;

export const createUserCollection = /* GraphQL */ `
  mutation CreateUserCollection($input: CreateUserCollectionInput!) {
    createUserCollection(input: $input) {
      userSettingsCollectionsId
      list
      userCollectionCollectionId
      collection {
        id
      }
      createdAt
    }
  }
`;

export const deleteUserCollection = /* GraphQL */ `
  mutation DeleteUserCollection($input: DeleteUserCollectionInput!) {
    deleteUserCollection(input: $input) {
      userSettingsCollectionsId
      list
      userCollectionCollectionId
      createdAt
    }
  }
`;

export const listUserCollections = /* GraphQL */ `
  query ListUserCollections($userId: ID!, $limit: Int, $nextToken: String) {
    getUserSettings(id: $userId) {
      id
      collections(limit: $limit, nextToken: $nextToken) {
        items {
          userSettingsCollectionsId
          list
          userCollectionCollectionId
          collection {
            id
          }
          createdAt
        }
        nextToken
      }
    }
  }
`;

export const createUserProfile = /* GraphQL */ `
  mutation CreateUserProfile($input: CreateUserProfileInput!) {
    createUserProfile(input: $input) {
      userSettingsProfilesId
      list
      userProfileProfileId
      profile {
        id
        name
      }
      createdAt
    }
  }
`;

export const deleteUserProfile = /* GraphQL */ `
  mutation DeleteUserProfile($input: DeleteUserProfileInput!) {
    deleteUserProfile(input: $input) {
      userSettingsProfilesId
      list
      userProfileProfileId
      createdAt
    }
  }
`;

export const listUserProfiles = /* GraphQL */ `
  query ListUserProfiles($userId: ID!, $limit: Int, $nextToken: String) {
    getUserSettings(id: $userId) {
      id
      profiles(limit: $limit, nextToken: $nextToken) {
        items {
          userSettingsProfilesId
          list
          userProfileProfileId
          profile {
            id
            name
          }
          createdAt
        }
        nextToken
      }
    }
  }
`;

export const createUserVideoNode = /* GraphQL */ `
  mutation CreateUserVideoNode($input: CreateUserVideoNodeInput!) {
    createUserVideoNode(input: $input) {
      userSettingsVideoNodesId
      list
      userVideoNodeVideoNodeId
      videoNode {
        id
        title
        category
        duration
      }
      createdAt
    }
  }
`;

export const deleteUserVideoNode = /* GraphQL */ `
  mutation DeleteUserVideoNode($input: DeleteUserVideoNodeInput!) {
    deleteUserVideoNode(input: $input) {
      userSettingsVideoNodesId
      list
      userVideoNodeVideoNodeId
      createdAt
    }
  }
`;

export const listUserVideoNodes = /* GraphQL */ `
  query ListUserVideoNodes($userId: ID!, $limit: Int, $nextToken: String) {
    getUserSettings(id: $userId) {
      id
      videoNodes(limit: $limit, nextToken: $nextToken) {
        items {
          userSettingsVideoNodesId
          list
          userVideoNodeVideoNodeId
          videoNode {
            id
            title
            category
            duration
            status
            type
            childrenCount
          }
          createdAt
        }
        nextToken
      }
    }
  }
`;
