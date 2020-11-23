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
  types: { NEWSLETTER, LABFILMS_NEWSLETTER },
  channels: { EMAIL },
} = consts.userSettings.notifications;

const Notifications = () => {
  const user = useUserState();
  const dispatch = useUserDispatch();
  const apolloClient = useApolloClient();
  const [saving, setSaving] = useState({
    NEWSLETTER: false,
    LABFILMS_NEWSLETTER: false,
  });
  const { t } = useTranslation();

  const notificationSettings = user.settings.notifications || [];
  const newsletterSetting = notificationSettings.find(
    ({ type, channel }) => type === NEWSLETTER && channel === EMAIL,
  );
  const labfilmsNewsletterSetting = notificationSettings.find(
    ({ type, channel }) => type === LABFILMS_NEWSLETTER && channel === EMAIL,
  );

  const onChange = (notificationType) => async ({ target: { value } }) => {
    setSaving({ ...saving, [notificationType]: true });
    try {
      const {
        data: {
          setNotificationPreference: { status, error },
        },
      } = await apolloClient.mutate({
        mutation: gql(setNotificationPreference),
        variables: {
          type: notificationType,
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
    setSaving({ ...saving, [notificationType]: false });
  };

  return (
    <Form labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
      <Form.Item
        label={
          <span>
            {t('notificationPreferences.claptimeNewsletter')}{' '}
            <Tooltip
              title={t('notificationPreferences.claptimeNewsletterTooltip')}
            >
              <InfoCircleOutlined />
            </Tooltip>
          </span>
        }
      >
        <Radio.Group
          onChange={onChange(NEWSLETTER)}
          defaultValue={newsletterSetting && newsletterSetting.frequency}
          disabled={saving.NEWSLETTER}
        >
          <Radio.Button value={ALWAYS}>
            {t('notificationPreferences.yes')}
          </Radio.Button>
          <Radio.Button value={NEVER}>
            {t('notificationPreferences.no')}
          </Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label={
          <span>
            {t('notificationPreferences.labfilmsNewsletter')}{' '}
            <Tooltip
              title={t('notificationPreferences.labfilmsNewsletterTooltip')}
            >
              <InfoCircleOutlined />
            </Tooltip>
          </span>
        }
      >
        <Radio.Group
          onChange={onChange(LABFILMS_NEWSLETTER)}
          defaultValue={
            labfilmsNewsletterSetting && labfilmsNewsletterSetting.frequency
          }
          disabled={saving.LABFILMS_NEWSLETTER}
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
