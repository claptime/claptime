import React, { useState } from 'react';

import { Select, Input, List, Tooltip, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

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

export default StarringVideoNodeRow;
