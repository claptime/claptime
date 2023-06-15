import { gql } from '@apollo/client';
import { Storage } from 'aws-amplify';
import consts from 'claptime/consts';
import { env } from 'claptime/lib/amplify';
import { unauthClient } from 'claptime/lib/apollo';

const clone = (value) => JSON.parse(JSON.stringify(value));

const removeKey = (obj, key) =>
  obj !== Object(obj) // eslint-disable-line no-nested-ternary
    ? obj
    : Array.isArray(obj)
    ? obj.map((item) => removeKey(item, key))
    : Object.keys(obj)
        .filter((k) => k !== key)
        .reduce(
          (acc, x) => Object.assign(acc, { [x]: removeKey(obj[x], key) }),
          {},
        );

const getCollectionbySlug = async (slug) => {
  const {
    data: {
      listCollectionsBySlug: {
        items: [collection],
      },
    },
  } = await unauthClient.query({
    query: gql(`
      query ListCollectionsBySlug($slug: String) {
        listCollectionsBySlug(slug: $slug, limit: 1) {
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
            profile {
              name
              biography
              links {
                type
                url
              }
            }
          }
        }
      }
    `),
    variables: {
      slug,
    },
  });
  const res = clone(collection);
  res.coverUrl = await Storage.get(
    `collections/${collection.id}/${consts.collections.covers.filenames.CROPPED_1500_300}`,
  );
  return res;
};

const getVideos = async (collectionId, categoryId) => {
  const allItems = [];
  let token;
  do {
    const {
      data: {
        listCollectionVideoNodesByCollectionAndCategorySortByCreatedAt: {
          items,
          nextToken,
        },
      },
    } = await unauthClient.query({
      query: gql(`
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
              videoNode {
                id
                createdAt
                title
                category
                duration
                releaseYear
                updatedAt
                synopsis
                festivals
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
            }
            nextToken
          }
        }
      `),
      variables: {
        collectionVideoNodeCollectionId: collectionId,
        categoryIdCreatedAt: {
          beginsWith: {
            categoryId,
          },
        },
        filter: {
          status: {
            eq: 'APPROVED',
          },
        },
        sortDirection: 'DESC',
        limit: 50,
        nextToken: token,
      },
    });
    allItems.push(...items);
    token = nextToken;
  } while (token);
  return await Promise.all(
    allItems
      .map(({ videoNode }) => videoNode)
      .map(async (video) => ({
        ...video,
        coverUrl: await Storage.get(
          `videoNodes/${video.id}/${consts.videos.covers.filenames.CROPPED_600_800}`,
        ),
        videoUrl: `https://cdn-${env}.clap-time.com/${video.id}/master.m3u8`,
      })),
  );
};

const fetchData = async (collectionSlug) => {
  // First retrieve collection
  const data = await getCollectionbySlug(collectionSlug);
  // Then add videos
  await Promise.all(
    data.categories.map(async (category) => {
      // eslint-disable-next-line no-param-reassign
      category.videos = await getVideos(data.id, category.id);
    }),
  );
  return data;
};

export default async function handler(req, res) {
  const data = await fetchData(req.query.collection);
  res.status(200).json(removeKey(data, '__typename'));
}
