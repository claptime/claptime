// https://leerob.io/blog/nextjs-sitemap-robots
import { gql } from '@apollo/client';

import { unauthClient } from 'claptime/lib/apollo';

const host = `https://www.clap-time.com`;

const createSitemap = ({
  profiles,
  collections,
  series,
  videos,
}) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${`${host}/about/filmmakers`}</loc>
    </url>
    <url>
        <loc>${`${host}/about/project/association`}</loc>
    </url>
    <url>
        <loc>${`${host}/about/project/manifest`}</loc>
    </url>
    <url>
        <loc>${`${host}/about/project/partners`}</loc>
    </url>
    <url>
        <loc>${`${host}/about/spectators`}</loc>
    </url>
    <url>
        <loc>${`${host}/collections`}</loc>
    </url>
    <url>
        <loc>${`${host}/festivals/la-luciole-2020`}</loc>
    </url>
    <url>
        <loc>${`${host}/legal`}</loc>
    </url>
    <url>
        <loc>${`${host}/profiles`}</loc>
    </url>
  ${collections
    .map(
      ({ slug, createdAt, categories }) => `
    <url>
        <loc>${`${host}/collection/${slug}`}</loc>
        <lastmod>${createdAt.split('T')[0]}</lastmod>
    </url>
    ${categories.map(
      (category) => `
    <url>
        <loc>${`${host}/collection/${slug}/category/${category.id}`}</loc>
        <lastmod>${createdAt.split('T')[0]}</lastmod>
    </url>
    `,
    )}
  `,
    )
    .join('')}
  ${profiles
    .map(
      ({ id, updatedAt }) => `
    <url>
        <loc>${`${host}/profile/${id}`}</loc>
        <lastmod>${updatedAt.split('T')[0]}</lastmod>
    </url>
  `,
    )
    .join('')}
  ${series
    .map(
      ({ id, updatedAt }) => `
    <url>
        <loc>${`${host}/series/${id}`}</loc>
        <lastmod>${updatedAt.split('T')[0]}</lastmod>
    </url>
  `,
    )
    .join('')}
  ${videos
    .map(
      ({ id, updatedAt }) => `
    <url>
        <loc>${`${host}/video/${id}`}</loc>
        <lastmod>${updatedAt.split('T')[0]}</lastmod>
    </url>
    <url>
        <loc>${`${host}/video/${id}/play`}</loc>
        <lastmod>${updatedAt.split('T')[0]}</lastmod>
    </url>
    <url>
        <loc>${`${host}/video/${id}/embed`}</loc>
        <lastmod>${updatedAt.split('T')[0]}</lastmod>
    </url>
  `,
    )
    .join('')}
</urlset>
`;

const listItems = async (type, filters = {}, fields = 'id updatedAt') => {
  const allItems = [];
  let nextToken;
  do {
    const {
      data: {
        [`list${type}s`]: { items },
      },
    } = await unauthClient.query({
      query: gql(/* GraphQL */ `
        query List${type}s(
          $filter: Model${type}FilterInput
          $limit: Int
          $nextToken: String
        ) {
          list${type}s(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
              ${fields}
            }
          }
        }
      `),
      variables: {
        filters,
      },
    });
    allItems.push(...items);
  } while (nextToken);
  return allItems;
};

const Sitemap = () => null;

Sitemap.getInitialProps = async (ctx) => {
  const profiles = await listItems('Profile');
  const collections = await listItems(
    'Collection',
    {},
    'slug createdAt categories { id }',
  );
  const series = await listItems('VideoNode', {
    status: {
      eq: 'PUBLISHED',
    },
    type: {
      eq: 'SERIES',
    },
  });
  const videos = await listItems('VideoNode', {
    status: {
      eq: 'PUBLISHED',
    },
    type: {
      eq: 'SERIES',
    },
  });
  ctx.res.setHeader('Content-Type', 'text/xml');
  ctx.res.write(
    createSitemap({
      profiles,
      collections,
      series,
      videos,
    }),
  );
  ctx.res.end();
};

export default Sitemap;
