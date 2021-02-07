import React, { useEffect, useState } from 'react';
import { Modal, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import NotificationPreferences from 'claptime/components/organisms/NotificationPreferences';
import { useUserState } from 'claptime/lib/user';
import { sleep } from 'claptime/utils';
import { nl2br } from 'claptime/utils/i18n';

const UserOnboardingModal = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const user = useUserState();
  const localStorageParamName = `onboardingModalClosed:${user.username}`;

  // Show modal 5 seconds after loading
  // only if modal hasn't already been closed in the last hour
  useEffect(() => {
    async function showModalOnLoad() {
      await sleep(5000);
      const onboardingModalClosed = localStorage.getItem(localStorageParamName);
      if (
        !onboardingModalClosed ||
        moment().diff(moment(onboardingModalClosed), 'hours') > 1
      ) {
        setVisible(true);
      }
    }
    showModalOnLoad();
  }, [localStorageParamName]);

  return (
    <Modal
      visible={visible}
      footer={null}
      onCancel={() => {
        setVisible(false);
        localStorage.setItem(localStorageParamName, new Date().toISOString());
      }}
    >
      <Typography.Title level={3}>
        {t('userOnboardingModal.title')}
      </Typography.Title>
      <p>{nl2br(t('userOnboardingModal.description'))}</p>
      <NotificationPreferences.Newsletters />
    </Modal>
  );
};

export default UserOnboardingModal;
