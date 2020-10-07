import React from 'react';
import PropTypes from 'claptime/lib/prop-types';

import DonationForm from 'claptime/components/organisms/DonationForm';

const Clap = ({ video, onClick, containerId, theme, withLabel }) => {
  return (
    <div
      style={{
        display: 'inline-block',
        color: 'white',
      }}
    >
      <DonationForm
        containerId={containerId}
        onClick={() => onClick()}
        profileId={video.profile.id}
        video={video}
        donationsAvailable={video.donationsAvailable || false}
        theme={theme}
        withLabel={withLabel}
      />
    </div>
  );
};

Clap.propTypes = {
  video: PropTypes.claptime.videoNode.isRequired,
  onClick: PropTypes.func,
  containerId: PropTypes.string,
  theme: PropTypes.string,
  withLabel: PropTypes.bool,
};

Clap.defaultProps = {
  onClick: () => {},
  containerId: undefined,
  theme: 'dark',
  withLabel: false,
};

export default Clap;
