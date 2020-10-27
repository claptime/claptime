import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Carousel, Empty } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import styled from 'styled-components';

import { Icons } from 'claptime/components/atoms';
import { Cards } from 'claptime/components/molecules';
import consts from 'claptime/consts';
import { listCollectionVideoNodesByCollectionAndCategorySortByCreatedAt } from 'claptime/graphql/collections';
import { useQueryList } from 'claptime/lib/apollo';
import PropTypes from 'claptime/lib/prop-types';

const {
  style: {
    colors: { primary },
  },
} = consts;

const ARROW_WIDTH = 30;
const VIDEO_CARD_WIDTH = 255;

const StyledCarousel = styled(Carousel)`
  .slick-list {
    padding: 16px 0 !important;
  }
  width: calc(100% - ${2 * ARROW_WIDTH}px);
  margin: auto;
`;

const breakpoints = [...Array(10).slice(1).keys()].map((i) => ({
  breakpoint: i * VIDEO_CARD_WIDTH + 2 * ARROW_WIDTH, // VideoCard width
  settings: {
    slidesToShow: i - 1,
    slidesToScroll: 1,
    // TODO https://github.com/akiran/react-slick/issues/764
    // slidesToScroll: i - 1,
  },
}));

const CategoryCarousel = ({ collectionId, collectionSlug, category }) => {
  const containerRef = useRef(null);
  const { t } = useTranslation();

  const { items, response, hasMore } = useQueryList(
    listCollectionVideoNodesByCollectionAndCategorySortByCreatedAt,
    {
      variables: {
        collectionVideoNodeCollectionId: collectionId,
        categoryIdCreatedAt: {
          beginsWith: {
            categoryId: category.id,
          },
        },
        filter: {
          status: {
            eq: 'APPROVED',
          },
        },
        sortDirection: 'DESC',
        limit: 10,
      },
    },
    {
      resultPath:
        '$.listCollectionVideoNodesByCollectionAndCategorySortByCreatedAt',
    },
  );
  if (response) return response;

  const videos = items
    .map(({ videoNode }) => videoNode)
    .filter((videoNode) => videoNode.status === 'PUBLISHED');

  return (
    <div style={{ marginBottom: 48 }} ref={containerRef}>
      <div
        style={{
          padding: '0 9%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <h2>{category.category}</h2>
          {hasMore ? (
            <Link
              href="/collection/[collection]/category/[category]"
              as={`/collection/${collectionSlug}/category/${category.id}`}
            >
              <a style={{ marginLeft: 16 }}>{t('collection.seeMore')}</a>
            </Link>
          ) : null}
        </div>
        <p>{category.description}</p>
      </div>
      {videos.length ? (
        <StyledCarousel
          infinite={false}
          dots={false}
          arrows
          responsive={breakpoints}
          prevArrow={
            <Button
              icon={<LeftOutlined style={{ fontSize: 24, color: primary }} />}
            />
          }
          nextArrow={
            <Button
              icon={<RightOutlined style={{ fontSize: 24, color: primary }} />}
            />
          }
        >
          {videos.map((video) => (
            <Cards.Video video={video} key={`video-${video.id}`} size="small" />
          ))}
        </StyledCarousel>
      ) : (
        <Empty
          description={t('collection.emptyCategory')}
          image={<Icons.SadMask />}
          style={{ margin: 16 }}
        />
      )}
    </div>
  );
};

CategoryCarousel.propTypes = {
  collectionId: PropTypes.string.isRequired,
  collectionSlug: PropTypes.string.isRequired,
  category: PropTypes.claptime.collectionCategory.isRequired,
};

export default CategoryCarousel;
