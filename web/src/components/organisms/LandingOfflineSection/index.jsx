import React, { useState } from 'react';
import styled from 'styled-components';

import consts from 'claptime/consts';

import Banner from './Banner';
import Details from './Details';

const { device } = consts;

const BackgroundContainer = styled.div`
  @media ${device.mobileS} {
    background: url(/assets/backgrounds/camera.svg);

    background-repeat: no-repeat;
    background-size: 100%;
    section {
      padding-top: 60%;
    }
  }
  @media ${device.tablet} {
    background-size: 82%;
    section {
      padding-top: 50%;
    }
  }
  @media ${device.laptop} {
    background-position: center center;
    background-attachment: fixed;
    background-size: cover;
    background-position-x: 150px;
    section {
      padding-top: 5%;
    }
  }
  @media ${device.laptopL} {
    background-position-x: 450px;
  }
`;

const OfflineSection = () => {
  return (
    <>
      <BackgroundContainer>
        <Banner />
      </BackgroundContainer>
      <Details />
    </>
  );
};

export default OfflineSection;
