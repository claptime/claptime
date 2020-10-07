import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';

import PropTypes from 'claptime/lib/prop-types';

import { IconButton } from 'claptime/components/atoms';

const Arrow = ({ video }) => (
  <div
    className="overlay"
    style={{
      color: 'white',
      textAlign: 'left',
      paddingTop: '1em',
      fontSize: 'xx-large',
      float: 'left',
      position: 'absolute',
      top: 0,
      left: '4%',
      zIndex: 10000,
    }}
  >
    <Link href="/video/[video]" as={`/video/${video.id}`}>
      <a>
        <IconButton AntIcon={ArrowLeftOutlined} height="30px" color="white" />
      </a>
    </Link>
  </div>
);

Arrow.propTypes = {
  video: PropTypes.claptime.videoNode.isRequired,
};

export default Arrow;
