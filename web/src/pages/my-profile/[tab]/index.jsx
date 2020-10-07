import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Button, Checkbox, Result, Tooltip } from 'antd';
import { EyeOutlined, InfoCircleFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

import { Spin } from 'claptime/components/atoms';
import { RoutedTabs } from 'claptime/components/molecules';
import Information from 'claptime/components/organisms/MyProfileTabs/Information';
import Collections from 'claptime/components/organisms/MyProfileTabs/Collections';
import Videos from 'claptime/components/organisms/MyProfileTabs/Videos';
import Series from 'claptime/components/organisms/MyProfileTabs/Series';
import Payments from 'claptime/components/organisms/MyProfileTabs/Payments';
import NavBarTemplate from 'claptime/components/templates/NavBarTemplate';
import { listCollections } from 'claptime/graphql/collections';
import { useQueryList } from 'claptime/lib/apollo';
import Head from 'claptime/lib/seo/Head';
import { useIsAuthenticated, useUserState } from 'claptime/lib/user';
import { nl2br } from 'claptime/utils/i18n';

const MyProfilePage = () => {
  const user = useUserState();
  const [showWarning, setShowWarning] = useState(!user.hasPublicProfile);
  const [acknowledged, setAcknowledged] = useState(false);
  const { t } = useTranslation();
  const { response, items: collections } = useQueryList(
    listCollections,
    {
      errorPolicy: 'all',
      variables: {
        filter: {
          collectionProfileId: {
            eq: user.settings.profileId,
          },
        },
      },
      skip: !user.hasPublicProfile,
    },
    {
      resultPath: '$.listCollections',
      getAll: true,
    },
  );
  if (!useIsAuthenticated()) return <Spin />;
  if (response) return response;

  if (showWarning) {
    return (
      <>
        <Head page="my-profile" />
        <NavBarTemplate>
          <Result
            icon={<InfoCircleFilled />}
            title={t('myProfilePage.container.noProfileYetTitle')}
            subTitle={nl2br(t('myProfilePage.container.noProfileYetSubTitle'))}
            extra={
              <>
                <Checkbox
                  onChange={({ target: { checked } }) =>
                    setAcknowledged(checked)
                  }
                >
                  {t('myProfilePage.container.acknowledgement')}
                </Checkbox>
                <br />
                <br />
                <Button
                  type="primary"
                  disabled={!acknowledged}
                  onClick={() => setShowWarning(false)}
                >
                  {t('myProfilePage.container.createProfileButton')}
                </Button>
              </>
            }
          />
        </NavBarTemplate>
      </>
    );
  }
  const tabs = [
    {
      key: 'information',
      Component: Information,
      isDefault: true,
    },
  ];
  const actions = [];
  if (user.hasPublicProfile) {
    tabs.push(
      {
        key: 'videos',
        Component: Videos,
      },
      {
        key: 'series',
        Component: Series,
      },
      {
        key: 'payments',
        Component: Payments,
      },
    );
    actions.push(
      <Tooltip
        title={t('myProfilePage.container.actions.view')}
        placement="leftTop"
        key="view"
      >
        <Link
          href="/profile/[profile]"
          as={`/profile/${user.settings.profileId}`}
        >
          <a>
            <Button icon={<EyeOutlined />} />
          </a>
        </Link>
      </Tooltip>,
    );
  }
  // Only display collection tab to collection owners
  if (collections.length) {
    tabs.push({
      key: 'collections',
      Component: Collections,
    });
  }
  return (
    <>
      <Head page="my-profile" />
      <NavBarTemplate>
        <RoutedTabs
          tabs={tabs}
          basePath="/my-profile"
          i18nBasePath="myProfilePage"
          actions={actions}
        />
      </NavBarTemplate>
    </>
  );
};

export default dynamic(() => Promise.resolve(MyProfilePage), {
  ssr: false,
});
