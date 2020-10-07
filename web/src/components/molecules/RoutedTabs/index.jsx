import React from 'react';
import Router, { useRouter } from 'next/router';
import { Tabs, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import PropTypes from 'claptime/lib/prop-types';
import PageHeader from 'claptime/components/molecules/PageHeader';

const RoutedTabs = ({ actions, basePath, tabs, i18nBasePath }) => {
  const { t } = useTranslation();
  const { asPath } = useRouter();
  const currentKey = asPath.split('/').pop();

  const pageTitle = (
    <span>
      {t(`${i18nBasePath}.container.title`)}{' '}
      <Tooltip
        title={t(`${i18nBasePath}.container.tooltip`)}
        placement="rightTop"
      >
        <InfoCircleOutlined />
      </Tooltip>
    </span>
  );

  return (
    <div>
      <PageHeader title={pageTitle} extra={actions} />
      <div
        style={{
          padding: '9%',
          paddingTop: 0,
        }}
      >
        <Tabs
          defaultActiveKey={currentKey}
          tabPosition="top"
          style={{
            margin: '0 auto',
          }}
          onChange={(key) => {
            Router.push(`${basePath}/${key}`);
          }}
        >
          {tabs.map(({ key, Component }) => (
            <Tabs.TabPane
              tab={t(`${i18nBasePath}.container.tabs.${key}`)}
              key={key}
            >
              <Component />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

RoutedTabs.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.node),
  basePath: PropTypes.string.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  i18nBasePath: PropTypes.string.isRequired,
};

RoutedTabs.defaultProps = {
  actions: [],
};

export default RoutedTabs;
