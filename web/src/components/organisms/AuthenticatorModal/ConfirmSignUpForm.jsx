import React, { useState } from 'react';
import { Button, Form, Input, Popover } from 'antd';
import { InfoCircleOutlined, LockOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Auth } from 'aws-amplify';

import consts from 'claptime/consts';
import PropTypes from 'claptime/lib/prop-types';

const ConfirmSignUpForm = ({ onChange, email }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { t } = useTranslation();

  const onFinish = async (values) => {
    const { code } = values;

    setLoading(true);

    try {
      await Auth.confirmSignUp(email, code);
      onChange({
        nextAuthState: 'signIn',
        email,
      });
    } catch (err) {
      switch (err.code) {
        case 'CodeMismatchException':
          setError(t('authenticatorModal.confirmSignUp.errorWrongCode'));
          break;
        default:
          setError(t('authenticatorModal.confirmSignUp.errorDefault'));
          console.error(err);
          break;
      }
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
        name="code"
        label={
          <>
            {t('authenticatorModal.confirmSignUp.codeLabel')}
            &nbsp;
            <Popover
              title={t('authenticatorModal.confirmSignUp.codePopoverTitle')}
              content={t('authenticatorModal.confirmSignUp.codePopoverContent')}
            >
              <InfoCircleOutlined />
            </Popover>
          </>
        }
        rules={[
          {
            required: true,
            message: t('authenticatorModal.confirmSignUp.codeRequired'),
          },
        ]}
      >
        <Input
          prefix={
            <LockOutlined
              style={{ color: consts.style.colors.transparentBlack }}
            />
          }
          placeholder={t('authenticatorModal.confirmSignUp.codePlaceholder')}
        />
      </Form.Item>
      <Form.Item>
        <Button
          style={{ width: '100%' }}
          type="primary"
          loading={loading}
          htmlType="submit"
        >
          {t('authenticatorModal.confirmSignUp.confirm')}
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
          {t('authenticatorModal.confirmSignUp.backToSignUp')}
        </Button>
      </Form.Item>
    </Form>
  );
};

ConfirmSignUpForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export default ConfirmSignUpForm;
