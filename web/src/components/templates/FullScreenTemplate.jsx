import React, { useEffect } from 'react';

import { Spin } from 'claptime/components/atoms';
import PropTypes from 'claptime/lib/prop-types';
import { setChatVisibility } from 'claptime/lib/chat';
import { useUserState } from 'claptime/lib/user';

const FullScreenTemplate = ({ children }) => {
  const user = useUserState();

  useEffect(() => {
    setChatVisibility(false);
    return () => setChatVisibility(true);
  }, []);

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
