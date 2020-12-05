module.exports = ({ users, getRandomDatetime }) => {
  const getItem = (
    starringVideoNodeVideoNodeId,
    starringVideoNodeCollectionId,
    label,
    description,
  ) => {
    const createdAt = getRandomDatetime();
    return {
      __typename: 'StarringVideoNode',
      starringVideoNodeVideoNodeId,
      starringVideoNodeCollectionId,
      label,
      description,
      createdAt,
      createdBy: users.regular.username,
      id: `${starringVideoNodeVideoNodeId}-${starringVideoNodeCollectionId}`,
      owner: users.regular.username,
      updatedAt: createdAt,
    };
  };
  return [
    getItem(
      '25590e73-11fd-405c-834e-366ed8debcc1',
      '4e4d8b71-d671-4b62-bbf1-d63741f73457',
      'Le film du jour',
      'Un film sympa, à voir de temps en temps.',
    ), // La Terre <> Animation
    getItem(
      '1ffa87df-b890-4732-8b4a-a35ea0da89e0',
      '4e4d8b71-d671-4b62-bbf1-d63741f73457',
      'Le film du mois',
      'Une perle comme on en voit trop rarement',
    ), // An other part of the world' <> Animation
  ];
};
