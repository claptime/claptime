import React, { useEffect, useState } from 'react';

import { Avatar, Badge, Popover, List } from 'antd';
import {
  NotificationOutlined,
  CaretRightOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import gql from 'graphql-tag';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useSubscription, useQueryList } from 'claptime/lib/apollo';
import consts from 'claptime/consts';

import { useUserState } from 'claptime/lib/user';

import {
  onCreateNotification,
  listNotificationsByOwnerSortByCreatedAt,
} from 'claptime/graphql/notifications';

const {
  style: {
    colors: { strawberry },
  },
} = consts;

const AvatarBadge = () => {
  const [notificationsList, setNotificationsList] = useState([]);
  const { t } = useTranslation();

  const { username: userId } = useUserState();

  const { items: notifications } = useQueryList(
    listNotificationsByOwnerSortByCreatedAt,
    {
      variables: {
        owner: userId,
        limite: 10,
        sortDirection: 'DESC',
      },
    },
    {
      resultPath: '$.listNotificationsByOwnerSortByCreatedAt',
    },
  );
  useSubscription(
    gql(onCreateNotification),
    {
      variables: { owner: userId },
      onSubscriptionData: ({ client, subscriptionData }) => {
        const {
          data: { onCreateNotification: newNotification },
        } = subscriptionData;
        setNotificationsList([...notificationsList, newNotification]);
      },
    },
    true,
  );

  useEffect(() => {
    setNotificationsList(notifications);
  }, [notifications]);

  const getPopoverContent = () => {
    if (notificationsList) {
      return (
        <List
          itemLayout="horizontal"
          dataSource={notificationsList}
          renderItem={(item) => formatNotification(item)}
        />
      );
    }
    return null;
  };

  const formatNotification = (notification) => {
    const { type, payload } = notification;
    const jsonPayload = JSON.parse(payload);
    let notifDescription;
    let notifAvatar;
    let link;
    switch (type) {
      case 'VIDEO_STATUS_CHANGE': {
        const { title, newStatus, videoNodeId } = jsonPayload;
        notifAvatar = (
          <Avatar
            style={{ backgroundColor: strawberry }}
            icon={<CaretRightOutlined />}
          />
        );
        notifDescription = t(
          'notifications.videoStatusChange.'.concat(newStatus),
          { title },
        );
        link = `/video/${videoNodeId}`;
        break;
      }
      default:
        link = '/';
        notifAvatar = (
          <Avatar style={{ backgroundColor: 'red' }} icon={<CloseOutlined />} />
        );
        notifDescription = 'not handled';
    }
    return (
      <Link to={link}>
        <List.Item>
          <List.Item.Meta avatar={notifAvatar} description={notifDescription} />
        </List.Item>
      </Link>
    );
  };

  return (
    <Popover
      placement="bottomRight"
      content={getPopoverContent()}
      title={t('notifications.popover.title')}
      trigger="click"
    >
      <Badge count={notificationsList ? notificationsList.length : 0}>
        <Avatar
          style={{
            backgroundColor: 'white',
            border: `1px solid ${strawberry}`,
            lineHeight: '28px',
          }}
          icon={
            <NotificationOutlined
              style={{ color: strawberry, fontSize: '16px' }}
            />
          }
        />
      </Badge>
    </Popover>
  );
};

export default AvatarBadge;
