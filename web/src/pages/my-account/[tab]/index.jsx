import React from 'react';
import dynamic from 'next/dynamic';

import { Spin } from 'claptime/components/atoms';
import { RoutedTabs } from 'claptime/components/molecules';
import Information from 'claptime/components/organisms/MyAccountTabs/Information';
import Notifications from 'claptime/components/organisms/MyAccountTabs/Notifications';
import Claps from 'claptime/components/organisms/MyAccountTabs/Claps';
import NavBarTemplate from 'claptime/components/templates/NavBarTemplate';
import Head from 'claptime/lib/seo/Head';
import { useIsAuthenticated } from 'claptime/lib/user';

const tabs = [
  {
    key: 'information',
    Component: Information,
  },
  {
    key: 'notifications',
    Component: Notifications,
  },
  {
    key: 'claps',
    Component: Claps,
  },
];

const MyAccountPage = () => {
  if (!useIsAuthenticated()) return <Spin />;
  return (
    <>
      <Head page="my-account" />
      <NavBarTemplate>
        <RoutedTabs
          tabs={tabs}
          basePath="/my-account"
          i18nBasePath="myAccountPage"
        />
      </NavBarTemplate>
    </>
  );
};

export default dynamic(() => Promise.resolve(MyAccountPage), {
  ssr: false,
});
