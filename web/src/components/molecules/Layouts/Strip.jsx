import React from 'react';
import styled from 'styled-components';

import consts from 'claptime/consts';
import PropTypes from 'claptime/lib/prop-types';

const {
  device,
  style: { colors, navbar },
} = consts;

const StyledContainer = styled.div`
  padding: 5% 10%;
  background-color: ${({ backgroundColor }) =>
    backgroundColor || 'transparent'};
  color: ${colors.primary} !important;

  h1 {
    color: ${colors.primary} !important;
  }

  display: flex;
  flex-wrap: ${({ side }) => (side === 'right' ? 'wrap-reverse' : 'wrap')};
  align-items: center;
  min-height: ${({ isFirst }) =>
    isFirst ? `calc(100vh - ${navbar.height})` : '100vh'};

  ${({ backgroundImage }) =>
    backgroundImage
      ? `
  background: url(/assets/backgrounds/${backgroundImage}.svg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  `
      : ''}
`;

const StyledContent = styled.div`
  margin-left: ${({ side }) => (side === 'right' ? 'auto' : 'none')};
  margin-right: ${({ side }) => (side === 'left' ? 'auto' : 'none')};

  @media ${device.mobileS} {
    width: 100%;
  }

  @media ${device.tablet} {
    width: ${({ sideContent }) => (sideContent ? 60 : 100)}%;
  }
`;

const StyledSideContent = styled.div`
  @media ${consts.device.tablet} {
    width: 30%;
  }
`;

const Strip = ({ children, side, sideContent, isFirst, background }) => {
  let backgroundColor;
  let backgroundImage;
  switch (background) {
    case 'white':
      backgroundColor = colors.white;
      break;
    case 'color-1':
      backgroundColor = colors.illustrationsFilmmakers;
      break;
    case 'color-2':
      backgroundColor = colors.illustrationsSpectators;
      break;
    case 'shapes-landing':
    case 'shapes-profile':
    case 'shapes-video':
      backgroundImage = background;
      break;
    default:
      break;
  }
  return (
    <StyledContainer
      isFirst={isFirst}
      backgroundColor={backgroundColor}
      backgroundImage={backgroundImage}
      side={side}
    >
      {sideContent && side === 'right' ? (
        <StyledSideContent>{sideContent}</StyledSideContent>
      ) : null}
      <StyledContent side={side} sideContent={sideContent}>
        {children}
      </StyledContent>
      {sideContent && side === 'left' ? (
        <StyledSideContent>{sideContent}</StyledSideContent>
      ) : null}
    </StyledContainer>
  );
};

Strip.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  side: PropTypes.string,
  sideContent: PropTypes.node,
  isFirst: PropTypes.bool,
  background: PropTypes.oneOf([
    'white',
    'color-1',
    'color-2',
    'shapes-landing',
    'shapes-profile',
    'shapes-video',
  ]),
};

Strip.defaultProps = {
  children: null,
  side: 'left',
  sideContent: null,
  isFirst: false,
  background: 'white',
};

export default Strip;
