import React from 'react';
import { useTranslation } from 'react-i18next';
import { LinkOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';

import { Icons, IconButton } from 'claptime/components/atoms';
import consts from 'claptime/consts';
import PropTypes from 'claptime/lib/prop-types';

const {
  style: {
    colors: { primary },
  },
} = consts;

const getIconButton = (type) => {
  let icon;
  let AntIcon;
  switch (type) {
    case 'FACEBOOK':
      icon = Icons.Facebook;
      break;
    case 'INSTAGRAM':
      icon = Icons.Instagram;
      break;
    case 'LABFILMS':
      icon = Icons.Labfilms;
      break;
    default:
      AntIcon = LinkOutlined;
  }
  return (
    <IconButton
      AntIcon={AntIcon}
      component={icon}
      color={primary}
      height="16px"
      width="16px"
    />
  );
};

const Edit = ({ onChange }) => {
  const { t } = useTranslation();

  return (
    <>
      <Form.Item
        name="facebook"
        rules={[
          {
            type: 'url',
            message: t('links.urlRequired'),
          },
        ]}
        label={t('links.FACEBOOK.label')}
      >
        <Input
          onChange={onChange}
          prefix={getIconButton('FACEBOOK')}
          placeholder={t('links.FACEBOOK.placeholder')}
        />
      </Form.Item>
      <Form.Item
        name="instagram"
        rules={[
          {
            type: 'url',
            message: t('links.urlRequired'),
          },
        ]}
        label={t('links.INSTAGRAM.label')}
      >
        <Input
          onChange={onChange}
          prefix={getIconButton('INSTAGRAM')}
          placeholder={t('links.INSTAGRAM.placeholder')}
        />
      </Form.Item>
      <Form.Item
        name="labfilms"
        rules={[
          {
            type: 'url',
            message: t('links.urlRequired'),
          },
        ]}
        label={t('links.LABFILMS.label')}
      >
        <Input
          onChange={onChange}
          prefix={getIconButton('LABFILMS')}
          placeholder={t('links.LABFILMS.placeholder')}
        />
      </Form.Item>
      <Form.Item
        name="website"
        rules={[
          {
            type: 'url',
            message: t('links.urlRequired'),
          },
        ]}
        label={t('links.WEBSITE.label')}
      >
        <Input
          onChange={onChange}
          prefix={getIconButton('WEBSITE')}
          placeholder={t('links.WEBSITE.placeholder')}
        />
      </Form.Item>
    </>
  );
};

Edit.propTypes = {
  onChange: PropTypes.func,
};

Edit.defaultProps = {
  onChange: () => {},
};

const Buttons = ({ links, centered }) => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: centered ? 'space-evenly' : undefined,
      }}
    >
      {links
        .filter((link) => link)
        .map((link) => (
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            key={link.type}
            style={{ margin: 8 }}
            title={t(`links.${link.type}.title`)}
          >
            {getIconButton(link.type)}
          </a>
        ))}
    </div>
  );
};

Buttons.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['FACEBOOK', 'INSTAGRAM', 'LABFILMS', 'WEBSITE'])
        .isRequired,
      url: PropTypes.string.isRequired,
    }),
  ),
  centered: PropTypes.bool,
};

Buttons.defaultProps = {
  links: [],
  centered: false,
};

export default {
  Buttons,
  Edit,
};
