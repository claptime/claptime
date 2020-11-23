import React, { useEffect, useState } from 'react';
import { Storage } from 'aws-amplify';
import styled from 'styled-components';

import consts from 'claptime/consts';
import PropTypes from 'claptime/lib/prop-types';
import { rgbToRgba } from 'claptime/utils';

const Placeholder = ({ style }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      background: `repeating-linear-gradient(
        -45deg,
        ${rgbToRgba(consts.style.colors.placeholder, 0.7)},
        ${rgbToRgba(consts.style.colors.placeholder, 0.7)} 10px,
        transparent 10px,
        transparent 30px
      )`,
      ...style,
    }}
  />
);

Placeholder.propTypes = {
  style: PropTypes.object,
};

Placeholder.defaultProps = {
  style: {},
};

const StyledImage = styled.img`
  width: 100%;
  display: block;
  overflow: hidden;
  ${({ rounded }) => (rounded ? 'border-radius: 100%;' : '')}
  ${({ shadow, shadowWidth }) =>
    shadow
      ? `filter: drop-shadow(0 0 ${shadowWidth} ${rgbToRgba(
          consts.style.colors.primary,
          0.5,
        )})`
      : ''}
`;

const Image = ({ s3Key, url, rounded, shadow, shadowWidth }) => {
  const [hidden, setHidden] = useState(!!s3Key);
  const [s3Url, setS3Url] = useState(null);
  useEffect(() => {
    if (s3Key) {
      Storage.get(s3Key).then((res) => {
        setS3Url(res);
        setHidden(false);
      });
    }
  }, [s3Key]);

  if (hidden) {
    return <Placeholder />;
  }
  return (
    <StyledImage
      src={url || s3Url}
      rounded={rounded}
      shadow={shadow}
      shadowWidth={shadowWidth}
      onError={() => setHidden(true)}
    />
  );
};

Image.propTypes = {
  s3Key: PropTypes.string,
  url: PropTypes.string,
  rounded: PropTypes.bool,
  shadow: PropTypes.bool,
  shadowWidth: PropTypes.string,
};

Image.defaultProps = {
  s3Key: null,
  url: null,
  rounded: false,
  shadow: false,
  shadowWidth: '0.5em',
};

export default Image;
