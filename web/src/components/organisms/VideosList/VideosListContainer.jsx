import React from 'react';
import { List, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';
import Link from 'next/link';

import { Covers, PlayButton, Spin } from 'claptime/components/atoms';
import { Cards, Layouts } from 'claptime/components/molecules';
import PropTypes from 'claptime/lib/prop-types';
import consts from 'claptime/consts';
import { formatDuration } from 'claptime/utils';
import { joinElements } from 'claptime/utils/jsx';

const { Option } = Select;

const {
  device,
  style: {
    colors: { strawberry },
  },
} = consts;

export const DEFAULT_SORT_FUNCTION = 'createdAt';

const OrderBy = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${device.mobileS} {
    flex-direction: column;
  }
  @media ${device.tablet} {
    flex-direction: row;
  }
`;

export const VideosListContainer = ({
  videos,
  hasMore,
  onLoadMore,
  sortBy,
  onSortBy,
  sortable,
  display,
}) => {
  const { t } = useTranslation();
  const content =
    display === 'list' ? (
      <List>
        {videos.map((video) => (
          <List.Item key={video.id}>
            <List.Item.Meta
              avatar={
                <Covers.Video videoId={video.id} width={75} height={100} />
              }
              title={
                <Link href="/video/[video]" as={`/video/${video.id}`}>
                  <a>{video.title}</a>
                </Link>
              }
              style={{ alignItems: 'center' }}
              description={
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                  }}
                >
                  <div>
                    {joinElements(
                      [
                        <span key="category">
                          {t(`categories.${video.category}.name`)}
                        </span>,
                        <span key="length">
                          {formatDuration(video.duration)}
                        </span>,
                      ],
                      <span style={{ color: strawberry }}>&nbsp;/&nbsp;</span>,
                    )}
                  </div>
                  <PlayButton videoId={video.id} />
                </div>
              }
            />
          </List.Item>
        ))}
      </List>
    ) : (
      <Layouts.Masonry>
        {videos.map((video) => (
          <Cards.Video key={`video-${video.id}`} video={video} />
        ))}
      </Layouts.Masonry>
    );
  return (
    <div>
      {sortable && (
        <OrderBy style={{ textAlign: 'center' }}>
          <span>{t('videosList.orderBy')}&nbsp;</span>
          <Select
            onChange={onSortBy}
            style={{ width: 300, textAlign: 'left' }}
            value={sortBy}
          >
            <Option value="createdAt">{t('videosList.createdAt')}</Option>
            <Option value="title">{t('videosList.title')}</Option>
          </Select>
        </OrderBy>
      )}
      <InfiniteScroll
        pageStart={0}
        loadMore={onLoadMore}
        hasMore={hasMore}
        loader={<Spin key="fetch-more" />}
      >
        {content}
      </InfiniteScroll>
    </div>
  );
};

VideosListContainer.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.claptime.videoNode),
  hasMore: PropTypes.bool,
  onLoadMore: PropTypes.func,
  sortBy: PropTypes.oneOf(['createdAt', 'title']),
  onSortBy: PropTypes.func,
  sortable: PropTypes.bool,
  display: PropTypes.oneOf(['cards', 'list']),
};

VideosListContainer.defaultProps = {
  videos: [],
  hasMore: false,
  onLoadMore: () => {},
  sortBy: DEFAULT_SORT_FUNCTION,
  onSortBy: () => {},
  sortable: true,
  display: 'cards',
};

export default VideosListContainer;
