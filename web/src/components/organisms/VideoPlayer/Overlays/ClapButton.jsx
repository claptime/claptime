import React from 'react';
import ClapAnimation from 'claptime/components/organisms/ClapAnimation';

const ClapButton = () => {
  return (
    <div
      className="overlay"
      style={{
        position: 'absolute',
        zIndex: 10000,
        left: 'calc(50% - 125px)',
        paddingTop: '1em',
        fontSize: 'xx-large',
      }}
    >
      <ClapAnimation />
    </div>
  );
};

export default ClapButton;
