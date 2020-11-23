import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Auth } from 'aws-amplify';

import PropTypes from 'claptime/lib/prop-types';
import consts from 'claptime/consts';

const ForgotPasswordForm = ({ onChange }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { t } = useTranslation();

  const onFinish = async (values) => {
    const { email } = values;

    setLoading(true);

    try {
      await Auth.forgotPassword(email);
      onChange({
        nextAuthState: 'requireNewPassword',
        email,
      });
    } catch (err) {
      setError(t('authenticatorModal.forgotPassword.errorDefault'));
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <Form onFinish={onFinish} scrollToFirstError layout="vertical">
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
        label={t('authenticatorModal.forgotPassword.emailLabel')}
        rules={[
          {
            type: 'email',
            message: t('authenticatorModal.forgotPassword.emailFormat'),
          },
          {
            required: true,
            message: t('authenticatorModal.forgotPassword.emailRequired'),
          },
        ]}
      >
        <Input
          prefix={
            <MailOutlined
              style={{ color: consts.style.colors.transparentBlack }}
            />
          }
          placeholder={t('authenticatorModal.forgotPassword.emailPlaceholder')}
        />
      </Form.Item>
      <Form.Item>
        <Button
          style={{ width: '100%' }}
          type="primary"
          loading={loading}
          htmlType="submit"
        >
          {t('authenticatorModal.forgotPassword.sendCode')}
        </Button>
      </Form.Item>
      <Form.Item>
        <Button
          style={{ width: '100%' }}
          onClick={() =>
            onChange({
              nextAuthState: 'signIn',
            })
          }
        >
          {t('authenticatorModal.forgotPassword.backToSignIn')}
        </Button>
      </Form.Item>
    </Form>
  );
};

ForgotPasswordForm.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default ForgotPasswordForm;
