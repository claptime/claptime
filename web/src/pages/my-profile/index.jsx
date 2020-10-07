import React, { useEffect } from 'react';
import Router from 'next/router';

import { Spin } from 'claptime/components/atoms';

const MyProfile = () => {
  useEffect(() => {
    Router.replace('/my-profile/information');
  }, []);
  return <Spin />;
};

export default MyProfile;
