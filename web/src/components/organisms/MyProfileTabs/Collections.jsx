import React from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Button, Tag, Tooltip } from 'antd';
import { CheckOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

import { ButtonGroup, Covers } from 'claptime/components/atoms';
import DataTable from 'claptime/components/organisms/DataTable';
import { listCollections } from 'claptime/graphql/collections';
import { useQueryList } from 'claptime/lib/apollo';
import { useUserState } from 'claptime/lib/user';

const Collections = () => {
  const { t } = useTranslation();
  const user = useUserState();
  const { items, response } = useQueryList(
    listCollections,
    {
      variables: {
        filter: {
          collectionProfileId: { eq: user.settings.profileId },
        },
        limit: 100,
      },
      errorPolicy: 'all',
    },
    {
      resultPath: '$.listCollections',
      getAll: true,
    },
  );
  if (response) return response;

  const collections = items.filter((item) => item); // in case some collections are undefined

  const columns = [
    {
      title: t('myProfilePage.collections.table.cover'),
      key: 'cover',
      optional: true,
      render: (text, record) => (
        <Covers.Collection width={300} height={60} collectionId={record.id} />
      ),
    },
    {
      title: t('myProfilePage.collections.table.name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('myProfilePage.collections.table.creationDate'),
      dataIndex: 'createdAt',
      key: 'creationDate',
      optional: true,
      render: (date) => moment(date).calendar(),
    },
    {
      title: t('myProfilePage.collections.table.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status, row) => {
        let color;
        switch (status) {
          case 'PUBLISHED':
            color = 'green';
            break;
          case 'DRAFT':
          default:
            color = 'gold';
        }
        return (
          <Tooltip title={t(`collection.status.${status}.description`)}>
            <Tag color={color} key={status}>
              {t(`collection.status.${status}.title`)}
            </Tag>
          </Tooltip>
        );
      },
    },
    {
      title: t('myProfilePage.collections.table.actions'),
      key: 'actions',
      render: (text, record) => (
        <ButtonGroup>
          <Tooltip title={t('myProfilePage.collections.table.view')}>
            <Link
              href="/collection/[collection]"
              as={`/collection/${record.slug}`}
            >
              <a>
                <Button icon={<EyeOutlined />} />
              </a>
            </Link>
          </Tooltip>
          <Tooltip title={t('myProfilePage.collections.table.view')}>
            <Link
              href="/collection/[collection]/edit"
              as={`/collection/${record.slug}/edit`}
            >
              <a>
                <Button icon={<EditOutlined />} />
              </a>
            </Link>
          </Tooltip>
          <Tooltip title={t('myProfilePage.collections.table.validate')}>
            <Link
              href="/collection/[collection]/submissions"
              as={`/collection/${record.slug}/submissions`}
            >
              <a>
                <Button icon={<CheckOutlined />} />
              </a>
            </Link>
          </Tooltip>
        </ButtonGroup>
      ),
    },
  ];

  return <DataTable columns={columns} items={collections} />;
};

export default Collections;
