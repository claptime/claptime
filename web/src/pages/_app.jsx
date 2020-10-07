import React, { useEffect } from 'react';
import NextHead from 'next/head';
import { ConfigProvider, Layout } from 'antd';
import { Hub } from 'aws-amplify';
import { ApolloProvider } from '@apollo/client';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { ThemeProvider } from 'styled-components';

import UserOnboardingModal from 'claptime/components/organisms/UserOnboardingModal';
import {
  UserProvider,
  useUserDispatch,
  useUserState,
  userActions,
} from 'claptime/lib/user';
import { initAmplify } from 'claptime/lib/amplify';
import getApolloClient from 'claptime/lib/apollo';
import { initChat } from 'claptime/lib/chat';
import { initFacebook } from 'claptime/lib/facebook';
import i18n from 'claptime/lib/i18n';
import { initMonitoring } from 'claptime/lib/monitoring';
import PropTypes from 'claptime/lib/prop-types';
import Head from 'claptime/lib/seo/Head';
import style from 'claptime/consts/style';
import 'claptime/styles/global.less';

const App = ({ Component, pageProps }) => {
  const dispatch = useUserDispatch();
  const user = useUserState();
  useEffect(() => {
    initAmplify();
    initChat();
    initFacebook();
    initMonitoring();
    Hub.listen('auth', async ({ payload: { event } }) => {
      switch (event) {
        case 'signIn':
          userActions.loadCognitoUser(dispatch)({ reloadUserSettings: true });
          break;
        case 'signOut':
          userActions.signOut(dispatch)();
          break;
        default:
          break;
      }
    });
    userActions.loadCognitoUser(dispatch)({ reloadUserSettings: true });
  }, [dispatch]);

  return (
    <>
      <NextHead>
        <meta charSet="utf-8" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1b1c30" />
        <meta name="apple-mobile-web-app-title" content="Claptime" />
        <meta name="application-name" content="Claptime" />
        <meta name="msapplication-TileColor" content="#1b1c30" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </NextHead>
      <Head page="default" />
      <Layout>
        {user.loaded && user.isLoggedIn && !user.isOnboarded ? (
          <UserOnboardingModal />
        ) : null}
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};

App.defaultProps = {
  pageProps: {},
};

const WithApollo = (props) => {
  const user = useUserState();
  const apolloClient = getApolloClient(user);
  return (
    <ThemeProvider theme={style}>
      <ApolloProvider client={apolloClient}>
        <ConfigProvider locale={i18n.getAntDesignLocale(user.locale)}>
          <DndProvider backend={HTML5Backend}>
            <App {...props} />
          </DndProvider>
        </ConfigProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
};

const WithUser = (props) => (
  <UserProvider>
    <WithApollo {...props} />
  </UserProvider>
);

export default WithUser;
