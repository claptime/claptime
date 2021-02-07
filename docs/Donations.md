# 💸 Donations

## Stripe for creators

We are following [this process](https://stripe.com/docs/connect/standard-accounts).

### Connect

```mermaid
sequenceDiagram
  Creator-->>ClaptimeFrontend: Click on "Connect with Stripe"
  ClaptimeFrontend->>+StripeAPI: redirectToStripe(claptimeClientId)
  Creator-->>StripeAPI: User log in on sign in
  StripeAPI->>-ClaptimeFrontend: redirectToClaptime(authorizationCode)
  ClaptimeFrontend->>+ClaptimeAPI: connectToStripe(profileId, authorizationCode)
  ClaptimeAPI->>+StripeAPI: getAccessToken(authorizationCode)
  StripeAPI->>-ClaptimeAPI: accessToken
  ClaptimeAPI->>ClaptimeDB: persistAccessToken(accessToken)
  ClaptimeAPI->>-ClaptimeFrontend: OK
```

### Revoke

```mermaid
sequenceDiagram
  Creator-->>ClaptimeFrontend: Click on "Unassociate Stripe"
  ClaptimeFrontend->>+ClaptimeAPI: revokeStripe(profileId)
  ClaptimeAPI->>+ClaptimeDB: getStripeUserId(profileId)
  ClaptimeDB->>-ClaptimeAPI: userId
  ClaptimeAPI->>StripeAPI: revoke(userId)
  ClaptimeAPI->>ClaptimeDB: deleteItem(profileId)
  ClaptimeAPI->>-ClaptimeFrontend: OK
```

### Webhooks

Stripe can be configured to query our endpoint in case of some events (see [webhooks](https://stripe.com/docs/connect/webhooks)).
We configured it to be alerted in case of `account.application.deauthorized`.

```mermaid
sequenceDiagram
  StripeAPI->>+ClaptimeAPI: (event: account.application.deauthorized, account)
  ClaptimeAPI->>ClaptimeDB: deleteByStripeId(account)
  ClaptimeAPI->>-StripeAPI: OK
```
