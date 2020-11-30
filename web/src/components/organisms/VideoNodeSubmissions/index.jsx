import React from 'react';
import Link from 'next/link';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Button, Popconfirm, Tag, Tooltip, message } from 'antd';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { gql } from '@apollo/client';

import { ButtonGroup, Covers, Subtitle } from 'claptime/components/atoms';
import DataTable from 'claptime/components/organisms/DataTable';
import SubmitToCollection from 'claptime/components/organisms/SubmitToCollection';
import { getVideoNode } from 'claptime/graphql/videonodes';
import { deleteCollectionVideoNode } from 'claptime/graphql/collections';
import { useApolloClient, useQueryGet } from 'claptime/lib/apollo';
import PropTypes from 'claptime/lib/prop-types';

const VideoNodeSubmissions = ({ videoNodeId }) => {
  const { t } = useTranslation();
  const apolloClient = useApolloClient();
  const { item: videoNode, response, refetch } = useQueryGet(
    getVideoNode,
    {
      variables: { id: videoNodeId },
    },
    {
      resultPath: '$.getVideoNode',
      pathsToIterate: [
        {
          path: '$.getVideoNode.collections',
          nextTokenVariableName: 'collectionsNextToken',
        },
      ],
    },
  );
  if (response) return response;

  const removeSubmission = async (submissionId) => {
    await apolloClient.mutate({
      mutation: gql(deleteCollectionVideoNode),
      variables: {
        input: {
          id: submissionId,
        },
      },
      update: () => refetch(),
    });
    message.success(t('submissions.table.removed'));
  };

  const columns = [
    {
      title: '',
      key: 'cover',
      optional: true,
      render: (text, record) => (
        <Covers.Collection
          width={200}
          height={40}
          collectionId={record.collection.id}
        />
      ),
    },
    {
      title: t('submissions.table.name'),
      key: 'name',
      render: (text, record) => record.collection.name,
    },
    {
      title: t('submissions.table.category'),
      key: 'category',
      render: (text, record) =>
        record.collection.categories.find(({ id }) => id === record.categoryId)
          .category,
    },
    {
      title: t('submissions.table.updatedAt'),
      key: 'lastUpdateDate',
      optional: true,
      render: (text, record) =>
        moment(record.updatedAt || record.createdAt).calendar(),
    },
    {
      title: t('submissions.table.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color;
        switch (status) {
          case 'APPROVED':
            color = 'green';
            break;
          case 'REJECTED':
            color = 'red';
            break;
          case 'SUBMITTED':
            color = 'gold';
            break;
          default:
            throw new Error('UnknownStatus');
        }
        return (
          <Tooltip title={t(`submissions.table.${status}.description`)}>
            <Tag color={color} key={status}>
              {t(`submissions.table.${status}.title`)}
            </Tag>
          </Tooltip>
        );
      },
    },
    {
      title: t('submissions.table.actions'),
      key: 'actions',
      render: (text, record) => (
        <ButtonGroup>
          <Tooltip title={t('submissions.table.view')}>
            <Link
              href="/collection/[collection]"
              as={`/collection/${record.collection.slug}`}
            >
              <a>
                <Button icon={<EyeOutlined />} />
              </a>
            </Link>
          </Tooltip>
          <Tooltip title={t('submissions.table.remove')}>
            <Popconfirm
              title={
                <div
                  style={{
                    maxWidth: 300,
                  }}
                >
                  <h3>{t('submissions.table.remove')}</h3>
                  <p>{t('submissions.table.removeConfirm')}</p>
                </div>
              }
              onConfirm={() => removeSubmission(record.id)}
              okText={t('submissions.table.confirmYes')}
              cancelText={t('submissions.table.confirmNo')}
              icon={<DeleteOutlined style={{ color: 'red' }} />}
            >
              <Button icon={<DeleteOutlined style={{ color: 'red' }} />} />
            </Popconfirm>
          </Tooltip>
        </ButtonGroup>
      ),
    },
  ];

  return (
    <>
      <Subtitle style={{ margin: '16px 0' }}>
        {t('submissions.submissionsSubtitle')}
      </Subtitle>
      <div style={{ margin: '16px 0' }}>
        <SubmitToCollection videoNode={videoNode} onChange={() => refetch()} />
      </div>
      {videoNode.collections.items.length ? (
        <DataTable columns={columns} items={videoNode.collections.items} />
      ) : (
        <p>{t('submissions.noSubmission')}</p>
      )}
    </>
  );
};

VideoNodeSubmissions.propTypes = {
  videoNodeId: PropTypes.string.isRequired,
};

export default VideoNodeSubmissions;
