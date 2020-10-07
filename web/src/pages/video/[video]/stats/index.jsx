import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Router, { useRouter } from 'next/router';
import { Button, Layout, Tooltip, Typography } from 'antd';
import {
  EyeOutlined,
  InfoCircleOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import {
  BarChart,
  Bar,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from 'recharts';
import moment from 'moment';

import { Spin } from 'claptime/components/atoms';
import { PageHeader } from 'claptime/components/molecules';
import NavBarTemplate from 'claptime/components/templates/NavBarTemplate';
import { useQueryGet } from 'claptime/lib/apollo';
import Head from 'claptime/lib/seo/Head';
import { useIsAuthenticated, useUserState } from 'claptime/lib/user';

const getMonthDates = (date) =>
  new Array(date.daysInMonth())
    .fill(null)
    .map((x, i) => moment(date).startOf('month').add(i, 'days'));

const getVideoNodeWithViews = `
query getVideoNodeWithViews($id: ID!, $filter: ModelViewFilterInput, $limit: Int, $nextToken: String) {
  getVideoNode(id: $id) {
    id
    title
    views(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
      }
      nextToken
    }
    owner
  }
}
`;

const VideoStatsPage = () => {
  const {
    query: { video: videoId },
  } = useRouter();
  const { t } = useTranslation();
  const [currentMonth, setCurrentMonth] = useState(moment().startOf('month'));
  const { username: userId, isAdmin } = useUserState();
  const { response, item } = useQueryGet(
    getVideoNodeWithViews,
    {
      variables: {
        id: videoId,
        filter: {
          and: [
            {
              createdAt: {
                ge: moment(currentMonth).format(),
              },
            },
            {
              createdAt: {
                le: moment(currentMonth).endOf('month').format(),
              },
            },
          ],
        },
        limit: 100,
      },
      errorPolicy: 'all',
    },
    {
      resultPath: '$.getVideoNode',
      pathsToIterate: [
        {
          path: '$.getVideoNode.views',
          nextTokenVariableName: 'nextToken',
        },
      ],
    },
  );
  if (!useIsAuthenticated()) return <Spin />;
  if (response) return response;
  const {
    title,
    views: { items },
    owner,
  } = item;

  // Check authorization
  if (!isAdmin && owner !== userId) {
    Router.push('/');
  }

  const views = items.reduce((acc, cur) => {
    const day = cur.createdAt.split('T')[0];
    if (!acc[day]) {
      acc[day] = 0;
    }
    acc[day]++;
    return acc;
  }, {});

  return (
    <>
      <Head page="video/stats" />
      <NavBarTemplate>
        <Layout.Content style={{ padding: '48px' }}>
          <PageHeader
            title={t('videoStatsPage.pageTitle', {
              videoTitle: title,
            })}
            extra={[
              <Tooltip title={t('videoStatsPage.view')} key="view">
                <Link href="/video/[video]" as={`/video/${videoId}`}>
                  <a>
                    <Button icon={<EyeOutlined />} />
                  </a>
                </Link>
              </Tooltip>,
            ]}
          />
          <Typography.Title level={2}>
            {t('videoStatsPage.viewsChartTitle', {
              month: moment(currentMonth).format('MMMM YYYY'),
            })}{' '}
            <Tooltip
              title={t('videoStatsPage.pageTitleTooltip')}
              placement="rightTop"
            >
              <InfoCircleOutlined />
            </Tooltip>
          </Typography.Title>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Button
              icon={<LeftOutlined />}
              onClick={() =>
                setCurrentMonth(
                  moment(currentMonth).subtract(1, 'months').startOf('month'),
                )
              }
            />
            <BarChart
              width={600}
              height={400}
              data={getMonthDates(moment(currentMonth))
                .map((date) => date.format('YYYY-MM-DD'))
                .map((date) => ({
                  date,
                  views: views[date] || 0,
                }))}
            >
              <Bar type="monotone" dataKey="views" fill="#8884d8" />
              <XAxis dataKey="date" tickFormatter={() => ''} interval={0} />
              <YAxis allowDecimals={false} allowDuplicatedCategory={false} />
              <RechartsTooltip
                formatter={(value) => [value, t('videoStatsPage.views')]}
              />
            </BarChart>
            <Button
              icon={<RightOutlined />}
              onClick={() =>
                setCurrentMonth(
                  moment(currentMonth).add(1, 'months').startOf('month'),
                )
              }
              disabled={
                currentMonth.format('YYYY-MM') === moment().format('YYYY-MM')
              }
            />
          </div>
        </Layout.Content>
      </NavBarTemplate>
    </>
  );
};

export default dynamic(() => Promise.resolve(VideoStatsPage), {
  ssr: false,
});
