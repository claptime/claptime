module.exports = ({ users, getRandomDatetime }) => {
  const getItem = (userId, collectionId, list = 'SUBSCRIBED') => {
    const createdAt = getRandomDatetime();
    return {
      __typename: 'UserCollection',
      userSettingsCollectionsId: userId,
      userCollectionCollectionId: collectionId,
      'list#userCollectionCollectionId': `${list}#${collectionId}`,
      list,
      createdAt,
      createdBy: users.regular.username,
      owner: users.regular.username,
      updatedAt: createdAt,
    };
  };
  return [
    getItem(users.regular.username, '4e4d8b71-d671-4b62-bbf1-d63741f73457'), // Animation
  ];
};
