// https://stripe.com/docs/connect/standard-accounts
import React from 'react';
import { Button, Popconfirm, message } from 'antd';
import { ApiOutlined } from '@ant-design/icons';
import { gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import Router from 'next/router';

import { Spin } from 'claptime/components/atoms';
import consts from 'claptime/consts';
import {
  connectToStripe,
  getStripeAccessToken,
  revokeStripe,
} from 'claptime/graphql/payments';
import { useApolloClient, useQueryGet } from 'claptime/lib/apollo';
import PropTypes from 'claptime/lib/prop-types';
import { useUserState } from 'claptime/lib/user';
import StripeConnectButton from './StripeConnectButton';

const clientId = process.env.NEXT_PUBLIC_STRIPE_CONNECT_CLIENT_ID;

const StripeConnection = ({ queryString }) => {
  const { t } = useTranslation();
  const { settings, isLoggedIn } = useUserState();
  const apolloClient = useApolloClient();

  const { profileId } = settings;

  const { item, error, refetch, response } = useQueryGet(
    getStripeAccessToken,
    {
      variables: { profileId },
    },
    {
      resultPath: '$.getStripeAccessToken',
    },
  );

  if (!isLoggedIn) {
    return null;
  }

  if (response) return response;

  // In case of error, display a message and redirect
  if (queryString.error) {
    console.error(queryString.error, queryString.error_description);
    message.error(t('myProfilePage.payments.connectionError'));
    Router.push('/my-profile/payments');
    return <Spin />;
  }
  // In case of success, finish the process by calling our backend
  if (queryString.scope && queryString.code && profileId) {
    apolloClient
      .mutate({
        mutation: gql(connectToStripe),
        variables: {
          profileId,
          authorizationCode: queryString.code,
        },
      })
      .then(() => {
        Router.push('/my-profile/payments');
        refetch();
      });
    return <Spin />;
  }

  if (error) {
    console.error(error);
  }

  if (
    item?.data &&
    typeof JSON.parse(item.data) === 'object' &&
    JSON.parse(item.data).accessToken
  ) {
    return (
      <>
        <Button type="primary" style={{ width: '100%' }}>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={consts.stripeDashboard}
          >
            {t('myProfilePage.payments.accessStripeDashboard')}
          </a>
        </Button>
        <br />
        <br />
        <Popconfirm
          title={t('myProfilePage.payments.revokeConfirm')}
          onConfirm={() =>
            apolloClient
              .mutate({
                mutation: gql(revokeStripe),
                variables: {
                  profileId,
                },
              })
              .then(() => {
                refetch();
              })
          }
          okText={t('myProfilePage.payments.revokeYes')}
          cancelText={t('myProfilePage.payments.revokeNo')}
        >
          <Button
            type="primary"
            style={{ width: '100%' }}
            danger
            icon={<ApiOutlined />}
          >
            {t('myProfilePage.payments.revoke')}
          </Button>
        </Popconfirm>
      </>
    );
  }
  return <StripeConnectButton clientId={clientId} />;
};

StripeConnection.propTypes = {
  queryString: PropTypes.shape({
    error: PropTypes.string,
    error_description: PropTypes.string,
    scope: PropTypes.string,
    code: PropTypes.string,
  }).isRequired,
};

export default StripeConnection;
