import React from 'react';
import styled from 'styled-components';

import { IconButton, Icons } from 'claptime/components/atoms';
import PropTypes from 'claptime/lib/prop-types';
import consts from 'claptime/consts';

const {
  style: {
    colors: { primary },
    margin,
  },
} = consts;

const StyledIconsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: ${(props) => props.flexDirection};
  .anticon {
    font-size: 32px;
    margin: ${margin.s}px;
  }
`;

const SocialNetworkIcons = ({ flexDirection, color }) => {
  return (
    <StyledIconsContainer flexDirection={flexDirection} color={color}>
      <IconButton
        color={color}
        component={Icons.Instagram}
        onClick={() => {
          window.location.href = 'https://www.instagram.com/itsclaptime/';
        }}
      />
      <IconButton
        color={color}
        component={Icons.Facebook}
        onClick={() => {
          window.location.href = 'https://www.facebook.com/itsclaptime/';
        }}
      />
      <IconButton
        color={color}
        component={Icons.Mail}
        onClick={() => {
          window.location.href = 'mailto:contact.claptime@gmail.com';
        }}
      />
    </StyledIconsContainer>
  );
};

SocialNetworkIcons.propTypes = {
  flexDirection: PropTypes.string,
  color: PropTypes.string,
};

SocialNetworkIcons.defaultProps = {
  flexDirection: 'row',
  color: primary,
};

export default SocialNetworkIcons;
