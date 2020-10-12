export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification($owner: String!) {
    onCreateNotification(owner: $owner) {
      id
      type
      owner
      payload
      isRead
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
        isRead
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
        isRead
      }
      nextToken
    }
  }
`;

export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification($input: DeleteNotificationInput!) {
    deleteNotification(input: $input) {
      id
      createdAt
      owner
      type
      payload
      isRead
      updatedAt
    }
  }
`;

export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification($input: UpdateNotificationInput!) {
    updateNotification(input: $input) {
      id
      createdAt
      owner
      type
      payload
      isRead
      updatedAt
    }
  }
`;
