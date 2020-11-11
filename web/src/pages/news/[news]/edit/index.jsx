import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Router, { useRouter } from 'next/router';
import { Button, Form, Input, Popover, Tooltip, message } from 'antd';
import {
  ArrowRightOutlined,
  InfoCircleOutlined,
  RollbackOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { gql } from '@apollo/client';
import { Storage } from 'aws-amplify';

import { Spin } from 'claptime/components/atoms';
import {
  ImageInput,
  Layouts,
  Links,
  PageHeader,
} from 'claptime/components/molecules';
import NavBarTemplate from 'claptime/components/templates/NavBarTemplate';
import consts from 'claptime/consts';
import { getNews, updateNews } from 'claptime/graphql/news';
import { useApolloClient, useQueryGet } from 'claptime/lib/apollo';
import { getUrl } from 'claptime/lib/profiles';
import Head from 'claptime/lib/seo/Head';
import { useIsAuthenticated, useUserState } from 'claptime/lib/user';
import { dataURItoBlob } from 'claptime/utils';
import { nl2br } from 'claptime/utils/i18n';

const NewsEditPage = () => {
  const [form] = Form.useForm();
  const {
    query: { news: newsId },
  } = useRouter();
  const { t } = useTranslation();
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const apolloClient = useApolloClient();
  const { isAdmin } = useUserState();
  const [updatedImage, setUpdatedImage] = useState(null);

  const { item: news, refetch, response } = useQueryGet(
    getNews,
    {
      variables: {
        id: newsId,
      },
      errorPolicy: 'all',
    },
    { resultPath: '$.getNews' },
  );
  if (!useIsAuthenticated()) return <Spin />;
  if (response) return response;

  // Check authorization
  if (!isAdmin) {
    Router.push('/');
  }

  const publishNews = async () => {
    await apolloClient.mutate({
      mutation: gql(updateNews),
      variables: {
        input: {
          id: news.id,
          status: 'PUBLISHED',
        },
      },
    });
    message.info(t('news.edit.publishSucceeded'));
  };

  const unpublishNews = async () => {
    await apolloClient.mutate({
      mutation: gql(updateNews),
      variables: {
        input: {
          id: news.id,
          status: 'DRAFT',
        },
      },
    });
    message.info(t('news.edit.unpublishSucceeded'));
  };

  const onFinish = async (fieldsValue) => {
    setSaving(true);
    if (fieldsValue.cover.croppedImage) {
      try {
        // Cover
        await Storage.put(
          `news/${news.id}/${fieldsValue.cover.filename}`,
          dataURItoBlob(fieldsValue.cover.croppedImage),
          { level: 'protected' },
        );
        setUpdatedImage(fieldsValue.cover.croppedImage);
      } catch (err) {
        console.error(err);
        message.error(t('news.edit.errorUploadingCover'));
      }
    }
    // News metadata
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
      mutation: gql(updateNews),
      variables: {
        input: {
          id: news.id,
          title: fieldsValue.title,
          description: fieldsValue.description,
          links,
          button: {
            text: fieldsValue.buttonText || '',
            url: fieldsValue.buttonUrl || '',
          },
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
      <Head page="news/edit" />
      <NavBarTemplate>
        <PageHeader
          title={t('news.edit.pageTitle')}
          extra={[
            <Tooltip title={t('news.edit.save')} key="save">
              <Button
                type="primary"
                loading={saving}
                icon={<SaveOutlined />}
                form="news-edit-form"
                htmlType="submit"
                disabled={!unsavedChanges}
                key="save"
              />
            </Tooltip>,
            news.status === 'DRAFT' ? (
              <Button
                type="primary"
                icon={<ArrowRightOutlined />}
                disabled={unsavedChanges}
                onClick={publishNews}
                key="publish"
              >
                {t('news.edit.publish')}
              </Button>
            ) : null,
            news.status === 'PUBLISHED' ? (
              <Button
                icon={<RollbackOutlined />}
                onClick={unpublishNews}
                disabled={unsavedChanges}
                key="unpublish"
              >
                {t('news.edit.unpublish')}
              </Button>
            ) : null,
          ]}
        />
        <Form
          form={form}
          id="news-edit-form"
          onFinish={onFinish}
          initialValues={{
            title: news.title,
            description: news.description,
            cover: { image: null },
            facebook: getUrl(news.links || [], 'FACEBOOK'),
            instagram: getUrl(news.links || [], 'INSTAGRAM'),
            labfilms: getUrl(news.links || [], 'LABFILMS'),
            website: getUrl(news.links || [], 'WEBSITE'),
            buttonText: news.button?.text,
            buttonUrl: news.button?.url,
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
                    title={t('news.edit.coverPopoverTitle')}
                    content={
                      <div style={{ maxWidth: '500px' }}>
                        {nl2br(t('news.edit.coverPopoverContent'))}
                      </div>
                    }
                  >
                    <InfoCircleOutlined />
                  </Popover>
                  {` ${t('news.edit.cover')}`}
                </span>
              }
              style={{ width: '100%' }}
            >
              <ImageInput
                s3Path={`news/${news.id}/${consts.news.covers.filenames.CROPPED_1500_500}`}
                format="3:1"
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
                name="title"
                rules={[
                  {
                    required: true,
                    message: t('news.edit.required'),
                  },
                  {
                    max: 100,
                    message: t('news.edit.titleMaxLength'),
                  },
                ]}
                label={t('news.edit.title')}
              >
                <Input
                  placeholder={t('news.edit.titlePlaceholder')}
                  disabled={disabled}
                  onChange={() => setUnsavedChanges(true)}
                />
              </Form.Item>
              <Form.Item name="description" label={t('news.edit.description')}>
                <Input.TextArea
                  autoSize={{ minRows: 4, maxRows: 10 }}
                  placeholder={t('news.edit.descriptionPlaceholder')}
                  disabled={disabled}
                  onChange={() => setUnsavedChanges(true)}
                />
              </Form.Item>
            </Layouts.Form.Column>
            <Layouts.Form.Column>
              <Form.Item
                name="buttonText"
                rules={[
                  {
                    max: 50,
                    message: t('news.edit.buttonTextMaxLength'),
                  },
                ]}
                label={t('news.edit.buttonText')}
              >
                <Input
                  placeholder={t('news.edit.buttonTextPlaceholder')}
                  disabled={disabled}
                  onChange={() => setUnsavedChanges(true)}
                />
              </Form.Item>
              <Form.Item name="buttonUrl" label={t('news.edit.buttonUrl')}>
                <Input
                  placeholder={t('news.edit.buttonUrlPlaceholder')}
                  disabled={disabled}
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

export default dynamic(() => Promise.resolve(NewsEditPage), {
  ssr: false,
});
