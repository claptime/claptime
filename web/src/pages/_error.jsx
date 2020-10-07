import React, { useEffect } from 'react';
import Router from 'next/router';

import { Spin } from 'claptime/components/atoms';

const Error = () => {
  useEffect(() => {
    Router.push('/');
  }, []);
  return <Spin />;
};

export default Error;
