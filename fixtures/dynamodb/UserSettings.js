module.exports = ({ users, getRandomDatetime }) => {
  const getItem = (userId, profileId = undefined) => {
    const createdAt = getRandomDatetime();
    return {
      __typename: 'UserSettings',
      createdAt,
      id: userId,
      owner: userId,
      profileId,
      updatedAt: createdAt,
    };
  };
  return [
    getItem(users.regular.username, '125bc79f-1958-4b8e-b3f1-c764c24a70e2'),
    getItem(users.admin.username),
  ];
};
