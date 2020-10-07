import React from 'react';
import { Storage } from 'aws-amplify';
import { gql } from '@apollo/client';

import Collection from 'claptime/components/organisms/Collection';
import NavBarTemplate from 'claptime/components/templates/NavBarTemplate';
import consts from 'claptime/consts';
import { listCollectionsBySlug } from 'claptime/graphql/collections';
import { unauthClient } from 'claptime/lib/apollo';
import Head from 'claptime/lib/seo/Head';
import PropTypes from 'claptime/lib/prop-types';

export async function getServerSideProps(ctx) {
  const [
    {
      data: {
        listCollectionsBySlug: {
          items: [collection],
        },
      },
    },
    imageUrl,
  ] = await Promise.all([
    unauthClient.query({
      query: gql(listCollectionsBySlug),
      variables: { slug: ctx.query.collection },
    }),
    Storage.get(
      `collections/${ctx.query.collection}/${consts.collections.covers.filenames.CROPPED_1500_300}`,
    ),
  ]);
  return {
    props: {
      collection,
      imageUrl,
    },
  };
}

const CollectionPage = ({ collection, imageUrl }) => {
  return (
    <>
      <Head
        page="collection"
        params={{
          name: collection.name,
          tagline: collection.tagline,
        }}
        imageUrl={imageUrl}
      />
      <NavBarTemplate collapsed>
        <Collection collection={collection} />
      </NavBarTemplate>
    </>
  );
};

CollectionPage.propTypes = {
  collection: PropTypes.claptime.collection.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default CollectionPage;
