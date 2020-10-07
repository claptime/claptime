import React, { useEffect } from 'react';
import Router from 'next/router';

import { Spin } from 'claptime/components/atoms';

const MyAccount = () => {
  useEffect(() => {
    Router.replace('/my-account/information');
  }, []);
  return <Spin />;
};

export default MyAccount;
