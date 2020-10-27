import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Storage } from 'aws-amplify';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { gql } from '@apollo/client';

import consts from 'claptime/consts';
import { Covers, Title } from 'claptime/components/atoms';
import { DynamicVideosList } from 'claptime/components/organisms/VideosList';
import NavBarTemplate from 'claptime/components/templates/NavBarTemplate';
import {
  listCollectionsBySlug,
  listCollectionVideoNodesByCollectionAndCategorySortByCreatedAt,
} from 'claptime/graphql/collections';
import { unauthClient, useQueryList } from 'claptime/lib/apollo';
import Head from 'claptime/lib/seo/Head';
import PropTypes from 'claptime/lib/prop-types';

export async function getServerSideProps(ctx) {
  const [
    {
      data: {
        listCollectionsBySlug: {
          items: [collection],
        },
      },
    },
    imageUrl,
  ] = await Promise.all([
    unauthClient.query({
      query: gql(listCollectionsBySlug),
      variables: { slug: ctx.query.collection },
    }),
    Storage.get(
      `collections/${ctx.query.collection}/${consts.collections.covers.filenames.CROPPED_1500_300}`,
    ),
  ]);
  return {
    props: {
      collection,
      imageUrl,
    },
  };
}

const CollectionCategoryPage = ({ collection, imageUrl }) => {
  const {
    query: { category: categoryId },
  } = useRouter();
  const { t } = useTranslation();

  const {
    items: collectionVideoNodes,
    response,
    hasMore,
    loadMore,
  } = useQueryList(
    listCollectionVideoNodesByCollectionAndCategorySortByCreatedAt,
    {
      variables: {
        collectionVideoNodeCollectionId: collection?.id,
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
        limit: 20,
      },
    },
    {
      resultPath:
        '$.listCollectionVideoNodesByCollectionAndCategorySortByCreatedAt',
    },
  );

  if (response) return response;

  const category = collection.categories.find(({ id }) => id === categoryId)
    ?.category;

  return (
    <>
      <Head
        page="collection/category"
        params={{
          collection: collection.name,
          category,
        }}
        imageUrl={imageUrl}
      />
      <NavBarTemplate collapsed>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Covers.Collection collectionId={collection.id} />
          <div style={{ padding: '0 9%' }}>
            <div style={{ margin: '16px 0' }}>
              <Link
                href="/collection/[collection]"
                as={`/collection/${collection.slug}`}
              >
                <a>
                  <ArrowLeftOutlined />
                  &nbsp;{t('collection.category.backToCollection')}
                </a>
              </Link>
            </div>
            <Title>{`${category} / ${collection.name}`}</Title>
            <DynamicVideosList
              videos={collectionVideoNodes.map(({ videoNode }) => videoNode)}
              hasMore={hasMore}
              loadMore={loadMore}
            />
          </div>
        </div>
      </NavBarTemplate>
    </>
  );
};

CollectionCategoryPage.propTypes = {
  collection: PropTypes.claptime.collection.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default CollectionCategoryPage;
