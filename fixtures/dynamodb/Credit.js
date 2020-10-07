module.exports = ({ users, getRandomDatetime, slugify }) => {
  const getItem = (creditVideoNodeId, creditProfileId, customProfile, role) => {
    const createdAt = getRandomDatetime();
    return {
      __typename: 'Credit',
      createdAt,
      createdBy: users.regular.username,
      creditProfileId,
      creditVideoNodeId,
      customProfile,
      id: `${slugify(role)}-${
        creditProfileId || slugify(customProfile)
      }-${creditVideoNodeId}`,
      owner: users.regular.username,
      role,
      updatedAt: createdAt,
    };
  };
  return [
    // La Terre
    getItem(
      '25590e73-11fd-405c-834e-366ed8debcc1',
      undefined,
      'David Suissa',
      'Compositeur',
    ),
    getItem(
      '25590e73-11fd-405c-834e-366ed8debcc1',
      '125bc79f-1958-4b8e-b3f1-c764c24a70e2',
      undefined,
      'Réalisateur',
    ),
    // An other part of the world
    getItem(
      '1ffa87df-b890-4732-8b4a-a35ea0da89e0',
      '125bc79f-1958-4b8e-b3f1-c764c24a70e2',
      undefined,
      'Réalisateur',
    ),
    // M.S.T.
    getItem(
      '0fbe7004-a52a-49a0-85e0-967265cd6172',
      '125bc79f-1958-4b8e-b3f1-c764c24a70e2',
      undefined,
      'Réalisateur',
    ),
    getItem(
      '0fbe7004-a52a-49a0-85e0-967265cd6172',
      undefined,
      'Elodie Marechal',
      'Réalisateur',
    ),
    getItem(
      '0fbe7004-a52a-49a0-85e0-967265cd6172',
      undefined,
      'Vivien François',
      'Réalisateur',
    ),
    getItem(
      '0fbe7004-a52a-49a0-85e0-967265cd6172',
      undefined,
      'Alexis de Jesus Costa',
      'Réalisateur',
    ),
    // Sita chante le blues
    getItem(
      'd566896a-dfb0-4d79-9d0d-f7e6a5db0692',
      '423d94e6-385e-42c6-994a-f33db8c5126c',
      undefined,
      'Réalisateur',
    ),
    // Moonbird
    getItem(
      '5e3a2866-9e52-41b7-a83d-449d1c62ab5e',
      'fa7c51b6-912f-4973-a1da-8a5c3988d488',
      undefined,
      'Réalisateur',
    ),
    // Charlie Chaplin's "The Rink"
    getItem(
      '58853c7f-6aa4-49e3-95d4-bda9f5247a41',
      'efbab7c3-8d1e-4d7d-98be-4e7fe6878407',
      undefined,
      'Réalisateur',
    ),
    getItem(
      '58853c7f-6aa4-49e3-95d4-bda9f5247a41',
      'efbab7c3-8d1e-4d7d-98be-4e7fe6878407',
      undefined,
      'Acteur',
    ),
    // Charlie Chaplin's "The Floorwalker"
    getItem(
      'efacdfb8-f931-4bb2-a559-ea88c3f8615b',
      'efbab7c3-8d1e-4d7d-98be-4e7fe6878407',
      undefined,
      'Réalisateur',
    ),
    getItem(
      'efacdfb8-f931-4bb2-a559-ea88c3f8615b',
      'efbab7c3-8d1e-4d7d-98be-4e7fe6878407',
      undefined,
      'Acteur',
    ),
    // Charlie Chaplin's "The Pawnshop"
    getItem(
      '816e5aa8-aded-4eac-95b8-cd6f2c698d71',
      'efbab7c3-8d1e-4d7d-98be-4e7fe6878407',
      undefined,
      'Réalisateur',
    ),
    getItem(
      '816e5aa8-aded-4eac-95b8-cd6f2c698d71',
      'efbab7c3-8d1e-4d7d-98be-4e7fe6878407',
      undefined,
      'Acteur',
    ),
    // Charlie Chaplin's "The Vagabond"
    getItem(
      '34ed7abd-fe56-4ebb-afda-6e4d20ded7e8',
      'efbab7c3-8d1e-4d7d-98be-4e7fe6878407',
      undefined,
      'Réalisateur',
    ),
    getItem(
      '34ed7abd-fe56-4ebb-afda-6e4d20ded7e8',
      'efbab7c3-8d1e-4d7d-98be-4e7fe6878407',
      undefined,
      'Acteur',
    ),
  ];
};
