import React from 'react';
import { Modal } from 'antd';
import {
  AmplifyAuthenticator,
  AmplifySignIn,
  AmplifyRequireNewPassword,
  AmplifySignUp,
  AmplifyConfirmSignUp,
  AmplifyVerifyContact,
  AmplifyForgotPassword,
} from '@aws-amplify/ui-react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import style from 'claptime/consts/style';
import PropTypes from 'claptime/lib/prop-types';

const StyledModal = styled(Modal)`
  .ant-modal-content {
    background: transparent;
    box-shadow: unset;
  }
`;

// https://docs.amplify.aws/ui/customization/theming/q/framework/react#for-colors
const StyledAmplifyAuthenticator = styled(AmplifyAuthenticator)`
  --amplify-font-family: ${style.fonts.default};
  --amplify-primary-color: ${style.colors.primary};
  --amplify-primary-tint: ${style.colors.primary};
  --amplify-primary-shade: ${style.colors.primary};
  --amplify-secondary-color: ${style.colors.secondary};
  --amplify-secondary-tint: ${style.colors.secondary};
  --amplify-secondary-shade: ${style.colors.secondary};
  --amplify-red: ${style.colors.strawberry};
  --width: 100%;
  --height: 100%;
`;

// TODO error when tried to login without password:
// Custom auth lambda trigger is not configured for the user pool.
// https://github.com/aws-amplify/amplify-js/issues/5623

const AuthenticatorModal = ({ visible, onCancel, initialAuthState }) => {
  const { t } = useTranslation();

  const signInFields = [
    {
      label: t('myAccountPage.information.email'),
      required: true,
      placeholder: t('myAccountPage.information.email'),
      type: 'email',
    },
    {
      label: t('myAccountPage.information.password'),
      required: true,
      placeholder: t('myAccountPage.information.password'),
      type: 'password',
    },
  ];

  const signUpFields = [
    {
      label: t('myAccountPage.information.email'),
      required: true,
      placeholder: t('myAccountPage.information.email'),
      type: 'email',
    },
    {
      label: t('myAccountPage.information.password'),
      required: true,
      placeholder: t('myAccountPage.information.password'),
      type: 'password',
    },
    {
      label: t('myAccountPage.information.firstName'),
      required: true,
      placeholder: t('myAccountPage.information.firstName'),
      type: 'given_name',
    },
    {
      label: t('myAccountPage.information.lastName'),
      required: true,
      placeholder: t('myAccountPage.information.lastName'),
      type: 'family_name',
    },
  ];

  return (
    <StyledModal
      visible={visible}
      closable={false}
      onCancel={onCancel}
      destroyOnClose
      footer={null}
    >
      <div style={{ position: 'relative' }}>
        <StyledAmplifyAuthenticator
          initialAuthState={initialAuthState}
          usernameAlias="email"
        >
          <AmplifySignIn
            slot="sign-in"
            formFields={signInFields}
            usernameAlias="email"
          />
          <AmplifyRequireNewPassword
            slot="require-new-password"
            usernameAlias="email"
          />
          <AmplifySignUp
            slot="sign-up"
            formFields={signUpFields}
            usernameAlias="email"
          />
          <AmplifyConfirmSignUp slot="confirm-sign-up" usernameAlias="email" />
          <AmplifyVerifyContact slot="verify-contact" usernameAlias="email" />
          <AmplifyForgotPassword slot="forgot-password" usernameAlias="email" />
        </StyledAmplifyAuthenticator>
      </div>
    </StyledModal>
  );
};

AuthenticatorModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  initialAuthState: PropTypes.string,
};

AuthenticatorModal.defaultProps = {
  initialAuthState: 'signin',
};

export default AuthenticatorModal;
