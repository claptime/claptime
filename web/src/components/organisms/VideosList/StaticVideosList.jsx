import React, { useState } from 'react';

import PropTypes from 'claptime/lib/prop-types';
import {
  DEFAULT_SORT_FUNCTION,
  VideosListContainer,
} from './VideosListContainer';

const config = {
  createdAt: {
    sortFunction: (a, b) => {
      return -(new Date(a.createdAt) - new Date(b.createdAt));
    },
  },
  title: {
    sortFunction: (a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    },
  },
};

export const StaticVideosList = ({ videos, ...props }) => {
  const [sortBy, setSortBy] = useState(DEFAULT_SORT_FUNCTION);

  return (
    <VideosListContainer
      videos={videos.sort(config[sortBy].sortFunction)}
      sortBy={sortBy}
      onSortBy={setSortBy}
      {...props}
    />
  );
};

StaticVideosList.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.claptime.videoNode),
};

StaticVideosList.defaultProps = {
  videos: [],
};

export default StaticVideosList;
