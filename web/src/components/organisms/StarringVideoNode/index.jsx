import React from 'react';

import { InfoCircleOutlined, CaretRightOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import consts from 'consts';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import PropTypes from 'claptime/lib/prop-types';

import {
  Button,
  ButtonGroup,
  Covers,
  PlayButton,
  Title as StyledTitle,
} from 'claptime/components/atoms';

import { ProfileLink } from 'claptime/components/molecules';

const {
  style: {
    colors: { lightgrey, grey, strawberryHover },
    fonts: { stylized },
  },
  device: { mobileS, tablet },
} = consts;

const Container = styled.div`
  padding: 3% 9%;
  @media ${mobileS} {
    text-align: center;
    .video-cover {
      width: 250px;
    }
  }
  @media ${tablet} {
    text-align: left;
    .video-cover {
      width: 500px;
    }
  }
`;

const Infos = styled.div`
  display: flex;
  @media ${mobileS} {
    flex-direction: column;
    align-items: center;
    .svn-infos {
      width: 100%;
      margin: 20px 0;
    }
    .svn-title {
      font-family: ${stylized};
      font-size: 1.5em;
    }
  }
  @media ${tablet} {
    flex-direction: row;
    align-items: normal;
    .svn-infos {
      margin-left: 30px;
      .svn-title {
        font-size: 2em;
        margin-bottom: 0;
      }
      .svn-description {
        margin: 50px 0;
        font-size: 1.33em;
      }
    }
  }
`;

const StarringVideoNode = ({ starringVideoNode }) => {
  const { t } = useTranslation();
  const {
    label,
    description,
    videoNode: { id, title, type, profile },
  } = starringVideoNode;

  return (
    <Container>
      <StyledTitle lineColor={lightgrey}>{label}</StyledTitle>
      <Infos>
        <Covers.Video videoId={id} />
        <div className="svn-infos">
          <h3 className="svn-title">{title}</h3>
          <p>
            {t('video.addedBy')} <ProfileLink profile={profile} />
          </p>
          <p className="svn-description">{description}</p>
          {type === 'FILM' && (
            <ButtonGroup>
              <PlayButton videoId={id} />
              <Link href="/video/[video]" as={`/video/${id}`}>
                <a>
                  <Button
                    text={t('starringVideoNode.infos')}
                    color={grey}
                    icon={<InfoCircleOutlined />}
                  />
                </a>
              </Link>
            </ButtonGroup>
          )}
          {type === 'SERIES' && (
            <Link href="/series/[series]" as={`/series/${id}`}>
              <a>
                <Button
                  text={t('starringVideoNode.seriesButton')}
                  color={strawberryHover}
                  icon={<CaretRightOutlined />}
                />
              </a>
            </Link>
          )}
        </div>
      </Infos>
    </Container>
  );
};
StarringVideoNode.propTypes = {
  starringVideoNode: PropTypes.claptime.starringVideoNode.isRequired,
};

export default StarringVideoNode;
