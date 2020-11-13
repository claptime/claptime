import React, { useState } from 'react';
import { Button, Input, Popconfirm, Tooltip, Empty, message } from 'antd';
import { EyeOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { gql } from '@apollo/client';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import { ButtonGroup } from 'claptime/components/atoms';
import DataTable from 'claptime/components/organisms/DataTable';
import {
  listCollectionVideoNodes,
  validateSubmission,
} from 'claptime/graphql/collections';
import { useApolloClient, useQueryList } from 'claptime/lib/apollo';
import PropTypes from 'claptime/lib/prop-types';

const SubmissionsValidation = ({ collectionId }) => {
  const { t } = useTranslation();
  const apolloClient = useApolloClient();
  const [rejectionReason, setRejectionReason] = useState(null);

  const { items, refetch, response } = useQueryList(
    listCollectionVideoNodes,
    {
      variables: {
        filter: {
          collectionVideoNodeCollectionId: {
            eq: collectionId,
          },
          status: {
            eq: 'SUBMITTED',
          },
        },
      },
      errorPolicy: 'all',
    },
    { resultPath: '$.listCollectionVideoNodes', getAll: true },
  );
  if (response) return response;

  if (!items.length)
    return <Empty description={t('collection.submissions.emptyState')} />;

  const validate = async (id, status) => {
    await apolloClient.mutate({
      mutation: gql(validateSubmission),
      variables: {
        collectionVideoNodeId: id,
        status,
        rejectionReason: status === 'REJECTED' ? rejectionReason : null,
      },
      update: () => refetch(),
    });
    message.success(
      status === 'APPROVED'
        ? t('collection.submissions.table.approved')
        : t('collection.submissions.table.rejected'),
    );
  };

  const columns = [
    {
      title: t('collection.submissions.table.title'),
      key: 'title',
      render: (text, record) => record.videoNode.title,
    },
    {
      title: t('collection.submissions.table.category'),
      key: 'category',
      render: (text, record) =>
        record.collection.categories.find(({ id }) => id === record.categoryId)
          .category,
    },
    {
      title: t('collection.submissions.table.submissionDate'),
      dataIndex: 'createdAt',
      key: 'uploadDate',
      render: (date) => moment(date).calendar(),
    },
    {
      title: t('collection.submissions.table.actions'),
      key: 'actions',
      render: (text, record) => (
        <ButtonGroup>
          <Tooltip title={t('collection.submissions.table.view')}>
            <Link
              href="/video/[video]"
              as={`/video/${record.collectionVideoNodeVideoNodeId}`}
            >
              <a>
                <Button icon={<EyeOutlined />} />
              </a>
            </Link>
          </Tooltip>
          <Tooltip title={t('collection.submissions.table.approve')}>
            <Popconfirm
              title={
                <div
                  style={{
                    maxWidth: 300,
                  }}
                >
                  <h3>{t('collection.submissions.table.approve')}</h3>
                  <p>{t('collection.submissions.table.approveConfirm')}</p>
                </div>
              }
              onConfirm={() => validate(record.id, 'APPROVED')}
              okText={t('collection.submissions.table.yes')}
              cancelText={t('collection.submissions.table.no')}
              icon={<CheckOutlined style={{ color: 'green' }} />}
            >
              <Button icon={<CheckOutlined style={{ color: 'green' }} />} />
            </Popconfirm>
          </Tooltip>
          <Tooltip title={t('collection.submissions.table.reject')}>
            <Popconfirm
              title={
                <div
                  style={{
                    maxWidth: 300,
                  }}
                >
                  <h3>{t('collection.submissions.table.reject')}</h3>
                  <p>{t('collection.submissions.table.rejectConfirm')}</p>
                  <Input.TextArea
                    rows={4}
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder={t(
                      'collection.submissions.table.rejectReasonPlaceholder',
                    )}
                  />
                </div>
              }
              onConfirm={() => validate(record.id, 'REJECTED')}
              okText={t('collection.submissions.table.yes')}
              cancelText={t('collection.submissions.table.no')}
              icon={<CloseOutlined style={{ color: 'red' }} />}
            >
              <Button icon={<CloseOutlined style={{ color: 'red' }} />} />
            </Popconfirm>
          </Tooltip>
        </ButtonGroup>
      ),
    },
  ];
  const videos = items.map((item) => ({
    ...item,
    key: item.id,
  }));
  return <DataTable columns={columns} items={videos} />;
};

SubmissionsValidation.propTypes = {
  collectionId: PropTypes.string.isRequired,
};

export default SubmissionsValidation;
