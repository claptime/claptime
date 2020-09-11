export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification($userId: String!) {
    onCreateNotification(userId: $userId) {
      id
      type
      userId
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
        userId
        payload
        updatedAt
      }
      nextToken
    }
  }
`;
