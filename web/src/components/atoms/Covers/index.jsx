import React from 'react';
import styled from 'styled-components';

import consts from 'claptime/consts';
import PropTypes from 'claptime/lib/prop-types';
import { rgbToRgba } from 'claptime/utils';
import Image from '../Image';

const StyledContainer = styled.div`
  ${(props) =>
    props.clickable &&
    `
    border-radius: 100%;

    transition: transform 0.3s, filter 0.3s ease-in-out;
    transform-origin: center center;

    &:hover {
      transform: scale(1.05);
      cursor: pointer;
    }`}
`;

const CategoryCover = ({ category, text, clickable }) => (
  <StyledContainer
    clickable={clickable}
    style={{
      borderRadius: '20px',
      backgroundImage: `url(/assets/categories/${category}.svg)`,
      backgroundSize: 'cover',
      filter: `drop-shadow(0 0 0.5em ${rgbToRgba(
        consts.style.colors.primary,
        0.5,
      )})`,
    }}
    className="category-cover"
  >
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: '20%',
        color: consts.style.colors.primary,
        fontWeight: 'bold',
      }}
    >
      {text}
    </div>
  </StyledContainer>
);

CategoryCover.propTypes = {
  category: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  clickable: PropTypes.bool,
};

CategoryCover.defaultProps = {
  clickable: false,
};

const CollectionCover = ({ width, height, collectionId, shadow }) => (
  <StyledContainer style={{ width, height }} className="collection-cover">
    <Image
      s3Key={`collections/${collectionId}/${consts.collections.covers.filenames.CROPPED_1500_300}`}
      shadow={shadow}
      shadowWidth="0.25em"
    />
  </StyledContainer>
);

CollectionCover.propTypes = {
  width: PropTypes.any,
  height: PropTypes.any,
  collectionId: PropTypes.string.isRequired,
  shadow: PropTypes.bool,
};

CollectionCover.defaultProps = {
  width: undefined,
  height: undefined,
  shadow: true,
};

const NewsCover = ({ width, height, newsId }) => (
  <StyledContainer style={{ width, height }} className="news-cover">
    <Image
      s3Key={`news/${newsId}/${consts.news.covers.filenames.CROPPED_1500_500}`}
    />
  </StyledContainer>
);

NewsCover.propTypes = {
  width: PropTypes.any,
  height: PropTypes.any,
  newsId: PropTypes.string.isRequired,
};

NewsCover.defaultProps = {
  width: undefined,
  height: undefined,
};

const VideoCover = ({ width, height, videoId, shadow }) => (
  <div style={{ width, height, position: 'relative' }} className="video-cover">
    <Image
      s3Key={`videoNodes/${videoId}/${consts.videos.covers.filenames.CROPPED_600_800}`}
      shadow={shadow}
    />
  </div>
);

VideoCover.propTypes = {
  width: PropTypes.any,
  height: PropTypes.any,
  videoId: PropTypes.string.isRequired,
  shadow: PropTypes.bool,
};

VideoCover.defaultProps = {
  width: undefined,
  height: undefined,
  shadow: true,
};

const ProfileCover = ({
  width,
  height,
  profileId,
  style,
  clickable,
  shadow,
}) => (
  <StyledContainer
    clickable={clickable}
    style={{ width, height, ...style }}
    className="profile-cover"
  >
    <Image
      s3Key={`profiles/${profileId}/${consts.profiles.covers.filenames.CROPPED_512_512}`}
      rounded
      shadow={shadow}
    />
  </StyledContainer>
);

ProfileCover.propTypes = {
  width: PropTypes.any,
  height: PropTypes.any,
  profileId: PropTypes.string.isRequired,
  style: PropTypes.any,
  clickable: PropTypes.bool,
  shadow: PropTypes.bool,
};

ProfileCover.defaultProps = {
  width: undefined,
  height: undefined,
  style: {},
  clickable: false,
  shadow: true,
};

export default {
  Category: CategoryCover,
  Collection: CollectionCover,
  News: NewsCover,
  Video: VideoCover,
  Profile: ProfileCover,
};
