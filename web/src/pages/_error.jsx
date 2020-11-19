import React from 'react';

import { Errors, Layouts } from 'claptime/components/molecules';
import NavBarTemplate from 'claptime/components/templates/NavBarTemplate';

const Error500 = () => {
  return (
    <NavBarTemplate>
      <Layouts.Strip isFirst>
        <Errors.Error500 />
      </Layouts.Strip>
    </NavBarTemplate>
  );
};

export default Error500;
