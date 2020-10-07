import React from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import { Result } from 'antd';

import { Icons, Spin, Title } from 'claptime/components/atoms';
import { Layouts } from 'claptime/components/molecules';
import { StaticVideosList } from 'claptime/components/organisms/VideosList';
import NavBarTemplate from 'claptime/components/templates/NavBarTemplate';
import Head from 'claptime/lib/seo/Head';
import { useIsAuthenticated, useUserState } from 'claptime/lib/user';

const MyListPage = () => {
  const { t } = useTranslation();
  const user = useUserState();
  if (!useIsAuthenticated()) return <Spin />;

  const items = user.settings.videos
    .filter(({ list }) => list === 'TO_WATCH')
    .map(({ videoNode }) => videoNode)
    .filter((videoNode) => videoNode);

  return (
    <>
      <Head page="my-list" />
      <NavBarTemplate>
        <Layouts.Strip isFirst>
          <Title>{t('myListPage.title')}</Title>
          {items.length ? (
            <StaticVideosList videos={items} />
          ) : (
            <div style={{ maxWidth: 600, margin: 'auto' }}>
              <Result
                icon={<Icons.EmptyBookmark style={{ width: 24, height: 24 }} />}
                title={t('myListPage.emptyTitle')}
                subTitle={t('myListPage.emptyDescription')}
              />
            </div>
          )}
        </Layouts.Strip>
      </NavBarTemplate>
    </>
  );
};

export default dynamic(() => Promise.resolve(MyListPage), {
  ssr: false,
});
