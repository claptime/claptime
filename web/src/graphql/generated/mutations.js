/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addEpisodeToSeries = /* GraphQL */ `
  mutation AddEpisodeToSeries(
    $seriesVideoNodeId: String!
    $episodeVideoNodeId: String!
  ) {
    addEpisodeToSeries(
      seriesVideoNodeId: $seriesVideoNodeId
      episodeVideoNodeId: $episodeVideoNodeId
    ) {
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
      collections {
        items {
          id
          collectionVideoNodeCollectionId
          status
          categoryId
          review
          collectionVideoNodeVideoNodeId
          createdAt
          owner
          updatedAt
          collection {
            id
            slug
            name
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
        collections {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
            updatedAt
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
        collections {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
            updatedAt
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
export const addVideoNode = /* GraphQL */ `
  mutation AddVideoNode($profileId: ID!, $type: Type!) {
    addVideoNode(profileId: $profileId, type: $type) {
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
      collections {
        items {
          id
          collectionVideoNodeCollectionId
          status
          categoryId
          review
          collectionVideoNodeVideoNodeId
          createdAt
          owner
          updatedAt
          collection {
            id
            slug
            name
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
        collections {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
            updatedAt
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
        collections {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
            updatedAt
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
export const importVideo = /* GraphQL */ `
  mutation ImportVideo($videoNodeId: ID!, $videoLink: String!) {
    importVideo(videoNodeId: $videoNodeId, videoLink: $videoLink) {
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
      collections {
        items {
          id
          collectionVideoNodeCollectionId
          status
          categoryId
          review
          collectionVideoNodeVideoNodeId
          createdAt
          owner
          updatedAt
          collection {
            id
            slug
            name
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
        collections {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
            updatedAt
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
        collections {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
            updatedAt
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
export const publishVideoNode = /* GraphQL */ `
  mutation PublishVideoNode($videoNodeId: ID!) {
    publishVideoNode(videoNodeId: $videoNodeId) {
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
      collections {
        items {
          id
          collectionVideoNodeCollectionId
          status
          categoryId
          review
          collectionVideoNodeVideoNodeId
          createdAt
          owner
          updatedAt
          collection {
            id
            slug
            name
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
        collections {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
            updatedAt
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
        collections {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
            updatedAt
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
export const removeEpisodeFromSeries = /* GraphQL */ `
  mutation RemoveEpisodeFromSeries($videoNodeId: ID!) {
    removeEpisodeFromSeries(videoNodeId: $videoNodeId) {
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
      collections {
        items {
          id
          collectionVideoNodeCollectionId
          status
          categoryId
          review
          collectionVideoNodeVideoNodeId
          createdAt
          owner
          updatedAt
          collection {
            id
            slug
            name
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
        collections {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
            updatedAt
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
        collections {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
            updatedAt
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
      collections {
        items {
          id
          collectionVideoNodeCollectionId
          status
          categoryId
          review
          collectionVideoNodeVideoNodeId
          createdAt
          owner
          updatedAt
          collection {
            id
            slug
            name
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
        collections {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
            updatedAt
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
        collections {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
            updatedAt
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
      collections {
        items {
          id
          collectionVideoNodeCollectionId
          status
          categoryId
          review
          collectionVideoNodeVideoNodeId
          createdAt
          owner
          updatedAt
          collection {
            id
            slug
            name
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
        collections {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
            updatedAt
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
        collections {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
            updatedAt
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
      collections {
        items {
          id
          collectionVideoNodeCollectionId
          status
          categoryId
          review
          collectionVideoNodeVideoNodeId
          createdAt
          owner
          updatedAt
          collection {
            id
            slug
            name
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
        collections {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
            updatedAt
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
        collections {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
            updatedAt
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
export const unpublishVideoNode = /* GraphQL */ `
  mutation UnpublishVideoNode($videoNodeId: ID!) {
    unpublishVideoNode(videoNodeId: $videoNodeId) {
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
      collections {
        items {
          id
          collectionVideoNodeCollectionId
          status
          categoryId
          review
          collectionVideoNodeVideoNodeId
          createdAt
          owner
          updatedAt
          collection {
            id
            slug
            name
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
        collections {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
            updatedAt
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
        collections {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
            updatedAt
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
export const revokeStripe = /* GraphQL */ `
  mutation RevokeStripe($profileId: ID!) {
    revokeStripe(profileId: $profileId) {
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
export const notifyUser = /* GraphQL */ `
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
      reason
      data
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
export const createUserCollection = /* GraphQL */ `
  mutation CreateUserCollection($input: CreateUserCollectionInput!) {
    createUserCollection(input: $input) {
      list
      userSettingsCollectionsId
      userCollectionCollectionId
      createdAt
      updatedAt
      collection {
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
        updatedAt
        videoNodes {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
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
      }
    }
  }
`;
export const deleteUserCollection = /* GraphQL */ `
  mutation DeleteUserCollection($input: DeleteUserCollectionInput!) {
    deleteUserCollection(input: $input) {
      list
      userSettingsCollectionsId
      userCollectionCollectionId
      createdAt
      updatedAt
      collection {
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
        updatedAt
        videoNodes {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
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
      }
    }
  }
`;
export const createUserProfile = /* GraphQL */ `
  mutation CreateUserProfile($input: CreateUserProfileInput!) {
    createUserProfile(input: $input) {
      list
      userSettingsProfilesId
      userProfileProfileId
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
          items {
            id
            slug
            name
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
          }
          nextToken
        }
      }
    }
  }
`;
export const deleteUserProfile = /* GraphQL */ `
  mutation DeleteUserProfile($input: DeleteUserProfileInput!) {
    deleteUserProfile(input: $input) {
      list
      userSettingsProfilesId
      userProfileProfileId
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
          items {
            id
            slug
            name
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
          }
          nextToken
        }
      }
    }
  }
`;
export const createUserVideoNode = /* GraphQL */ `
  mutation CreateUserVideoNode($input: CreateUserVideoNodeInput!) {
    createUserVideoNode(input: $input) {
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
        collections {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
            updatedAt
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
          }
          nextToken
        }
      }
    }
  }
`;
export const deleteUserVideoNode = /* GraphQL */ `
  mutation DeleteUserVideoNode($input: DeleteUserVideoNodeInput!) {
    deleteUserVideoNode(input: $input) {
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
        collections {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
            updatedAt
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
          }
          nextToken
        }
      }
    }
  }
`;
export const createCollection = /* GraphQL */ `
  mutation CreateCollection($input: CreateCollectionInput!) {
    createCollection(input: $input) {
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
      updatedAt
      videoNodes {
        items {
          id
          collectionVideoNodeCollectionId
          status
          categoryId
          review
          collectionVideoNodeVideoNodeId
          createdAt
          owner
          updatedAt
          collection {
            id
            slug
            name
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
          }
          nextToken
        }
      }
    }
  }
`;
export const updateCollection = /* GraphQL */ `
  mutation UpdateCollection($input: UpdateCollectionInput!) {
    updateCollection(input: $input) {
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
      updatedAt
      videoNodes {
        items {
          id
          collectionVideoNodeCollectionId
          status
          categoryId
          review
          collectionVideoNodeVideoNodeId
          createdAt
          owner
          updatedAt
          collection {
            id
            slug
            name
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
          }
          nextToken
        }
      }
    }
  }
`;
export const deleteCollection = /* GraphQL */ `
  mutation DeleteCollection($input: DeleteCollectionInput!) {
    deleteCollection(input: $input) {
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
      updatedAt
      videoNodes {
        items {
          id
          collectionVideoNodeCollectionId
          status
          categoryId
          review
          collectionVideoNodeVideoNodeId
          createdAt
          owner
          updatedAt
          collection {
            id
            slug
            name
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
          }
          nextToken
        }
      }
    }
  }
`;
export const createCollectionVideoNode = /* GraphQL */ `
  mutation CreateCollectionVideoNode($input: CreateCollectionVideoNodeInput!) {
    createCollectionVideoNode(input: $input) {
      id
      collectionVideoNodeCollectionId
      status
      categoryId
      review
      collectionVideoNodeVideoNodeId
      createdAt
      owner
      updatedAt
      collection {
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
        updatedAt
        videoNodes {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
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
        collections {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
            updatedAt
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
          }
          nextToken
        }
      }
    }
  }
`;
export const deleteCollectionVideoNode = /* GraphQL */ `
  mutation DeleteCollectionVideoNode($input: DeleteCollectionVideoNodeInput!) {
    deleteCollectionVideoNode(input: $input) {
      id
      collectionVideoNodeCollectionId
      status
      categoryId
      review
      collectionVideoNodeVideoNodeId
      createdAt
      owner
      updatedAt
      collection {
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
        updatedAt
        videoNodes {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
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
        collections {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
            updatedAt
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
          }
          nextToken
        }
      }
    }
  }
`;
export const createCredit = /* GraphQL */ `
  mutation CreateCredit($input: CreateCreditInput!) {
    createCredit(input: $input) {
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
          items {
            id
            slug
            name
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
          }
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
        collections {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
            updatedAt
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
          }
          nextToken
        }
      }
    }
  }
`;
export const deleteCredit = /* GraphQL */ `
  mutation DeleteCredit($input: DeleteCreditInput!) {
    deleteCredit(input: $input) {
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
          items {
            id
            slug
            name
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
          }
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
        collections {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
            updatedAt
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
          }
          nextToken
        }
      }
    }
  }
`;
export const createNotification = /* GraphQL */ `
  mutation CreateNotification($input: CreateNotificationInput!) {
    createNotification(input: $input) {
      id
      createdAt
      owner
      type
      payload
      updatedAt
    }
  }
`;
export const createProfile = /* GraphQL */ `
  mutation CreateProfile($input: CreateProfileInput!) {
    createProfile(input: $input) {
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
export const updateProfile = /* GraphQL */ `
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
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
export const createUserSettings = /* GraphQL */ `
  mutation CreateUserSettings($input: CreateUserSettingsInput!) {
    createUserSettings(input: $input) {
      id
      clapValue
      uiState
      profileId
      notifications {
        type
        channel
        frequency
      }
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
          }
        }
        nextToken
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
          }
        }
        nextToken
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
    }
  }
`;
export const deleteUserSettings = /* GraphQL */ `
  mutation DeleteUserSettings($input: DeleteUserSettingsInput!) {
    deleteUserSettings(input: $input) {
      id
      clapValue
      uiState
      profileId
      notifications {
        type
        channel
        frequency
      }
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
          }
        }
        nextToken
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
    }
  }
`;
export const createVideoNode = /* GraphQL */ `
  mutation CreateVideoNode($input: CreateVideoNodeInput!) {
    createVideoNode(input: $input) {
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
      collections {
        items {
          id
          collectionVideoNodeCollectionId
          status
          categoryId
          review
          collectionVideoNodeVideoNodeId
          createdAt
          owner
          updatedAt
          collection {
            id
            slug
            name
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
        collections {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
            updatedAt
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
        collections {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
            updatedAt
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
export const updateVideoNode = /* GraphQL */ `
  mutation UpdateVideoNode($input: UpdateVideoNodeInput!) {
    updateVideoNode(input: $input) {
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
      collections {
        items {
          id
          collectionVideoNodeCollectionId
          status
          categoryId
          review
          collectionVideoNodeVideoNodeId
          createdAt
          owner
          updatedAt
          collection {
            id
            slug
            name
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
        collections {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
            updatedAt
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
        collections {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
            updatedAt
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
export const deleteVideoNode = /* GraphQL */ `
  mutation DeleteVideoNode($input: DeleteVideoNodeInput!) {
    deleteVideoNode(input: $input) {
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
      collections {
        items {
          id
          collectionVideoNodeCollectionId
          status
          categoryId
          review
          collectionVideoNodeVideoNodeId
          createdAt
          owner
          updatedAt
          collection {
            id
            slug
            name
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
        collections {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
            updatedAt
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
        collections {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
            updatedAt
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
export const createView = /* GraphQL */ `
  mutation CreateView($input: CreateViewInput!) {
    createView(input: $input) {
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
        collections {
          items {
            id
            collectionVideoNodeCollectionId
            status
            categoryId
            review
            collectionVideoNodeVideoNodeId
            createdAt
            owner
            updatedAt
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
          }
          nextToken
        }
      }
    }
  }
`;
