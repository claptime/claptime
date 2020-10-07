import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { useTranslation } from 'react-i18next';
import { gql } from '@apollo/client';
import { Storage } from 'aws-amplify';

import FullScreenTemplate from 'claptime/components/templates/FullScreenTemplate';
import consts from 'claptime/consts';
import { getVideoNode } from 'claptime/graphql/videonodes';
import { unauthClient } from 'claptime/lib/apollo';
import { setChatVisibility } from 'claptime/lib/chat';
import { useUserState } from 'claptime/lib/user';
import Head from 'claptime/lib/seo/Head';
import PropTypes from 'claptime/lib/prop-types';

const VideoPlayer = dynamic(
  () => import('claptime/components/organisms/VideoPlayer'),
  { ssr: false },
);

export async function getServerSideProps(ctx) {
  const [
    {
      data: { getVideoNode: video },
    },
    imageUrl,
  ] = await Promise.all([
    unauthClient.query({
      query: gql(getVideoNode),
      variables: {
        id: ctx.query.video,
      },
    }),
    Storage.get(`videoNodes/${ctx.query.video}/300-400.jpg`),
  ]);
  return {
    props: {
      video,
      imageUrl,
    },
  };
}

const VideoPlayerEmbedPage = ({ video, imageUrl }) => {
  const { t } = useTranslation();

  useEffect(() => {
    setChatVisibility(false);
    return () => setChatVisibility(true);
  }, []);
  const { username: userId, isAdmin } = useUserState();

  if (
    video.status !== consts.videos.status.PUBLISHED &&
    !isAdmin &&
    video.owner !== userId
  ) {
    return Router.push('/');
  }

  return (
    <>
      <Head
        page="video/embed"
        params={{
          title: video.title,
          category: t(`categories.${video.category}.name`),
          name: video.profile.name,
          synopsis: video.synopsis,
        }}
        imageUrl={imageUrl}
      />
      <FullScreenTemplate>
        <div style={{ height: '100vh' }}>
          <VideoPlayer embed video={video} />
        </div>
      </FullScreenTemplate>
    </>
  );
};

VideoPlayerEmbedPage.propTypes = {
  video: PropTypes.claptime.videoNode.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default VideoPlayerEmbedPage;
