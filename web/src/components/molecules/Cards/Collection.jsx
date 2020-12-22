import React from 'react';

import Link from 'next/link';
import styled, { keyframes } from 'styled-components';
import { Typography } from 'antd';
import { Trans } from 'react-i18next';

import { Covers } from 'claptime/components/atoms';
import consts from 'claptime/consts';
import PropTypes from 'claptime/lib/prop-types';
import { rgbToRgba } from 'claptime/utils';
import AddToList from '../AddToList';
import ProfileLink from '../ProfileLink';

const collectionCardAppears = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Container = styled.div`
  animation: ${collectionCardAppears} 0.5s ease-in-out 0s 1;
  color: black;
  transition: transform 0.3s;

  :hover {
    transform: scale(1.01);
  }

  .curated-by {
    display: none;
    @media ${consts.device.tablet} {
      display: inline;
    }
  }
`;

const CollectionCard = ({ collection }) => {
  return (
    <Link href="/collection/[collection]" as={`/collection/${collection.slug}`}>
      <a>
        <Container
          className="collection-card"
          style={{
            position: 'relative',
            backgroundColor: 'white',
            filter: `drop-shadow(0 0 5px ${rgbToRgba(
              consts.style.colors.primary,
              0.5,
            )})`,
          }}
        >
          <Covers.Collection collectionId={collection.id} shadow={false} />
          <div
            style={{
              marginTop: consts.style.padding.m,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: 16,
              }}
            >
              <div style={{ width: '100%' }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex' }}>
                    <Typography.Title level={3}>
                      {collection.name}
                    </Typography.Title>
                    <AddToList
                      id={collection.id}
                      type="Collection"
                      list="SUBSCRIBED"
                      style={{ marginLeft: 16 }}
                    />
                  </div>
                  {collection.profile ? (
                    <p>
                      <Trans i18nKey="collection.curatedBy">
                        <span className="curated-by">
                          Une collection animée par
                        </span>
                        <ProfileLink
                          profile={collection.profile}
                          popoverPlacement="topLeft"
                        />
                      </Trans>
                    </p>
                  ) : null}
                </div>
                <p style={{ marginBottom: 0 }}>{collection.tagline}</p>
              </div>
            </div>
          </div>
        </Container>
      </a>
    </Link>
  );
};

CollectionCard.propTypes = {
  collection: PropTypes.claptime.collection.isRequired,
};

export default CollectionCard;
