import React from 'react';
import Link from 'next/link';
import { Alert } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { Button } from 'claptime/components/atoms';
import consts from 'claptime/consts';
import PropTypes from 'claptime/lib/prop-types';

const {
  style: {
    colors: { strawberryHover },
  },
} = consts;

const PlayButton = ({ videoNode }) => {
  const { t } = useTranslation();

  console.log(videoNode);
  if (!videoNode.watchable) {
    return (
      <Alert
        message={t('video.notWatchable', { title: videoNode.title })}
        type="warning"
      />
    );
  }

  return (
    <Link href="/video/[video]/play" as={`/video/${videoNode.id}/play`}>
      <a>
        <Button
          text={t('video.play')}
          color={strawberryHover}
          icon={<CaretRightOutlined />}
        />
      </a>
    </Link>
  );
};

PlayButton.propTypes = {
  videoNode: PropTypes.claptime.videoNode.isRequired,
};

export default PlayButton;
