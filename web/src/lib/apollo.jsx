// https://medium.com/@guillac124/create-your-custom-apollo-client-for-aws-appsync-to-use-hooks-2d5cbce29db5
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Auth } from 'aws-amplify';
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  gql,
  useLazyQuery,
  useQuery,
} from '@apollo/client';
import { createAuthLink } from 'aws-appsync-auth-link';
// TODO this package still requires apollo-client
// we should uninstall apollo-client when this will be fixed:
// https://github.com/awslabs/aws-mobile-appsync-sdk-js/issues/493
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import { JSONPath } from 'jsonpath-plus';
import { Button, Result } from 'antd';
import {
  HomeOutlined,
  ReloadOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

import { Spin } from 'claptime/components/atoms';
import { initAmplify } from 'claptime/lib/amplify';
import { openChat } from 'claptime/lib/chat';
import { updateQuery } from 'claptime/utils';
import AppSyncConfig from 'claptime/aws-exports';

export {
  useApolloClient,
  useMutation,
  useQuery,
  useSubscription,
} from '@apollo/client';

const url = AppSyncConfig.aws_appsync_graphqlEndpoint;
const region = AppSyncConfig.aws_appsync_region;

const authParams = {
  url,
  region,
  auth: {
    type: 'AMAZON_COGNITO_USER_POOLS',
    jwtToken: async () => {
      try {
        return (await Auth.currentSession()).getIdToken().getJwtToken();
      } catch (e) {
        console.error(e);
        return null;
      }
    },
  },
};

export const authClient = new ApolloClient({
  disableOffline: true,
  link: ApolloLink.from([
    createAuthLink(authParams),
    createSubscriptionHandshakeLink(authParams),
  ]),
  cache: new InMemoryCache(),
});

const unauthParams = {
  url,
  region,
  auth: {
    type: 'AWS_IAM',
    credentials: () => Auth.currentCredentials(),
  },
};

// Required to use unauthClient in getServerSideProps
initAmplify();

export const unauthClient = new ApolloClient({
  disableOffline: true,
  link: ApolloLink.from([
    createAuthLink(unauthParams),
    createSubscriptionHandshakeLink(unauthParams),
  ]),
  cache: new InMemoryCache(),
});

const useQueryCustom = (
  query,
  queryParams,
  { errorElement, resultPath = '$', lazy = false } = {},
) => {
  const { t } = useTranslation();
  // This mapping avoid using a condition within a hook
  const mapping = {
    true: useLazyQuery,
    false: useQuery,
  };
  const res = mapping[lazy](gql(query), queryParams);
  const result = Array.isArray(res)
    ? {
        ...res[1],
        run: res[0],
      }
    : res;
  if (result.loading) {
    return {
      ...result,
      response: <Spin />,
    };
  }
  if (result.error) console.warn(result.error.message);

  if (queryParams.skip) {
    result.skipped = true;
    return result;
  }
  if (
    !result.data ||
    !JSONPath({ path: resultPath, json: result.data }).shift()
  ) {
    return {
      ...result,
      response: errorElement || (
        <Result
          status="500"
          title={t('errors.fetchingData.title')}
          subTitle={t('errors.fetchingData.subTitle')}
          extra={
            <>
              <Button
                icon={<ReloadOutlined />}
                onClick={() => document.location.reload(true)}
                type="primary"
              >
                {t('errors.fetchingData.refreshButton')}
              </Button>
              <Link href="/">
                <a>
                  <Button icon={<HomeOutlined />}>
                    {t('errors.fetchingData.backHomeButton')}
                  </Button>
                </a>
              </Link>
              <Button icon={<MessageOutlined />} onClick={() => openChat(true)}>
                {t('errors.fetchingData.contactButton')}
              </Button>
            </>
          }
        />
      ),
    };
  }
  return result;
};

export const useQueryGet = (
  query,
  queryParams,
  { resultPath = '$', errorElement, pathsToIterate = [], lazy = false } = {},
) => {
  const result = useQueryCustom(query, queryParams, {
    resultPath,
    errorElement,
    lazy,
  });

  if (result.skipped) {
    return {
      item: null,
      refetch: result.refetch,
    };
  }
  if (result.response) {
    return result;
  }

  pathsToIterate.forEach(({ path, nextTokenVariableName }) => {
    const res = JSONPath({ path, json: result.data }).shift();
    if (res && res.nextToken) {
      result.fetchMore({
        variables: { [nextTokenVariableName]: res.nextToken },
        updateQuery: (...props) => updateQuery(path, ...props),
      });
    }
  });

  return {
    item: JSONPath({ path: resultPath, json: result.data }).shift(),
    run: result.run,
    refetch: result.refetch,
  };
};

export const useQueryList = (
  query,
  queryParams,
  {
    resultPath = '$',
    errorElement,
    nextTokenVariableName = 'nextToken',
    getAll = false,
    lazy = false,
  } = {},
) => {
  const result = useQueryCustom(query, queryParams, {
    resultPath,
    errorElement,
    lazy,
  });

  if (result.skipped) {
    return {
      items: [],
    };
  }
  if (result.response) {
    return result;
  }
  const { items, nextToken } = JSONPath({
    path: resultPath,
    json: result.data,
  }).shift();
  const loadMore = () =>
    result.fetchMore({
      variables: { [nextTokenVariableName]: nextToken },
      updateQuery: (...props) => updateQuery(resultPath, ...props),
    });
  if (nextToken && getAll) {
    loadMore();
  }
  return {
    items,
    run: result.run,
    refetch: result.refetch,
    hasMore: Boolean(nextToken),
    loadMore,
  };
};

const withUser = (user) => (user.isLoggedIn ? authClient : unauthClient);

export default withUser;
