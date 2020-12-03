import React from 'react';
import styled from 'styled-components';
import consts from 'claptime/consts';
import PropTypes from 'claptime/lib/prop-types';
import { text2span } from 'claptime/utils/i18n';

const { device } = consts;

const StyledTitle = styled.h1`
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;

  font-variant: small-caps;
  text-align: ${({ centered }) => (centered ? 'center' : 'left')};
  color: ${({ faded }) =>
    faded ? 'rgba(0, 0, 0, 0.50)' : 'rgba(0, 0, 0, 0.85)'};
  &:hover {
    color: rgba(0, 0, 0, 0.85);
  }

  span {
    position: relative;
    z-index: 1;
    &:before {
      background-color: ${({ faded, lineColor }) =>
        faded ? consts.style.colors.lightgrey : lineColor};
      content: '';
      height: 60%;
      position: absolute;
      left: 0;
      margin-left: 0.2em;
      top: 35%;
      width: 100%;
      z-index: -1;
    }
  }
  span:hover {
    &:before {
      background-color: ${({ lineColor }) => lineColor};
    }
  }
  @media ${device.mobileS} {
    font-size: ${({ faded }) => (faded ? '1.5em' : '2em')};
  }

  @media ${device.tablet} {
    font-size: 3em;
    font-size: ${({ faded }) => (faded ? '2em' : '3em')};
  }

  @media ${device.laptop} {
    font-size: ${({ faded }) => (faded ? '2.5em' : '3.5em')};
  }
`;

const StyledLine = styled.div`
  border: solid 2px ${(props) => props.lineColor};
  margin: ${({ centered }) => (centered ? 'auto' : 'inherit')};

  @media ${device.mobileS} {
    margin: ${({ centered }) => (centered ? 'auto' : '10% 0%')};
    width: 80%;
  }

  @media ${device.tablet} {
    margin: ${({ centered }) => (centered ? 'auto' : '3% 0')};
    width: 30%;
  }
`;

const Title = ({ children, centered, underlined, lineColor, faded }) => (
  <div className="claptime-title">
    <StyledTitle lineColor={lineColor} faded={faded} centered={centered}>
      {text2span(children)}
    </StyledTitle>
    {underlined ? (
      <StyledLine lineColor={lineColor} centered={centered} />
    ) : null}
  </div>
);

Title.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  centered: PropTypes.bool,
  underlined: PropTypes.bool,
  lineColor: PropTypes.string,
  faded: PropTypes.bool,
};

Title.defaultProps = {
  children: null,
  centered: false,
  underlined: true,
  lineColor: consts.style.colors.lightgrey,
  faded: false,
};

export default Title;
