import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import Router from 'next/router';
import { gql } from '@apollo/client';
import { Button, Input, Modal, message } from 'antd';
import { CloudUploadOutlined, UploadOutlined } from '@ant-design/icons';

import consts from 'claptime/consts';
import PropTypes from 'claptime/lib/prop-types';
import { useUserState } from 'claptime/lib/user';
import {
  ButtonGroup,
  IconButton,
  Icons,
  Link as StyledLink,
} from 'claptime/components/atoms';
import { useApolloClient } from 'claptime/lib/apollo';
import {
  addVideoNode,
  importVideo,
  importVideoLabfilms,
  setVideoNodeMeta,
} from 'claptime/graphql/videonodes';
import { invalidateCache } from 'claptime/utils';

const {
  style: {
    colors: { primary },
  },
} = consts;

const FilmCreationActions = ({ optionalVideoParams, postCreationCallback }) => {
  const { t } = useTranslation();
  const apolloClient = useApolloClient();
  const [videoLink, setVideoLink] = useState(null);
  const [labfilmsLink, setLabfilmsLink] = useState(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showImportLabfilmsModal, setShowImportLabfilmsModal] = useState(false);

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

  const importLabfilmsAction = async () => {
    try {
      const id = await createItem(consts.videos.status.IMPORT);
      await apolloClient.mutate({
        mutation: gql(importVideoLabfilms),
        variables: {
          videoNodeId: id,
          labfilmsLink,
        },
      });
      Router.push(`/video/${id}/edit`);
    } catch (err) {
      console.error(err);
      message.error(t('myProfilePage.videos.actions.errorWhileImporting'));
    }
    setShowImportLabfilmsModal(false);
  };

  return (
    <>
      <Modal
        title={t('myProfilePage.videos.actions.importLabfilms')}
        visible={showImportLabfilmsModal}
        okText={t('myProfilePage.videos.actions.importButton')}
        onOk={importLabfilmsAction}
        onCancel={() => setShowImportLabfilmsModal(false)}
      >
        <div>
          <Trans i18nKey="myProfilePage.videos.actions.importLabfilmsDescription">
            0
            <StyledLink
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.labfilms.org"
            >
              LabFilms
            </StyledLink>
            2
          </Trans>
          <br />
          <br />
          <Input
            placeholder={t('myProfilePage.videos.actions.labfilmsLink')}
            onChange={(e) => setLabfilmsLink(e.target.value)}
          />
        </div>
      </Modal>
      <Modal
        title={t('myProfilePage.videos.actions.import')}
        visible={showImportModal}
        okText={t('myProfilePage.videos.actions.importButton')}
        onOk={importAction}
        onCancel={() => setShowImportModal(false)}
      >
        <div>
          <p>{t('myProfilePage.videos.actions.importDescription')}</p>
          <Input
            placeholder={t('myProfilePage.videos.actions.videoLink')}
            onChange={(e) => setVideoLink(e.target.value)}
          />
        </div>
      </Modal>
      <ButtonGroup>
        <Button icon={<UploadOutlined />} onClick={uploadAction}>
          {t('myProfilePage.videos.actions.upload')}
        </Button>
        <Button
          icon={
            <span style={{ marginRight: 8 }}>
              <IconButton
                component={Icons.Labfilms}
                color={primary}
                height="16px"
                width="16px"
              />
            </span>
          }
          onClick={() => setShowImportLabfilmsModal(true)}
        >
          {t('myProfilePage.videos.actions.importLabfilms')}
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
