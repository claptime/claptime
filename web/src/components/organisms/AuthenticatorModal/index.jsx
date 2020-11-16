// Inspired from https://blog.logrocket.com/authentication-react-apps-aws-amplify-cognito/
import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';

import { Subtitle } from 'claptime/components/atoms';
import PropTypes from 'claptime/lib/prop-types';

import ConfirmSignUpForm from './ConfirmSignUpForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import RequireNewPasswordForm from './RequireNewPasswordForm';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const forms = {
  confirmSignUp: ConfirmSignUpForm,
  forgotPassword: ForgotPasswordForm,
  requireNewPassword: RequireNewPasswordForm,
  signIn: SignInForm,
  signUp: SignUpForm,
};

const AuthenticatorModal = ({ visible, onCancel, initialAuthState }) => {
  const [authState, setAuthState] = useState(initialAuthState);
  const [email, setEmail] = useState();
  const { t } = useTranslation();
  useEffect(() => {
    setAuthState(initialAuthState);
    setEmail();
  }, [initialAuthState]);

  const CurrentForm = forms[authState];

  const onChange = (data) => {
    setAuthState(data.nextAuthState);
    setEmail(data.email);
  };

  return (
    <Modal
      visible={visible}
      closable={false}
      onCancel={onCancel}
      destroyOnClose
      footer={null}
      width={400}
    >
      <Subtitle style={{ margin: '0 0 16px 0' }}>
        {t(`authenticatorModal.${authState}.title`)}
      </Subtitle>
      <CurrentForm onChange={onChange} email={email} />
    </Modal>
  );
};

AuthenticatorModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  initialAuthState: PropTypes.string,
};

AuthenticatorModal.defaultProps = {
  initialAuthState: 'signIn',
};

export default AuthenticatorModal;
