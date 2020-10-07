import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Router from 'next/router';
import { gql } from '@apollo/client';
import { Button, Input, Modal, message } from 'antd';
import { CloudUploadOutlined, UploadOutlined } from '@ant-design/icons';

import consts from 'claptime/consts';
import PropTypes from 'claptime/lib/prop-types';
import { useUserState } from 'claptime/lib/user';
import { ButtonGroup } from 'claptime/components/atoms';
import { useApolloClient } from 'claptime/lib/apollo';
import {
  addVideoNode,
  importVideo,
  setVideoNodeMeta,
} from 'claptime/graphql/videonodes';
import { invalidateCache } from 'claptime/utils';

const FilmCreationActions = ({ optionalVideoParams, postCreationCallback }) => {
  const { t } = useTranslation();
  const apolloClient = useApolloClient();
  const [videoLink, setVideoLink] = useState(null);
  const [showImportModal, setShowImportModal] = useState(false);

  const {
    settings: { profileId },
  } = useUserState();

  const uploadAction = async () => {
    const id = await createItem(consts.videos.status.UPLOAD);
    await postCreationCallback({ id });
    Router.push(`/video/${id}/edit`);
  };

  const createItem = async () => {
    // Creating video item
    const {
      data: {
        addVideoNode: { id: videoNodeId },
      },
    } = await apolloClient.mutate({
      mutation: gql(addVideoNode),
      variables: {
        profileId,
        type: 'FILM',
      },
      update: invalidateCache(new RegExp(`Profile:${profileId}`)),
    });
    await apolloClient.mutate({
      mutation: gql(setVideoNodeMeta),
      variables: {
        videoNodeId,
        title: t('myProfilePage.videos.newVideoTitle'),
        donationsAvailable: true,
        ...optionalVideoParams,
      },
    });
    return videoNodeId;
  };

  const importAction = async () => {
    try {
      const id = await createItem(consts.videos.status.IMPORT);
      await apolloClient.mutate({
        mutation: gql(importVideo),
        variables: {
          videoNodeId: id,
          videoLink,
        },
      });
      Router.push(`/video/${id}/edit`);
    } catch (err) {
      console.error(err);
      message.error(t('myProfilePage.videos.actions.errorWhileImporting'));
    }
    setShowImportModal(false);
  };

  return (
    <>
      <Modal
        title={t('myProfilePage.videos.actions.import')}
        visible={showImportModal}
        okText={t('myProfilePage.videos.actions.importButton')}
        onOk={importAction}
        onCancel={() => setShowImportModal(false)}
      >
        <Input
          placeholder={t('myProfilePage.videos.actions.videoLink')}
          onChange={(e) => setVideoLink(e.target.value)}
        />
      </Modal>
      <ButtonGroup>
        <Button icon={<UploadOutlined />} onClick={uploadAction}>
          {t('myProfilePage.videos.actions.upload')}
        </Button>
        <Button
          icon={<CloudUploadOutlined />}
          onClick={() => setShowImportModal(true)}
        >
          {t('myProfilePage.videos.actions.import')}
        </Button>
      </ButtonGroup>
    </>
  );
};

FilmCreationActions.propTypes = {
  optionalVideoParams: PropTypes.object,
  postCreationCallback: PropTypes.func,
};

FilmCreationActions.defaultProps = {
  optionalVideoParams: null,
  postCreationCallback: () => {},
};

export default FilmCreationActions;
