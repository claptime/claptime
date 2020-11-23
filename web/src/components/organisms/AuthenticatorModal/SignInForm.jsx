import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';

import consts from 'claptime/consts';
import PropTypes from 'claptime/lib/prop-types';

const StyledA = styled.a`
  :hover {
    color: ${consts.style.colors.strawberryHover};
    text-decoration: underline;
  }
`;

const SignInForm = ({ onChange, email: emailProp }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { t } = useTranslation();

  const onFinish = async (values) => {
    const { email, password } = values;

    setLoading(true);

    try {
      const { challengeName } = await Auth.signIn(email, password);
      if (challengeName === 'NEW_PASSWORD_REQUIRED') {
        await Auth.forgotPassword(email);
        onChange({
          nextAuthState: 'requireNewPassword',
          email,
        });
      }
    } catch (err) {
      switch (err.code) {
        case 'UserNotFoundException':
          setError(t('authenticatorModal.signIn.errorWrongEmail'));
          break;
        case 'NotAuthorizedException':
          setError(t('authenticatorModal.signIn.errorWrongPassword'));
          break;
        case 'UserNotConfirmedException':
          onChange({
            nextAuthState: 'confirmSignUp',
            email,
          });
          break;
        default:
          setError(t('authenticatorModal.signIn.errorDefault'));
          console.error(err);
          break;
      }
    }

    setLoading(false);
  };

  return (
    <Form
      onFinish={onFinish}
      scrollToFirstError
      layout="vertical"
      initialValues={{ email: emailProp }}
    >
      {error && (
        <Form.Item
          style={{
            color: consts.style.colors.strawberryHover,
            fontWeight: 'bold',
          }}
        >
          {error}
        </Form.Item>
      )}
      <Form.Item
        name="email"
        label={t('authenticatorModal.signIn.emailLabel')}
        rules={[
          {
            type: 'email',
            message: t('authenticatorModal.signIn.emailFormat'),
          },
          {
            required: true,
            message: t('authenticatorModal.signIn.emailRequired'),
          },
        ]}
      >
        <Input
          prefix={
            <MailOutlined
              style={{ color: consts.style.colors.transparentBlack }}
            />
          }
          placeholder={t('authenticatorModal.signIn.emailPlaceholder')}
          onChange={() => setError()}
        />
      </Form.Item>
      <Form.Item
        name="password"
        label={t('authenticatorModal.signIn.passwordLabel')}
        rules={[
          {
            required: true,
            message: t('authenticatorModal.signIn.passwordRequired'),
          },
        ]}
      >
        <Input.Password
          prefix={
            <LockOutlined
              style={{ color: consts.style.colors.transparentBlack }}
            />
          }
          placeholder={t('authenticatorModal.signIn.passwordPlaceholder')}
          onChange={() => setError()}
        />
      </Form.Item>
      <Form.Item>
        <StyledA
          style={{ float: 'right' }}
          onClick={() =>
            onChange({
              nextAuthState: 'forgotPassword',
            })
          }
        >
          {t('authenticatorModal.signIn.forgotPassword')}
        </StyledA>
      </Form.Item>
      <Form.Item>
        <Button
          style={{ width: '100%' }}
          type="primary"
          loading={loading}
          htmlType="submit"
        >
          {t('authenticatorModal.signIn.signIn')}
        </Button>
      </Form.Item>
      <Form.Item>
        <Button
          style={{ width: '100%' }}
          onClick={() =>
            onChange({
              nextAuthState: 'signUp',
            })
          }
        >
          {t('authenticatorModal.signIn.signUp')}
        </Button>
      </Form.Item>
    </Form>
  );
};

SignInForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  email: PropTypes.string,
};

SignInForm.defaultProps = {
  email: null,
};

export default SignInForm;
