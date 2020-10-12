import React from 'react';

import { List, Tooltip, Button } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import styled from 'styled-components';

import { gql } from '@apollo/client';

import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { useMutation } from 'claptime/lib/apollo';
import PropTypes from 'claptime/lib/prop-types';

import { updateNotification } from 'claptime/graphql/notifications';

const StyledItem = styled.div`
  cursor: pointer;
`;

const NotificationListItem = ({ extra, link, id, description, isRead }) => {
  const router = useRouter();
  const { t } = useTranslation();

  const [updateNotificationMutation] = useMutation(gql(updateNotification));

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
};

export default NotificationListItem;
