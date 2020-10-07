import React from 'react';
import { useTranslation } from 'react-i18next';
import { gql } from '@apollo/client';
import { Storage } from 'aws-amplify';

import Video from 'claptime/components/organisms/Video';
import NavBarTemplate from 'claptime/components/templates/NavBarTemplate';
import { getVideoNode } from 'claptime/graphql/videonodes';
import { unauthClient } from 'claptime/lib/apollo';
import Head from 'claptime/lib/seo/Head';
import PropTypes from 'claptime/lib/prop-types';
import { updateQuery } from 'claptime/utils';

export async function getServerSideProps(ctx) {
  let [
    {
      data: { getVideoNode: video },
      fetchMore,
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

  while (video.collections.nextToken) {
    ({
      data: { getVideoNode: video },
      fetchMore,
    } = await fetchMore({
      variables: {
        collectionsNextToken: video.collections.nextToken,
      },
      updateQuery: (...props) =>
        updateQuery('$.getVideoNode.collections', ...props),
    }));
  }
  return {
    props: {
      video,
      imageUrl,
    },
  };
}

const VideoPage = ({ video, imageUrl }) => {
  const { t } = useTranslation();

  return (
    <>
      <Head
        page="video"
        params={{
          title: video.title,
          category: t(`categories.${video.category}.name`),
          name: video.profile.name,
          synopsis: video.synopsis,
        }}
        imageUrl={imageUrl}
      />
      <NavBarTemplate>
        <Video video={video} />
      </NavBarTemplate>
    </>
  );
};

VideoPage.propTypes = {
  video: PropTypes.claptime.videoNode.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default VideoPage;
