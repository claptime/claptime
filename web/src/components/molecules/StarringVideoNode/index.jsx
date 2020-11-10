import React, { useState, useEffect } from 'react';

import { Select, Modal } from 'antd';
import { useTranslation } from 'react-i18next';

import { listCollectionVideoNodes } from 'claptime/graphql/collections';
import { useApolloClient, useQueryGet } from 'claptime/lib/apollo';

const { Option } = Select;

const StarringVideoNode = ({ collectionId, onChange }) => {
  const { t } = useTranslation();

  const [listVideoNodes, setListVideoNodes] = useState([]);

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

  useEffect(() => {
    if (collectionVideoNodes) {
      const { items } = collectionVideoNodes;
      setListVideoNodes(items);
    }
  }, [collectionVideoNodes]);

  const handleChange = (value) => {
    onChange();
  };
  return (
    <>
      <Select defaultValue={null} onChange={handleChange}>
        <Option value={null}>
          {t('collection.edit.starringVideoNodeNone')}
        </Option>
        {listVideoNodes.map((item) => {
          const {
            videoNode: { id, title },
          } = item;
          return <Option value={id}>{title}</Option>;
        })}
      </Select>
    </>
  );
};

export default StarringVideoNode;
