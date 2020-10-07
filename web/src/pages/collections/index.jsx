import React from 'react';
import { useTranslation } from 'react-i18next';

import consts from 'claptime/consts';
import { Title } from 'claptime/components/atoms';
import Collections from 'claptime/components/organisms/Collections';
import NavBarTemplate from 'claptime/components/templates/NavBarTemplate';
import Head from 'claptime/lib/seo/Head';

const CollectionsPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head page="collections" />
      <NavBarTemplate>
        <div
          style={{
            padding: '20px 9% 0',
            minHeight: `calc(100vh - ${consts.style.navbar.height})`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
          }}
        >
          <Title>{t('collectionsPage.title')}</Title>
          <Collections />
        </div>
      </NavBarTemplate>
    </>
  );
};

export default CollectionsPage;
