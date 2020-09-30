export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification($userId: String!) {
    onCreateNotification(userId: $userId) {
      id
      type
      owner
      payload
    }
  }
`;

export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        owner
        type
        payload
        updatedAt
      }
      nextToken
    }
  }
`;
export const listNotificationsByOwnerSortByCreatedAt = /* GraphQL */ `
  query ListNotificationsByOwnerSortByCreatedAt(
    $owner: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotificationsByOwnerSortByCreatedAt(
      owner: $owner
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        owner
        type
        payload
        updatedAt
      }
      nextToken
    }
  }
`;
