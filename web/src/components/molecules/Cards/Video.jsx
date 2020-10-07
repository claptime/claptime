import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Typography, Tooltip } from 'antd';
import styled, { keyframes } from 'styled-components';

import PropTypes from 'claptime/lib/prop-types';
import { formatDuration } from 'claptime/utils';
import { joinElements } from 'claptime/utils/jsx';
import { Covers } from 'claptime/components/atoms';
import consts from 'claptime/consts';

const { Title } = Typography;

const {
  style: {
    colors: { border, strawberry },
  },
  device: { mobileS, laptop, laptopL },
} = consts;

const dimensions = {
  small: {
    width: 180,
    height: 240,
  },
  medium: {
    width: 225,
    height: 300,
  },
  large: {
    width: 270,
    height: 360,
  },
};

const getCssDimensions = (size, width = true, height = true, margin = 0) => {
  return [
    width ? `width: ${dimensions[size].width + margin}px;` : '',
    height ? `height: ${dimensions[size].height + margin}px;` : '',
  ].join('\n');
};

const videoCardAppears = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Container = styled.a`
  display: block;
  text-align: center;
  margin: 25px;
  ${({ size }) =>
    size === 'auto'
      ? `
  @media ${mobileS} {
    ${getCssDimensions('small', true, false, 25)}
  }
  @media ${laptop} {
    ${getCssDimensions('medium', true, false, 25)}
  }
  @media ${laptopL} {
    ${getCssDimensions('large', true, false, 25)}
  }`
      : getCssDimensions(size, true, false, 25)}
  animation: ${videoCardAppears} 0.5s ease-in-out 0s 1;
`;

const Infos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  .video-title {
    height: 4em;
    display: flex;
    align-items: center;
  }
`;

const Misc = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  border: 1px solid ${border};
  border-radius: 6px;
  padding: 5px 10px;
`;

const VideoCardHover = styled.div`
  margin-bottom: 4%;
  display: inline-block;
  justify-content: center;
  position: relative;
  ${({ isPublished }) =>
    isPublished
      ? `
    :hover {
      cursor: pointer;
      transform: scale(1.05);
    }`
      : `
    .video-cover {
      filter: blur(1px);
      &:hover {
        cursor: not-allowed;
      }
    }

    `}
  transition: transform 0.3s, filter 0.3s ease-in-out;
  transform-origin: center center;
  ${({ size }) =>
    size === 'auto'
      ? `
  @media ${mobileS} {
    ${getCssDimensions('small')}
  }
  @media ${laptop} {
    ${getCssDimensions('medium')}
  }
  @media ${laptopL} {
    ${getCssDimensions('large')}
  }`
      : getCssDimensions(size)}
`;

const VideoCard = ({ video, size }) => {
  const { t } = useTranslation();
  const linkHref = `/${video.type === 'FILM' ? 'video' : 'series'}/[video]`;
  const linkAs = `/${video.type === 'FILM' ? 'video' : 'series'}/${video.id}`;
  const { status, title } = video;
  const isPublished = status === consts.videos.status.PUBLISHED;

  const nbEpisodes = video.type === 'SERIES' ? video.childrenCount || 0 : null;

  if (nbEpisodes === 0) return null;

  return (
    <Link href={linkHref} as={linkAs}>
      <Container className="video-card" size={size}>
        {!isPublished ? (
          <Tooltip title={t('video.notPublished', { title })}>
            <VideoCardHover
              isPublished={isPublished}
              className="video-card-hover-zoom"
              size={size}
            >
              <Covers.Video height="100%" videoId={video.id} />
            </VideoCardHover>
          </Tooltip>
        ) : (
          <VideoCardHover
            isPublished={isPublished}
            className="video-card-hover-zoom"
            size={size}
          >
            {video.type === 'FILM' ? (
              <Covers.Video height="100%" videoId={video.id} />
            ) : (
              <>
                <div style={{ zIndex: 3, position: 'absolute' }}>
                  <Covers.Video height="100%" videoId={video.id} />
                </div>
                <div
                  style={{
                    position: 'absolute',
                    zIndex: 2,
                    top: '-10px',
                    left: '10px',
                    right: '-10px',
                  }}
                >
                  <Covers.Video height="100%" videoId={video.id} />
                </div>
                <div
                  style={{
                    position: 'absolute',
                    zIndex: 1,
                    top: '-20px',
                    left: '20px',
                    right: '-20px',
                  }}
                >
                  <Covers.Video height="100%" videoId={video.id} />
                </div>
              </>
            )}
          </VideoCardHover>
        )}
        <Infos>
          <div className="video-title">
            <Title level={3} ellipsis={{ rows: 2 }}>
              {video.title}
            </Title>
          </div>
          <Misc>
            {joinElements(
              [
                <span key="category">
                  {t(`categories.${video.category}.name`)}
                </span>,
                <span key="length">
                  {video.type === 'FILM' && formatDuration(video.duration)}
                  {video.type === 'SERIES' &&
                    t('series.nbEpisodes', {
                      count: nbEpisodes,
                    })}
                </span>,
              ],
              <span style={{ color: strawberry }}>&nbsp;/&nbsp;</span>,
            )}
          </Misc>
        </Infos>
      </Container>
    </Link>
  );
};

VideoCard.propTypes = {
  video: PropTypes.claptime.videoNode.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'auto']),
};

VideoCard.defaultProps = {
  size: 'auto',
};

export default VideoCard;
