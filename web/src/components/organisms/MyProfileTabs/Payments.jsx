import React from 'react';
import { useRouter } from 'next/router';

import { Layouts } from 'claptime/components/molecules';
import StripeConnection from 'claptime/components/organisms/StripeConnection';

const Payments = () => {
  const { query } = useRouter();

  return (
    <Layouts.Form.Row>
      <Layouts.Form.Column>
        <StripeConnection queryString={query} />
      </Layouts.Form.Column>
    </Layouts.Form.Row>
  );
};

export default Payments;
