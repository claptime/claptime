import React, { useEffect, useState } from 'react';

import { Avatar, Badge, Popover, List, Tooltip, Result } from 'antd';
import { BellFilled, QuestionCircleOutlined } from '@ant-design/icons';

import InfiniteScroll from 'react-infinite-scroller';

import { gql } from '@apollo/client';

import { useTranslation, Trans } from 'react-i18next';

import styled from 'styled-components';

import { useSubscription, useQueryList } from 'claptime/lib/apollo';
import PropTypes from 'claptime/lib/prop-types';

import consts from 'claptime/consts';

import { Covers, NotificationListItem } from 'claptime/components/atoms';

import { useUserState } from 'claptime/lib/user';

import {
  onCreateNotification,
  listNotificationsByOwnerSortByCreatedAt,
} from 'claptime/graphql/notifications';

const {
  style: {
    colors: { strawberry, primary },
  },
} = consts;

const LIMIT = 5;

const InfiniteContainer = styled.div`
  overflow: auto;
  max-height: 500px;
`;

const StyledResult = styled(Result)`
  .ant-result-title {
    font-size: 18px;
    font-weight: bold;
  }
`;

const StyledList = styled(List)`
  .ant-list-item {
    align-items: center;
    flex-direction: row-reverse;
    flex-wrap: nowrap;
    &:hover {
      background: #dddddd;
    }
    transition: background 0.5s;
    padding: 12px 12px;
  }
  .ant-list-item-extra {
    margin-left: 0;
    margin-right: 20px;
  }
  .ant-list-item-action > li {
    font-size: 18px;
  }
`;

// Popover need to be wrapped to support styled-component: https://github.com/yesmeck/styled-antd/issues/1
const MyPopover = ({ className, ...props }) => (
  <Popover {...props} overlayClassName={className} />
);

const StyledPopover = styled(MyPopover)`
  .ant-popover-content {
    max-width: 500px;
  }
`;

const Notifications = () => {
  const [notificationsList, setNotificationsList] = useState([]);

  const { t } = useTranslation();

  const { username: userId } = useUserState();

  const { items: notifications, hasMore, loadMore } = useQueryList(
    listNotificationsByOwnerSortByCreatedAt,
    {
      variables: {
        owner: userId,
        limit: LIMIT,
        sortDirection: 'DESC',
      },
    },
    {
      resultPath: '$.listNotificationsByOwnerSortByCreatedAt',
    },
  );

  useSubscription(gql(onCreateNotification), {
    variables: { owner: userId },
    onSubscriptionData: ({ subscriptionData }) => {
      const {
        data: { onCreateNotification: newNotification },
      } = subscriptionData;
      setNotificationsList([newNotification, ...notificationsList]);
    },
  });

  useEffect(() => {
    if (notifications) {
      setNotificationsList(notifications);
    }
  }, [notifications]);

  const onDeleteItem = (id) => {
    setNotificationsList(notificationsList.filter((n) => n.id !== id));
  };

  const getPopoverContent = () => {
    if (notificationsList.length > 0) {
      return (
        <InfiniteContainer className="claptime-infinite-notifications">
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={loadMore}
            hasMore={hasMore}
            useWindow={false}
          >
            <StyledList
              itemLayout="vertical"
              dataSource={notificationsList}
              renderItem={(item) => formatNotification(item)}
              locale={{ emptyText: t('notifications.popover.empty') }}
            />
          </InfiniteScroll>
        </InfiniteContainer>
      );
    }
    return (
      <StyledResult
        icon={<QuestionCircleOutlined />}
        title={t('notifications.popover.emptyTitle')}
        subTitle={t('notifications.popover.emptySubTitle')}
      />
    );
  };

  const formatNotification = (notification) => {
    const { id: notificationId, type, payload, isRead } = notification;
    const jsonPayload = JSON.parse(payload);
    let notificationDescription;
    let link;
    let extra;
    switch (type) {
      case 'VIDEO_NODE_ADDED_TO_COLLECTION_SUBSCRIBERS': {
        const {
          collection: { name: collectionName },
          videoNode: { id: videoNodeId, title: videoNodeTitle },
        } = jsonPayload;
        link = `/video/${videoNodeId}`;
        extra = <Covers.Video width={69} height={92} videoId={videoNodeId} />;
        notificationDescription = (
          <Trans i18nKey="notifications.videoNodeAddedToCollectionSubscribers">
            <strong>{{ videoNodeTitle }}</strong>, nouvel ajout dans la
            collection <strong>{{ collectionName }}</strong>
          </Trans>
        );
        break;
      }
      case 'VIDEO_NODE_ADDED_BY_FILMMAKER': {
        const {
          profile: { name: profileName, id: profileId },
          videoNode: {
            id: videoNodeId,
            title: videoNodeTitle,
            type: videoNodeType,
          },
        } = jsonPayload;
        const newType = t(`notifications.${videoNodeType}`);
        link = `/video/${videoNodeId}`;
        extra = <Covers.Profile width={69} height={92} profileId={profileId} />;
        notificationDescription = (
          <Trans i18nKey="notifications.videoNodeAddedByFilmmaker">
            <strong>{{ profileName }}</strong>1{{ newType }}3
            <strong>{{ videoNodeTitle }}</strong>
          </Trans>
        );
        break;
      }
      default:
        link = '/';
        notificationDescription = 'not handled';
        extra = null;
    }
    return (
      <NotificationListItem
        onDelete={onDeleteItem}
        link={link}
        extra={extra}
        id={notificationId}
        description={notificationDescription}
        isRead={isRead}
      />
    );
  };

  const unreadNotifications = notificationsList.filter((n) => !n.isRead).length;
  const iconColor = unreadNotifications > 0 ? strawberry : primary;

  return (
    <StyledPopover
      placement="bottomRight"
      content={getPopoverContent()}
      title={t('notifications.popover.title')}
      trigger="click"
      style={{ width: '500px' }}
    >
      <Tooltip title={t('notifications.tooltip')}>
        <Badge
          dot
          count={unreadNotifications}
          title={t('notifications.unreadNotifications')}
        >
          <Avatar
            style={{
              backgroundColor: 'white',
              border: `1px solid ${iconColor}`,
              lineHeight: '28px',
            }}
            icon={<BellFilled style={{ color: iconColor, fontSize: '16px' }} />}
          />
        </Badge>
      </Tooltip>
    </StyledPopover>
  );
};

MyPopover.propTypes = {
  className: PropTypes.string.isRequired,
};

export default Notifications;
