import React from 'react';

import { Errors, Layouts } from 'claptime/components/molecules';
import NavBarTemplate from 'claptime/components/templates/NavBarTemplate';

const Error404 = () => {
  return (
    <NavBarTemplate>
      <Layouts.Strip isFirst>
        <Errors.Error404 />
      </Layouts.Strip>
    </NavBarTemplate>
  );
};

export default Error404;
