import React, { useState } from 'react';
import { Form, Radio, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import consts from 'claptime/consts';
import { setNotificationPreference } from 'claptime/graphql/users';
import { useApolloClient } from 'claptime/lib/apollo';
import { useUserDispatch, useUserState, userActions } from 'claptime/lib/user';
import { invalidateCache } from 'claptime/utils';

const {
  frequencies: { ALWAYS, NEVER },
  types: { NEWSLETTER },
  channels: { EMAIL },
} = consts.userSettings.notifications;

const Notifications = () => {
  const user = useUserState();
  const dispatch = useUserDispatch();
  const apolloClient = useApolloClient();
  const [saving, setSaving] = useState(false);
  const { t } = useTranslation();

  const notificationSettings = user.settings.notifications || [];
  const newsletterSetting = notificationSettings.find(
    ({ type, channel }) => type === NEWSLETTER && channel === EMAIL,
  );

  const onChange = async ({ target: { value } }) => {
    setSaving(true);
    try {
      const {
        data: {
          setNotificationPreference: { status, error },
        },
      } = await apolloClient.mutate({
        mutation: gql(setNotificationPreference),
        variables: {
          type: NEWSLETTER,
          channel: EMAIL,
          frequency: value,
        },
        update: invalidateCache(new RegExp(`UserSettings:${user.username}`)),
      });
      if (status !== 'SUCCESS') {
        throw new Error(error);
      }
      userActions.loadUserSettings(dispatch)();
    } catch (error) {
      console.error(error);
    }
    setSaving(false);
  };

  return (
    <Form>
      <Form.Item
        label={
          <span>
            <Tooltip title={t('notificationPreferences.newsletterTooltip')}>
              <InfoCircleOutlined />
            </Tooltip>{' '}
            {t('notificationPreferences.newsletter')}
          </span>
        }
      >
        <Radio.Group
          onChange={onChange}
          defaultValue={newsletterSetting && newsletterSetting.frequency}
          disabled={saving}
        >
          <Radio.Button value={ALWAYS}>
            {t('notificationPreferences.yes')}
          </Radio.Button>
          <Radio.Button value={NEVER}>
            {t('notificationPreferences.no')}
          </Radio.Button>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};

export default Notifications;
