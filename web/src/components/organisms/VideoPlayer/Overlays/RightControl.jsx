import React from 'react';
import styled from 'styled-components';

import consts from 'claptime/consts';
import PropTypes from 'claptime/lib/prop-types';
import Clap from 'claptime/components/organisms/Clap';
import { AddToList } from 'claptime/components/molecules';

const { device } = consts;

const Icons = styled.div`
  display: none;
  margin-top: 5px;
  @media ${device.mobileLandscape} {
    display: inline-block;
  }
  svg {
    height: 22px;
  }
`;

const RightControl = ({ video, player, embed }) => {
  return (
    <Icons>
      {!embed && (
        <>
          <AddToList
            id={video.id}
            type="VideoNode"
            list="LIKED"
            iconColor="white"
            containerId="video-player-infos"
          />
          <AddToList
            id={video.id}
            type="VideoNode"
            list="TO_WATCH"
            iconColor="white"
            containerId="video-player-infos"
          />
        </>
      )}
      <Clap
        theme="light"
        height="22px"
        containerId="video-player-infos"
        video={video}
        onClick={() => player.pause()}
      />
    </Icons>
  );
};

RightControl.propTypes = {
  video: PropTypes.claptime.videoNode.isRequired,
  player: PropTypes.object.isRequired,
  embed: PropTypes.bool,
};

RightControl.defaultProps = {
  embed: false,
};

export default RightControl;
