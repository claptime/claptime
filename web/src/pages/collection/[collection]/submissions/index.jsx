import React from 'react';
import dynamic from 'next/dynamic';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Button, Layout, PageHeader, Tooltip } from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';

import { Spin } from 'claptime/components/atoms';
import SubmissionsValidation from 'claptime/components/organisms/SubmissionsValidation';
import NavBarTemplate from 'claptime/components/templates/NavBarTemplate';
import { listCollectionsBySlug } from 'claptime/graphql/collections';
import { useQueryGet } from 'claptime/lib/apollo';
import Head from 'claptime/lib/seo/Head';
import { useIsAuthenticated, useUserState } from 'claptime/lib/user';

const CollectionSubmissionsPage = () => {
  const {
    query: { collection: collectionSlug },
  } = useRouter();
  const { t } = useTranslation();
  const { username: userId, isAdmin } = useUserState();

  const { item: collection, response } = useQueryGet(
    listCollectionsBySlug,
    {
      variables: {
        slug: collectionSlug,
      },
      errorPolicy: 'all',
    },
    { resultPath: '$.listCollectionsBySlug.items[0]' },
  );
  if (!useIsAuthenticated()) return <Spin />;
  if (response) return response;

  // Check authorization
  if (!isAdmin && collection.owner !== userId) {
    Router.push('/');
  }

  return (
    <>
      <Head page="collection/submissions" />
      <NavBarTemplate>
        <>
          <PageHeader
            title={t('collection.submissions.pageTitle', {
              collectionName: collection.name,
            })}
            extra={[
              <Tooltip title={t('collection.submissions.view')} key="view">
                <Link
                  href="/collection/[collection]"
                  as={`/collection/${collection.slug}`}
                >
                  <a>
                    <Button icon={<EyeOutlined />} />
                  </a>
                </Link>
              </Tooltip>,
              <Tooltip title={t('collection.submissions.edit')} key="edit">
                <Link
                  href="/collection/[collection]/edit"
                  as={`/collection/${collection.slug}/edit`}
                >
                  <a>
                    <Button icon={<EditOutlined />} />
                  </a>
                </Link>
              </Tooltip>,
            ]}
          />
          <Layout.Content style={{ padding: '50px' }}>
            <SubmissionsValidation collectionId={collection.id} />
          </Layout.Content>
        </>
      </NavBarTemplate>
    </>
  );
};

export default dynamic(() => Promise.resolve(CollectionSubmissionsPage), {
  ssr: false,
});
