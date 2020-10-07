import React from 'react';
import { Button, Popconfirm, Table, Tooltip, Empty } from 'antd';
import { EyeOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { gql } from '@apollo/client';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import consts from 'claptime/consts';
import {
  listVideoNodesByStatusSortByCreatedAt,
  publishVideoNode,
  unpublishVideoNode,
} from 'claptime/graphql/videonodes';
import { useApolloClient, useQueryList } from 'claptime/lib/apollo';

const VideosValidation = () => {
  const { t } = useTranslation();
  const apolloClient = useApolloClient();

  const { items, refetch, response } = useQueryList(
    listVideoNodesByStatusSortByCreatedAt,
    {
      variables: {
        status: consts.videos.status.DRAFT,
      },
      errorPolicy: 'all',
    },
    { resultPath: '$.listVideoNodesByStatusSortByCreatedAt', getAll: true },
  );
  if (response) return response;

  if (!items.length) return <Empty />;

  const setVideoStatus = async (videoId, status) => {
    const result = await apolloClient.mutate({
      mutation: gql(
        status === 'PUBLISHED' ? publishVideoNode : unpublishVideoNode,
      ),
      variables: {
        videoNodeId: videoId,
      },
      update: refetch,
    });
    if (!result) {
      throw new Error('Mutation result is null');
    }
  };

  const columns = [
    {
      title: t('admin.videosValidation.table.title'),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('admin.videosValidation.table.uploadDate'),
      dataIndex: 'createdAt',
      key: 'uploadDate',
      render: (date) => moment(date).calendar(),
    },
    {
      title: t('admin.videosValidation.table.actions'),
      key: 'actions',
      render: (text, record) => (
        <>
          <Tooltip title={t('admin.videosValidation.table.view')}>
            <Link href="/video/[video]" as={`/video/${record.id}`}>
              <a>
                <Button icon={<EyeOutlined />} />
              </a>
            </Link>
          </Tooltip>
          <Tooltip title={t('admin.videosValidation.table.approve')}>
            <Popconfirm
              title={t('admin.videosValidation.table.confirm')}
              onConfirm={() =>
                setVideoStatus(record.id, consts.videos.status.PUBLISHED)
              }
              okText={t('admin.videosValidation.table.yes')}
              cancelText={t('admin.videosValidation.table.no')}
            >
              <Button icon={<CheckOutlined />} />
            </Popconfirm>
          </Tooltip>
          <Tooltip title={t('admin.videosValidation.table.reject')}>
            <Popconfirm
              title={t('admin.videosValidation.table.confirm')}
              onConfirm={() =>
                setVideoStatus(record.id, consts.videos.status.DRAFT)
              }
              okText={t('admin.videosValidation.table.yes')}
              cancelText={t('admin.videosValidation.table.no')}
            >
              <Button icon={<CloseOutlined />} />
            </Popconfirm>
          </Tooltip>
        </>
      ),
    },
  ];
  const videos = items.map((item) => ({
    ...item,
    key: item.id,
  }));
  return <Table columns={columns} dataSource={videos} />;
};

export default VideosValidation;
