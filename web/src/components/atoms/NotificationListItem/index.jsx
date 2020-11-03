import React from 'react';

import { List, Tooltip, Button, Popconfirm } from 'antd';
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import styled from 'styled-components';

import { gql } from '@apollo/client';

import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { useMutation } from 'claptime/lib/apollo';
import PropTypes from 'claptime/lib/prop-types';

import {
  updateNotification,
  deleteNotification,
} from 'claptime/graphql/notifications';

const StyledItem = styled.div`
  cursor: pointer;
`;

const NotificationListItem = ({
  extra,
  link,
  id,
  description,
  isRead,
  onDelete,
}) => {
  const router = useRouter();
  const { t } = useTranslation();

  const [updateNotificationMutation] = useMutation(gql(updateNotification));
  const [deleteNotificationMutation] = useMutation(gql(deleteNotification));

  const handleEyeClick = async (status) => {
    await updateNotificationMutation({
      variables: {
        input: {
          id,
          isRead: status,
        },
      },
    });
  };

  const handleDelete = async () => {
    await deleteNotificationMutation({
      variables: {
        input: {
          id,
        },
      },
      update: () => {
        onDelete(id);
      },
    });
  };

  return (
    <StyledItem
      id={`claptime-notification-list-item-${id}`}
      onClick={() => {
        if (!isRead) {
          handleEyeClick(!isRead);
        }
        router.push(link);
      }}
    >
      <List.Item
        extra={extra}
        actions={[
          <Tooltip
            title={
              isRead
                ? t('notifications.actions.markAsNotRead')
                : t('notifications.actions.markAsRead')
            }
            getPopupContainer={() =>
              document.getElementById(`claptime-notification-list-item-${id}`)
            }
          >
            <Button
              onClick={(event) => {
                handleEyeClick(!isRead);
                event.stopPropagation();
              }}
              shape="circle"
              icon={
                isRead ? (
                  <EyeInvisibleOutlined style={{ color: 'red' }} />
                ) : (
                  <EyeOutlined style={{ color: 'green' }} />
                )
              }
            />
          </Tooltip>,
          <Tooltip
            title={t('notifications.actions.delete.tooltip')}
            getPopupContainer={() =>
              document.getElementById(`claptime-notification-list-item-${id}`)
            }
          >
            <Popconfirm
              title={t('notifications.actions.delete.popconfirm')}
              onConfirm={(event) => {
                handleDelete();
                event.stopPropagation();
              }}
              okText={t('notifications.actions.delete.ok')}
              cancelText={t('notifications.actions.delete.cancel')}
            >
              <Button
                shape="circle"
                onClick={(event) => {
                  event.stopPropagation();
                }}
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Tooltip>,
        ]}
      >
        {description}
      </List.Item>
    </StyledItem>
  );
};

NotificationListItem.propTypes = {
  link: PropTypes.string.isRequired,
  extra: PropTypes.element.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
    .isRequired,
  id: PropTypes.string.isRequired,
  isRead: PropTypes.bool.isRequired,
  onDelete: PropTypes.func,
};

NotificationListItem.defaultProps = {
  onDelete: () => {},
};

export default NotificationListItem;
