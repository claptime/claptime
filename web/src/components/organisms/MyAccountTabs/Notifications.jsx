import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from 'antd';

import NotificationPreferences from 'claptime/components/organisms/NotificationPreferences';

const Notifications = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Typography.Title level={3}>
        {t('myAccountPage.notifications.title')}
      </Typography.Title>
      <br />
      <NotificationPreferences />
    </div>
  );
};

export default Notifications;
