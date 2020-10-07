import React from 'react';
import Link from 'next/link';
import { Popover } from 'antd';
import styled from 'styled-components';

import { Covers, TextExpand } from 'claptime/components/atoms';
import consts from 'claptime/consts';
import PropTypes from 'claptime/lib/prop-types';
import Links from '../Links';

const {
  style: {
    colors: { strawberry, strawberryHover },
  },
} = consts;

const Name = styled.span`
  color: ${strawberry};
  &:hover {
    color: ${strawberryHover};
  }
`;

const ProfileLink = ({ profile, showAvatar, showLinks, popoverPlacement }) => (
  <Popover
    placement={popoverPlacement}
    content={
      <div style={{ display: 'flex', maxWidth: 350 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            margin: 16,
          }}
        >
          {showAvatar ? (
            <Covers.Profile
              profileId={profile.id}
              width={64}
              height={64}
              shadow={false}
            />
          ) : null}
          {showLinks ? (
            <Links.Buttons links={profile.links || []} centered />
          ) : null}
        </div>
        <div style={{ margin: 8 }}>
          <TextExpand
            text={profile.biography}
            excerptLength={150}
            expandable={false}
          />
        </div>
      </div>
    }
  >
    {/* Popover doesn't show without span wrapping */}
    <span>
      <Link href="/profile/[profile]" as={`/profile/${profile.id}`}>
        <a>
          <Name>{profile.name}</Name>
        </a>
      </Link>
    </span>
  </Popover>
);

ProfileLink.propTypes = {
  profile: PropTypes.claptime.profile.isRequired,
  showAvatar: PropTypes.bool,
  showLinks: PropTypes.bool,
  popoverPlacement: PropTypes.string,
};

ProfileLink.defaultProps = {
  showAvatar: true,
  showLinks: true,
  popoverPlacement: undefined,
};

export default ProfileLink;
