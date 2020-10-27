import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Title } from 'claptime/components/atoms';
import { StaticVideosList } from 'claptime/components/organisms/VideosList';
import NavBarTemplate from 'claptime/components/templates/NavBarTemplate';
import consts from 'claptime/consts';
import { listCollectionVideoNodesByCollectionAndCategorySortByCreatedAt } from 'claptime/graphql/collections';
import { useQueryList } from 'claptime/lib/apollo';
import PropTypes from 'claptime/lib/prop-types';
import { shuffle } from 'claptime/utils';
import Head from 'claptime/lib/seo/Head';

const LaLuciolePage = ({ collectionId, collectionCategoryId }) => {
  const [shuffleSeed, setShuffleSeed] = useState();
  const { t } = useTranslation();

  const { items, response } = useQueryList(
    listCollectionVideoNodesByCollectionAndCategorySortByCreatedAt,
    {
      variables: {
        collectionVideoNodeCollectionId: collectionId,
        categoryIdCreatedAt: {
          beginsWith: {
            categoryId: collectionCategoryId,
          },
        },
        filter: {
          status: {
            eq: 'APPROVED',
          },
        },
      },
    },
    {
      resultPath:
        '$.listCollectionVideoNodesByCollectionAndCategorySortByCreatedAt',
      getAll: true,
    },
  );
  useEffect(() => {
    if (items) {
      setShuffleSeed(Math.floor(Math.random() * items.length));
    }
  }, [items]);
  if (response) return response;

  const videoNodes = shuffle(items, shuffleSeed).map(
    ({ videoNode }) => videoNode,
  );

  return (
    <>
      <Head page="laLuciole" />
      <NavBarTemplate>
        <div
          style={{
            minHeight: `calc(100vh - ${consts.style.navbar.height})`,
            padding: consts.style.padding.xl,
          }}
        >
          <Title>{t('laLuciolePage.title')}</Title>
          <StaticVideosList
            sortable={false}
            videos={videoNodes}
            sortBy="none"
          />
        </div>
      </NavBarTemplate>
    </>
  );
};

LaLuciolePage.propTypes = {
  collectionId: PropTypes.string,
  collectionCategoryId: PropTypes.string,
};

LaLuciolePage.defaultProps = {
  // TODO replace when collection is created
  collectionId: '4e4d8b71-d671-4b62-bbf1-d63741f73457',
  collectionCategoryId: 'ee5Ev5MHK',
};

export default LaLuciolePage;
