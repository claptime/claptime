import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';

import { Covers } from 'claptime/components/atoms';
import { Links } from 'claptime/components/molecules';
import { StaticVideosList } from 'claptime/components/organisms/VideosList';
import NavBarTemplate from 'claptime/components/templates/NavBarTemplate';
import consts from 'claptime/consts';
import {
  getCollection,
  listCollectionVideoNodesByCollectionAndCategorySortByCreatedAt,
} from 'claptime/graphql/collections';
import { useQueryGet, useQueryList } from 'claptime/lib/apollo';
import PropTypes from 'claptime/lib/prop-types';
import { shuffle } from 'claptime/utils';
import Head from 'claptime/lib/seo/Head';

const { Title, Paragraph } = Typography;

const {
  device: { mobileS, laptop },
} = consts;

const StyledHeader = styled.div`
  @media ${mobileS} {
    display: flex;
    flex-direction: column;
    p {
      text-align: left;
      width: 100%;
    }
  }
  @media ${laptop} {
    flex-direction: row;
    p {
      text-align: right;
    }
  }
`;

const LaLuciolePage = ({ collectionId, collectionCategoryId }) => {
  const [shuffleSeed, setShuffleSeed] = useState();

  const { item: collection, response: collectionResponse } = useQueryGet(
    getCollection,
    {
      variables: {
        id: collectionId,
      },
    },
    {
      resultPath: '$.getCollection',
    },
  );

  const {
    items: collectionVideoNodes,
    response: collectionVideoNodesResponse,
  } = useQueryList(
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
    if (collectionVideoNodes) {
      setShuffleSeed(Math.floor(Math.random() * collectionVideoNodes.length));
    }
  }, [collectionVideoNodes]);
  if (collectionResponse) return collectionResponse;
  if (collectionVideoNodesResponse) return collectionVideoNodesResponse;

  const videoNodes = shuffle(collectionVideoNodes, shuffleSeed).map(
    ({ videoNode }) => videoNode,
  );

  return (
    <>
      <Head page="laLuciole" />
      <NavBarTemplate>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Covers.Collection collectionId={collectionId} shadow={false} />
          <div style={{ padding: '0 9%' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                padding: '18px 0',
              }}
            >
              <StyledHeader>
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                  }}
                >
                  <Title level={1} ellipsis={{ rows: 2 }}>
                    {collection.name}
                  </Title>
                  <div style={{ flexGrow: 1 }} />
                  <Links.Buttons links={collection.links} />
                </div>
              </StyledHeader>
              <Typography.Title level={3} style={{ fontWeight: 'normal' }}>
                {collection.tagline}
              </Typography.Title>
            </div>
            <Paragraph>{collection.description}</Paragraph>
          </div>
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
