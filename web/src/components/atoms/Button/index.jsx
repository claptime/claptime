import React from 'react';
import styled from 'styled-components';

import PropTypes from 'claptime/lib/prop-types';

const StyledButton = styled.button`
  all: unset;
  cursor: pointer;
  height: max-content;
  width: max-content;
  font-weight: bold;
  position: relative;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.color || 'white'};
  padding: 15px 25px;
  ${(props) => (props.centered ? 'margin: auto;' : '')}
  svg {
    height: 100%;
    top: 0;
    position: absolute;
    width: 100%;
  }

  rect {
    fill: none;
    stroke-width: 3;
    stroke-dasharray: 300, 0;
    transition: all 0.35s linear;
    stroke: ${(props) => props.color || 'white'};
  }

  &:hover rect {
    stroke-width: 8;
    stroke-dasharray: 50%, 300%;
    stroke-dashoffset: 135%;
    transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
  }
`;

const StyledText = styled.span`
  display: contents;

  svg {
    position: relative;
    width: auto;
    height: 35px;
    margin-right: 15px;
  }
`;

const Button = (props) => {
  const { color, text, icon, ...rest } = props;
  return (
    <StyledButton color={color} type="button" {...rest}>
      <svg>
        <rect x="0" y="0" fill="none" width="100%" height="100%" />
      </svg>
      <StyledText style={{ display: 'content' }}>
        {icon}
        &nbsp;
        {text}
      </StyledText>
    </StyledButton>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.node,
  color: PropTypes.string,
  centered: PropTypes.bool,
};

Button.defaultProps = {
  color: 'white',
  centered: false,
  icon: null,
};

export default Button;
