import React from 'react';

import consts from 'claptime/consts';
import { listProfiles } from 'claptime/graphql/profiles';
import { useQueryList } from 'claptime/lib/apollo';
import PropTypes from 'claptime/lib/prop-types';
import { Cards } from 'claptime/components/molecules';

const Profiles = ({ limit }) => {
  const { response, items } = useQueryList(
    listProfiles,
    {
      errorPolicy: 'all',
      variables: {
        limit: 50,
      },
    },
    {
      resultPath: '$.listProfiles',
      getAll: true,
    },
  );
  if (response) return response;

  const profiles = items.filter((p) =>
    p.videoNodes.items
      .filter((video) => video)
      .some(({ status }) => status === consts.videos.status.PUBLISHED),
  );

  profiles.sort((a, b) => {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return -(new Date(a.createdAt) - new Date(b.createdAt));
  });

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
      }}
    >
      {(limit ? profiles.slice(0, limit) : profiles).map((profile) => (
        <Cards.Profile key={`profile-${profile.id}`} profile={profile} />
      ))}
    </div>
  );
};

Profiles.propTypes = {
  limit: PropTypes.number,
};

Profiles.defaultProps = {
  limit: null,
};

export default Profiles;
