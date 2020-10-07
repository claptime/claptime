module.exports = ({ users, getRandomDatetime }) => {
  const getItem = (userId, videoNodeId, list = 'LIKED') => {
    const createdAt = getRandomDatetime();
    return {
      __typename: 'UserVideoNode',
      userSettingsVideoNodesId: userId,
      userVideoNodeVideoNodeId: videoNodeId,
      'list#userVideoNodeVideoNodeId': `${list}#${videoNodeId}`,
      list,
      createdAt,
      createdBy: users.regular.username,
      owner: users.regular.username,
      updatedAt: createdAt,
    };
  };
  return [
    getItem(users.regular.username, '25590e73-11fd-405c-834e-366ed8debcc1'), // La Terre
    getItem(users.regular.username, 'd566896a-dfb0-4d79-9d0d-f7e6a5db0692'), // Sita chante le blues
  ];
};
