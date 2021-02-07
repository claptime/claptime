import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Button, Carousel, Typography, Tooltip, Tabs, Empty } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { Covers, TextExpand } from 'claptime/components/atoms';
import Clap from 'claptime/components/organisms/Clap';
import {
  AddToList,
  Cards,
  CreditsInput,
  PlayButton,
  ProfileLink,
} from 'claptime/components/molecules';
import { StaticVideosList } from 'claptime/components/organisms/VideosList';
import consts from 'claptime/consts';
import PropTypes from 'claptime/lib/prop-types';
import { sortEpisodesInSeries } from 'claptime/lib/videoNodes';
import { formatDuration } from 'claptime/utils';
import { joinElements } from 'claptime/utils/jsx';

const { Text } = Typography;

const {
  style: {
    colors: { primary, strawberry, strawberryHover, dark, grey },
  },
  device: { mobileS, tablet },
} = consts;

const Container = styled.div`
  display: flex;
  color: ${dark};

  .ant-typography a:focus,
  .ant-typography a:hover {
    color: ${strawberry};
  }

  .ant-carousel {
    width: 100%;
  }

  @media ${mobileS} {
    .video-cover {
      display: none;
    }
    .video-info {
      width: 100%;
    }

    flex-direction: row;
    padding: 5% 9%;
  }
  @media ${tablet} {
    .video-cover {
      display: block;
      flex-basis: 30%;
      max-width: 600px;
    }
    margin: 3% 0;
    padding: 2% 9%;
    background-image: url(/assets/backgrounds/shapes-video.svg);
    background-repeat: no-repeat;
    background-size: 58%;
  }
  .video-info {
    font-size: 0.875em;
  }
`;

const EpisodesContainer = styled.div`
  padding: 0 12%;
`;

const SpanDisabled = styled.span`
  color: ${grey};
  cursor: not-allowed;
`;

const Misc = styled.div`
  display: inline-flex;
  font-size: 1em;
  margin: 1% 0;
  a {
    color: ${strawberry};
  }
  a:hover {
    color: ${strawberryHover};
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  @media ${mobileS} {
    min-width: 0; /* https://stackoverflow.com/questions/26465745/ellipsis-in-flexbox-container */
    flex-basis: 100%;
  }
  @media ${tablet} {
    margin-left: 10%;
    flex-basis: 60%;
    align-items: baseline;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1em;
  margin-top: 3%;
  svg {
    height: 35px;
    margin-right: 10px;
  }
  span:first-of-type {
    display: inline-flex;
  }
  @media ${mobileS} {
    svg {
      height: 25px;
    }
    span:first-of-type {
      line-height: auto;
    }
  }
  @media ${tablet} {
    svg {
      height: 35px;
    }
    span:first-of-type {
      line-height: 35px;
    }
  }
`;

const PlayAndEpisodes = styled.div`
  display: flex;
  flex-direction: column;
  div {
    margin: 5px 0;
  }
  a {
    color: ${strawberry};
  }
  a:hover {
    color: ${strawberryHover};
  }
`;

const StyledCollectionCard = styled.div`
  padding: 16px;
`;

const Video = ({ video }) => {
  const { t } = useTranslation();

  const { profile, ttl } = video;
  const mainTitle = (video.parentNode && video.parentNode.title) || video.title;
  const subTitle = (video.parentNode && video.title) || null;

  const nextEpisode = video.nextNode;
  const previousEpisode =
    (video.parentNode &&
      video.parentNode.childNodes.items.find(
        (v) => v.videoNodeNextNodeId === video.id,
      )) ||
    null;

  const previousIsPublished =
    previousEpisode && previousEpisode.status === 'PUBLISHED';
  const nextIsPublished = nextEpisode && nextEpisode.status === 'PUBLISHED';

  const collections = video.collections.items
    .filter(({ status }) => status === 'APPROVED')
    .map(({ collection }) => collection)
    .filter(({ status }) => status === 'PUBLISHED');

  const getInfos = () => {
    return (
      <Details>
        <Typography.Title
          level={1}
          ellipsis={{ rows: 2 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          {subTitle ? (
            <Link href="/series/[series]" as={`/series/${video.parentNode.id}`}>
              <a>{mainTitle}</a>
            </Link>
          ) : (
            mainTitle
          )}
          <ActionsContainer>
            <AddToList id={video.id} type="VideoNode" list="TO_WATCH" />
            <AddToList id={video.id} type="VideoNode" list="LIKED" />
            <Clap video={video} theme="dark" />
          </ActionsContainer>
        </Typography.Title>
        {subTitle && <h2> {subTitle} </h2>}
        <Text>
          {t('video.addedBy')} <ProfileLink profile={profile} />
        </Text>

        <div className="video-info">
          <Tabs>
            <Tabs.TabPane tab={t('video.tabs.synopsis')} key="synopsis">
              <TextExpand text={video.synopsis} />
            </Tabs.TabPane>
            {video.credits.items.length ? (
              <Tabs.TabPane tab={t('video.tabs.credits')} key="credits">
                <CreditsInput
                  value={video.credits.items}
                  direction="row"
                  textColor={dark}
                  columns={video.credits.items.length > 2 ? 2 : 1}
                />
              </Tabs.TabPane>
            ) : null}
            {video.festivals ? (
              <Tabs.TabPane tab={t('video.tabs.festivals')} key="festivals">
                <TextExpand text={video.festivals} />
              </Tabs.TabPane>
            ) : null}
            {collections.length ? (
              <Tabs.TabPane
                tab={t('video.tabs.collections')}
                key="collections"
                style={{ padding: '0 24px' }}
              >
                <Carousel
                  autoPlay
                  dots={false}
                  arrows
                  prevArrow={
                    <Button
                      icon={
                        <LeftOutlined
                          style={{ fontSize: 16, color: primary }}
                        />
                      }
                    />
                  }
                  nextArrow={
                    <Button
                      icon={
                        <RightOutlined
                          style={{ fontSize: 16, color: primary }}
                        />
                      }
                    />
                  }
                >
                  {collections.map((collection) => (
                    <StyledCollectionCard key={collection.id}>
                      <Cards.Collection collection={collection} />
                    </StyledCollectionCard>
                  ))}
                </Carousel>
              </Tabs.TabPane>
            ) : null}
          </Tabs>
          <br />
          <Misc>
            {joinElements([
              video.category && (
                <Link
                  href="/collection/[collection]/category/[category]"
                  as={`/collection/${
                    consts.collections.default.slug
                  }/category/${
                    consts.collections.default.categories[video.category]
                  }`}
                  key="link"
                >
                  <a>{t(`categories.${video.category}.name`)}</a>
                </Link>
              ),
              <span key="release-year">{video.releaseYear}</span>,
              video.type === 'FILM' && (
                <span key="duration">{formatDuration(video.duration)}</span>
              ),
            ])}
          </Misc>
        </div>

        {video.type === 'FILM' && (
          <PlayAndEpisodes>
            <div style={{ display: 'inline-block' }}>
              <PlayButton videoNode={video} />
              {ttl && (
                <Tooltip
                  title={t('video.ttlTooltip', {
                    count: ttl,
                    thisItem: t('video.thisFilm'),
                  })}
                  placement="left"
                >
                  <Text
                    style={{
                      marginLeft: '15px',
                      fontWeight: 'bold',
                      color: strawberry,
                    }}
                  >
                    {t('video.ttl', { ttl })}
                  </Text>
                </Tooltip>
              )}
            </div>
            <div style={{ display: 'inline-block' }}>
              {previousEpisode &&
                (previousIsPublished ? (
                  <Link
                    href="/video/[video]"
                    as={`/video/${previousEpisode.id}`}
                  >
                    <a>
                      <LeftOutlined />
                      &nbsp;{t('video.previousEpisode')}
                    </a>
                  </Link>
                ) : (
                  <Tooltip title={t('video.previousEpisodeNotPublished')}>
                    <SpanDisabled>
                      <LeftOutlined />
                      &nbsp;{t('video.previousEpisode')}
                    </SpanDisabled>
                  </Tooltip>
                ))}
              {nextEpisode && previousEpisode && <span>&nbsp;|&nbsp;</span>}
              {nextEpisode &&
                (nextIsPublished ? (
                  <Link href="/video/[video]" as={`/video/${nextEpisode.id}`}>
                    <a>
                      {t('video.nextEpisode')}&nbsp;
                      <RightOutlined />
                    </a>
                  </Link>
                ) : (
                  <Tooltip title={t('video.nextEpisodeNotPublished')}>
                    <SpanDisabled>
                      {t('video.nextEpisode')}&nbsp;
                      <RightOutlined />
                    </SpanDisabled>
                  </Tooltip>
                ))}
            </div>
          </PlayAndEpisodes>
        )}
      </Details>
    );
  };

  const getSeriesDetails = () => {
    const sortedEpisodes = sortEpisodesInSeries(video.childNodes.items);
    const listedEpisodes = [];
    for (let i = 0; i < sortedEpisodes.length; i++) {
      if (sortedEpisodes[i].status === consts.series.status.PUBLISHED)
        listedEpisodes.push(sortedEpisodes[i]);
      else break;
    }
    return (
      <EpisodesContainer>
        <Typography.Title level={2}>
          {t('series.episodes.list')}
        </Typography.Title>
        {listedEpisodes.length > 0 ? (
          <StaticVideosList
            sortable={false}
            videos={listedEpisodes}
            display="list"
          />
        ) : (
          <Empty description={t('series.noEpisode')} />
        )}
      </EpisodesContainer>
    );
  };

  return (
    <>
      <Container>
        <Covers.Video videoId={video.id} />
        {getInfos()}
      </Container>
      {video.type === 'SERIES' && getSeriesDetails()}
    </>
  );
};

Video.propTypes = {
  video: PropTypes.claptime.videoNode.isRequired,
};

export default Video;
