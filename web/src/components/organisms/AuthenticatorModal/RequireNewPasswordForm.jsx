import React, { useState } from 'react';
import { Form, Input, Button, Popover } from 'antd';
import { InfoCircleOutlined, LockOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Auth } from 'aws-amplify';
import PasswordValidator from 'password-validator';

import consts from 'claptime/consts';
import PropTypes from 'claptime/lib/prop-types';
import { nl2br } from 'claptime/utils/i18n';

const passwordSchema = new PasswordValidator()
  .is()
  .min(8)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .symbols();

const RequireNewPasswordForm = ({ onChange, email }) => {
  const [form] = Form.useForm();
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { t } = useTranslation();

  const onFinish = async (values) => {
    const { password, code } = values;

    setLoading(true);

    try {
      await Auth.forgotPasswordSubmit(
        email.trim(),
        code.trim(),
        password.trim(),
      );
      onChange({
        nextAuthState: 'signIn',
        email,
      });
    } catch (err) {
      switch (err.code) {
        case 'CodeMismatchException':
          setError(t('authenticatorModal.signIn.errorWrongCode'));
          break;
        default:
          setError(t('authenticatorModal.requireNewPassword.errorDefault'));
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
          return t('authenticatorModal.requireNewPassword.errorPasswordMin');
        case 'lowercase':
          return t(
            'authenticatorModal.requireNewPassword.errorPasswordLowercase',
          );
        case 'uppercase':
          return t(
            'authenticatorModal.requireNewPassword.errorPasswordUppercase',
          );
        case 'digits':
          return t('authenticatorModal.requireNewPassword.errorPasswordDigits');
        case 'symbols':
          return t(
            'authenticatorModal.requireNewPassword.errorPasswordSymbols',
          );
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
        name="code"
        label={
          <>
            {t('authenticatorModal.requireNewPassword.codeLabel')}
            &nbsp;
            <Popover
              title={t(
                'authenticatorModal.requireNewPassword.codePopoverTitle',
              )}
              content={t(
                'authenticatorModal.requireNewPassword.codePopoverContent',
              )}
            >
              <InfoCircleOutlined />
            </Popover>
          </>
        }
        rules={[
          {
            required: true,
            message: t('authenticatorModal.requireNewPassword.codeRequired'),
          },
        ]}
      >
        <Input
          prefix={
            <LockOutlined
              style={{ color: consts.style.colors.transparentBlack }}
            />
          }
          placeholder={t(
            'authenticatorModal.requireNewPassword.codePlaceholder',
          )}
        />
      </Form.Item>
      <Form.Item
        name="password"
        label={
          <>
            {t('authenticatorModal.requireNewPassword.passwordLabel')}
            &nbsp;
            <Popover
              title={t(
                'authenticatorModal.requireNewPassword.passwordPolicyTitle',
              )}
              content={nl2br(
                t(
                  'authenticatorModal.requireNewPassword.passwordPolicyContent',
                ),
              )}
            >
              <InfoCircleOutlined />
            </Popover>
          </>
        }
        rules={[
          {
            required: true,
            message: t(
              'authenticatorModal.requireNewPassword.passwordRequired',
            ),
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
          placeholder={t(
            'authenticatorModal.requireNewPassword.passwordPlaceholder',
          )}
          onChange={() => setError()}
        />
      </Form.Item>
      <Form.Item
        name="passwordConfirmation"
        label={t(
          'authenticatorModal.requireNewPassword.passwordConfirmationLabel',
        )}
        rules={[
          {
            required: true,
            message: t(
              'authenticatorModal.requireNewPassword.passwordConfirmationRequired',
            ),
          },
          {
            validator: (rule, value) => {
              if (value && value !== form.getFieldValue('password')) {
                return Promise.reject(
                  t(
                    'authenticatorModal.requireNewPassword.passwordConfirmationMismatch',
                  ),
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
            'authenticatorModal.requireNewPassword.passwordConfirmationPlaceholder',
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
          {t('authenticatorModal.requireNewPassword.update')}
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
          {t('authenticatorModal.requireNewPassword.backToSignIn')}
        </Button>
      </Form.Item>
    </Form>
  );
};

RequireNewPasswordForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export default RequireNewPasswordForm;
