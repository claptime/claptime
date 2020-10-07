import React, { useState } from 'react';
import { InputNumber, Modal, Typography, notification, Tooltip } from 'antd';
import { gql } from '@apollo/client';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';

import consts from 'claptime/consts';
import { getProfile } from 'claptime/graphql/profiles';
import {
  createPaymentIntent,
  acceptsPayments,
} from 'claptime/graphql/payments';
import { useApolloClient, useQueryGet } from 'claptime/lib/apollo';
import PropTypes from 'claptime/lib/prop-types';
import { useUserState } from 'claptime/lib/user';
import { IconButton, Icons } from 'claptime/components/atoms';

import CreditCardInput from './CreditCardInput';

/**
 * https://stripe.com/fr/pricing
 * total = clapValue + fee
 * total = clapValue + 0,25 + 0,029 total
 * 0,971 total = clapValue + 0,25
 * total = (1 / 0,971) clapValue + (0,25 / 0,971)
 * @param   {Number} clapValue
 * @returns {Number}
 */
const calculateTotalAmount = (clapValue) =>
  (1 / 0.971) * clapValue + 0.25 / 0.971;

const StyledFormRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${consts.style.padding.s}px;
`;

const DonationForm = ({
  profileId,
  video,
  containerId,
  onClick,
  donationsAvailable,
  theme,
  withLabel,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { t } = useTranslation();
  const user = useUserState();
  const [clapValue, setClapValue] = useState(user.settings.clapValue);
  const [showModal, setShowModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const apolloClient = useApolloClient();

  const getClapButton = (tooltipText, isActive = false) => {
    return (
      <Tooltip
        getPopupContainer={() =>
          containerId !== ''
            ? document.getElementById(containerId)
            : document.body
        }
        title={tooltipText}
      >
        {/* without this div, tooltip is not displayed : https://codesandbox.io/s/94y3wwyk4y */}
        <div>
          <IconButton
            inactive={isActive ? 0 : 1}
            component={() => <Icons.Clap theme={theme} />}
            text={withLabel ? t('video.makeDonation') : null}
            height="24px"
            width="24px"
            onClick={
              isActive
                ? () => {
                    onClick();
                    setShowModal(true);
                  }
                : () => {}
            }
          />
        </div>
      </Tooltip>
    );
  };

  const getProfileResult = useQueryGet(
    getProfile,
    {
      variables: {
        id: profileId,
      },
    },
    {
      resultPath: '$.getProfile',
      errorElement: getClapButton(t('video.stripeError')),
    },
  );
  const acceptsPaymentsResult = useQueryGet(
    acceptsPayments,
    {
      variables: {
        profileId,
      },
    },
    {
      resultPath: '$.acceptsPayments',
      errorElement: getClapButton(t('video.stripeError')),
    },
  );
  if (getProfileResult.response) return getProfileResult.response;
  if (acceptsPaymentsResult.response) return acceptsPaymentsResult.response;

  const { name } = getProfileResult.item;

  if (!JSON.parse(acceptsPaymentsResult.item.data)) {
    return getClapButton(
      t('clapModal.doesNotAcceptPayments', {
        name,
      }),
    );
  }

  let thisItemString = null;
  if (video.type === 'FILM') {
    if (video.videoNodeParentNodeId !== null) {
      thisItemString = t('video.thisEpisode');
    } else {
      thisItemString = t('video.thisFilm');
    }
  } else {
    thisItemString = t('series.thisSeries');
  }

  if (!donationsAvailable) {
    return getClapButton(
      t('video.donationsNotAvailable', {
        name,
        thisItem: thisItemString,
      }),
    );
  }

  const handleSubmit = async () => {
    setConfirmLoading(true);
    try {
      const {
        data: {
          createPaymentIntent: { data },
        },
      } = await apolloClient.mutate({
        mutation: gql(createPaymentIntent),
        variables: {
          profileId,
          videoNodeId: video.id,
          value: calculateTotalAmount(clapValue),
        },
      });
      const { clientSecret } = JSON.parse(data);

      // See our confirmCardPayment documentation for more:
      // https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-payment
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement('card'),
        },
      });
      if (error) {
        console.log(error);
        notification.error({
          message: t('clapModal.error'),
          description: error.message,
          getContainer: () =>
            containerId !== ''
              ? document.getElementById(containerId)
              : document.body,
        });
      } else {
        notification.info({
          message: t('clapModal.success'),
          description: t('clapModal.successDescription'),
          getContainer: () =>
            containerId !== ''
              ? document.getElementById(containerId)
              : document.body,
        });
        setShowModal(false);
      }
    } catch (e) {
      console.error(e);
      notification.error({
        message: t('clapModal.error'),
      });
    }
    setConfirmLoading(false);
  };

  return (
    <div>
      {getClapButton(t('video.clap', { name }), true)}
      <Modal
        getContainer={() =>
          containerId !== ''
            ? document.getElementById(containerId)
            : document.body
        }
        style={{ top: '12%' }}
        className="modal-stripe"
        title={t('clapModal.title', { name })}
        visible={showModal}
        destroyOnClose
        onOk={async () => {
          try {
            await handleSubmit();
          } catch (e) {
            console.error(e);
            notification.error({
              message: t('clapModal.error'),
            });
          }
          setConfirmLoading(false);
        }}
        okText={t('clapModal.confirm')}
        cancelText={t('clapModal.cancel')}
        confirmLoading={confirmLoading}
        onCancel={() => setShowModal(false)}
      >
        <StyledFormRow>
          <Typography.Text>
            {t('clapModal.clapAmountLabel', { min: consts.MIN_CLAP_VALUE })}
          </Typography.Text>
          <InputNumber
            value={clapValue}
            step={0.5}
            min={consts.MIN_CLAP_VALUE}
            formatter={(value) =>
              `${(Math.round(value * 100) / 100).toFixed(2)} €`
            }
            decimalSeparator=","
            parser={(value) => value.replace(/€\s?|(,*)/g, '')}
            onChange={setClapValue}
          />
        </StyledFormRow>
        <StyledFormRow>
          <Typography.Text>{t('clapModal.totalAmountLabel')}</Typography.Text>
          <InputNumber
            value={calculateTotalAmount(clapValue)}
            formatter={(value) =>
              `${(Math.round(value * 100) / 100).toFixed(2)} €`
            }
            decimalSeparator=","
            parser={(value) => value.replace(/€\s?|(,*)/g, '')}
            disabled
          />
        </StyledFormRow>
        <StyledFormRow>
          <CreditCardInput />
        </StyledFormRow>
      </Modal>
    </div>
  );
};

DonationForm.propTypes = {
  profileId: PropTypes.string.isRequired,
  video: PropTypes.claptime.videoNode,
  containerId: PropTypes.string,
  onClick: PropTypes.func,
  donationsAvailable: PropTypes.bool.isRequired,
  theme: PropTypes.oneOf(['dark', 'light']),
  withLabel: PropTypes.bool,
};

DonationForm.defaultProps = {
  video: null,
  containerId: '',
  onClick: () => {},
  theme: 'dark',
  withLabel: false,
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

const WithStripe = ({ ...props }) => {
  return (
    <Elements stripe={stripePromise}>
      <DonationForm {...props} />
    </Elements>
  );
};

export default WithStripe;
