import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Router, { useRouter } from 'next/router';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Popconfirm,
  Switch,
  Select,
  Slider,
  Tooltip,
  Popover,
  Modal,
  message,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  BarChartOutlined,
  ArrowRightOutlined,
  RollbackOutlined,
  SaveOutlined,
  InfoCircleOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { useTranslation, Trans } from 'react-i18next';
import { gql } from '@apollo/client';
import moment from 'moment';
import { Storage } from 'aws-amplify';
import Link from 'next/link';

import styled from 'styled-components';

import { Spin } from 'claptime/components/atoms';
import {
  Charter,
  CreditsInput,
  ImageInput,
  PageHeader,
  Layouts,
  VideoDropzone,
} from 'claptime/components/molecules';
import VideoStatus from 'claptime/components/organisms/VideoStatus';
import NavBarTemplate from 'claptime/components/templates/NavBarTemplate';
import consts from 'claptime/consts';

import {
  createCredit,
  deleteCredit,
  removeVideoNode,
  getVideoNode,
  onUpdateVideoNode,
  publishVideoNode,
  setVideoNodeMeta,
  unpublishVideoNode,
} from 'claptime/graphql/videonodes';
import {
  useApolloClient,
  useQueryGet,
  useSubscription,
} from 'claptime/lib/apollo';
import PropTypes from 'claptime/lib/prop-types';
import Head from 'claptime/lib/seo/Head';
import { useIsAuthenticated, useUserState } from 'claptime/lib/user';
import { dataURItoBlob, invalidateCache, formatDuration } from 'claptime/utils';
import { nl2br } from 'claptime/utils/i18n';
import { fileExists } from 'claptime/utils/storage';

const TTL_NO_LIMIT = consts.videos.ttl.MAX_DAYS + 1;

const ReadCharter = styled.span`
  margin: 0 auto 15px auto;
  border: solid 1px ${consts.style.colors.border}
  border-radius: 6px;
  padding: 10px 20px;
  max-width: 90vw;
`;

const StyledLink = styled.a`
  color: ${consts.style.colors.strawberry};
  &:hover {
    color: ${consts.style.colors.strawberryHover};
  }
`;

// Wrapper component workaround for combining next/link + i18next <Trans>
// https://github.com/i18next/react-i18next/issues/1090#issuecomment-615426145
const LinkText = ({ href, as, children }) => {
  return (
    <Link href={href} as={as}>
      <StyledLink>{children}</StyledLink>
    </Link>
  );
};

LinkText.propTypes = {
  href: PropTypes.string.isRequired,
  as: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const VideoEditPage = () => {
  const [form] = Form.useForm();
  const {
    query: { video: videoId },
  } = useRouter();
  const { t } = useTranslation();
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const [updatedImage, setUpdatedImage] = useState(null);

  const [formIsEditable, setFormIsEditable] = useState(false);

  const [charterVisible, setCharterVisible] = useState(false);

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState(null);
  const {
    settings: { profileId },
    username: userId,
    isAdmin,
  } = useUserState();

  const apolloClient = useApolloClient();
  const { item: video, refetch, response } = useQueryGet(
    getVideoNode,
    {
      variables: {
        id: videoId,
      },
      errorPolicy: 'all',
    },
    { resultPath: '$.getVideoNode' },
  );

  useEffect(() => {
    if (video) {
      if (video.status) {
        setStatus(video.status);
      }
    }
  }, [video]);
  useSubscription(gql(onUpdateVideoNode), {
    variables: { id: videoId },
    onSubscriptionData: ({ subscriptionData }) => {
      const {
        data: { onUpdateVideoNode: videoNode },
      } = subscriptionData;
      setStatus(videoNode.status);
    },
  });
  if (!useIsAuthenticated()) return <Spin />;
  if (response) return response;
  if (!status) return null;

  const { parentNode, nextNode: nextEpisode } = video;
  const parentTitle = (parentNode && parentNode.title) || null;
  const previousEpisode =
    (parentNode &&
      parentNode.childNodes.items.find(
        (v) => v.videoNodeNextNodeId === video.id,
      )) ||
    null;
  // Check authorization
  if (!isAdmin && video.owner !== userId) {
    Router.push('/');
  }

  const isAvailable = (action) => {
    switch (action) {
      case 'save':
        return (
          [
            consts.videos.status.IMPORT,
            consts.videos.status.UPLOAD,
            consts.videos.status.PROCESSING,
            consts.videos.status.PROCESSING_FAILED,
            consts.videos.status.DRAFT,
          ].indexOf(status) > -1 ||
          isAdmin ||
          formIsEditable
        );
      case 'unpublish':
        return [consts.videos.status.PUBLISHED].indexOf(status) > -1;
      case 'publish':
        return status === consts.videos.status.DRAFT;
      case 'delete':
        return (
          [
            consts.videos.status.IMPORT,
            consts.videos.status.UPLOAD,
            consts.videos.status.PROCESSING,
            consts.videos.status.PROCESSING_FAILED,
            consts.videos.status.DRAFT,
          ].indexOf(status) > -1
        );
      case 'view':
        return (
          [consts.videos.status.DRAFT, consts.videos.status.PUBLISHED].indexOf(
            status,
          ) > -1
        );
      case 'stats':
        return [consts.videos.status.PUBLISHED].indexOf(status) > -1;
      case 'upload':
        return (
          [
            consts.videos.status.UPLOAD,
            consts.videos.status.PROCESSING_FAILED,
          ].indexOf(status) > -1
        );
      case 'seeDuration':
        return (
          [consts.videos.status.DRAFT, consts.videos.status.PUBLISHED].indexOf(
            status,
          ) > -1
        );
      case 'editForm':
        return (
          [
            consts.videos.status.IMPORT,
            consts.videos.status.UPLOAD,
            consts.videos.status.PROCESSING,
            consts.videos.status.PROCESSING_FAILED,
            consts.videos.status.DRAFT,
          ].indexOf(status) > -1 ||
          isAdmin ||
          formIsEditable
        );
      default:
        throw new Error('UnknownAction');
    }
  };

  const saveVideo = async (fieldsValue) => {
    try {
      setSaving(true);
      if (fieldsValue.cover.croppedImage) {
        try {
          // Cover
          await Storage.put(
            `videoNodes/${videoId}/${fieldsValue.cover.filename}`,
            dataURItoBlob(fieldsValue.cover.croppedImage),
            { level: 'protected', cacheControl: 'no-cache' },
          );

          setUpdatedImage(fieldsValue.cover.croppedImage);
        } catch (err) {
          console.error(err);
          message.error(t('video.edit.errorUploadingCover'));
        }
      }
      // Video metadata
      await apolloClient.mutate({
        mutation: gql(setVideoNodeMeta),
        variables: {
          videoNodeId: videoId,
          title: fieldsValue.title,
          synopsis: fieldsValue.synopsis || null,
          festivals: fieldsValue.festivals || null,
          category: fieldsValue.category || null,
          releaseYear:
            (fieldsValue.releaseYear && fieldsValue.releaseYear.year()) || null,
          donationsAvailable: fieldsValue.donationsAvailable,
          ttl: fieldsValue.ttl !== TTL_NO_LIMIT ? fieldsValue.ttl : null,
        },
      });
      // Credit
      // First deleting elements
      const toDelete = video.credits.items
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
        .map(({ role, customProfile, profile }) =>
          apolloClient.mutate({
            mutation: gql(createCredit),
            variables: {
              input: {
                creditVideoNodeId: video.id,
                role,
                customProfile: customProfile || undefined,
                creditProfileId: profile ? profile.id : undefined,
                owner: userId,
              },
            },
          }),
        );
      await Promise.all([...toDelete, ...toCreate]);

      message.info(t('video.edit.saveSucceeded'));
      // Waiting for thumbnail to be available to fetch it
      setTimeout(() => form.resetFields(['cover']), 2000);
      await refetch();

      setFormIsEditable(false);
      setUnsavedChanges(false);
    } catch (err) {
      console.log(err);
      message.error(t('video.edit.saveFailed'));
    }
    setSaving(false);
  };

  const deleteVideo = async () => {
    try {
      setDeleting(true);
      await apolloClient.mutate({
        mutation: gql(removeVideoNode),
        variables: {
          videoNodeId: video.id,
        },
        update: invalidateCache(new RegExp(`Profile:${profileId}`)),
      });
      message.info(t('video.edit.deleteSucceeded'));
      Router.push('/my-profile/videos');
    } catch (err) {
      message.error(t('video.edit.deleteFailed'));
    }
    setDeleting(false);
  };

  const publishVideo = async () => {
    // Ensure all required fields are filled
    if (!video.title.length) {
      message.error(t('video.edit.publishMissingTitle'));
      return;
    }
    if (!video.synopsis || !video.synopsis.length) {
      message.error(t('video.edit.publishMissingSynopsis'));
      return;
    }
    if (
      !video.category ||
      Object.keys(consts.collections.default.categories).indexOf(
        video.category,
      ) === -1
    ) {
      message.error(t('video.edit.publishMissingCategory'));
      return;
    }
    if (!video.releaseYear) {
      message.error(t('video.edit.publishMissingReleaseYear'));
      return;
    }
    if (
      !(await fileExists(
        `videoNodes/${video.id}/${consts.videos.covers.filenames.CROPPED_600_800}`,
      ))
    ) {
      message.error(t('video.edit.publishMissingCover'));
      return;
    }
    // Then set status
    await apolloClient.mutate({
      mutation: gql(publishVideoNode),
      variables: {
        videoNodeId: video.id,
      },
    });
    message.info(t('video.edit.publishSucceeded'));
  };

  const unpublishVideo = async () => {
    await apolloClient.mutate({
      mutation: gql(unpublishVideoNode),
      variables: {
        videoNodeId: video.id,
      },
    });
    message.info(t('video.edit.unpublishSucceeded'));
  };

  const getActions = () => [
    isAvailable('delete') ? (
      <Popconfirm
        key="delete"
        title={t('video.edit.deleteConfirm')}
        onConfirm={deleteVideo}
        okText={t('video.edit.confirmYes')}
        cancelText={t('video.edit.confirmNo')}
      >
        <Button icon={<DeleteOutlined />} loading={deleting}>
          {t('video.edit.delete')}
        </Button>
      </Popconfirm>
    ) : null,
    isAvailable('view') ? (
      <Link href="/video/[video]" as={`/video/${video.id}`} key="view">
        <a>
          <Button icon={<EyeOutlined />}>{t('video.edit.view')}</Button>
        </a>
      </Link>
    ) : null,
    isAvailable('stats') ? (
      <Link
        href="/video/[video]/stats"
        as={`/video/${video.id}/stats`}
        key="stats"
      >
        <a>
          <Button icon={<BarChartOutlined />}>{t('video.edit.stats')}</Button>
        </a>
      </Link>
    ) : null,
    isAvailable('publish') ? (
      <Popconfirm
        key="publish"
        title={t('video.edit.publishConfirm')}
        onConfirm={publishVideo}
        okText={t('video.edit.confirmYes')}
        cancelText={t('video.edit.confirmNo')}
        disabled={unsavedChanges}
      >
        <Button
          type="primary"
          icon={<ArrowRightOutlined />}
          disabled={unsavedChanges}
        >
          {t('video.edit.publish')}
        </Button>
      </Popconfirm>
    ) : null,
    isAvailable('unpublish') && !formIsEditable ? (
      <Tooltip key="edit" title={t('video.edit.editTooltip')}>
        <Button icon={<EditOutlined />} onClick={() => setFormIsEditable(true)}>
          {t('video.edit.edit')}
        </Button>
      </Tooltip>
    ) : null,
    isAvailable('unpublish') ? (
      <Popconfirm
        key="unpublish"
        type="primary"
        title={t('video.edit.unpublishConfirm')}
        onConfirm={unpublishVideo}
        okText={t('video.edit.confirmYes')}
        cancelText={t('video.edit.confirmNo')}
      >
        <Button icon={<RollbackOutlined />}>{t('video.edit.unpublish')}</Button>
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
        {t('video.edit.save')}
      </Button>
    ) : null,
  ];

  const disabled = !isAvailable('editForm') || saving;

  const coverPopoverContent = () => (
    <div style={{ maxWidth: '500px' }}>
      {nl2br(t('video.edit.coverPopoverContent'))}
    </div>
  );

  return (
    <>
      <Head page="video/edit" />
      <NavBarTemplate>
        <>
          <PageHeader
            title={t('video.edit.pageTitle', {
              theItem:
                video.type === 'FILM'
                  ? t('video.theFilm')
                  : t('video.theEpisode'),
            })}
            extra={getActions()}
          />
          <div
            style={{
              margin: '0 9%',
            }}
          >
            <Form
              form={form}
              id="video-edit-form"
              onFinish={saveVideo}
              initialValues={{
                cover: { image: null },
                title: video.title,
                synopsis: video.synopsis,
                festivals: video.festivals,
                category: video.category,
                releaseYear:
                  video.releaseYear &&
                  moment(video.releaseYear.toString(), 'YYYY'),
                ttl: video.ttl || TTL_NO_LIMIT,
                donationsAvailable: video.donationsAvailable || false,
                credits: video.credits.items,
              }}
              hideRequiredMark
              layout="vertical"
            >
              <Layouts.Form.Row style={{ margin: 0 }}>
                <Layouts.Form.Column>
                  {isAvailable('upload') ? (
                    <VideoDropzone
                      videoId={videoId}
                      onStateChange={(value) => setIsUploading(value)}
                    />
                  ) : null}
                  {isAvailable('seeDuration') ? (
                    <Form.Item
                      label={t('video.edit.duration')}
                      onChange={() => setUnsavedChanges(true)}
                    >
                      {video.duration
                        ? formatDuration(video.duration)
                        : t('video.edit.durationNotAvailable')}
                    </Form.Item>
                  ) : null}
                  <Form.Item
                    name="cover"
                    label={
                      <span>
                        <Popover
                          title={t('video.edit.coverPopoverTitle')}
                          content={coverPopoverContent()}
                        >
                          <InfoCircleOutlined />
                        </Popover>
                        {` ${t('video.edit.cover')}`}
                      </span>
                    }
                  >
                    <ImageInput
                      s3Path={`videoNodes/${video.id}/${consts.videos.covers.filenames.CROPPED_600_800}`}
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
                  {video.parentNode && (
                    <Form.Item>
                      <span style={{ fontSize: '1.25em' }}>
                        <Trans i18nKey="video.edit.parentSeries">
                          Un épisode de la série
                          <LinkText
                            href="/series/[series]"
                            as={`/series/${video.parentNode.id}`}
                          >
                            {parentTitle}
                          </LinkText>
                        </Trans>
                      </span>
                      <br />
                      <br />
                      {previousEpisode && (
                        <Link
                          href="/video/[video]/edit"
                          as={`/video/${previousEpisode.id}/edit`}
                        >
                          <StyledLink>
                            <LeftOutlined />
                            &nbsp;{t('video.previousEpisode')}
                          </StyledLink>
                        </Link>
                      )}
                      {nextEpisode && previousEpisode && (
                        <span>&nbsp;|&nbsp;</span>
                      )}
                      {nextEpisode && (
                        <Link
                          href="/video/[video]/edit"
                          as={`/video/${nextEpisode.id}/edit`}
                        >
                          <StyledLink>
                            {t('video.nextEpisode')}&nbsp;
                            <RightOutlined />
                          </StyledLink>
                        </Link>
                      )}
                    </Form.Item>
                  )}
                  <Form.Item
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: t('video.edit.required'),
                      },
                    ]}
                    label={t('video.edit.title')}
                  >
                    <Input
                      placeholder={t('video.edit.titlePlaceholder', {
                        theItem:
                          video.type === 'FILM'
                            ? t('video.theFilm')
                            : t('video.theEpisode'),
                      })}
                      disabled={disabled}
                      onChange={() => setUnsavedChanges(true)}
                    />
                  </Form.Item>
                  <Form.Item name="synopsis" label={t('video.edit.synopsis')}>
                    <Input.TextArea
                      rows={6}
                      placeholder={t('video.edit.synopsisPlaceholder')}
                      disabled={disabled}
                      onChange={() => setUnsavedChanges(true)}
                    />
                  </Form.Item>
                  <Form.Item name="festivals" label={t('video.edit.festivals')}>
                    <Input.TextArea
                      rows={6}
                      placeholder={t('video.edit.festivalsPlaceholder')}
                      disabled={disabled}
                      onChange={() => setUnsavedChanges(true)}
                    />
                  </Form.Item>
                  <Form.Item name="category" label={t('video.edit.category')}>
                    <Select
                      placeholder={t('video.edit.categoryPlaceholder', {
                        theItem:
                          video.type === 'FILM'
                            ? t('video.theFilm')
                            : t('video.theEpisode'),
                      })}
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
                    label={t('video.edit.releaseYear')}
                    name="releaseYear"
                    rules={[
                      {
                        type: 'object',
                      },
                    ]}
                    onChange={() => setUnsavedChanges(true)}
                  >
                    <DatePicker
                      placeholder={t('video.edit.releaseYearPlaceholder')}
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
                    name="ttl"
                    label={
                      <span>
                        <Tooltip
                          title={t('video.edit.ttlTooltip', {
                            theItem:
                              video.type === 'FILM'
                                ? t('video.theFilm')
                                : t('video.theEpisode'),
                          })}
                        >
                          <InfoCircleOutlined />
                        </Tooltip>
                        {` ${t('video.edit.ttl')}`}
                      </span>
                    }
                    style={{ marginBottom: 48 }}
                  >
                    <Slider
                      min={consts.videos.ttl.MIN_DAYS}
                      max={TTL_NO_LIMIT}
                      tooltipVisible
                      tooltipPlacement="bottom"
                      tipFormatter={(value) =>
                        value !== TTL_NO_LIMIT
                          ? t('video.edit.ttlDuration', { count: value })
                          : t('video.edit.ttlNoLimit')
                      }
                      onChange={() => setUnsavedChanges(true)}
                      disabled={disabled}
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
                      defaultChecked={video.donationsAvailable}
                      onChange={() => setUnsavedChanges(true)}
                    />
                  </Form.Item>
                </Layouts.Form.Column>
                <Layouts.Form.Column>
                  <VideoStatus status={status} isUploading={isUploading} />
                  <Form.Item name="credits" label={t('video.edit.credits')}>
                    <CreditsInput
                      textColor={consts.style.colors.dark}
                      editable={!disabled}
                      onChange={() => setUnsavedChanges(true)}
                    />
                  </Form.Item>
                </Layouts.Form.Column>
              </Layouts.Form.Row>
            </Form>
            {status !== consts.videos.status.PUBLISHED ? (
              <div style={{ textAlign: 'center' }}>
                <ReadCharter>
                  <Trans i18nKey="video.edit.charter">
                    Avant de mettre en ligne votre film, assurez-vous qu&apos;il
                    respecte
                    <Button
                      onClick={() => setCharterVisible(true)}
                      style={{
                        color: consts.style.colors.strawberry,
                        padding: 0,
                      }}
                      type="link"
                    >
                      notre charte.
                    </Button>
                  </Trans>
                  <Modal
                    width="900px"
                    visible={charterVisible}
                    onCancel={() => setCharterVisible(false)}
                    footer={null}
                    title={
                      <span
                        style={{
                          textTransform: 'capitalize',
                          fontVariant: 'small-caps',
                          fontSize: '1.5em',
                        }}
                      >
                        {t('video.edit.modalCharterTitle')}
                      </span>
                    }
                  >
                    <Charter />
                  </Modal>
                </ReadCharter>
              </div>
            ) : null}
          </div>
        </>
      </NavBarTemplate>
    </>
  );
};

export default dynamic(() => Promise.resolve(VideoEditPage), {
  ssr: false,
});
