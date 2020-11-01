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
  none: {
    sortFunction: (a, b) => -1,
  },
};

export const StaticVideosList = ({
  videos,
  sortBy: initialSortBy,
  ...props
}) => {
  const [sortBy, setSortBy] = useState(initialSortBy);

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
  sortBy: PropTypes.oneOf(['createdAt', 'title', 'none']),
  videos: PropTypes.arrayOf(PropTypes.claptime.videoNode),
};

StaticVideosList.defaultProps = {
  sortBy: DEFAULT_SORT_FUNCTION,
  videos: [],
};

export default StaticVideosList;
