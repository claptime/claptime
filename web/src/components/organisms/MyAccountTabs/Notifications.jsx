import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from 'antd';

import { Layouts } from 'claptime/components/molecules';
import NotificationPreferences from 'claptime/components/organisms/NotificationPreferences';

const Notifications = () => {
  const { t } = useTranslation();
  return (
    <Layouts.Form.Row>
      <Layouts.Form.Column>
        <Typography.Title level={3}>
          {t('myAccountPage.notifications.title')}
        </Typography.Title>
        <br />
        <NotificationPreferences />
      </Layouts.Form.Column>
    </Layouts.Form.Row>
  );
};

export default Notifications;
