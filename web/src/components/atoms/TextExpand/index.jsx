import React, { useState } from 'react';
import Linkify from 'react-linkify';
import { Typography } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

import { useTranslation } from 'react-i18next';
import PropTypes from 'claptime/lib/prop-types';

const { Paragraph } = Typography;

const TextExpand = ({ excerptLength, text, expandable, ...props }) => {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();

  const toggle = () => setExpanded((p) => !p);

  if (!text) {
    return null;
  }

  return (
    <Paragraph {...props}>
      <Linkify properties={{ rel: 'noopener noreferrer', target: '_blank' }}>
        {expanded || text.length <= excerptLength
          ? text
          : `${text.substring(0, excerptLength)}… `}
      </Linkify>
      {expandable && text.length > excerptLength ? (
        <Paragraph style={{ cursor: 'pointer' }} onClick={toggle}>
          {expanded ? <CaretUpOutlined /> : <CaretDownOutlined />}
          {expanded ? t('seeLess') : t('seeMore')}
        </Paragraph>
      ) : null}
    </Paragraph>
  );
};

TextExpand.propTypes = {
  text: PropTypes.string,
  excerptLength: PropTypes.number,
  expandable: PropTypes.bool,
};

TextExpand.defaultProps = {
  text: '',
  excerptLength: 300,
  expandable: true,
};

export default TextExpand;
