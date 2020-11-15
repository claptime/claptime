import React, { useState, useEffect } from 'react';

import { Select, Modal, Input, List, Popover, Tooltip, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { useTranslation } from 'react-i18next';

import { listCollectionVideoNodes } from 'claptime/graphql/collections';
import { useApolloClient, useQueryGet } from 'claptime/lib/apollo';

import StarringVideoNodeRow from './StarringVideoNodeRow';
import AddStarringVideoNodeForm from './AddStarringVideoNodeForm';

const StarringVideoNodeFormInput = ({ value, collectionId, onChange }) => {
  const { t } = useTranslation();

  const [listVideoNodes, setListVideoNodes] = useState([]);
  const [listStarringVideoNodes, setListStarringVideoNodes] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const { item: collectionVideoNodes, loadMore, response } = useQueryGet(
    listCollectionVideoNodes,
    {
      variables: {
        filter: {
          collectionVideoNodeCollectionId: { eq: collectionId },
        },
      },
      errorPolicy: 'all',
    },
    { resultPath: '$.listCollectionVideoNodes' },
  );

  useEffect(() => setListStarringVideoNodes(value));
  useEffect(() => {
    if (collectionVideoNodes) {
      const { items } = collectionVideoNodes;
      setListVideoNodes(items);
    }
  }, [collectionVideoNodes]);
  const addStarringVideoNode = (svn) => {
    if (onChange) {
      onChange([...value, svn]);
      setShowForm(false);
    }
  };

  const removeStarringVideoNode = (index) => {
    if (onChange) {
      onChange(value.filter((v, i) => i !== index));
    }
  };

  return (
    <List
      dataSource={value}
      renderItem={(svn, index) => (
        <StarringVideoNodeRow
          index={index}
          starringVideoNode={svn}
          editable
          onDelete={removeStarringVideoNode}
        />
      )}
      footer={
        <div style={{ padding: 8 }}>
          <Popover
            id="new-starringVideoNode-popover"
            content={
              <AddStarringVideoNodeForm
                containerId="new-starringVideoNode-popover"
                listVideoNodes={listVideoNodes}
                onStarringVideoNodeAdded={addStarringVideoNode}
              />
            }
            trigger="click"
            title={t('collection.edit.starringVideoNodesAddPopover')}
            visible={showForm}
            onVisibleChange={() =>
              setShowForm((previousValue) => !previousValue)
            }
          >
            <Tooltip
              title={t('collection.edit.starringVideoNodesAddTooltip')}
              placement="right"
            >
              <Button shape="circle" icon={<PlusOutlined />} />
            </Tooltip>
          </Popover>
        </div>
      }
    />
  );
};

export default StarringVideoNodeFormInput;
