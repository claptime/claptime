import React from 'react';
import styled from 'styled-components';
import consts from 'claptime/consts';
import PropTypes from 'claptime/lib/prop-types';

const { device, style } = consts;

const StyledSubtitle = styled.div`
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  font-family: ${style.fonts.stylized};
  margin-top: 3%;

  @media ${device.mobileS} {
    font-size: 1.5em;
  }

  @media ${device.tablet} {
    font-size: 2em;
  }

  @media ${device.laptop} {
    font-size: 2.5em;
  }
`;

const Subtitle = ({ children, ...props }) => (
  <StyledSubtitle {...props}>{children}</StyledSubtitle>
);

Subtitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Subtitle.defaultProps = {
  children: null,
};

export default Subtitle;
