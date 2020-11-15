import React from 'react';
import { useTranslation } from 'react-i18next';

import { Title } from 'claptime/components/atoms';
import { Layouts, RoutedTabs } from 'claptime/components/molecules';
import Association from 'claptime/components/organisms/AboutProjectTabs/Association';
import Manifest from 'claptime/components/organisms/AboutProjectTabs/Manifest';
import Partners from 'claptime/components/organisms/AboutProjectTabs/Partners';
import NavBarTemplate from 'claptime/components/templates/NavBarTemplate';
import Head from 'claptime/lib/seo/Head';

const tabs = [
  {
    key: 'manifest',
    Component: Manifest,
  },
  {
    key: 'association',
    Component: Association,
  },
  {
    key: 'partners',
    Component: Partners,
  },
];

const ProjectPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head page="about/project" />
      <NavBarTemplate>
        <Layouts.Strip isFirst>
          <Title>{t(`projectPage.pageTitle`)}</Title>
          <RoutedTabs
            tabs={tabs}
            basePath="/about/project"
            i18nBasePath="projectPage"
            withPageTitle={false}
          />
        </Layouts.Strip>
      </NavBarTemplate>
    </>
  );
};

export default ProjectPage;
