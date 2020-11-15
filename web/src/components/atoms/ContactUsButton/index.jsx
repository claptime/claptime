import React from 'react';
import { Button } from 'antd';
import { MessageOutlined } from '@ant-design/icons';

import { openChat } from 'claptime/lib/chat';
import PropTypes from 'claptime/lib/prop-types';

const ContactUsButton = ({ buttonText }) => {
  return (
    <Button icon={<MessageOutlined />} onClick={() => openChat(true)}>
      {buttonText}
    </Button>
  );
};

ContactUsButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
};

export default ContactUsButton;
