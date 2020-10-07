import React, { useState } from 'react';

import consts from 'claptime/consts';
import {
  listVideoNodesByStatusSortByCreatedAt,
  listVideoNodesByStatusSortByTitle,
} from 'claptime/graphql/videonodes';
import { useQueryList } from 'claptime/lib/apollo';
import {
  DEFAULT_SORT_FUNCTION,
  VideosListContainer,
} from './VideosListContainer';

export const DynamicVideosList = ({ ...props }) => {
  const [sortBy, setSortBy] = useState(DEFAULT_SORT_FUNCTION);

  const filter = {
    nodeType: {
      eq: 'ROOT',
    },
  };

  const config = {
    createdAt: {
      variables: {
        status: consts.videos.status.PUBLISHED,
        sortDirection: 'DESC',
        filter,
        limit: 20,
      },
      query: listVideoNodesByStatusSortByCreatedAt,
      resultPath: '$.listVideoNodesByStatusSortByCreatedAt',
    },
    title: {
      variables: {
        status: consts.videos.status.PUBLISHED,
        sortDirection: 'ASC',
        filter,
        limit: 20,
      },
      query: listVideoNodesByStatusSortByTitle,
      resultPath: '$.listVideoNodesByStatusSortByTitle',
    },
  };

  const { items, hasMore, loadMore, response } = useQueryList(
    config[sortBy].query,
    { variables: config[sortBy].variables },
    { resultPath: config[sortBy].resultPath },
  );
  if (response) return response;

  return (
    <VideosListContainer
      videos={items}
      hasMore={hasMore}
      onLoadMore={loadMore}
      sortBy={sortBy}
      onSortBy={setSortBy}
      {...props}
    />
  );
};

export default DynamicVideosList;
