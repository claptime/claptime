import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { CaretRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

import consts from 'claptime/consts';
import PropTypes from 'claptime/lib/prop-types';

const {
  style: {
    colors: { strawberry },
  },
} = consts;

const StyledButton = styled(Button)`
  border-radius: 6px;
  border-color: ${strawberry} !important;
  color: white !important;
  background-color: ${strawberry} !important;
  font-size: 1em;
  &:hover {
    border-color: ${strawberry} !important;
    color: ${strawberry} !important;
    background-color: white !important;
  }
`;

const PlayButton = ({ videoId }) => {
  const { t } = useTranslation();

  return (
    <Link href="/video/[video]/play" as={`/video/${videoId}/play`}>
      <a>
        <StyledButton icon={<CaretRightOutlined />}>
          {t('video.play')}
        </StyledButton>
      </a>
    </Link>
  );
};

PlayButton.propTypes = {
  videoId: PropTypes.string.isRequired,
};

export default PlayButton;
