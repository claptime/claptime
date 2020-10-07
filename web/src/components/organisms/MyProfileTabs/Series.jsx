import React, { useEffect } from 'react';

import { Button, Tag, Tooltip } from 'antd';

import { gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import Router from 'next/router';
import { PlusOutlined } from '@ant-design/icons';

import { ButtonGroup, Covers } from 'claptime/components/atoms';
import DataTable from 'claptime/components/organisms/DataTable';
import consts from 'claptime/consts';
import { addVideoNode, setVideoNodeMeta } from 'claptime/graphql/videonodes';
import { getProfile } from 'claptime/graphql/profiles';
import { useApolloClient, useQueryGet } from 'claptime/lib/apollo';
import { useUserState } from 'claptime/lib/user';
import { sortEpisodesInSeries } from 'claptime/lib/videoNodes';

const Series = () => {
  const { t } = useTranslation();

  const {
    settings: { profileId },
  } = useUserState();

  const apolloClient = useApolloClient();
  const { item, refetch, run, response } = useQueryGet(
    getProfile,
    {
      variables: { id: profileId },
      errorPolicy: 'all',
    },
    {
      resultPath: '$.getProfile',
      pathsToIterate: [
        {
          path: '$.getProfile.videoNodes',
          nextTokenVariableName: 'videoNodesNextToken',
        },
        {
          path: '$.getProfile.videoNodes.items.childNodes',
          nextTokenVariableName: 'childNodesNextToken',
        },
      ],
      lazy: true,
    },
  );
  useEffect(() => {
    if (profileId) {
      run();
    }
  }, [profileId, run]);
  if (response) return response;

  const series = item.videoNodes.items.filter(({ type }) => type === 'SERIES'); // in case some videos are undefined

  // add children key in each series object for tree data table

  const seriesWithChildren = series.map((obj) => {
    const copy = { ...obj };
    const filmsInSeries = copy.childNodes.items;
    if (filmsInSeries && filmsInSeries.length > 0) {
      copy.children = sortEpisodesInSeries(filmsInSeries); // children is used for creating the tree structure in the table
    }
    return copy;
  });

  const createItem = async () => {
    // Creating series item
    const {
      data: {
        addVideoNode: { id: videoNodeId },
      },
    } = await apolloClient.mutate({
      mutation: gql(addVideoNode),
      variables: {
        profileId,
        type: 'SERIES',
      },
    });
    await apolloClient.mutate({
      mutation: gql(setVideoNodeMeta),
      variables: {
        videoNodeId,
        title: t('myProfilePage.series.newVideoTitle'),
      },
    });
    return videoNodeId;
  };

  const createSeriesAction = async () => {
    const id = await createItem();
    await refetch();
    Router.push(`/series/${id}/edit`);
  };

  const columns = [
    {
      title: t('myProfilePage.series.table.cover'),
      key: 'cover',
      optional: true,
      render: (text, record) => (
        <Covers.Video width={75} height={100} videoId={record.id} />
      ),
    },
    {
      title: t('myProfilePage.series.table.title'),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('myProfilePage.series.table.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status, row) => {
        let color;
        const isFilm = row.type === 'FILM';
        switch (status) {
          case consts.series.status.PUBLISHED:
            color = 'green';
            break;
          case consts.series.status.DRAFT:
          default:
            color = 'gold';
        }
        return (
          <Tooltip
            title={t(
              `${isFilm ? 'video' : 'series'}.status.${status}.description`,
            )}
          >
            <Tag color={color} key={status}>
              {t(`${isFilm ? 'video' : 'series'}.status.${status}.title`)}
            </Tag>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <>
      <ButtonGroup>
        <Button icon={<PlusOutlined />} onClick={createSeriesAction}>
          {t('myProfilePage.series.actions.create')}
        </Button>
      </ButtonGroup>
      <DataTable
        columns={columns}
        items={seriesWithChildren}
        getEditionLink={({ id, type = 'FILM' }) =>
          `/${type === 'FILM' ? 'video' : 'series'}/${id}/edit`
        }
      />
    </>
  );
};

export default Series;
