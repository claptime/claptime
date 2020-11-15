import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Router, { useRouter } from 'next/router';
import { Button, Form, Input, Popover, Tooltip, message } from 'antd';
import {
  CopyOutlined,
  EyeOutlined,
  InfoCircleOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { gql } from '@apollo/client';
import { Storage } from 'aws-amplify';
import Link from 'next/link';

import { Spin } from 'claptime/components/atoms';
import {
  ImageInput,
  Layouts,
  Links,
  PageHeader,
} from 'claptime/components/molecules';
import CategoriesInput from 'claptime/components/organisms/CategoriesInput';
import NavBarTemplate from 'claptime/components/templates/NavBarTemplate';
import consts from 'claptime/consts';
import {
  listCollectionsBySlug,
  updateCollection,
} from 'claptime/graphql/collections';
import { useApolloClient, useQueryGet } from 'claptime/lib/apollo';
import { getUrl } from 'claptime/lib/profiles';
import Head from 'claptime/lib/seo/Head';
import { useIsAuthenticated, useUserState } from 'claptime/lib/user';
import { dataURItoBlob } from 'claptime/utils';
import { nl2br } from 'claptime/utils/i18n';

const CollectionEditPage = () => {
  const [form] = Form.useForm();
  const {
    query: { collection: collectionSlug },
  } = useRouter();
  const { t } = useTranslation();
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const apolloClient = useApolloClient();
  const { username: userId, isAdmin } = useUserState();
  const [updatedImage, setUpdatedImage] = useState(null);

  const { item: collection, refetch, response } = useQueryGet(
    listCollectionsBySlug,
    {
      variables: {
        slug: collectionSlug,
      },
      errorPolicy: 'all',
    },
    { resultPath: '$.listCollectionsBySlug.items[0]' },
  );
  if (!useIsAuthenticated()) return <Spin />;
  if (response) return response;

  // Check authorization
  if (!isAdmin && collection.owner !== userId) {
    Router.push('/');
  }

  const onFinish = async (fieldsValue) => {
    setSaving(true);
    if (fieldsValue.cover.croppedImage) {
      try {
        // Cover
        await Storage.put(
          `collections/${collection.id}/${fieldsValue.cover.filename}`,
          dataURItoBlob(fieldsValue.cover.croppedImage),
          { level: 'protected' },
        );
        setUpdatedImage(fieldsValue.cover.croppedImage);
      } catch (err) {
        console.error(err);
        message.error(t('collection.edit.errorUploadingCover'));
      }
    }
    // Collection metadata
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
    await apolloClient.mutate({
      mutation: gql(updateCollection),
      variables: {
        input: {
          id: collection.id,
          name: fieldsValue.name,
          slug: fieldsValue.slug,
          tagline: fieldsValue.tagline,
          description: fieldsValue.description,
          categories: fieldsValue.categories.map(
            ({ id, category, description }) => ({ id, category, description }),
          ),
          links,
        },
      },
    });
    await refetch();
    // Waiting for thumbnail to be available to fetch it
    setTimeout(() => form.resetFields(['cover']), 2000);
    setSaving(false);
  };

  const disabled = saving;

  return (
    <>
      <Head page="collection/edit" />
      <NavBarTemplate>
        <PageHeader
          title={t('collection.edit.pageTitle')}
          extra={[
            <Tooltip title={t('collection.edit.view')} key="view">
              <Link
                href="/collection/[collection]"
                as={`/collection/${collection.slug}`}
              >
                <a>
                  <Button icon={<EyeOutlined />} />
                </a>
              </Link>
            </Tooltip>,
            <Tooltip title={t('collection.edit.save')} key="save">
              <Button
                type="primary"
                loading={saving}
                icon={<SaveOutlined />}
                form="collection-edit-form"
                htmlType="submit"
                disabled={!unsavedChanges}
              />
            </Tooltip>,
          ]}
        />
        <Form
          form={form}
          id="collection-edit-form"
          onFinish={onFinish}
          initialValues={{
            name: collection.name,
            slug: collection.slug,
            tagline: collection.tagline,
            description: collection.description,
            cover: { image: null },
            categories: collection.categories,
            facebook: getUrl(collection.links || [], 'FACEBOOK'),
            instagram: getUrl(collection.links || [], 'INSTAGRAM'),
            labfilms: getUrl(collection.links || [], 'LABFILMS'),
            website: getUrl(collection.links || [], 'WEBSITE'),
          }}
          layout="vertical"
          style={{
            width: '100%',
          }}
        >
          <Layouts.Form.Row>
            <Form.Item
              name="cover"
              label={
                <span>
                  <Popover
                    placement="rightTop"
                    title={t('collection.edit.coverPopoverTitle')}
                    content={
                      <div style={{ maxWidth: '500px' }}>
                        {nl2br(t('collection.edit.coverPopoverContent'))}
                      </div>
                    }
                  >
                    <InfoCircleOutlined />
                  </Popover>
                  {` ${t('collection.edit.cover')}`}
                </span>
              }
              style={{ width: '100%' }}
            >
              <ImageInput
                s3Path={`collections/${collection.id}/${consts.collections.covers.filenames.CROPPED_1500_300}`}
                format="5:1"
                disabled={disabled}
                updatedImage={updatedImage}
                onChange={(value) => {
                  if (value.filename) {
                    setUnsavedChanges(true); // onChange is triggered when loading
                  }
                }}
              />
            </Form.Item>
            <Layouts.Form.Column>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: t('collection.edit.required'),
                  },
                  {
                    max: 50,
                    message: t('collection.edit.nameMaxLength'),
                  },
                ]}
                label={t('collection.edit.name')}
              >
                <Input
                  placeholder={t('collection.edit.namePlaceholder')}
                  disabled={disabled}
                  onChange={() => setUnsavedChanges(true)}
                />
              </Form.Item>
              <Form.Item
                name="slug"
                rules={[
                  {
                    required: true,
                    message: t('collection.edit.required'),
                  },
                  {
                    max: 50,
                    message: t('collection.edit.slugMaxLength'),
                  },
                ]}
                label={
                  <>
                    {t('collection.edit.slug')}&nbsp;
                    <Tooltip title={t('collection.edit.slugTooltip')}>
                      <InfoCircleOutlined />
                    </Tooltip>
                  </>
                }
              >
                <Input
                  placeholder={t('collection.edit.slugPlaceholder')}
                  disabled
                  onChange={() => setUnsavedChanges(true)}
                  addonBefore="/collection/"
                  addonAfter={
                    <Tooltip title={t('collection.edit.slugCopy')}>
                      <CopyOutlined
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `https://www.clap-time.com/collection/${collection.slug}`,
                          );
                          message.info(t('collection.edit.slugCopied'));
                        }}
                      />
                    </Tooltip>
                  }
                />
              </Form.Item>
              <Form.Item
                name="tagline"
                rules={[
                  {
                    required: true,
                    message: t('collection.edit.required'),
                  },
                  {
                    max: 100,
                    message: t('collection.edit.taglineMaxLength'),
                  },
                ]}
                label={t('collection.edit.tagline')}
              >
                <Input
                  placeholder={t('collection.edit.taglinePlaceholder')}
                  disabled={disabled}
                  onChange={() => setUnsavedChanges(true)}
                />
              </Form.Item>
              <Form.Item
                name="description"
                label={t('collection.edit.description')}
              >
                <Input.TextArea
                  autoSize={{ minRows: 4, maxRows: 10 }}
                  placeholder={t('collection.edit.descriptionPlaceholder')}
                  disabled={disabled}
                  onChange={() => setUnsavedChanges(true)}
                />
              </Form.Item>
            </Layouts.Form.Column>
            <Layouts.Form.Column>
              <Form.Item
                name="categories"
                label={t('collection.edit.categories')}
              >
                <CategoriesInput
                  collectionId={collection.id}
                  editable={!disabled}
                  onChange={() => setUnsavedChanges(true)}
                />
              </Form.Item>
            </Layouts.Form.Column>
            <Layouts.Form.Column>
              <Links.Edit onChange={() => setUnsavedChanges(true)} />
            </Layouts.Form.Column>
          </Layouts.Form.Row>
        </Form>
      </NavBarTemplate>
    </>
  );
};

export default dynamic(() => Promise.resolve(CollectionEditPage), {
  ssr: false,
});
