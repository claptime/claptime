import React, { useEffect } from 'react';
import Router from 'next/router';

import { Spin } from 'claptime/components/atoms';

const ProjectPage = () => {
  useEffect(() => {
    Router.replace('/about/project/manifest');
  }, []);
  return <Spin />;
};

export default ProjectPage;
