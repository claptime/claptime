import React from 'react';
import { Typography } from 'antd';
import { Trans } from 'react-i18next';

import styled from 'styled-components';
import consts from 'consts';

import { Covers, TextExpand } from 'claptime/components/atoms';
import { AddToList, Links, ProfileLink } from 'claptime/components/molecules';
import PropTypes from 'claptime/lib/prop-types';
import StarringVideoNodesCarousel from './StarringVideoNodesCarousel';
import CategoryCarousel from './CategoryCarousel';

const { Title } = Typography;

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

const Collection = ({ collection }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Covers.Collection collectionId={collection.id} shadow={false} />
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
              <AddToList
                id={collection.id}
                type="Collection"
                list="SUBSCRIBED"
                style={{ marginLeft: 16 }}
              />
              <div style={{ flexGrow: 1 }} />
              <Links.Buttons links={collection.links} />
            </div>
            <p
              style={{
                fontWeight: 'bold',
                fontVariant: 'small-caps',
              }}
            >
              <Trans i18nKey="collection.curatedBy">
                <span>Une collection animée par</span>
                <ProfileLink
                  profile={collection.profile}
                  popoverPlacement="topLeft"
                />
              </Trans>
            </p>
          </StyledHeader>
          <Typography.Title level={3} style={{ fontWeight: 'normal' }}>
            {collection.tagline}
          </Typography.Title>
        </div>
        <TextExpand text={collection.description} excerptLength={500} />
      </div>
      <StarringVideoNodesCarousel items={collection.starringVideoNodes.items} />
      {collection.categories.map((category) => (
        <CategoryCarousel
          key={category.id}
          collectionId={collection.id}
          collectionSlug={collection.slug}
          category={category}
        />
      ))}
    </div>
  );
};

Collection.propTypes = {
  collection: PropTypes.claptime.collection.isRequired,
};

export default Collection;
