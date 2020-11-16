import React from 'react';
import { Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import consts from 'consts';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import {
  Button,
  ButtonGroup,
  Covers,
  PlayButton,
  Title as StyledTitle,
} from 'claptime/components/atoms';

const { Title, Text } = Typography;

const {
  style: {
    colors: { lightgrey, grey },
  },
} = consts;

const Container = styled.div`
  padding: 3% 9%;
`;

const Infos = styled.div`
  display: flex;
  flex-direction: row;
`;

const StarringVideoNode = ({ starringVideoNode }) => {
  const { t } = useTranslation();

  const {
    label,
    description,
    videoNode: { id, title, synopsis, type },
  } = starringVideoNode;

  return (
    <Container>
      <StyledTitle lineColor={lightgrey}>{label}</StyledTitle>
      <Infos>
        <Covers.Video width={300} videoId={id} />
        <div style={{ marginLeft: '30px' }}>
          <Title>{title}</Title>
          <p style={{ margin: '5% 0' }}>{description}</p>
          {type === 'FILM' && (
            <ButtonGroup style={{ display: 'flex', flexDirection: 'row' }}>
              <PlayButton videoId={id} />
              <Link href="/video/[video]" as={`/video/${id}`}>
                <Button
                  text={t('starringVideoNode.infos')}
                  color={grey}
                  icon={<InfoCircleOutlined />}
                />
              </Link>
            </ButtonGroup>
          )}
        </div>
      </Infos>
    </Container>
  );
};

export default StarringVideoNode;
