/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const acceptsPayments = /* GraphQL */ `
  query AcceptsPayments($profileId: ID!) {
    acceptsPayments(profileId: $profileId) {
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
export const listViews = /* GraphQL */ `
  query ListViews(
    $viewVideoNodeId: String
    $id: ModelIDKeyConditionInput
    $filter: ModelViewFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listViews(
      viewVideoNodeId: $viewVideoNodeId
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        viewVideoNodeId
        createdAt
        owner
        updatedAt
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
          views {
            nextToken
          }
          donationsAvailable
          videoNodeNextNodeId
          videoNodeParentNodeId
          type
          nodeType
          childrenCount
          likesCount
          collections {
            nextToken
          }
          credits {
            nextToken
          }
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
          nextNode {
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
            likesCount
          }
          parentNode {
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
            likesCount
          }
          childNodes {
            nextToken
          }
        }
      }
      nextToken
    }
  }
`;
export const listCollections = /* GraphQL */ `
  query ListCollections(
    $filter: ModelCollectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        slug
        name
        status
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
        updatedAt
        videoNodes {
          items {
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
          nextToken
        }
        profile {
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
          updatedAt
          collections {
            nextToken
          }
          roles {
            nextToken
          }
          videoNodes {
            nextToken
          }
        }
      }
      nextToken
    }
  }
`;
export const getCollection = /* GraphQL */ `
  query GetCollection($id: ID!) {
    getCollection(id: $id) {
      id
      slug
      name
      status
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
      updatedAt
      videoNodes {
        items {
          id
          collectionVideoNodeCollectionId
          status
          categoryId
          rejectionReason
          collectionVideoNodeVideoNodeId
          createdAt
          updatedAt
          owner
          collection {
            id
            slug
            name
            status
            tagline
            description
            collectionProfileId
            searchField
            createdBy
            createdAt
            owner
            updatedAt
          }
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
            donationsAvailable
            videoNodeNextNodeId
            videoNodeParentNodeId
            type
            nodeType
            childrenCount
            likesCount
          }
        }
        nextToken
      }
      profile {
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
        updatedAt
        collections {
          items {
            id
            slug
            name
            status
            tagline
            description
            collectionProfileId
            searchField
            createdBy
            createdAt
            owner
            updatedAt
          }
          nextToken
        }
        roles {
          items {
            id
            role
            customProfile
            creditVideoId
            creditVideoNodeId
            owner
            createdAt
            updatedAt
          }
          nextToken
        }
        videoNodes {
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
            videoNodeNextNodeId
            videoNodeParentNodeId
            type
            nodeType
            childrenCount
            likesCount
          }
          nextToken
        }
      }
    }
  }
`;
export const listCollectionsBySlug = /* GraphQL */ `
  query ListCollectionsBySlug(
    $slug: String
    $sortDirection: ModelSortDirection
    $filter: ModelCollectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollectionsBySlug(
      slug: $slug
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        slug
        name
        status
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
        updatedAt
        videoNodes {
          items {
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
          nextToken
        }
        profile {
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
          updatedAt
          collections {
            nextToken
          }
          roles {
            nextToken
          }
          videoNodes {
            nextToken
          }
        }
      }
      nextToken
    }
  }
`;
export const getCollectionVideoNode = /* GraphQL */ `
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
      collection {
        id
        slug
        name
        status
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
        updatedAt
        videoNodes {
          items {
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
          nextToken
        }
        profile {
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
          updatedAt
          collections {
            nextToken
          }
          roles {
            nextToken
          }
          videoNodes {
            nextToken
          }
        }
      }
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
        views {
          items {
            id
            viewVideoNodeId
            createdAt
            owner
            updatedAt
          }
          nextToken
        }
        donationsAvailable
        videoNodeNextNodeId
        videoNodeParentNodeId
        type
        nodeType
        childrenCount
        likesCount
        collections {
          items {
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
          nextToken
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
          }
          nextToken
        }
        profile {
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
          updatedAt
          collections {
            nextToken
          }
          roles {
            nextToken
          }
          videoNodes {
            nextToken
          }
        }
        nextNode {
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
          views {
            nextToken
          }
          donationsAvailable
          videoNodeNextNodeId
          videoNodeParentNodeId
          type
          nodeType
          childrenCount
          likesCount
          collections {
            nextToken
          }
          credits {
            nextToken
          }
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
          nextNode {
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
            likesCount
          }
          parentNode {
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
            likesCount
          }
          childNodes {
            nextToken
          }
        }
        parentNode {
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
          views {
            nextToken
          }
          donationsAvailable
          videoNodeNextNodeId
          videoNodeParentNodeId
          type
          nodeType
          childrenCount
          likesCount
          collections {
            nextToken
          }
          credits {
            nextToken
          }
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
          nextNode {
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
            likesCount
          }
          parentNode {
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
            likesCount
          }
          childNodes {
            nextToken
          }
        }
        childNodes {
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
            videoNodeNextNodeId
            videoNodeParentNodeId
            type
            nodeType
            childrenCount
            likesCount
          }
          nextToken
        }
      }
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
    ) {
      items {
        id
        collectionVideoNodeCollectionId
        status
        categoryId
        rejectionReason
        collectionVideoNodeVideoNodeId
        createdAt
        updatedAt
        owner
        collection {
          id
          slug
          name
          status
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
          updatedAt
          videoNodes {
            nextToken
          }
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
          views {
            nextToken
          }
          donationsAvailable
          videoNodeNextNodeId
          videoNodeParentNodeId
          type
          nodeType
          childrenCount
          likesCount
          collections {
            nextToken
          }
          credits {
            nextToken
          }
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
          nextNode {
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
            likesCount
          }
          parentNode {
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
            likesCount
          }
          childNodes {
            nextToken
          }
        }
      }
      nextToken
    }
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
    ) {
      items {
        id
        collectionVideoNodeCollectionId
        status
        categoryId
        rejectionReason
        collectionVideoNodeVideoNodeId
        createdAt
        updatedAt
        owner
        collection {
          id
          slug
          name
          status
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
          updatedAt
          videoNodes {
            nextToken
          }
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
          views {
            nextToken
          }
          donationsAvailable
          videoNodeNextNodeId
          videoNodeParentNodeId
          type
          nodeType
          childrenCount
          likesCount
          collections {
            nextToken
          }
          credits {
            nextToken
          }
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
          nextNode {
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
            likesCount
          }
          parentNode {
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
            likesCount
          }
          childNodes {
            nextToken
          }
        }
      }
      nextToken
    }
  }
`;
export const listCollectionVideoNodesByCollectionAndStatus = /* GraphQL */ `
  query ListCollectionVideoNodesByCollectionAndStatus(
    $collectionVideoNodeCollectionId: ID
    $status: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCollectionVideoNodeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollectionVideoNodesByCollectionAndStatus(
      collectionVideoNodeCollectionId: $collectionVideoNodeCollectionId
      status: $status
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        collectionVideoNodeCollectionId
        status
        categoryId
        rejectionReason
        collectionVideoNodeVideoNodeId
        createdAt
        updatedAt
        owner
        collection {
          id
          slug
          name
          status
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
          updatedAt
          videoNodes {
            nextToken
          }
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
          views {
            nextToken
          }
          donationsAvailable
          videoNodeNextNodeId
          videoNodeParentNodeId
          type
          nodeType
          childrenCount
          likesCount
          collections {
            nextToken
          }
          credits {
            nextToken
          }
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
          nextNode {
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
            likesCount
          }
          parentNode {
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
            likesCount
          }
          childNodes {
            nextToken
          }
        }
      }
      nextToken
    }
  }
`;
export const listCredits = /* GraphQL */ `
  query ListCredits(
    $filter: ModelCreditFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCredits(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
          links {
            type
            url
          }
          searchField
          createdAt
          createdBy
          owner
          updatedAt
          collections {
            nextToken
          }
          roles {
            nextToken
          }
          videoNodes {
            nextToken
          }
        }
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
          views {
            nextToken
          }
          donationsAvailable
          videoNodeNextNodeId
          videoNodeParentNodeId
          type
          nodeType
          childrenCount
          likesCount
          collections {
            nextToken
          }
          credits {
            nextToken
          }
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
          nextNode {
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
            likesCount
          }
          parentNode {
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
            likesCount
          }
          childNodes {
            nextToken
          }
        }
      }
      nextToken
    }
  }
`;
export const getNews = /* GraphQL */ `
  query GetNews($id: ID!) {
    getNews(id: $id) {
      id
      title
      description
      button {
        text
        url
      }
      links {
        type
        url
      }
      createdAt
      createdBy
      owner
      updatedAt
    }
  }
`;
export const listNews = /* GraphQL */ `
  query ListNews(
    $filter: ModelNewsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNews(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        button {
          text
          url
        }
        links {
          type
          url
        }
        createdAt
        createdBy
        owner
        updatedAt
      }
      nextToken
    }
  }
`;
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
        updatedAt
        collections {
          items {
            id
            slug
            name
            status
            tagline
            description
            collectionProfileId
            searchField
            createdBy
            createdAt
            owner
            updatedAt
          }
          nextToken
        }
        roles {
          items {
            id
            role
            customProfile
            creditVideoId
            creditVideoNodeId
            owner
            createdAt
            updatedAt
          }
          nextToken
        }
        videoNodes {
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
            videoNodeNextNodeId
            videoNodeParentNodeId
            type
            nodeType
            childrenCount
            likesCount
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getProfile = /* GraphQL */ `
  query GetProfile($id: ID!) {
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
      updatedAt
      collections {
        items {
          id
          slug
          name
          status
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
          updatedAt
          videoNodes {
            nextToken
          }
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
      roles {
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
            donationsAvailable
            videoNodeNextNodeId
            videoNodeParentNodeId
            type
            nodeType
            childrenCount
            likesCount
          }
        }
        nextToken
      }
      videoNodes {
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
          views {
            nextToken
          }
          donationsAvailable
          videoNodeNextNodeId
          videoNodeParentNodeId
          type
          nodeType
          childrenCount
          likesCount
          collections {
            nextToken
          }
          credits {
            nextToken
          }
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
          nextNode {
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
            likesCount
          }
          parentNode {
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
            likesCount
          }
          childNodes {
            nextToken
          }
        }
        nextToken
      }
    }
  }
`;
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
      collections {
        items {
          list
          userSettingsCollectionsId
          userCollectionCollectionId
          createdAt
          updatedAt
          collection {
            id
            slug
            name
            status
            tagline
            description
            collectionProfileId
            searchField
            createdBy
            createdAt
            owner
            updatedAt
          }
        }
        nextToken
      }
      profiles {
        items {
          list
          userSettingsProfilesId
          userProfileProfileId
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
      owner
      createdAt
      updatedAt
      videoNodes {
        items {
          list
          userSettingsVideoNodesId
          userVideoNodeVideoNodeId
          createdAt
          updatedAt
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
            donationsAvailable
            videoNodeNextNodeId
            videoNodeParentNodeId
            type
            nodeType
            childrenCount
            likesCount
          }
        }
        nextToken
      }
    }
  }
`;
export const listUserVideoNodes = /* GraphQL */ `
  query ListUserVideoNodes(
    $userSettingsVideoNodesId: String
    $listUserVideoNodeVideoNodeId: ModelUserVideoNodePrimaryCompositeKeyConditionInput
    $filter: ModelUserVideoNodeFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUserVideoNodes(
      userSettingsVideoNodesId: $userSettingsVideoNodesId
      listUserVideoNodeVideoNodeId: $listUserVideoNodeVideoNodeId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        list
        userSettingsVideoNodesId
        userVideoNodeVideoNodeId
        createdAt
        updatedAt
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
          views {
            nextToken
          }
          donationsAvailable
          videoNodeNextNodeId
          videoNodeParentNodeId
          type
          nodeType
          childrenCount
          likesCount
          collections {
            nextToken
          }
          credits {
            nextToken
          }
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
          nextNode {
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
            likesCount
          }
          parentNode {
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
            likesCount
          }
          childNodes {
            nextToken
          }
        }
      }
      nextToken
    }
  }
`;
export const listUserVideoNodesByVideoNodeAndList = /* GraphQL */ `
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
          views {
            nextToken
          }
          donationsAvailable
          videoNodeNextNodeId
          videoNodeParentNodeId
          type
          nodeType
          childrenCount
          likesCount
          collections {
            nextToken
          }
          credits {
            nextToken
          }
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
          nextNode {
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
            likesCount
          }
          parentNode {
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
            likesCount
          }
          childNodes {
            nextToken
          }
        }
      }
      nextToken
    }
  }
`;
export const listVideoNodes = /* GraphQL */ `
  query ListVideoNodes(
    $filter: ModelVideoNodeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVideoNodes(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        views {
          items {
            id
            viewVideoNodeId
            createdAt
            owner
            updatedAt
          }
          nextToken
        }
        donationsAvailable
        videoNodeNextNodeId
        videoNodeParentNodeId
        type
        nodeType
        childrenCount
        likesCount
        collections {
          items {
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
          nextToken
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
          }
          nextToken
        }
        profile {
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
          updatedAt
          collections {
            nextToken
          }
          roles {
            nextToken
          }
          videoNodes {
            nextToken
          }
        }
        nextNode {
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
          views {
            nextToken
          }
          donationsAvailable
          videoNodeNextNodeId
          videoNodeParentNodeId
          type
          nodeType
          childrenCount
          likesCount
          collections {
            nextToken
          }
          credits {
            nextToken
          }
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
          nextNode {
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
            likesCount
          }
          parentNode {
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
            likesCount
          }
          childNodes {
            nextToken
          }
        }
        parentNode {
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
          views {
            nextToken
          }
          donationsAvailable
          videoNodeNextNodeId
          videoNodeParentNodeId
          type
          nodeType
          childrenCount
          likesCount
          collections {
            nextToken
          }
          credits {
            nextToken
          }
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
          nextNode {
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
            likesCount
          }
          parentNode {
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
            likesCount
          }
          childNodes {
            nextToken
          }
        }
        childNodes {
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
            videoNodeNextNodeId
            videoNodeParentNodeId
            type
            nodeType
            childrenCount
            likesCount
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getVideoNode = /* GraphQL */ `
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
      views {
        items {
          id
          viewVideoNodeId
          createdAt
          owner
          updatedAt
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
            donationsAvailable
            videoNodeNextNodeId
            videoNodeParentNodeId
            type
            nodeType
            childrenCount
            likesCount
          }
        }
        nextToken
      }
      donationsAvailable
      videoNodeNextNodeId
      videoNodeParentNodeId
      type
      nodeType
      childrenCount
      likesCount
      collections {
        items {
          id
          collectionVideoNodeCollectionId
          status
          categoryId
          rejectionReason
          collectionVideoNodeVideoNodeId
          createdAt
          updatedAt
          owner
          collection {
            id
            slug
            name
            status
            tagline
            description
            collectionProfileId
            searchField
            createdBy
            createdAt
            owner
            updatedAt
          }
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
            donationsAvailable
            videoNodeNextNodeId
            videoNodeParentNodeId
            type
            nodeType
            childrenCount
            likesCount
          }
        }
        nextToken
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
            donationsAvailable
            videoNodeNextNodeId
            videoNodeParentNodeId
            type
            nodeType
            childrenCount
            likesCount
          }
        }
        nextToken
      }
      profile {
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
        updatedAt
        collections {
          items {
            id
            slug
            name
            status
            tagline
            description
            collectionProfileId
            searchField
            createdBy
            createdAt
            owner
            updatedAt
          }
          nextToken
        }
        roles {
          items {
            id
            role
            customProfile
            creditVideoId
            creditVideoNodeId
            owner
            createdAt
            updatedAt
          }
          nextToken
        }
        videoNodes {
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
            videoNodeNextNodeId
            videoNodeParentNodeId
            type
            nodeType
            childrenCount
            likesCount
          }
          nextToken
        }
      }
      nextNode {
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
        views {
          items {
            id
            viewVideoNodeId
            createdAt
            owner
            updatedAt
          }
          nextToken
        }
        donationsAvailable
        videoNodeNextNodeId
        videoNodeParentNodeId
        type
        nodeType
        childrenCount
        likesCount
        collections {
          items {
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
          nextToken
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
          }
          nextToken
        }
        profile {
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
          updatedAt
          collections {
            nextToken
          }
          roles {
            nextToken
          }
          videoNodes {
            nextToken
          }
        }
        nextNode {
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
          views {
            nextToken
          }
          donationsAvailable
          videoNodeNextNodeId
          videoNodeParentNodeId
          type
          nodeType
          childrenCount
          likesCount
          collections {
            nextToken
          }
          credits {
            nextToken
          }
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
          nextNode {
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
            likesCount
          }
          parentNode {
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
            likesCount
          }
          childNodes {
            nextToken
          }
        }
        parentNode {
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
          views {
            nextToken
          }
          donationsAvailable
          videoNodeNextNodeId
          videoNodeParentNodeId
          type
          nodeType
          childrenCount
          likesCount
          collections {
            nextToken
          }
          credits {
            nextToken
          }
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
          nextNode {
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
            likesCount
          }
          parentNode {
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
            likesCount
          }
          childNodes {
            nextToken
          }
        }
        childNodes {
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
            videoNodeNextNodeId
            videoNodeParentNodeId
            type
            nodeType
            childrenCount
            likesCount
          }
          nextToken
        }
      }
      parentNode {
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
        views {
          items {
            id
            viewVideoNodeId
            createdAt
            owner
            updatedAt
          }
          nextToken
        }
        donationsAvailable
        videoNodeNextNodeId
        videoNodeParentNodeId
        type
        nodeType
        childrenCount
        likesCount
        collections {
          items {
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
          nextToken
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
          }
          nextToken
        }
        profile {
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
          updatedAt
          collections {
            nextToken
          }
          roles {
            nextToken
          }
          videoNodes {
            nextToken
          }
        }
        nextNode {
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
          views {
            nextToken
          }
          donationsAvailable
          videoNodeNextNodeId
          videoNodeParentNodeId
          type
          nodeType
          childrenCount
          likesCount
          collections {
            nextToken
          }
          credits {
            nextToken
          }
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
          nextNode {
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
            likesCount
          }
          parentNode {
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
            likesCount
          }
          childNodes {
            nextToken
          }
        }
        parentNode {
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
          views {
            nextToken
          }
          donationsAvailable
          videoNodeNextNodeId
          videoNodeParentNodeId
          type
          nodeType
          childrenCount
          likesCount
          collections {
            nextToken
          }
          credits {
            nextToken
          }
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
          nextNode {
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
            likesCount
          }
          parentNode {
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
            likesCount
          }
          childNodes {
            nextToken
          }
        }
        childNodes {
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
            videoNodeNextNodeId
            videoNodeParentNodeId
            type
            nodeType
            childrenCount
            likesCount
          }
          nextToken
        }
      }
      childNodes {
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
          views {
            nextToken
          }
          donationsAvailable
          videoNodeNextNodeId
          videoNodeParentNodeId
          type
          nodeType
          childrenCount
          likesCount
          collections {
            nextToken
          }
          credits {
            nextToken
          }
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
          nextNode {
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
            likesCount
          }
          parentNode {
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
            likesCount
          }
          childNodes {
            nextToken
          }
        }
        nextToken
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
        views {
          items {
            id
            viewVideoNodeId
            createdAt
            owner
            updatedAt
          }
          nextToken
        }
        donationsAvailable
        videoNodeNextNodeId
        videoNodeParentNodeId
        type
        nodeType
        childrenCount
        likesCount
        collections {
          items {
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
          nextToken
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
          }
          nextToken
        }
        profile {
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
          updatedAt
          collections {
            nextToken
          }
          roles {
            nextToken
          }
          videoNodes {
            nextToken
          }
        }
        nextNode {
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
          views {
            nextToken
          }
          donationsAvailable
          videoNodeNextNodeId
          videoNodeParentNodeId
          type
          nodeType
          childrenCount
          likesCount
          collections {
            nextToken
          }
          credits {
            nextToken
          }
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
          nextNode {
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
            likesCount
          }
          parentNode {
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
            likesCount
          }
          childNodes {
            nextToken
          }
        }
        parentNode {
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
          views {
            nextToken
          }
          donationsAvailable
          videoNodeNextNodeId
          videoNodeParentNodeId
          type
          nodeType
          childrenCount
          likesCount
          collections {
            nextToken
          }
          credits {
            nextToken
          }
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
          nextNode {
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
            likesCount
          }
          parentNode {
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
            likesCount
          }
          childNodes {
            nextToken
          }
        }
        childNodes {
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
            videoNodeNextNodeId
            videoNodeParentNodeId
            type
            nodeType
            childrenCount
            likesCount
          }
          nextToken
        }
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
        views {
          items {
            id
            viewVideoNodeId
            createdAt
            owner
            updatedAt
          }
          nextToken
        }
        donationsAvailable
        videoNodeNextNodeId
        videoNodeParentNodeId
        type
        nodeType
        childrenCount
        likesCount
        collections {
          items {
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
          nextToken
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
          }
          nextToken
        }
        profile {
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
          updatedAt
          collections {
            nextToken
          }
          roles {
            nextToken
          }
          videoNodes {
            nextToken
          }
        }
        nextNode {
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
          views {
            nextToken
          }
          donationsAvailable
          videoNodeNextNodeId
          videoNodeParentNodeId
          type
          nodeType
          childrenCount
          likesCount
          collections {
            nextToken
          }
          credits {
            nextToken
          }
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
          nextNode {
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
            likesCount
          }
          parentNode {
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
            likesCount
          }
          childNodes {
            nextToken
          }
        }
        parentNode {
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
          views {
            nextToken
          }
          donationsAvailable
          videoNodeNextNodeId
          videoNodeParentNodeId
          type
          nodeType
          childrenCount
          likesCount
          collections {
            nextToken
          }
          credits {
            nextToken
          }
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
          nextNode {
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
            likesCount
          }
          parentNode {
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
            likesCount
          }
          childNodes {
            nextToken
          }
        }
        childNodes {
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
            videoNodeNextNodeId
            videoNodeParentNodeId
            type
            nodeType
            childrenCount
            likesCount
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const listVideoNodesByParent = /* GraphQL */ `
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
        views {
          items {
            id
            viewVideoNodeId
            createdAt
            owner
            updatedAt
          }
          nextToken
        }
        donationsAvailable
        videoNodeNextNodeId
        videoNodeParentNodeId
        type
        nodeType
        childrenCount
        likesCount
        collections {
          items {
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
          nextToken
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
          }
          nextToken
        }
        profile {
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
          updatedAt
          collections {
            nextToken
          }
          roles {
            nextToken
          }
          videoNodes {
            nextToken
          }
        }
        nextNode {
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
          views {
            nextToken
          }
          donationsAvailable
          videoNodeNextNodeId
          videoNodeParentNodeId
          type
          nodeType
          childrenCount
          likesCount
          collections {
            nextToken
          }
          credits {
            nextToken
          }
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
          nextNode {
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
            likesCount
          }
          parentNode {
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
            likesCount
          }
          childNodes {
            nextToken
          }
        }
        parentNode {
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
          views {
            nextToken
          }
          donationsAvailable
          videoNodeNextNodeId
          videoNodeParentNodeId
          type
          nodeType
          childrenCount
          likesCount
          collections {
            nextToken
          }
          credits {
            nextToken
          }
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
          nextNode {
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
            likesCount
          }
          parentNode {
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
            likesCount
          }
          childNodes {
            nextToken
          }
        }
        childNodes {
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
            videoNodeNextNodeId
            videoNodeParentNodeId
            type
            nodeType
            childrenCount
            likesCount
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
