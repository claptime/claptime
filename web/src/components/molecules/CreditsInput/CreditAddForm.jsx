import React, { useState } from 'react';
import { AutoComplete, Button, Form, Input, message } from 'antd';
import { useTranslation } from 'react-i18next';

import { listProfiles } from 'claptime/graphql/profiles';
import { useApolloClient } from 'claptime/lib/apollo';
import PropTypes from 'claptime/lib/prop-types';
import { debounce, getSearchableValue, listItems } from 'claptime/utils';

const PROFILES_DISPLAY_NUMBER = 15;

const CreditsAddForm = ({ onCreditAdded }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const apolloClient = useApolloClient();

  const loadProfiles = debounce(async (filters) => {
    setProfiles(
      await listItems({
        apolloClient,
        query: listProfiles,
        queryName: 'listProfiles',
        variables: {
          filter: {
            and: filters,
          },
        },
        limit: PROFILES_DISPLAY_NUMBER,
      }),
    );
  }, 500);

  const onNameChange = (search) => {
    setSelectedProfile(null);
    if (!search) {
      return;
    }
    const filters = search
      .trim()
      .split(' ')
      .map(getSearchableValue)
      .filter((word) => word)
      .map((word) => ({
        searchField: { contains: word },
      }));
    loadProfiles(filters);
  };

  const onNameSelect = (value, option) => {
    setSelectedProfile({
      id: option.key,
      name: option.name,
    });
  };

  const onFinish = (fieldsValue) => {
    const roles = fieldsValue.roles.split(',');
    const listRoles = roles.map((role) => ({
      role: role.trim(),
      customProfile: selectedProfile ? undefined : fieldsValue.name,
      profile: selectedProfile
        ? {
            id: selectedProfile.id,
            name: selectedProfile.name,
          }
        : undefined,
    }));
    try {
      onCreditAdded(listRoles);
    } catch (err) {
      console.log(err);
      message.error(t('video.edit.creditAddFailed'));
    }
    form.resetFields();
  };

  const profileOptions = profiles.map((profile) => ({
    value: profile.name,
    key: profile.id,
    name: profile.name,
    title: profile.name,
  }));

  return (
    <Form
      form={form}
      id="credits-add-form"
      onFinish={onFinish}
      hideRequiredMark
      layout="vertical"
    >
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: t('video.edit.required'),
          },
        ]}
        label={t('video.edit.creditName')}
      >
        <AutoComplete
          placeholder={t('video.edit.creditName')}
          options={profileOptions}
          onChange={onNameChange}
          onSelect={onNameSelect}
        />
      </Form.Item>
      <Form.Item
        name="roles"
        rules={[
          {
            required: true,
            message: t('video.edit.required'),
          },
        ]}
        label={t('video.edit.creditRoles')}
      >
        <Input placeholder={t('video.edit.creditRolePlaceholder')} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" form="credits-add-form" htmlType="submit">
          {t('video.edit.creditAdd')}
        </Button>
      </Form.Item>
    </Form>
  );
};

CreditsAddForm.propTypes = {
  onCreditAdded: PropTypes.func.isRequired,
};

export default CreditsAddForm;
