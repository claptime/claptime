import React from 'react';
import { useTranslation } from 'react-i18next';
import Router from 'next/router';
import Link from 'next/link';
import { Button, Tag, Tooltip } from 'antd';
import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import { gql } from '@apollo/client';

import { ButtonGroup, Covers } from 'claptime/components/atoms';
import DataTable from 'claptime/components/organisms/DataTable';
import { createNews, listNews } from 'claptime/graphql/news';
import { useApolloClient, useQueryList } from 'claptime/lib/apollo';

const News = () => {
  const { t } = useTranslation();
  const apolloClient = useApolloClient();
  const { items: news, response } = useQueryList(
    listNews,
    {},
    {
      resultPath: '$.listNews',
      getAll: true,
    },
  );
  if (response) return response;

  const createAction = async () => {
    const {
      data: {
        createNews: { id: newsId },
      },
    } = await apolloClient.mutate({
      mutation: gql(createNews),
      variables: {
        input: {
          title: '',
          status: 'DRAFT',
        },
      },
    });
    Router.push(`/news/${newsId}/edit`);
  };

  const columns = [
    {
      title: t('admin.news.table.cover'),
      key: 'cover',
      optional: true,
      render: (text, record) => (
        <Covers.News width={300} height={100} newsId={record.id} />
      ),
    },
    {
      title: t('admin.news.table.title'),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('admin.news.table.status'),
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
          <Tooltip title={t(`news.status.${status}.description`)}>
            <Tag color={color} key={status}>
              {t(`news.status.${status}.title`)}
            </Tag>
          </Tooltip>
        );
      },
    },
    {
      title: t('admin.news.table.actions'),
      key: 'actions',
      render: (text, record) => (
        <ButtonGroup>
          <Tooltip title={t('admin.news.table.view')}>
            <Link href="/news/[news]/edit" as={`/news/${record.id}/edit`}>
              <a>
                <Button icon={<EditOutlined />} />
              </a>
            </Link>
          </Tooltip>
        </ButtonGroup>
      ),
    },
  ];

  return (
    <>
      <Button icon={<UploadOutlined />} onClick={createAction}>
        {t('admin.news.create')}
      </Button>
      <br />
      <br />
      <DataTable columns={columns} items={news} />
    </>
  );
};

export default News;
