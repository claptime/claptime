module.exports = ({ users, getRandomDatetime }) => {
  const getItem = (userId, profileId, list = 'FOLLOWED') => {
    const createdAt = getRandomDatetime();
    return {
      __typename: 'UserProfile',
      userSettingsProfilesId: userId,
      userProfileProfileId: profileId,
      'list#userProfileProfileId': `${list}#${profileId}`,
      list,
      createdAt,
      createdBy: users.regular.username,
      owner: users.regular.username,
      updatedAt: createdAt,
    };
  };
  return [
    getItem(users.regular.username, '125bc79f-1958-4b8e-b3f1-c764c24a70e2'), // Nicolas Bougère
    getItem(users.regular.username, '423d94e6-385e-42c6-994a-f33db8c5126c'), // Nina Paley
  ];
};
