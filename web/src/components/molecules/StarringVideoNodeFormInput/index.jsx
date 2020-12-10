import React, { useState, useEffect } from 'react';

import { List, Popover, Tooltip, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { useTranslation } from 'react-i18next';

import consts from 'consts';
import PropTypes from 'claptime/lib/prop-types';

import { listCollectionVideoNodes } from 'claptime/graphql/collections';
import { useQueryList } from 'claptime/lib/apollo';

import StarringVideoNodeRow from './StarringVideoNodeRow';
import AddStarringVideoNodeForm from './AddStarringVideoNodeForm';

const { MAX_SVN_IN_COLLECTION } = consts;

const StarringVideoNodeFormInput = ({ value, collectionId, onChange }) => {
  const { t } = useTranslation();

  const [listVideoNodes, setListVideoNodes] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const { items: collectionVideoNodes, response } = useQueryList(
    listCollectionVideoNodes,
    {
      variables: {
        filter: {
          collectionVideoNodeCollectionId: { eq: collectionId },
        },
      },
      errorPolicy: 'all',
    },
    {
      resultPath: '$.listCollectionVideoNodes',
      getAll: true,
    },
  );

  useEffect(() => {
    if (collectionVideoNodes) {
      setListVideoNodes(collectionVideoNodes);
    }
  }, [collectionVideoNodes]);
  if (response) return response;

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
      locale={{ emptyText: t('collection.edit.starringVideoNodesEmpty') }}
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
              title={
                value.length < MAX_SVN_IN_COLLECTION
                  ? t('collection.edit.starringVideoNodesAddTooltip')
                  : t('collection.edit.starringVideoNodesCannotAddTooltip')
              }
              placement="right"
            >
              <Button
                disabled={value.length >= MAX_SVN_IN_COLLECTION}
                shape="circle"
                icon={<PlusOutlined />}
              />
            </Tooltip>
          </Popover>
        </div>
      }
    />
  );
};

StarringVideoNodeFormInput.propTypes = {
  // eslint-disable-next-line react/require-default-props
  value: PropTypes.arrayOf(PropTypes.claptime.starringVideoNode),
  collectionId: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

StarringVideoNodeFormInput.defaultProps = {
  onChange: () => {},
};

export default StarringVideoNodeFormInput;
