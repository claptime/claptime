/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onUpdateVideoNode = /* GraphQL */ `
  subscription OnUpdateVideoNode($id: String!) {
    onUpdateVideoNode(id: $id) {
      id
      title
      status
      videoNodeProfileId
      category
      duration
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
            collectionStarringVideoNodeId
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
            collectionStarringVideoNodeId
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
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification($owner: String!) {
    onCreateNotification(owner: $owner) {
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
