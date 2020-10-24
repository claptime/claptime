module.exports = ({ users, getRandomDatetime }) => {
  const getItem = (id, title, description, button, links) => {
    const createdAt = getRandomDatetime();
    return {
      __typename: 'News',
      id,
      title,
      description,
      button,
      links,
      createdAt,
      createdBy: users.regular.username,
      owner: users.regular.username,
    };
  };
  return [
    getItem(
      '7d10dd0a-ab5a-4fba-86cc-7b295c453780',
      'La luciole',
      'Nous avons le plaisir de vous annoncer notre festival 100% online, "La Luciole" !\nLe principe ? Créer une bande-annonce pour un film fictif le temps d\'un week-end 🎬',
      {
        text: 'Infos et inscriptions',
        url: 'https://www.lanuitdescameras.fr/laluciole',
      },
      [
        {
          type: 'INSTAGRAM',
          url: 'https://www.instagram.com/lanuitdescameras/',
        },
        {
          type: 'FACEBOOK',
          url: 'https://www.facebook.com/La-Nuit-des-Caméras-478369362930629/',
        },
        {
          type: 'WEBSITE',
          url: 'https://www.lanuitdescameras.fr/laluciole',
        },
      ],
    ),
  ];
};
