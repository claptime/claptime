import React, { useState, useRef } from 'react';
import { Modal, message } from 'antd';
import { useTranslation } from 'react-i18next';

import PropTypes from 'claptime/lib/prop-types';

import { IconButton, Icons } from 'claptime/components/atoms';

const Share = ({ videoId, player }) => {
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();
  const textareaLinkRef = useRef(null);
  const textareaEmbedRef = useRef(null);

  const onClick = (textareaRef) => () => {
    textareaRef.current.select();
    document.execCommand('copy');
    message.info(t('player.share.copied'));
  };

  return (
    <div
      className="overlay"
      style={{
        color: 'white',
        textAlign: 'left',
        paddingTop: '1em',
        fontSize: 'xx-large',
        float: 'left',
        position: 'absolute',
        top: 0,
        right: '4%',
        zIndex: 10000,
      }}
    >
      <IconButton
        height="30px"
        width="auto"
        component={Icons.Share}
        onClick={() => {
          if (!player.isPlaying()) {
            const plugin = player.getPlugin('click_to_pause');
            if (plugin) {
              plugin.disable();
            }
          }
          setShowModal(true);
        }}
      />
      <Modal
        getContainer={() => document.getElementById('video-player-infos')}
        title={<span>{t('player.share.title')}</span>}
        style={{ top: '12%' }}
        className="modal-stripe"
        visible={showModal}
        destroyOnClose
        footer={null}
        onCancel={() => {
          const plugin = player.getPlugin('click_to_pause');
          if (plugin) {
            plugin.enable();
          }
          setShowModal(false);
        }}
      >
        <h3>{t('player.share.link')}</h3>
        <textarea
          ref={textareaLinkRef}
          readOnly
          rows={1}
          style={{ width: '100%' }}
          value={`${window.location.origin}/video/${videoId}`}
          onClick={onClick(textareaLinkRef)}
        />
        <br />
        <br />
        <h3>{t('player.share.embed')}</h3>
        <textarea
          ref={textareaEmbedRef}
          readOnly
          rows={3}
          style={{ width: '100%' }}
          value={`<iframe width="640" height="360" src="${window.location.origin}/video/${videoId}/embed" allowfullscreen></iframe>`}
          onClick={onClick(textareaEmbedRef)}
        />
      </Modal>
    </div>
  );
};

Share.propTypes = {
  player: PropTypes.object.isRequired,
  videoId: PropTypes.string.isRequired,
};

export default Share;
