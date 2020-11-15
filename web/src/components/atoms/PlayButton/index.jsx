import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
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

const PlayButton = ({ videoId }) => {
  const { t } = useTranslation();

  return (
    <Link href="/video/[video]/play" as={`/video/${videoId}/play`}>
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
  videoId: PropTypes.string.isRequired,
};

export default PlayButton;
