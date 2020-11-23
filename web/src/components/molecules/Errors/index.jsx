import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Button, Result } from 'antd';
import { HomeOutlined, ReloadOutlined } from '@ant-design/icons';

import { ContactUsButton } from 'claptime/components/atoms';
import PropTypes from 'claptime/lib/prop-types';

export const Error = ({ status, title, subtitle }) => {
  const { t } = useTranslation();
  return (
    <Result
      status={status}
      title={title}
      subTitle={subtitle}
      extra={
        <>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => document.location.reload(true)}
            type="primary"
          >
            {t('errors.refreshButton')}
          </Button>
          <Link href="/">
            <a>
              <Button icon={<HomeOutlined />}>
                {t('errors.backHomeButton')}
              </Button>
            </a>
          </Link>
          <ContactUsButton buttonText={t('errors.contactUs')} />
        </>
      }
    />
  );
};

Error.propTypes = {
  status: PropTypes.oneOf([
    'success',
    'error',
    'info',
    'warning',
    '404',
    '403',
    '500',
  ]).isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export const Error404 = () => {
  const { t } = useTranslation();
  return (
    <Error
      status="404"
      title={t('errors.404.title')}
      subtitle={t('errors.404.subtitle')}
    />
  );
};

export const Error500 = () => {
  const { t } = useTranslation();
  return (
    <Error
      status="500"
      title={t('errors.500.title')}
      subtitle={t('errors.500.subtitle')}
    />
  );
};

export const ErrorFetchingData = () => {
  const { t } = useTranslation();
  return (
    <Error
      status="error"
      title={t('errors.fetchingData.title')}
      subtitle={t('errors.fetchingData.subtitle')}
    />
  );
};

export default {
  Error,
  Error404,
  Error500,
  ErrorFetchingData,
};
