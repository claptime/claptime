import React from 'react';
import styled from 'styled-components';
import { CardElement } from '@stripe/react-stripe-js';
import style from 'claptime/consts/style';

const StyledCardElement = styled(CardElement)`
  height: 40px;
  padding: 10px 12px;
  width: 100%;
  color: #32325d;
  background-color: white;
  border: 1px solid transparent;
  border-radius: 4px;

  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;

  --focus {
    box-shadow: 0 1px 3px 0 #cfd7df;
  }

  --invalid {
    border-color: #fa755a;
  }

  --webkit-autofill {
    background-color: #fefde5 !important;
  }
`;

const CreditCardForm = () => {
  return (
    <StyledCardElement
      options={{
        style: {
          base: {
            color: style.colors.primary,
            fontSmoothing: 'antialiased',
            '::placeholder': {
              color: style.colors.placeholder,
            },
          },
          invalid: {
            color: style.colors.invalid,
            iconColor: style.colors.invalid,
          },
        },
      }}
    />
  );
};

export default CreditCardForm;
