import React from 'react';
import Icon from '@ant-design/icons';
import { Typography } from 'antd';
import styled from 'styled-components';
import PropTypes from 'claptime/lib/prop-types';
import consts from 'claptime/consts';

const { Text } = Typography;

const {
  style: {
    colors: { strawberry, unavailable },
  },
} = consts;

const StyledSpan = styled.span`
  ${(props) =>
    props.inactive
      ? `path {
        fill: ${unavailable};
      }`
      : `
      &:hover {
        .ant-typography {
          color: ${strawberry};
        }
        path {
          fill: ${strawberry};
        }
      }
   `}

  ${(props) =>
    props.inactive &&
    `
     path {
       fill: ${unavailable};
     }
   `}
`;

const getStyledIcon = (IconComponent) => styled(IconComponent)`
  svg {
    ${(props) => props.height && `height: ${props.height};`}
    ${(props) => props.width && `width: ${props.width};`}
  }

  ${(props) =>
    props.color &&
    `
    path {
      fill: ${props.color};
    }
 `}

  path {
    transition: fill 0.3s ease-in-out;
  }
`;

const StyledText = styled(Text)`
  cursor: pointer;
  transition: color 0.3s ease-in-out;
`;

const IconButton = ({
  AntIcon,
  component,
  onClick,
  width,
  height,
  inactive,
  color,
  text,
}) => {
  const StyledIcon = getStyledIcon(AntIcon || Icon);
  return (
    <StyledSpan inactive={inactive}>
      <StyledIcon
        width={width}
        height={height}
        component={component}
        onClick={onClick}
        color={color}
      />
      {text && <StyledText onClick={onClick}>{text}</StyledText>}
    </StyledSpan>
  );
};

IconButton.propTypes = {
  AntIcon: PropTypes.elementType,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  onClick: PropTypes.func,
  inactive: PropTypes.oneOf([0, 1]),
  color: PropTypes.string,
  text: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

IconButton.defaultProps = {
  AntIcon: null,
  component: null,
  onClick: null,
  inactive: 0,
  color: null,
  text: null,
  width: null,
  height: null,
};

export default IconButton;
