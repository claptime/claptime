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

const MyFavoritesPage = () => {
  const { t } = useTranslation();
  const user = useUserState();
  if (!useIsAuthenticated()) return <Spin />;

  const items = user.settings.videos
    .filter(({ list }) => list === 'LIKED')
    .map(({ videoNode }) => videoNode)
    .filter((videoNode) => videoNode);

  return (
    <>
      <Head page="my-favorites" />
      <NavBarTemplate>
        <Layouts.Strip isFirst>
          <Title>{t('myFavoritesPage.title')}</Title>
          {items.length ? (
            <StaticVideosList videos={items} />
          ) : (
            <div style={{ maxWidth: 600, margin: 'auto' }}>
              <Result
                icon={<Icons.EmptyHeart style={{ width: 24, height: 24 }} />}
                title={t('myFavoritesPage.emptyTitle')}
                subTitle={t('myFavoritesPage.emptyDescription')}
              />
            </div>
          )}
        </Layouts.Strip>
      </NavBarTemplate>
    </>
  );
};

export default dynamic(() => Promise.resolve(MyFavoritesPage), {
  ssr: false,
});
