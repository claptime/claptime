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
  listNotifications,
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
    listNotifications,
    {
      variables: {
        filter: {
          userId: {
            eq: userId,
          },
        },
      },
    },
    {
      resultPath: '$.listNotifications',
      getAll: true,
    },
  );
  useSubscription(
    gql(onCreateNotification),
    {
      variables: { userId },
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
    } else {
      return null;
    }
  };

  const formatNotification = (notification) => {
    const { type, payload } = notification;
    const jsonPayload = JSON.parse(payload);
    let notifDescription;
    let notifAvatar;
    switch (type) {
      case 'videoStatusChange':
        const { title, newStatus, videoNodeId } = jsonPayload;
        notifAvatar = (
          <Link to={`/video/${videoNodeId}`}>
            <Avatar
              style={{ backgroundColor: strawberry }}
              icon={<CaretRightOutlined />}
            />
          </Link>
        );
        notifDescription = t(
          'notifications.videoStatusChange.'.concat(newStatus),
          { title },
        );
        break;
      default:
        notifAvatar = (
          <Avatar style={{ backgroundColor: 'red' }} icon={<CloseOutlined />} />
        );
        notifDescription = 'not handled';
    }
    return (
      <List.Item>
        <List.Item.Meta avatar={notifAvatar} description={notifDescription} />
      </List.Item>
    );
  };

  return (
    <Popover
      placement="bottom"
      content={getPopoverContent()}
      title={t('notifications.popover.title')}
      trigger="click"
    >
      <Badge count={notificationsList ? notificationsList.length : 0}>
        <Avatar icon={<NotificationOutlined />} />
      </Badge>
    </Popover>
  );
};

export default AvatarBadge;
