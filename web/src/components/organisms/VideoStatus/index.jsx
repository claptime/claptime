import React from 'react';
import { Steps } from 'antd';
import {
  CloudUploadOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
  ExclamationCircleTwoTone,
  SettingOutlined,
  FormOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import consts from 'claptime/consts';
import PropTypes from 'claptime/lib/prop-types';

const config = {
  [consts.videos.status.IMPORT]: {
    index: 0,
    type: 'info',
  },
  [consts.videos.status.UPLOAD]: {
    index: 0,
    type: 'info',
  },
  [consts.videos.status.PROCESSING]: {
    index: 1,
    type: 'info',
  },
  [consts.videos.status.PROCESSING_FAILED]: {
    index: 1,
    type: 'error',
  },
  [consts.videos.status.DRAFT]: {
    index: 2,
    type: 'info',
  },
  [consts.videos.status.PUBLISHED]: {
    index: 3,
    type: 'success',
  },
};

// eslint-disable-next-line react/prop-types
const getStep = ({ title, description, icon }) => {
  return <Steps.Step title={title} description={description} icon={icon} />;
};

const isPassed = (current, other) => {
  return config[current].index > config[other].index;
};

const StyledSteps = styled(Steps)`
  /* Will be used when making it horizontal
  .ant-steps-item-content {
    width: 100%;
  }

  .ant-steps-item-description {
    max-width: 80% !important;
  }
  margin: 24px 0 !important;
  */
`;

const VideoStatus = ({ status, isUploading }) => {
  const { t } = useTranslation();

  const step1 = () => {
    if (status === consts.videos.status.IMPORT) {
      return getStep({
        title: t(`video.status.${consts.videos.status.IMPORT}.stepName`),
        icon: <LoadingOutlined />,
        description: t(
          `video.status.${consts.videos.status.IMPORT}.description`,
        ),
      });
    }
    if (status === consts.videos.status.UPLOAD) {
      if (isUploading) {
        return getStep({
          title: t(`video.status.${consts.videos.status.UPLOAD}.title`),
          icon: <LoadingOutlined />,
          description: t(
            `video.status.${consts.videos.status.UPLOAD}.description`,
          ),
        });
      }
      return getStep({
        title: t(`video.status.${consts.videos.status.UPLOAD}.stepName`),
        icon: <CloudUploadOutlined />,
        description: t(
          `video.status.${consts.videos.status.UPLOAD}.descriptionNotUploading`,
        ),
      });
    }
    return getStep({
      title: t(`video.status.${consts.videos.status.UPLOAD}.stepName`),
      icon: <CheckCircleOutlined />,
    });
  };

  const step2 = () => {
    if (status === consts.videos.status.PROCESSING_FAILED) {
      return getStep({
        title: t(
          `video.status.${consts.videos.status.PROCESSING_FAILED}.title`,
        ),
        icon: <ExclamationCircleTwoTone twoToneColor="red" />,
        description: t(
          `video.status.${consts.videos.status.PROCESSING_FAILED}.description`,
        ),
      });
    }
    if (status === consts.videos.status.PROCESSING) {
      return getStep({
        title: t(`video.status.${consts.videos.status.PROCESSING}.title`),
        icon: <LoadingOutlined />,
        description: t(
          `video.status.${consts.videos.status.PROCESSING}.description`,
        ),
      });
    }
    if (isPassed(status, consts.videos.status.PROCESSING)) {
      return getStep({
        title: t(`video.status.${consts.videos.status.PROCESSING}.stepName`),
        icon: <CheckCircleOutlined />,
      });
    }
    return getStep({
      title: t(`video.status.${consts.videos.status.PROCESSING}.stepName`),
      icon: <SettingOutlined />,
    });
  };

  const step3 = () => {
    if (status === consts.videos.status.DRAFT) {
      return getStep({
        title: t(`video.status.${consts.videos.status.DRAFT}.title`),
        icon: <FormOutlined />,
        description: t(
          `video.status.${consts.videos.status.DRAFT}.description`,
        ),
      });
    }
    if (isPassed(status, consts.videos.status.DRAFT)) {
      return getStep({
        title: t(`video.status.${consts.videos.status.DRAFT}.stepName`),
        icon: <CheckCircleOutlined />,
      });
    }
    return getStep({
      title: t(`video.status.${consts.videos.status.DRAFT}.stepName`),
      icon: <FormOutlined />,
    });
  };

  const step4 = () => {
    if (status === consts.videos.status.PUBLISHED) {
      return getStep({
        title: t(`video.status.${consts.videos.status.PUBLISHED}.title`),
        icon: <CheckCircleOutlined />,
        description: t(
          `video.status.${consts.videos.status.PUBLISHED}.description`,
        ),
      });
    }
    return getStep({
      title: t(`video.status.${consts.videos.status.PUBLISHED}.stepName`),
      icon: <ShareAltOutlined />,
    });
  };

  return (
    <StyledSteps current={config[status].index} direction="vertical">
      {step1()}
      {step2()}
      {step3()}
      {step4()}
    </StyledSteps>
  );
};

VideoStatus.propTypes = {
  isUploading: PropTypes.bool,
  status: PropTypes.string.isRequired,
};

VideoStatus.defaultProps = {
  isUploading: false,
};

export default VideoStatus;
