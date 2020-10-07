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
      data: { getVideoNode: series },
      fetchMore,
    },
    imageUrl,
  ] = await Promise.all([
    unauthClient.query({
      query: gql(getVideoNode),
      variables: {
        id: ctx.query.series,
      },
    }),
    Storage.get(`videoNodes/${ctx.query.series}/300-400.jpg`),
  ]);

  while (series.collections.nextToken) {
    ({
      data: { getVideoNode: series },
      fetchMore,
    } = await fetchMore({
      variables: {
        collectionsNextToken: series.collections.nextToken,
      },
      updateQuery: (...props) =>
        updateQuery('$.getVideoNode.collections', ...props),
    }));
  }
  return {
    props: {
      series,
      imageUrl,
    },
  };
}

const SeriesPage = ({ series, imageUrl }) => {
  const { t } = useTranslation();

  return (
    <>
      <Head
        page="series"
        params={{
          title: series.title,
          category: t(`categories.${series.category}.name`),
          name: series.profile.name,
          synopsis: series.synopsis,
        }}
        imageUrl={imageUrl}
      />
      <NavBarTemplate>
        <Video video={series} />
      </NavBarTemplate>
    </>
  );
};

SeriesPage.propTypes = {
  series: PropTypes.claptime.videoNode.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default SeriesPage;
