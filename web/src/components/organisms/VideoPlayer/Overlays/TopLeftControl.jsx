import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import PropTypes from 'claptime/lib/prop-types';

import IconButton from 'claptime/components/atoms/IconButton';
import Logo from 'claptime/components/atoms/Logo';

const TopLeftControl = ({ video, embed }) => (
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
    {!embed ? (
      <Link to={`/video/${video.id}`}>
        <IconButton AntIcon={ArrowLeftOutlined} height="30px" color="white" />
      </Link>
    ) : (
      <div className="logo" style={{ height: 100, textAlign: 'center' }}>
        <Logo color="white" size="small" />
      </div>
    )}
  </div>
);

TopLeftControl.propTypes = {
  video: PropTypes.claptime.videoNode.isRequired,
  embed: PropTypes.bool,
};

TopLeftControl.defaultProps = {
  embed: false,
};

export default TopLeftControl;
