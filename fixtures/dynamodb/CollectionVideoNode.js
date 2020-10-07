module.exports = ({ users, getRandomDatetime }) => {
  const getItem = (
    collectionVideoNodeVideoNodeId,
    collectionVideoNodeCollectionId,
    categoryId,
  ) => {
    const createdAt = getRandomDatetime();
    return {
      __typename: 'CollectionVideoNode',
      categoryId,
      'categoryId#createdAt': `${categoryId}#${createdAt}`,
      collectionVideoNodeCollectionId,
      collectionVideoNodeVideoNodeId,
      createdAt,
      createdBy: users.regular.username,
      id: `${collectionVideoNodeCollectionId}-${collectionVideoNodeVideoNodeId}`,
      owner: users.regular.username,
      updatedAt: createdAt,
    };
  };
  return [
    getItem(
      '25590e73-11fd-405c-834e-366ed8debcc1',
      '4e4d8b71-d671-4b62-bbf1-d63741f73457',
      'ee5Ev5MHK',
    ), // La Terre <> Animation
    getItem(
      '1ffa87df-b890-4732-8b4a-a35ea0da89e0',
      '4e4d8b71-d671-4b62-bbf1-d63741f73457',
      'ee5Ev5MHK',
    ), // An other part of the world' <> Animation
    getItem(
      '0fbe7004-a52a-49a0-85e0-967265cd6172',
      '4e4d8b71-d671-4b62-bbf1-d63741f73457',
      'ee5Ev5MHK',
    ), // M.S.T. <> Animation
    getItem(
      'd566896a-dfb0-4d79-9d0d-f7e6a5db0692',
      '4e4d8b71-d671-4b62-bbf1-d63741f73457',
      'ee5Ev5MHK',
    ), // Sita chante le blues <> Animation
    getItem(
      '5e3a2866-9e52-41b7-a83d-449d1c62ab5e',
      '4e4d8b71-d671-4b62-bbf1-d63741f73457',
      'ee5Ev5MHK',
    ), // Moonbird <> Animation
  ];
};
