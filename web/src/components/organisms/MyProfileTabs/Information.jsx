import React, { useState } from 'react';
import { Button, Form, Input, Popover, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { Storage } from 'aws-amplify';
import { gql } from '@apollo/client';
import { InfoCircleOutlined } from '@ant-design/icons';

import { nl2br } from 'claptime/utils/i18n';

import { ImageInput, Layouts, Links } from 'claptime/components/molecules';
import consts from 'claptime/consts';
import { useApolloClient, useQueryGet } from 'claptime/lib/apollo';
import { getUrl } from 'claptime/lib/profiles';
import { profileUpdateSlackAlert } from 'claptime/lib/slack';
import { useUserDispatch, useUserState, userActions } from 'claptime/lib/user';
import {
  createProfile,
  updateProfile,
  getProfile,
} from 'claptime/graphql/profiles';
import { dataURItoBlob } from 'claptime/utils';

const { TextArea } = Input;

const Information = () => {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);
  const [updatedImage, setUpdatedImage] = useState(null);

  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const { t } = useTranslation();
  const user = useUserState();
  const dispatch = useUserDispatch();
  const apolloClient = useApolloClient();
  const { item: data, refetch, response } = useQueryGet(getProfile, {
    variables: {
      id: user.settings.profileId,
    },
    skip: !user.hasPublicProfile,
  });
  if (response) return response;
  let defaultName = '';
  let defaultBiography = '';
  let defaultLinks = [];
  if (data && data.getProfile) {
    defaultName = data.getProfile.name;
    defaultBiography = data.getProfile.biography;
    defaultLinks = data.getProfile.links || [];
  }

  const onFinish = async (fieldsValue) => {
    // if creating a new profile, ensure cover is provided
    if (!user.hasPublicProfile && !fieldsValue.cover.croppedImage) {
      message.error(t('myProfilePage.information.missingAvatar'));
      return;
    }
    setSaving(true);
    let currentProfileId = user.settings.profileId;
    const links = [];
    if (fieldsValue.facebook) {
      links.push({
        type: 'FACEBOOK',
        url: fieldsValue.facebook,
      });
    }
    if (fieldsValue.instagram) {
      links.push({
        type: 'INSTAGRAM',
        url: fieldsValue.instagram,
      });
    }
    if (fieldsValue.labfilms) {
      links.push({
        type: 'LABFILMS',
        url: fieldsValue.labfilms,
      });
    }
    if (fieldsValue.website) {
      links.push({
        type: 'WEBSITE',
        url: fieldsValue.website,
      });
    }
    if (user.hasPublicProfile) {
      await apolloClient.mutate({
        mutation: gql(updateProfile),
        variables: {
          input: {
            id: user.settings.profileId,
            name: fieldsValue.name,
            biography: fieldsValue.biography,
            links,
          },
        },
      });
    } else {
      ({
        data: {
          createProfile: { id: currentProfileId },
        },
      } = await apolloClient.mutate({
        mutation: gql(createProfile),
        variables: {
          input: {
            id: currentProfileId,
            name: fieldsValue.name,
            biography: fieldsValue.biography,
            links,
            createdBy: user.username,
            owner: user.username,
          },
        },
      }));
      await userActions.updateUserSetting(dispatch)({
        name: 'profileId',
        value: currentProfileId,
        previousValue: user.settings.profileId,
      });
    }

    if (fieldsValue.cover.croppedImage) {
      try {
        // Cover
        await Storage.put(
          `profiles/${currentProfileId}/${consts.profiles.covers.filenames.CROPPED_512_512}`,
          dataURItoBlob(fieldsValue.cover.croppedImage),
          { level: 'protected' },
        );
        setUpdatedImage(fieldsValue.cover.croppedImage);
      } catch (errorStorage) {
        console.error(errorStorage);
        message.error(t('myProfilePage.information.errorUploadingAvatar'));
      }
    }

    await profileUpdateSlackAlert(
      user,
      fieldsValue.name,
      fieldsValue.biography,
      links,
      currentProfileId,
    );

    try {
      await refetch();
    } catch (e) {
      // Refetch fails when creating the profile (TypeError: _this.currentObservable is undefined)
      // Maybe user.hasPublicProfile becomes true, thus component rerenders ?
    }
    // Waiting for thumbnail to be available to fetch it
    setTimeout(() => form.resetFields(['cover']), 2000);
    setUnsavedChanges(false);
    setSaving(false);
  };

  const avatarPopoverContent = () => (
    <div style={{ maxWidth: '500px' }}>
      {nl2br(t('myAccountPage.information.avatarPopoverContent'))}
    </div>
  );

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        name: defaultName,
        biography: defaultBiography,
        cover: { image: null },
        facebook: getUrl(defaultLinks, 'FACEBOOK'),
        instagram: getUrl(defaultLinks, 'INSTAGRAM'),
        labfilms: getUrl(defaultLinks, 'LABFILMS'),
        website: getUrl(defaultLinks, 'WEBSITE'),
      }}
    >
      <Layouts.Form.Row>
        <Layouts.Form.Column>
          <Form.Item
            name="cover"
            rules={[
              {
                required: true,
                message: t('myProfilePage.information.required'),
              },
            ]}
            label={
              <span>
                <Popover
                  title={t('myAccountPage.information.avatarPopoverTitle')}
                  content={avatarPopoverContent()}
                >
                  <InfoCircleOutlined />
                </Popover>
                {` ${t('myProfilePage.information.avatar')}`}
              </span>
            }
          >
            <ImageInput
              s3Path={`profiles/${user.settings.profileId}/${consts.profiles.covers.filenames.CROPPED_512_512}`}
              shape="round"
              updatedImage={updatedImage}
              format="1:1"
              disabled={false}
              onChange={(value) => {
                if (value.filename) {
                  setUnsavedChanges(true); // onChange is triggered when loading
                }
              }}
            />
          </Form.Item>
          <Links.Edit onChange={() => setUnsavedChanges(true)} />
        </Layouts.Form.Column>
        <Layouts.Form.Column>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: t('myProfilePage.information.required'),
              },
            ]}
            label={t('myProfilePage.information.name')}
          >
            <Input onChange={() => setUnsavedChanges(true)} />
          </Form.Item>
          <Form.Item
            name="biography"
            rules={[
              {
                required: true,
                message: t('myProfilePage.information.required'),
              },
            ]}
            label={t('myProfilePage.information.biography')}
          >
            <TextArea rows={6} onChange={() => setUnsavedChanges(true)} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={saving}
              disabled={!unsavedChanges}
            >
              {user.hasPublicProfile
                ? t('myProfilePage.information.update')
                : t('myProfilePage.information.create')}
            </Button>
          </Form.Item>
        </Layouts.Form.Column>
      </Layouts.Form.Row>
    </Form>
  );
};

export default Information;
