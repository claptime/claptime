import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { useTranslation } from 'react-i18next';
import { Storage } from 'aws-amplify';
import { gql } from '@apollo/client';

import FullScreenTemplate from 'claptime/components/templates/FullScreenTemplate';
import consts from 'claptime/consts';
import { getVideoNode } from 'claptime/graphql/videonodes';
import { unauthClient } from 'claptime/lib/apollo';
import PropTypes from 'claptime/lib/prop-types';
import { useUserState } from 'claptime/lib/user';
import Head from 'claptime/lib/seo/Head';

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

const VideoPlayerPage = ({ video, imageUrl }) => {
  const { t } = useTranslation();

  const { username: userId, isAdmin } = useUserState();

  useEffect(() => {
    if (!video.watchable && !isAdmin && video.owner !== userId) {
      Router.push(`/video/${video.id}`);
    } else if (
      video.status !== consts.videos.status.PUBLISHED &&
      !isAdmin &&
      video.owner !== userId
    ) {
      Router.push('/');
    }
  }, [video, isAdmin, userId]);

  return (
    <>
      <Head
        page="video/play"
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
          <VideoPlayer embed={false} video={video} />
        </div>
      </FullScreenTemplate>
    </>
  );
};

VideoPlayerPage.propTypes = {
  video: PropTypes.claptime.videoNode.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default VideoPlayerPage;
