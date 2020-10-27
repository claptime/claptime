import React from 'react';
import dynamic from 'next/dynamic';
import { Layout, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';

import { Spin, Title } from 'claptime/components/atoms';
import News from 'claptime/components/organisms/News';
import NavBarTemplate from 'claptime/components/templates/NavBarTemplate';
import { useIsAdmin } from 'claptime/lib/user';
import Head from 'claptime/lib/seo/Head';

const AdminPage = () => {
  const { t } = useTranslation();
  if (!useIsAdmin()) return <Spin />;

  return (
    <>
      <Head page="admin" />
      <NavBarTemplate>
        <Layout.Content style={{ padding: '50px' }}>
          <Title>{t('admin.container.title')}</Title>
          <Tabs defaultActiveKey="news">
            <Tabs.TabPane tab={t('admin.container.tabs.news')} key="news">
              <News />
            </Tabs.TabPane>
          </Tabs>
        </Layout.Content>
      </NavBarTemplate>
    </>
  );
};

export default dynamic(() => Promise.resolve(AdminPage), {
  ssr: false,
});
