import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, List } from 'antd';

import { ContactUsButton } from 'claptime/components/atoms';
import { Cards } from 'claptime/components/molecules';
import { useQueryList } from 'claptime/lib/apollo';
import { listCollections } from 'claptime/graphql/collections';

const Collections = () => {
  const { t } = useTranslation();

  const { response, items } = useQueryList(
    listCollections,
    {
      variables: {
        filter: {
          status: { eq: 'PUBLISHED' },
        },
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
      <List
        grid={{
          gutter: 48,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 1,
          xl: 1,
          xxl: 2,
        }}
        dataSource={items}
        renderItem={(collection) => (
          <List.Item>
            <div style={{ marginTop: '18px' }}>
              <Cards.Collection collection={collection} />
            </div>
          </List.Item>
        )}
      />
      <div
        style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap' }}
      >
        <Typography.Title level={3} style={{ marginRight: 16 }}>
          {t('collectionsPage.becomeCurator')}
        </Typography.Title>
        <ContactUsButton buttonText={t('collectionsPage.contactUs')} />
      </div>
    </div>
  );
};

export default Collections;
