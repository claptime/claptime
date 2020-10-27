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

const isPassed = (current, other) => {
  return config[current].index > config[other].index;
};

const VideoStatus = ({ status, isUploading }) => {
  const { t } = useTranslation();
  let description;
  let step1;
  let step2;
  let step3;
  let step4;

  // Step 1
  if (status === consts.videos.status.IMPORT) {
    step1 = (
      <Steps.Step
        title={t(`video.status.${consts.videos.status.IMPORT}.stepName`)}
        icon={<LoadingOutlined />}
      />
    );
    description = t(`video.status.${consts.videos.status.IMPORT}.description`);
  } else if (status === consts.videos.status.UPLOAD) {
    if (isUploading) {
      step1 = (
        <Steps.Step
          title={t(`video.status.${consts.videos.status.UPLOAD}.title`)}
          icon={<LoadingOutlined />}
        />
      );
      description = t(
        `video.status.${consts.videos.status.UPLOAD}.description`,
      );
    } else {
      step1 = (
        <Steps.Step
          title={t(`video.status.${consts.videos.status.UPLOAD}.stepName`)}
          icon={<CloudUploadOutlined />}
        />
      );
      description = t(
        `video.status.${consts.videos.status.UPLOAD}.descriptionNotUploading`,
      );
    }
  } else {
    step1 = (
      <Steps.Step
        title={t(`video.status.${consts.videos.status.UPLOAD}.stepName`)}
        icon={<CheckCircleOutlined />}
      />
    );
  }

  // Step 2
  if (status === consts.videos.status.PROCESSING_FAILED) {
    step2 = (
      <Steps.Step
        title={t(
          `video.status.${consts.videos.status.PROCESSING_FAILED}.title`,
        )}
        icon={<ExclamationCircleTwoTone twoToneColor="red" />}
      />
    );
    description = t(
      `video.status.${consts.videos.status.PROCESSING_FAILED}.description`,
    );
  } else if (status === consts.videos.status.PROCESSING) {
    step2 = (
      <Steps.Step
        title={t(`video.status.${consts.videos.status.PROCESSING}.title`)}
        icon={<LoadingOutlined />}
      />
    );
    description = t(
      `video.status.${consts.videos.status.PROCESSING}.description`,
    );
  } else if (isPassed(status, consts.videos.status.PROCESSING)) {
    step2 = (
      <Steps.Step
        title={t(`video.status.${consts.videos.status.PROCESSING}.stepName`)}
        icon={<CheckCircleOutlined />}
      />
    );
  } else {
    step2 = (
      <Steps.Step
        title={t(`video.status.${consts.videos.status.PROCESSING}.stepName`)}
        icon={<SettingOutlined />}
      />
    );
  }

  // Step 3
  if (status === consts.videos.status.DRAFT) {
    step3 = (
      <Steps.Step
        title={t(`video.status.${consts.videos.status.DRAFT}.title`)}
        icon={<FormOutlined />}
      />
    );
    description = t(`video.status.${consts.videos.status.DRAFT}.description`);
  } else if (isPassed(status, consts.videos.status.DRAFT)) {
    step3 = (
      <Steps.Step
        title={t(`video.status.${consts.videos.status.DRAFT}.stepName`)}
        icon={<CheckCircleOutlined />}
      />
    );
  } else {
    step3 = (
      <Steps.Step
        title={t(`video.status.${consts.videos.status.DRAFT}.stepName`)}
        icon={<FormOutlined />}
      />
    );
  }

  if (status === consts.videos.status.PUBLISHED) {
    step4 = (
      <Steps.Step
        title={t(`video.status.${consts.videos.status.PUBLISHED}.title`)}
        icon={<CheckCircleOutlined />}
      />
    );
    description = t(
      `video.status.${consts.videos.status.PUBLISHED}.description`,
    );
  } else {
    step4 = (
      <Steps.Step
        title={t(`video.status.${consts.videos.status.PUBLISHED}.stepName`)}
        icon={<ShareAltOutlined />}
      />
    );
  }

  return (
    <div style={{ margin: '24px 0' }}>
      <Steps current={config[status].index} style={{ margin: '24px 0' }}>
        {step1}
        {step2}
        {step3}
        {step4}
      </Steps>
      <p style={{ textAlign: 'center', fontSize: 16 }}>{description}</p>
    </div>
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
