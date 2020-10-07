import React from 'react';
import styled from 'styled-components';

import { CreditsInput } from 'claptime/components/molecules';
import consts from 'claptime/consts';
import PropTypes from 'claptime/lib/prop-types';

const { device } = consts;

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  padding-bottom: 95px;

  .video-player-synopsis {
    display: none;
  }
  .video-player-credits {
    display: none;
  }

  @media ${device.mobileLandscape} {
    .video-player-synopsis {
      display: block;
      width: 100%;
      font-size: 20px;
      white-space: pre-wrap;
    }
  }

  @media ${device.laptop} {
    .video-player-synopsis {
      display: block;
      width: 50%;
    }
    .video-player-credits {
      display: block;
    }
  }

  color: white;
`;

const VideoInfos = ({ video }) => {
  if (video.synopsis !== null || video.credits.items.length > 0) {
    return (
      <StyledContainer>
        <div className="video-player-synopsis">{video.synopsis}</div>
        {video.credits.items.length && (
          <div className="video-player-credits" style={{ marginLeft: '50px' }}>
            <CreditsInput value={video.credits.items} />
          </div>
        )}
      </StyledContainer>
    );
  }
  return null;
};

VideoInfos.propTypes = {
  video: PropTypes.claptime.videoNode.isRequired,
};

export default VideoInfos;
