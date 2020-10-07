export const acceptsPayments = /* GraphQL */ `
  query AcceptsPayments($profileId: ID!) {
    acceptsPayments(profileId: $profileId) {
      status
      reason
      data
    }
  }
`;
export const connectToStripe = /* GraphQL */ `
  mutation ConnectToStripe($profileId: ID!, $authorizationCode: String!) {
    connectToStripe(
      profileId: $profileId
      authorizationCode: $authorizationCode
    ) {
      status
      reason
      data
    }
  }
`;

export const createPaymentIntent = /* GraphQL */ `
  mutation CreatePaymentIntent(
    $profileId: ID!
    $videoNodeId: ID
    $value: Float
  ) {
    createPaymentIntent(
      profileId: $profileId
      videoNodeId: $videoNodeId
      value: $value
    ) {
      status
      reason
      data
    }
  }
`;

export const getStripeAccessToken = /* GraphQL */ `
  query GetStripeAccessToken($profileId: ID!) {
    getStripeAccessToken(profileId: $profileId) {
      status
      reason
      data
    }
  }
`;

export const revokeStripe = /* GraphQL */ `
  mutation RevokeStripe($profileId: ID!) {
    revokeStripe(profileId: $profileId) {
      status
      reason
      data
    }
  }
`;
