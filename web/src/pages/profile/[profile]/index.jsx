import React from 'react';
import { Storage } from 'aws-amplify';
import { gql } from '@apollo/client';

import Profile from 'claptime/components/organisms/Profile';
import NavBarTemplate from 'claptime/components/templates/NavBarTemplate';
import consts from 'claptime/consts';
import { getProfile } from 'claptime/graphql/profiles';
import { unauthClient } from 'claptime/lib/apollo';
import PropTypes from 'claptime/lib/prop-types';
import Head from 'claptime/lib/seo/Head';

export async function getServerSideProps(ctx) {
  const [
    {
      data: { getProfile: profile },
    },
    imageUrl,
  ] = await Promise.all([
    unauthClient.query({
      query: gql(getProfile),
      variables: {
        id: ctx.query.profile,
      },
    }),
    Storage.get(
      `profiles/${ctx.query.profile}/${consts.profiles.covers.filenames.CROPPED_512_512}`,
    ),
  ]);
  return {
    props: {
      profile,
      imageUrl,
    },
  };
}

const ProfilePage = ({ profile, imageUrl }) => {
  return (
    <>
      <Head
        page="profile"
        params={{
          name: profile.name,
          biography: profile.biography,
        }}
        imageUrl={imageUrl}
      />
      <NavBarTemplate>
        <Profile profile={profile} />
      </NavBarTemplate>
    </>
  );
};

ProfilePage.propTypes = {
  profile: PropTypes.claptime.profile.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default ProfilePage;
