import React, { useState } from 'react';
import { Button, Modal, Radio, Select, message } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { gql } from '@apollo/client';

import { Subtitle } from 'claptime/components/atoms';
import { useQueryList, useApolloClient } from 'claptime/lib/apollo';
import PropTypes from 'claptime/lib/prop-types';
import { listCollections } from 'claptime/graphql/collections';
import { submitVideoNodeToCollection } from 'claptime/graphql/videonodes';

const SubmitToCollection = ({ videoNode, onChange }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const apolloClient = useApolloClient();

  const { response, items: collections } = useQueryList(
    listCollections,
    {
      filter: {
        status: { eq: 'PUBLISHED' },
      },
    },
    {
      resultPath: '$.listCollections',
      getAll: true,
    },
  );

  const submit = async (collectionSlug, categoryId) => {
    setLoading(true);
    await apolloClient.mutate({
      mutation: gql(submitVideoNodeToCollection),
      variables: {
        videoNodeId: videoNode.id,
        collectionSlug,
        collectionCategoryId: categoryId,
      },
      update: () => onChange(),
    });
    setShowModal(false);
    setLoading(false);
    message.success(t('submissions.sent'));
  };

  return (
    <>
      <Modal
        title={t('submissions.new')}
        visible={showModal}
        okText={t('submissions.submit')}
        okButtonProps={{ disabled: !selectedCategory || loading }}
        onOk={() =>
          submit(
            collections.find(({ id }) => id === selectedCollection).slug,
            selectedCategory,
          )
        }
        onCancel={() => setShowModal(false)}
      >
        {response || (
          <div>
            <Subtitle>{t('submissions.selectCollection')}</Subtitle>
            <Radio.Group
              onChange={(e) => {
                setSelectedCollection(e.target.value);
                setSelectedCategory(null);
              }}
              value={selectedCollection}
            >
              {/* Filter collections in which the current movie already belongs */}
              {collections
                .filter(
                  ({ id }) =>
                    !videoNode.collections.items.find(
                      ({ collection }) => collection.id === id,
                    ),
                )
                .map((collection) => (
                  <Radio value={collection.id} key={collection.id}>
                    <div
                      style={{
                        display: 'inline-block',
                        verticalAlign: 'middle',
                      }}
                    >
                      <span style={{ fontSize: '1.5em' }}>
                        {collection.name}
                      </span>{' '}
                      - {collection.tagline}
                    </div>
                  </Radio>
                ))}
            </Radio.Group>
            {selectedCollection && (
              <>
                <Subtitle>{t('submissions.selectCategory')}</Subtitle>
                <Select
                  onChange={(value) => {
                    setSelectedCategory(value);
                  }}
                  value={selectedCategory}
                  style={{ width: '100%' }}
                >
                  {collections
                    .find(({ id }) => id === selectedCollection)
                    .categories.map(({ id, category, description }) => (
                      <Select.Option value={id} key={id}>
                        {category} - {description}
                      </Select.Option>
                    ))}
                </Select>
              </>
            )}
          </div>
        )}
      </Modal>
      <Button icon={<SendOutlined />} onClick={() => setShowModal(true)}>
        {t('submissions.new')}
      </Button>
    </>
  );
};

SubmitToCollection.propTypes = {
  videoNode: PropTypes.claptime.videoNode.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SubmitToCollection;
