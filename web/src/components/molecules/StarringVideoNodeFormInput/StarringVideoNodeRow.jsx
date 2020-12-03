import React from 'react';

import { List, Tooltip, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import PropTypes from 'claptime/lib/prop-types';

const StarringVideoNodeRow = ({
  editable,
  starringVideoNode,
  index,
  onDelete,
}) => {
  const { t } = useTranslation();

  const {
    label,
    videoNode: { title: videoNodeTitle },
  } = starringVideoNode;
  return (
    <List.Item
      actions={[
        editable ? (
          <Tooltip title={t('collection.edit.starringVideoNodeDelete')}>
            <Button icon={<DeleteOutlined />} onClick={() => onDelete(index)} />
          </Tooltip>
        ) : null,
      ]}
    >
      <List.Item.Meta title={label} description={videoNodeTitle} />
    </List.Item>
  );
};

StarringVideoNodeRow.propTypes = {
  editable: PropTypes.bool,
  starringVideoNode: PropTypes.claptime.starringVideoNode.isRequired,
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func,
};

StarringVideoNodeRow.defaultProps = {
  editable: true,
  onDelete: () => {},
};
export default StarringVideoNodeRow;
