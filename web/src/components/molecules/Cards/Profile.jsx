import React from 'react';
import { Typography } from 'antd';
import Link from 'next/link';
import styled, { keyframes } from 'styled-components';

import { Covers } from 'claptime/components/atoms';
import consts from 'claptime/consts';
import PropTypes from 'claptime/lib/prop-types';

const {
  device: { mobileS, laptopL },
} = consts;

const profileCardAppears = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Container = styled.a`
  display: block;
  text-align: center;
  position: relative;
  margin: 25px;
  @media ${mobileS} {
    width: 200px;
  }
  @media ${laptopL} {
    width: 250px;
  }
  animation: ${profileCardAppears} 0.5s ease-in-out 0s 1;
`;

const ProfileCard = ({ profile }) => {
  return (
    <Link href="/profile/[profile]" as={`/profile/${profile.id}`}>
      <Container className="profile-card">
        <Covers.Profile clickable profileId={profile.id} shadow />
        <div
          style={{
            marginTop: consts.style.padding.m,
          }}
        >
          <Typography.Title level={3}>{profile.name}</Typography.Title>
        </div>
      </Container>
    </Link>
  );
};

ProfileCard.propTypes = {
  profile: PropTypes.any.isRequired,
};

export default ProfileCard;
