import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Card, Popover, Tooltip, message } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import consts from 'claptime/consts';
import PropTypes from 'claptime/lib/prop-types';
import ProfileLink from '../ProfileLink';
import CreditAddForm from './CreditAddForm';

const widths = {
  1: '100%',
  2: '50%',
  3: '33.3%',
}; // elements width according to the number of columns

const {
  device: { mobileS, laptop, laptopL },
  style: {
    colors: { strawberry },
  },
} = consts;

const StyledCard = styled(({ textColor, textHoverColor, ...props }) => (
  <Card {...props} />
))`
  border: 0 !important;
  background: none !important;
  width: ${(props) => props.width || '100%'};
  .ant-card-body {
    padding: 8px;
    margin-bottom: 8px;
  }
  .ant-card-body:hover i.delete {
    display: block !important;
  }

  .ant-card-meta-description {
    color: ${(props) => props.textColor.toString() || 'black'};
    font-size: 1.25em;
  }

  .ant-card-meta-title {
    color: ${(props) => props.textColor || 'black'};
  }

  .ant-card-meta {
    display: flex;
  }

  .ant-card-meta-detail > div:not(:last-child) {
    margin-bottom: 0;
  }

  a {
    color: ${(props) => props.textColor};
    &:hover {
      color: ${(props) => props.textHoverColor};
    }
  }
  @media ${mobileS} {
    .ant-card-meta {
      flex-direction: column;
    }
    .ant-card-meta-title {
      font-size: 0.875em;
    }
    .ant-card-meta-description {
      font-size: 0.75em;
    }
  }
  @media ${laptop} {
    .ant-card-meta {
      flex-direction: row;
    }
    .ant-card-meta-title {
      font-size: 1.125em;
    }
    .ant-card-meta-description {
      font-size: 1em;
    }
  }
  @media ${laptopL} {
    .ant-card-meta-title {
      font-size: 1.375em;
    }
    .ant-card-meta-description {
      font-size: 1.25em;
    }
  }
`;

const sortCredits = (a, b) => {
  if (a.profile && !b.profile) {
    return -1;
  }
  if (b.profile && !a.profile) {
    return 1;
  }
  return 0;
};

const reduceCredits = (acc, credit) => {
  let found;
  if (credit.profile) {
    found = acc.find((element) => element.profile.id === credit.profile.id);
  } else if (credit.customProfile) {
    found = acc.find(
      (element) => element.customProfile === credit.customProfile,
    );
  }
  if (found) {
    found.roles.push(credit.role);
  } else {
    const copy = { ...credit };
    delete copy.role;
    copy.roles = [credit.role];
    acc.push(copy);
  }
  return acc;
};

const CreditsInput = ({
  editable,
  direction,
  textColor,
  textHoverColor,
  columns,
  onChange,
  value: valueFromProps,
}) => {
  const [showAddCreditPopover, setShowAddCreditPopover] = useState(false);
  const [value, setValue] = useState(valueFromProps || []);
  const { t } = useTranslation();

  useEffect(() => setValue(valueFromProps), [valueFromProps]);

  let key = 0;

  const addCredit = (credits) => {
    if (onChange) {
      for (const credit of credits) {
        if (
          value.find(
            ({ role, customProfile, profile }) =>
              credit.role === role &&
              credit.customProfile === customProfile &&
              credit.creditProfileId === profile.id,
          )
        ) {
          message.error(t('video.edit.creditAddFailed'));
          return;
        }
      }
      onChange([...value, ...credits]);
      setShowAddCreditPopover(false);
    }
  };

  const deleteCredit = (credit) => {
    if (onChange) {
      if (credit.customProfile) {
        onChange(
          value.filter((cur) => cur.customProfile !== credit.customProfile),
        );
      } else if (credit.profile) {
        onChange(
          value.filter((cur) => {
            if (cur.profile) return !cur.profile.id.includes(credit.profile.id);
            return true;
          }),
        );
      }
    }
  };

  const getCredit = (credit) => {
    const name = credit.profile ? (
      <ProfileLink profile={credit.profile} />
    ) : (
      credit.customProfile
    );

    const deleteIcon = editable ? (
      <Tooltip title={t('video.edit.creditDelete')}>
        <CloseOutlined
          className="delete"
          style={{
            cursor: 'pointer',
            float: 'right',
            marginLeft: 12,
          }}
          onClick={() => deleteCredit(credit)}
        />
      </Tooltip>
    ) : null;

    return (
      <StyledCard
        width={`${widths[columns]}`}
        textColor={textColor}
        textHoverColor={textHoverColor}
        key={
          (credit.id && `credit-${credit.id}`) ||
          `credit-${credit.creditProfileId || credit.customProfile}-${
            credit.role
          }`
        }
      >
        <Card.Meta
          title={
            <div>
              {name}
              {deleteIcon}
            </div>
          }
          description={credit.roles.map((role) => (
            <div key={`${role}-${key++}`}>{role}</div>
          ))}
        />
      </StyledCard>
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: `${direction}`,
        overflow: 'auto',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      {value.length
        ? [...value].sort(sortCredits).reduce(reduceCredits, []).map(getCredit)
        : null}
      {editable ? (
        <div style={{ padding: 8 }}>
          <Popover
            content={<CreditAddForm onCreditAdded={addCredit} />}
            trigger="click"
            title={t('video.edit.creditAddTitle')}
            visible={showAddCreditPopover}
            placement="leftTop"
            onVisibleChange={() =>
              setShowAddCreditPopover((previousValue) => !previousValue)
            }
          >
            <Tooltip title={t('video.edit.creditAddTitle')} placement="right">
              <Button shape="circle" icon={<PlusOutlined />} />
            </Tooltip>
          </Popover>
        </div>
      ) : null}
    </div>
  );
};

CreditsInput.propTypes = {
  direction: PropTypes.string,
  columns: PropTypes.number,
  editable: PropTypes.bool,
  onChange: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  value: PropTypes.arrayOf(PropTypes.claptime.credit),
  textColor: PropTypes.string,
  textHoverColor: PropTypes.string,
};

CreditsInput.defaultProps = {
  editable: false,
  columns: 1,
  direction: 'column',
  onChange: () => {},
  textColor: 'white',
  textHoverColor: strawberry,
};

export default CreditsInput;
