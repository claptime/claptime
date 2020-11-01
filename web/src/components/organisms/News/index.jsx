import React from 'react';

import DataTable from 'claptime/components/organisms/DataTable';
import { listNews } from 'claptime/graphql/news';
import { useQueryList } from 'claptime/lib/apollo';

const News = () => {
  const { items: news, response } = useQueryList(
    listNews,
    {},
    {
      resultPath: '$.listNews',
      getAll: true,
    },
  );
  if (response) return response;
  console.log(news);
  const columns = [];
  return <DataTable items={news} columns={columns} />;
};

export default News;
