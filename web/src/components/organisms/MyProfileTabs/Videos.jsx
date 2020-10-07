import React, { useEffect } from 'react';
import { Tag, Tooltip } from 'antd';

import { useTranslation } from 'react-i18next';
import moment from 'moment';

import { Covers } from 'claptime/components/atoms';
import { FilmCreationActions } from 'claptime/components/molecules';
import DataTable from 'claptime/components/organisms/DataTable';
import consts from 'claptime/consts';
import { getProfile } from 'claptime/graphql/profiles';
import { useQueryGet } from 'claptime/lib/apollo';
import { useUserState } from 'claptime/lib/user';

const Videos = () => {
  const { t } = useTranslation();

  const {
    settings: { profileId },
  } = useUserState();

  const { item, run, response } = useQueryGet(
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

  const videos = item.videoNodes.items.filter(({ type }) => type === 'FILM'); // in case some videos are undefined

  const columns = [
    {
      title: t('myProfilePage.videos.table.cover'),
      key: 'cover',
      optional: true,
      render: (text, record) => (
        <Covers.Video width={75} height={100} videoId={record.id} />
      ),
    },
    {
      title: t('myProfilePage.videos.table.title'),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('myProfilePage.videos.table.uploadDate'),
      dataIndex: 'createdAt',
      key: 'uploadDate',
      optional: true,
      render: (date) => moment(date).calendar(),
    },
    {
      title: t('myProfilePage.videos.table.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color;
        switch (status) {
          case consts.videos.status.PUBLISHED:
            color = 'green';
            break;
          case consts.videos.status.PROCESSING_FAILED:
            color = 'red';
            break;
          case consts.videos.status.IMPORT:
          case consts.videos.status.UPLOAD:
          case consts.videos.status.PROCESSING:
          case consts.videos.status.DRAFT:
          default:
            color = 'gold';
        }
        return (
          <Tooltip title={t(`video.status.${status}.description`)}>
            <Tag color={color} key={status}>
              {t(`video.status.${status}.title`)}
            </Tag>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <>
      <FilmCreationActions />
      <DataTable
        columns={columns}
        items={videos}
        getEditionLink={({ id }) => `/video/${id}/edit`}
      />
    </>
  );
};

export default Videos;
