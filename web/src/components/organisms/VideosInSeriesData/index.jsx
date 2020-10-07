import React, { useState } from 'react';
import Link from 'next/link';
import { gql } from '@apollo/client';
import { Button, Modal, Tooltip, Tag, message, Popconfirm } from 'antd';
import {
  CloseOutlined,
  DragOutlined,
  EyeOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { useTranslation, Trans } from 'react-i18next';

import consts from 'claptime/consts';
import { useQueryGet, useMutation } from 'claptime/lib/apollo';
import { useUserState } from 'claptime/lib/user';
import DataTable from 'claptime/components/organisms/DataTable';
import { getProfile } from 'claptime/graphql/profiles';
import {
  addEpisodeToSeries,
  removeEpisodeFromSeries,
  moveEpisodeAfter,
} from 'claptime/graphql/videonodes';
import { sortEpisodesInSeries } from 'claptime/lib/videoNodes';
import PropTypes from 'claptime/lib/prop-types';
import { FilmCreationActions } from 'claptime/components/molecules';

const VideosInSeriesData = ({ series, onUpdate }) => {
  const { t } = useTranslation();
  const [tableDisabled, setTableDisabled] = useState(false);

  const { id: seriesId } = series;

  let {
    childNodes: { items: videosInSeries },
  } = series;
  videosInSeries = sortEpisodesInSeries(videosInSeries);

  const [videosInSeriesKeys, setVideosInSeriesKeys] = useState(
    videosInSeries.map((video) => video.id),
  );

  const [showVideoModal, setShowVideoModal] = useState(false);

  const [addEpisodeMutation] = useMutation(gql(addEpisodeToSeries), {
    update: onUpdate,
  });
  const [removeEpisodeMutation] = useMutation(gql(removeEpisodeFromSeries), {
    update: onUpdate,
  });
  const [moveEpisodeAfterMutation] = useMutation(gql(moveEpisodeAfter), {
    update: onUpdate,
  });

  const {
    settings: { profileId },
  } = useUserState();

  const { response, item } = useQueryGet(
    getProfile,
    {
      variables: { id: profileId },
      errorPolicy: 'all',
    },
    {
      resultPath: '$.getProfile',
      pathsToIterate: [
        {
          path: '$.getProfile.videoNodes',
          nextTokenVariableName: 'videoNodesNextToken',
        },
      ],
    },
  );
  if (response) return response;
  const userVideos = item.videoNodes.items.filter(
    ({ type }) => type === 'FILM',
  ); // in case some videos are undefined

  const userVideosNotInSeries = userVideos.filter(
    (video) => !video.videoNodeParentNodeId,
  );
  const columnsModal = [
    {
      key: 'id',
      render: () => <DragOutlined />,
    },
    {
      title: t('myProfilePage.videos.table.title'),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('myProfilePage.videos.table.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color;
        switch (status) {
          case consts.videos.status.PUBLISHED:
            color = 'green';
            break;
          case consts.videos.status.PROCESSING_FAILED:
          case consts.videos.status.UNAPPROVED:
            color = 'red';
            break;
          case consts.videos.status.IMPORT:
          case consts.videos.status.UPLOAD:
          case consts.videos.status.PROCESSING:
          case consts.videos.status.DRAFT:
          default:
            color = 'gold';
        }
        return (
          <Tooltip title={t(`video.status.${status}.description`)}>
            <Tag color={color} key={status}>
              {t(`video.status.${status}.title`)}
            </Tag>
          </Tooltip>
        );
      },
    },
  ];

  const columns = columnsModal.concat([
    {
      title: t('series.episodes.view'),
      key: 'id',
      dataIndex: 'id',
      render: (id) => (
        <Link href="/video/[video]" as={`/video/${id}`}>
          <a>
            <Button icon={<EyeOutlined />} />
          </a>
        </Link>
      ),
    },
    {
      title: t('series.episodes.edit'),
      key: 'id',
      dataIndex: 'id',
      render: (id) => (
        <Link href="/video/[video]/edit" as={`/video/${id}/edit`}>
          <a>
            <Button icon={<EditOutlined />} />
          </a>
        </Link>
      ),
    },
    {
      title: t('series.episodes.delete'),
      key: 'id',
      dataIndex: 'id',
      render: (id) => (
        <Popconfirm
          title={t('series.edit.deleteConfirm')}
          onConfirm={() => removeFromSeries(id)}
          okText={t('series.edit.confirmYes')}
          cancelText={t('series.edit.confirmNo')}
        >
          <Button>
            <CloseOutlined />
          </Button>
        </Popconfirm>
      ),
    },
  ]);
  const rowSelectionConfig = {
    videosInSeriesKeys,
    onChange: (selectedRowKeys) => setVideosInSeriesKeys(selectedRowKeys),
    getCheckboxProps: (record) => ({
      disabled: record.videoNodeParentNodeId !== null,
    }),
  };

  const removeFromSeries = async (id) => {
    setTableDisabled(true);
    // update removed item : videoNodeParentNodeId and nextItemId should be null
    await removeEpisodeMutation({
      variables: {
        videoNodeId: id,
      },
    });
    message.info(t('series.episodes.deleteSuccess'));
    setTableDisabled(false);
  };

  const addFilmToSeries = (addedVideo) => addItemsToSeries([addedVideo]);

  const addItemsToSeries = async (newItems) => {
    setTableDisabled(true);
    const addedVideos = [...newItems];
    // update previous list : lastItem.nextId (if lastItem exist) should point to newVideo

    for (const video of addedVideos) {
      await addEpisodeMutation({
        variables: {
          seriesVideoNodeId: seriesId,
          episodeVideoNodeId: video.id,
        },
      });
    }
    setTableDisabled(false);
  };

  const addSelectedItemsToSeries = () => {
    if (videosInSeriesKeys.length === 0) return;
    const addedVideos = userVideosNotInSeries.filter((video) =>
      videosInSeriesKeys.includes(video.id),
    );
    addItemsToSeries(addedVideos);
  };

  const changeEpisodesOrder = async (previousEpisodeId, movedEpisodeId) => {
    setTableDisabled(true);
    await moveEpisodeAfterMutation({
      variables: {
        episodeVideoNodeId: movedEpisodeId,
        previousEpisodeVideoNodeId: previousEpisodeId,
      },
    });
    setTableDisabled(false);
  };

  const atLeastOneEpisodeIsUnpublished = videosInSeries.some(
    (ep) => ep.status !== consts.videos.status.PUBLISHED,
  );

  return (
    <div style={{ margin: '0 15%' }}>
      <Button onClick={() => setShowVideoModal(true)}>
        {t('series.edit.addVideo')}
      </Button>
      {atLeastOneEpisodeIsUnpublished && (
        <div style={{ color: consts.style.colors.strawberry }}>
          <Trans i18nKey="series.edit.warningEpisodesNotPublished">
            <br />
            <strong title="warning">Attention !</strong> Au moins un épisode de
            la série n&apos;est pas publié.
            <br />
            Les utilisateurs pourront visionner les épisodes jusqu&apos;au
            premier non-publié (non-inclus). Les suivants ne seront pas
            disponibles.
          </Trans>
        </div>
      )}
      <Modal
        title={t('series.edit.addVideo')}
        visible={showVideoModal}
        okText={t('myProfilePage.series.actions.addEpisodes')}
        onOk={() => {
          addSelectedItemsToSeries();
          setShowVideoModal(false);
        }}
        onCancel={() => setShowVideoModal(false)}
      >
        <FilmCreationActions
          optionalVideoParams={{
            videoNodeParentNodeId: seriesId,
            category: series.category || null,
          }}
          postCreationCallback={addFilmToSeries}
        />
        <div style={{ color: consts.style.colors.strawberry }}>
          <Trans i18nKey="series.edit.modalWarning">
            <strong title="warning">Attention !</strong>Seuls les films que vous
            n&apos;avez pas encore ajoutés à une série apparaissent dans cette
            liste.
          </Trans>
        </div>
        <br />
        <DataTable
          columns={columnsModal}
          items={userVideosNotInSeries}
          getEditionLink={({ id }) => {}}
          rowSelection={rowSelectionConfig}
        />
      </Modal>

      {videosInSeries.length > 0 && (
        <DataTable
          columns={columns}
          items={videosInSeries}
          getEditionLink={() => {}}
          disabled={tableDisabled}
          dragNDrop
          onDragNDrop={changeEpisodesOrder}
        />
      )}
    </div>
  );
};

VideosInSeriesData.propTypes = {
  series: PropTypes.claptime.videoNode.isRequired,
  onUpdate: PropTypes.func,
};

VideosInSeriesData.defaultProps = {
  onUpdate: () => {},
};

export default VideosInSeriesData;
