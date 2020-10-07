import React, { useState } from 'react';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import { Layouts } from 'claptime/components/molecules';
import { useUserDispatch, useUserState, userActions } from 'claptime/lib/user';
import { availableLanguages } from 'claptime/lib/languages';

const Information = () => {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const { t } = useTranslation();
  const dispatch = useUserDispatch();

  userActions.loadCognitoUser(dispatch);
  const user = useUserState();

  const onFinish = async (fieldsValue) => {
    setSaving(true);
    try {
      await userActions.updateUserAttributes(dispatch)({
        firstName: fieldsValue.firstName,
        lastName: fieldsValue.lastName,
        birthDate: fieldsValue.birthDate.format('YYYY-MM-DD'),
        locale: fieldsValue.language,
      });
      userActions.loadCognitoUser(dispatch)({ reloadUserSettings: false });
    } catch (errorUpdate) {
      console.error(errorUpdate);
    }
    setUnsavedChanges(false);
    setSaving(false);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        birthDate: user.birthDate ? moment(user.birthDate, 'YYYY-MM-DD') : null,
        language: user.locale,
      }}
    >
      <Layouts.Form.Row>
        <Layouts.Form.Column>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: t('myAccountPage.information.required'),
              },
            ]}
            label={t('myAccountPage.information.email')}
          >
            <Input disabled onChange={() => setUnsavedChanges(true)} />
          </Form.Item>
          <Form.Item
            name="firstName"
            rules={[
              {
                required: true,
                message: t('myAccountPage.information.required'),
              },
            ]}
            label={t('myAccountPage.information.firstName')}
          >
            <Input onChange={() => setUnsavedChanges(true)} />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[
              {
                required: true,
                message: t('myAccountPage.information.required'),
              },
            ]}
            label={t('myAccountPage.information.lastName')}
          >
            <Input onChange={() => setUnsavedChanges(true)} />
          </Form.Item>
        </Layouts.Form.Column>
        <Layouts.Form.Column>
          <Form.Item
            name="birthDate"
            rules={[
              {
                required: true,
                message: t('myAccountPage.information.required'),
              },
            ]}
            label={t('myAccountPage.information.birthDate')}
          >
            <DatePicker
              onChange={() => setUnsavedChanges(true)}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
          <Form.Item
            name="language"
            rules={[
              {
                required: true,
                message: t('myAccountPage.information.required'),
              },
            ]}
            label={t('myAccountPage.information.language')}
          >
            <Select onChange={() => setUnsavedChanges(true)}>
              {Object.keys(availableLanguages).map((l) => (
                <Select.Option value={l} key={l}>
                  {t(`languages.${l}`)}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={saving}
              disabled={!unsavedChanges}
            >
              {t('myAccountPage.information.save')}
            </Button>
          </Form.Item>
        </Layouts.Form.Column>
      </Layouts.Form.Row>
    </Form>
  );
};

export default Information;
