import React from 'react';

import { Spin } from 'claptime/components/atoms';
import PropTypes from 'claptime/lib/prop-types';
import { useUserState } from 'claptime/lib/user';

const FullScreenTemplate = ({ children }) => {
  const user = useUserState();

  if (!user.loaded) {
    return (
      <div
        style={{
          height: '100vh',
        }}
      >
        <Spin />
      </div>
    );
  }
  return children;
};

FullScreenTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default FullScreenTemplate;
