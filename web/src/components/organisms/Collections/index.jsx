import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Typography } from 'antd';
import { MessageOutlined } from '@ant-design/icons';

import { Cards } from 'claptime/components/molecules';
import { useQueryList } from 'claptime/lib/apollo';
import { openChat } from 'claptime/lib/chat';
import { listCollections } from 'claptime/graphql/collections';

const Collections = () => {
  const { t } = useTranslation();

  const { response, items } = useQueryList(
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
  if (response) return response;

  return (
    <div>
      {items.map((collection) => (
        <div style={{ margin: '36px 0' }} key={collection.id}>
          <Cards.Collection collection={collection} />
        </div>
      ))}
      <div
        style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap' }}
      >
        <Typography.Title level={3} style={{ marginRight: 16 }}>
          {t('collectionsPage.becomeCurator')}
        </Typography.Title>
        <Button icon={<MessageOutlined />} onClick={() => openChat(true)}>
          {t('collectionsPage.contactUs')}
        </Button>
      </div>
    </div>
  );
};

export default Collections;
