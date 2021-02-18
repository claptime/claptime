import React from 'react';

import NotificationPreferences from 'claptime/components/organisms/NotificationPreferences';

const Notifications = () => {
  return (
    <div>
      <NotificationPreferences.Email />
      <NotificationPreferences.Newsletters />
    </div>
  );
};

export default Notifications;
