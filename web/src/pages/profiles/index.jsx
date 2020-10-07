import React from 'react';
import { useTranslation } from 'react-i18next';

import consts from 'claptime/consts';
import { Title } from 'claptime/components/atoms';
import Profiles from 'claptime/components/organisms/Profiles';
import NavBarTemplate from 'claptime/components/templates/NavBarTemplate';
import Head from 'claptime/lib/seo/Head';

const ProfilesPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head page="profiles" />
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
          <Title>{t('profilesPage.title')}</Title>
          <Profiles />
        </div>
      </NavBarTemplate>
    </>
  );
};

export default ProfilesPage;
