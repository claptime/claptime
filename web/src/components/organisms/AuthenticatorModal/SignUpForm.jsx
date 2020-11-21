import React, { useState } from 'react';
import { Form, Input, Button, Popover } from 'antd';
import {
  InfoCircleOutlined,
  MailOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Auth } from 'aws-amplify';

import consts from 'claptime/consts';
import PropTypes from 'claptime/lib/prop-types';
import { nl2br } from 'claptime/utils/i18n';
import { passwordSchema } from 'claptime/utils';

const SignUpForm = ({ onChange }) => {
  const [form] = Form.useForm();
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { t } = useTranslation();

  const onFinish = async (values) => {
    const { email, password, firstName, lastName } = values;

    setLoading(true);

    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          given_name: firstName,
          family_name: lastName,
        },
      });
      onChange({
        nextAuthState: 'confirmSignUp',
        email,
      });
    } catch (err) {
      switch (err.code) {
        case 'UsernameExistsException':
          setError(t('authenticatorModal.signUp.errorEmailAlreadyExists'));
          break;
        default:
          setError(t('authenticatorModal.signUp.errorDefault'));
          console.error(err);
          break;
      }
    }

    setLoading(false);
  };

  const formatPasswordValidateError = (errors) => {
    for (let i = 0; i < errors.length; i++) {
      switch (errors[i]) {
        case 'min':
          return t('authenticatorModal.signUp.errorPasswordMin');
        case 'lowercase':
          return t('authenticatorModal.signUp.errorPasswordLowercase');
        case 'uppercase':
          return t('authenticatorModal.signUp.errorPasswordUppercase');
        case 'digits':
          return t('authenticatorModal.signUp.errorPasswordDigits');
        case 'symbols':
          return t('authenticatorModal.signUp.errorPasswordSymbols');
        default:
          break;
      }
    }
    return null;
  };

  return (
    <Form form={form} onFinish={onFinish} scrollToFirstError layout="vertical">
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
        name="firstName"
        label={t('authenticatorModal.signUp.firstNameLabel')}
        rules={[
          {
            required: true,
            message: t('authenticatorModal.signUp.firstNameRequired'),
          },
        ]}
      >
        <Input
          prefix={
            <UserOutlined
              style={{ color: consts.style.colors.transparentBlack }}
            />
          }
          placeholder={t('authenticatorModal.signUp.firstNamePlaceholder')}
          onChange={() => setError()}
        />
      </Form.Item>
      <Form.Item
        name="lastName"
        label={t('authenticatorModal.signUp.lastNameLabel')}
        rules={[
          {
            required: true,
            message: t('authenticatorModal.signUp.lastNameRequired'),
          },
        ]}
      >
        <Input
          prefix={
            <UserOutlined
              style={{ color: consts.style.colors.transparentBlack }}
            />
          }
          placeholder={t('authenticatorModal.signUp.lastNamePlaceholder')}
          onChange={() => setError()}
        />
      </Form.Item>
      <Form.Item
        name="email"
        label={t('authenticatorModal.signUp.emailLabel')}
        rules={[
          {
            type: 'email',
            message: t('authenticatorModal.signUp.emailFormat'),
          },
          {
            required: true,
            message: t('authenticatorModal.signUp.emailRequired'),
          },
        ]}
      >
        <Input
          prefix={
            <MailOutlined
              style={{ color: consts.style.colors.transparentBlack }}
            />
          }
          placeholder={t('authenticatorModal.signUp.emailPlaceholder')}
          onChange={() => setError()}
        />
      </Form.Item>
      <Form.Item
        name="password"
        label={
          <>
            {t('authenticatorModal.signUp.passwordLabel')}
            &nbsp;
            <Popover
              title={t('authenticatorModal.signUp.passwordPolicyTitle')}
              content={nl2br(
                t('authenticatorModal.signUp.passwordPolicyContent'),
              )}
            >
              <InfoCircleOutlined />
            </Popover>
          </>
        }
        rules={[
          {
            required: true,
            message: t('authenticatorModal.signUp.passwordRequired'),
          },
          {
            validator: (rule, value) => {
              const validationRulesErrors = passwordSchema.validate(value, {
                list: true,
              });

              if (value && confirmDirty) {
                form.validateFields(['passwordConfirmation'], { force: true });
              }
              if (validationRulesErrors.length > 0) {
                return Promise.reject(
                  formatPasswordValidateError(validationRulesErrors),
                );
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input.Password
          prefix={
            <LockOutlined
              style={{ color: consts.style.colors.transparentBlack }}
            />
          }
          placeholder={t('authenticatorModal.signUp.passwordPlaceholder')}
          onChange={() => setError()}
        />
      </Form.Item>
      <Form.Item
        name="passwordConfirmation"
        label={t('authenticatorModal.signUp.passwordConfirmationLabel')}
        rules={[
          {
            required: true,
            message: t(
              'authenticatorModal.signUp.passwordConfirmationRequired',
            ),
          },
          {
            validator: (rule, value) => {
              if (value && value !== form.getFieldValue('password')) {
                return Promise.reject(
                  t('authenticatorModal.signUp.passwordConfirmationMismatch'),
                );
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input.Password
          prefix={
            <LockOutlined
              style={{ color: consts.style.colors.transparentBlack }}
            />
          }
          placeholder={t(
            'authenticatorModal.signUp.passwordConfirmationPlaceholder',
          )}
          onBlur={({ currentTarget: { value } }) =>
            setConfirmDirty(confirmDirty || !!value)
          }
          onChange={() => setError()}
        />
      </Form.Item>
      <Form.Item>
        <Button
          style={{ width: '100%' }}
          type="primary"
          loading={loading}
          htmlType="submit"
        >
          {t('authenticatorModal.signUp.signUp')}
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
          {t('authenticatorModal.signUp.signIn')}
        </Button>
      </Form.Item>
    </Form>
  );
};

SignUpForm.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default SignUpForm;
