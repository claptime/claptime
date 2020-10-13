import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Router, { useRouter } from 'next/router';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Popconfirm,
  Select,
  Popover,
  message,
  Tooltip,
  Tag,
  Switch,
} from 'antd';
import {
  DeleteOutlined,
  ArrowRightOutlined,
  RollbackOutlined,
  SaveOutlined,
  InfoCircleOutlined,
  EyeOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { gql } from '@apollo/client';
import moment from 'moment';
import { Storage } from 'aws-amplify';
import Link from 'next/link';

import { Spin, Subtitle } from 'claptime/components/atoms';
import {
  CreditsInput,
  ImageInput,
  PageHeader,
  Layouts,
} from 'claptime/components/molecules';
import VideosInSeriesData from 'claptime/components/organisms/VideosInSeriesData';
import VideoNodeSubmissions from 'claptime/components/organisms/VideoNodeSubmissions';
import NavBarTemplate from 'claptime/components/templates/NavBarTemplate';
import consts from 'claptime/consts';

import {
  createCredit,
  deleteCredit,
  removeVideoNode,
  getVideoNode,
  publishVideoNode,
  setVideoNodeMeta,
  unpublishVideoNode,
} from 'claptime/graphql/videonodes';

import { useApolloClient, useQueryGet } from 'claptime/lib/apollo';
import Head from 'claptime/lib/seo/Head';
import { useIsAuthenticated, useUserState } from 'claptime/lib/user';
import { dataURItoBlob, invalidateCache } from 'claptime/utils';
import { nl2br } from 'claptime/utils/i18n';
import { fileExists } from 'claptime/utils/storage';

const SeriesEditPage = () => {
  const [form] = Form.useForm();
  const {
    query: { series: seriesId },
  } = useRouter();
  const { t } = useTranslation();
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const [updatedImage, setUpdatedImage] = useState(null);

  const [formIsEditable, setFormIsEditable] = useState(false);

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [status, setStatus] = useState(null);

  const {
    username: userId,
    isAdmin,
    settings: { profileId },
  } = useUserState();

  const apolloClient = useApolloClient();
  const { item: series, refetch, response } = useQueryGet(
    getVideoNode,
    {
      variables: {
        id: seriesId,
      },
      errorPolicy: 'all',
    },
    { resultPath: '$.getVideoNode' },
  );

  useEffect(() => {
    if (series) {
      setStatus(series.status);
    }
  }, [series]);
  if (!useIsAuthenticated()) return <Spin />;
  if (response) return response;

  // Check authorization
  if (!isAdmin && series.owner !== userId) {
    Router.push('/');
  }

  const isAvailable = (action) => {
    switch (action) {
      case 'save':
        return status === consts.series.status.DRAFT || formIsEditable;
      case 'unpublish':
        return status === consts.series.status.PUBLISHED;
      case 'publish':
        return status === consts.series.status.DRAFT;
      case 'delete':
        return status === consts.series.status.DRAFT;
      case 'editForm':
        return status === consts.series.status.DRAFT || formIsEditable;
      default:
        throw new Error('UnknownAction');
    }
  };

  const saveSeries = async (fieldsValue) => {
    try {
      setSaving(true);
      if (fieldsValue.cover.croppedImage) {
        try {
          // Cover
          await Storage.put(
            `videoNodes/${seriesId}/${fieldsValue.cover.filename}`,
            dataURItoBlob(fieldsValue.cover.croppedImage),
            { level: 'protected', cacheControl: 'no-cache' },
          );

          setUpdatedImage(fieldsValue.cover.croppedImage);
        } catch (err) {
          console.error(err);
          message.error(t('series.edit.errorUploadingCover'));
        }
      }
      // Video metadata
      await apolloClient.mutate({
        mutation: gql(setVideoNodeMeta),
        variables: {
          videoNodeId: seriesId,
          title: fieldsValue.title,
          synopsis: fieldsValue.synopsis || null,
          festivals: fieldsValue.festivals || null,
          category: fieldsValue.category || null,
          releaseYear:
            (fieldsValue.releaseYear && fieldsValue.releaseYear.year()) || null,
          donationsAvailable: fieldsValue.donationsAvailable,
        },
      });
      // Credit
      // First deleting elements
      const toDelete = series.credits.items
        .filter((old) => !fieldsValue.credits.find(({ id }) => old.id === id))
        .map(({ id }) =>
          apolloClient.mutate({
            mutation: gql(deleteCredit),
            variables: {
              input: {
                id,
              },
            },
          }),
        );
      // Then creating new ones
      const toCreate = fieldsValue.credits
        .filter(({ id }) => !id)
        .map(({ role, customRole, customProfile, profile }) =>
          apolloClient.mutate({
            mutation: gql(createCredit),
            variables: {
              input: {
                creditVideoNodeId: series.id,
                role: role || undefined,
                customRole: customRole || undefined,
                customProfile: customProfile || undefined,
                creditProfileId: profile ? profile.id : undefined,
                owner: userId,
              },
            },
          }),
        );
      await Promise.all([...toDelete, ...toCreate]);

      message.info(t('series.edit.saveSucceeded'));
      // Waiting for thumbnail to be available to fetch it
      setTimeout(() => form.resetFields(['cover']), 2000);
      await refetch();

      setFormIsEditable(false);
      setUnsavedChanges(false);
    } catch (err) {
      console.log(err);
      message.error(t('series.edit.saveFailed'));
    }
    setSaving(false);
  };

  const deleteSeriesAndEpisodes = async () => {
    try {
      setDeleting(true);
      await apolloClient.mutate({
        mutation: gql(removeVideoNode),
        variables: {
          videoNodeId: seriesId,
        },
        update: invalidateCache(new RegExp(`Profile:${profileId}`)),
      });
      message.info(t('series.edit.deleteSucceeded'));
      Router.push('/my-profile/series');
    } catch (err) {
      message.error(t('series.edit.deleteFailed'));
    }
    setDeleting(false);
  };

  const publishSeries = async () => {
    // Ensure all required fields are filled
    if (!series.title.length) {
      message.error(t('series.edit.publishMissingTitle'));
      return;
    }
    if (!series.synopsis || !series.synopsis.length) {
      message.error(t('series.edit.publishMissingSynopsis'));
      return;
    }
    if (
      !series.category ||
      Object.keys(consts.collections.default.categories).indexOf(
        series.category,
      ) === -1
    ) {
      message.error(t('series.edit.publishMissingCategory'));
      return;
    }
    if (!series.releaseYear) {
      message.error(t('series.edit.publishMissingReleaseYear'));
      return;
    }
    if (
      !(await fileExists(
        `videoNodes/${series.id}/${consts.videos.covers.filenames.CROPPED_600_800}`,
      ))
    ) {
      message.error(t('series.edit.publishMissingCover'));
      return;
    }
    // Then set status
    await apolloClient.mutate({
      mutation: gql(publishVideoNode),
      variables: {
        videoNodeId: series.id,
      },
    });
    message.info(t('series.edit.publishSucceeded'));
  };

  const unpublishSeries = async () => {
    await apolloClient.mutate({
      mutation: gql(unpublishVideoNode),
      variables: {
        videoNodeId: series.id,
      },
    });
    message.info(t('series.edit.unpublishSucceeded'));
  };

  const getActions = () => [
    <Link href="/series/[series]" as={`/series/${series.id}`} key="view">
      <a>
        <Button icon={<EyeOutlined />}>{t('series.edit.view')}</Button>
      </a>
    </Link>,
    isAvailable('delete') ? (
      <Popconfirm
        fetch
        key="delete"
        title={t('series.edit.deleteConfirm')}
        onConfirm={deleteSeriesAndEpisodes}
        okText={t('series.edit.confirmYes')}
        cancelText={t('series.edit.confirmNo')}
      >
        <Button icon={<DeleteOutlined />} loading={deleting}>
          {t('series.edit.delete')}
        </Button>
      </Popconfirm>
    ) : null,
    isAvailable('save') ? (
      <Button
        key="save"
        type="primary"
        loading={saving}
        icon={<SaveOutlined />}
        form="video-edit-form"
        htmlType="submit"
        disabled={!unsavedChanges}
      >
        {t('series.edit.save')}
      </Button>
    ) : null,
    isAvailable('publish') ? (
      <Popconfirm
        key="publish"
        title={t('series.edit.publishConfirm')}
        onConfirm={publishSeries}
        okText={t('series.edit.confirmYes')}
        cancelText={t('series.edit.confirmNo')}
        disabled={unsavedChanges}
      >
        <Button
          type="primary"
          icon={<ArrowRightOutlined />}
          disabled={unsavedChanges}
        >
          {t('series.edit.publish')}
        </Button>
      </Popconfirm>
    ) : null,
    isAvailable('unpublish') ? (
      <React.Fragment key="unpublishGroup">
        {!formIsEditable && (
          <Button
            key="unpublishButton"
            icon={<EditOutlined />}
            onClick={() => setFormIsEditable(true)}
          >
            {t('series.edit.edit')}
          </Button>
        )}
        <Popconfirm
          key="unpublish"
          type="primary"
          title={t('series.edit.unpublishConfirm')}
          onConfirm={unpublishSeries}
          okText={t('series.edit.confirmYes')}
          cancelText={t('series.edit.confirmNo')}
        >
          <Button icon={<RollbackOutlined />}>
            {t('series.edit.unpublish')}
          </Button>
        </Popconfirm>
      </React.Fragment>
    ) : null,
  ];

  const disabled = !isAvailable('editForm') || saving;

  const coverPopoverContent = () => (
    <div style={{ maxWidth: '500px' }}>
      {nl2br(t('series.edit.coverPopoverContent'))}
    </div>
  );

  let color;
  switch (status) {
    case consts.series.status.PUBLISHED:
      color = 'green';
      break;
    case consts.series.status.DRAFT:
    default:
      color = 'gold';
  }

  return (
    <>
      <Head page="series/edit" />
      <NavBarTemplate>
        <PageHeader
          title={t('series.edit.pageTitle')}
          subTitle
          tags={
            <Tooltip title={t(`series.status.${status}.description`)}>
              <Tag color={color} key={status}>
                {t(`series.status.${status}.title`)}
              </Tag>
            </Tooltip>
          }
          extra={getActions()}
        />
        {status === consts.series.status.PUBLISHED ? (
          <VideoNodeSubmissions videoNodeId={seriesId} />
        ) : null}
        <Subtitle style={{ margin: '16px 0 ' }}>
          {t('series.edit.sheetSubtitle')}
        </Subtitle>
        <Form
          form={form}
          id="video-edit-form"
          onFinish={saveSeries}
          initialValues={{
            cover: { image: null },
            title: series.title,
            synopsis: series.synopsis,
            festivals: series.festivals,
            category: series.category,
            releaseYear:
              series.releaseYear &&
              moment(series.releaseYear.toString(), 'YYYY'),
            credits: series.credits.items,
            donationsAvailable: series.donationsAvailable || false,
          }}
          hideRequiredMark
          style={{
            margin: '0 9%',
          }}
          layout="vertical"
        >
          <Layouts.Form.Row>
            <Layouts.Form.Column>
              <Form.Item
                name="title"
                rules={[
                  {
                    required: true,
                    message: t('series.edit.required'),
                  },
                ]}
                label={t('series.edit.title')}
              >
                <Input
                  placeholder={t('series.edit.titlePlaceholder')}
                  disabled={disabled}
                  onChange={() => setUnsavedChanges(true)}
                />
              </Form.Item>
              <Form.Item
                name="cover"
                label={
                  <span>
                    <Popover
                      title={t('series.edit.coverPopoverTitle')}
                      content={coverPopoverContent()}
                    >
                      <InfoCircleOutlined />
                    </Popover>
                    {` ${t('series.edit.cover')}`}
                  </span>
                }
              >
                <ImageInput
                  s3Path={`videoNodes/${series.id}/${consts.videos.covers.filenames.CROPPED_600_800}`}
                  format="3:4"
                  disabled={disabled}
                  updatedCover={updatedImage}
                  onChange={(value) => {
                    if (value.filename) {
                      setUnsavedChanges(true); // onChange is triggered when loading
                    }
                  }}
                />
              </Form.Item>
            </Layouts.Form.Column>
            <Layouts.Form.Column>
              <Form.Item name="synopsis" label={t('series.edit.synopsis')}>
                <Input.TextArea
                  rows={6}
                  placeholder={t('series.edit.synopsisPlaceholder')}
                  disabled={disabled}
                  onChange={() => setUnsavedChanges(true)}
                />
              </Form.Item>
              <Form.Item name="festivals" label={t('series.edit.festivals')}>
                <Input.TextArea
                  rows={6}
                  placeholder={t('series.edit.festivalsPlaceholder')}
                  disabled={disabled}
                  onChange={() => setUnsavedChanges(true)}
                />
              </Form.Item>
              <Form.Item name="category" label={t('series.edit.category')}>
                <Select
                  placeholder={t('series.edit.categoryPlaceholder')}
                  disabled={disabled}
                  onChange={() => setUnsavedChanges(true)}
                >
                  {Object.keys(consts.collections.default.categories).map(
                    (c) => (
                      <Select.Option value={c} key={c}>
                        {t(`categories.${c}.name`)}
                      </Select.Option>
                    ),
                  )}
                </Select>
              </Form.Item>
              <Form.Item
                label={t('series.edit.releaseYear')}
                name="releaseYear"
                rules={[
                  {
                    type: 'object',
                  },
                ]}
                onChange={() => setUnsavedChanges(true)}
              >
                <DatePicker
                  placeholder={t('series.edit.releaseYearPlaceholder')}
                  picker="year"
                  onChange={() => setUnsavedChanges(true)}
                  disabledDate={(current) => current && current > moment()}
                  disabled={disabled}
                  style={{
                    width: '100%',
                  }}
                />
              </Form.Item>
              <Form.Item
                name="donationsAvailable"
                label={
                  <span>
                    <Tooltip
                      title={t('video.edit.tooltipDonations')}
                      placement="topLeft"
                    >
                      <InfoCircleOutlined />
                    </Tooltip>{' '}
                    {t('video.edit.authorizeDonations')}
                  </span>
                }
                valuePropName="checked"
              >
                <Switch
                  disabled={disabled}
                  defaultChecked={series.donationsAvailable}
                  onChange={() => setUnsavedChanges(true)}
                />
              </Form.Item>
            </Layouts.Form.Column>
            <Layouts.Form.Column>
              <Form.Item name="credits" label={t('series.edit.credits')}>
                <CreditsInput
                  textColor={consts.style.colors.dark}
                  editable={!disabled}
                  onChange={() => setUnsavedChanges(true)}
                />
              </Form.Item>
            </Layouts.Form.Column>
          </Layouts.Form.Row>
        </Form>

        <VideosInSeriesData series={series} onUpdate={refetch} />
      </NavBarTemplate>
    </>
  );
};

export default dynamic(() => Promise.resolve(SeriesEditPage), {
  ssr: false,
});
