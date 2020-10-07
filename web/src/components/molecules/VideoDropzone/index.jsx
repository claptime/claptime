import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { List, Progress, Tooltip, Typography, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Storage } from 'aws-amplify';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Router from 'next/router';
import style from 'claptime/consts/style';
import PropTypes from 'claptime/lib/prop-types';

const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#2196f3';
  }
  return '#eeeeee';
};

const allowedExtensions = ['.mp4', '.mkv', '.flv', '.mov'];

const StyledDropzone = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const VideoDropzone = ({ videoId, onStateChange }) => {
  const [file, setFile] = useState({});
  const { t } = useTranslation();

  const handleUploadFileStarted = (name) => {
    setFile({
      name,
      progress: 0,
      status: 'active',
    });
    onStateChange(true);
  };

  const handleUploadFileProgressed = (progress) => {
    setFile((value) => ({
      ...value,
      progress: (progress.loaded / progress.total) * 100,
    }));
  };

  const handleUploadFileFailed = (reason) => {
    message.error(reason);
    setFile((value) => ({
      ...value,
      status: 'exception',
    }));
    onStateChange(false);
  };

  const handleUploadFileSucceeded = () => {
    message.info(
      t('video.edit.messages.uploadSucceeded', { filename: file.name }),
    );
    setFile((value) => ({
      ...value,
      status: 'success',
    }));
    onStateChange(false);
    Router.push(`/video/${videoId}/edit`);
  };

  const uploadFile = async (f) => {
    const nameParts = f.name.split('.');
    const name = nameParts.slice(0, nameParts.length - 1).join('.');
    const extension = nameParts[nameParts.length - 1];
    handleUploadFileStarted(name);
    try {
      await Storage.put(`uploads/${videoId}.${extension}`, f, {
        level: 'private',
        contentType: f.type,
        progressCallback: (progress) => handleUploadFileProgressed(progress),
      });
      handleUploadFileSucceeded();
    } catch (err) {
      handleUploadFileFailed(t('video.edit.messages.errorReadingFile'));
      console.error(err);
    }
  };

  const onDrop = (acceptedFiles) => {
    if (!acceptedFiles.length) {
      message.error(
        t('video.edit.messages.authorizedExtensions', {
          extensions: allowedExtensions.join(', '),
        }),
      );
      return;
    }
    acceptedFiles.forEach(uploadFile);
  };

  if (file.status === 'active') {
    return (
      <List
        bordered
        dataSource={[file]}
        renderItem={({ name, progress, status }) => (
          <List.Item>
            <Typography.Text>{name}</Typography.Text>
            <Progress percent={Math.floor(progress)} status={status} />
          </List.Item>
        )}
      />
    );
  }
  return (
    <Dropzone accept={allowedExtensions} onDrop={onDrop} multiple={false}>
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
      }) => (
        <Tooltip placement="rightTop" title={t('video.edit.dropVideoHere')}>
          <StyledDropzone
            {...getRootProps({
              isDragActive,
              isDragAccept,
              isDragReject,
            })}
            style={{
              textAlign: 'center',
              cursor: 'pointer',
              padding: style.padding.l,
            }}
          >
            <input {...getInputProps()} />
            <Typography.Text
              style={{
                fontSize: '2em',
              }}
            >
              {t('video.edit.uploadVideo')}
            </Typography.Text>
            <UploadOutlined style={{ fontSize: 48 }} />
          </StyledDropzone>
        </Tooltip>
      )}
    </Dropzone>
  );
};

VideoDropzone.propTypes = {
  videoId: PropTypes.string.isRequired,
  onStateChange: PropTypes.func.isRequired,
};

export default VideoDropzone;
