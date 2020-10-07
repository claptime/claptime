import React, { useState } from 'react';
import { Button, Form, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';

import { Layouts } from 'claptime/components/molecules';
import { useUserDispatch, useUserState, userActions } from 'claptime/lib/user';

const Claps = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const dispatch = useUserDispatch();
  const user = useUserState();
  const [saving, setSaving] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const onFinish = async (fieldsValue) => {
    setSaving(true);
    await userActions.updateUserSetting(dispatch)({
      name: 'clapValue',
      value: fieldsValue.clapValue.toString(),
      previousValue: user.settings.clapValue,
    });
    setUnsavedChanges(false);
    setSaving(false);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={{
        clapValue: user.settings.clapValue,
      }}
      layout="vertical"
    >
      <Layouts.Form.Row>
        <Layouts.Form.Column>
          <Form.Item
            name="clapValue"
            rules={[
              {
                required: true,
                message: t('myAccountPage.claps.clapValue'),
              },
            ]}
            label={t('myAccountPage.claps.clapValue')}
          >
            <InputNumber
              size="large"
              min={0.1}
              max={5}
              step={0.2}
              precision={2}
              formatter={(value) => `${value} €`}
              decimalSeparator=","
              style={{
                width: '100%',
              }}
              onChange={() => setUnsavedChanges(true)}
            />
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

export default Claps;
