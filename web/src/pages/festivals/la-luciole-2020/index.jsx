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
  collectionId: 'fac6597e-9713-4d95-a982-eed3e91a70f7',
  collectionCategoryId: '3mSG3ezXS',
};

export default LaLuciolePage;
