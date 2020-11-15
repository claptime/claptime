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
      status: 'PUBLISHED',
      createdAt,
      createdBy: users.regular.username,
      owner: users.regular.username,
    };
  };
  return [
    getItem(
      '7d10dd0a-ab5a-4fba-86cc-7b295c453780',
      'La luciole',
      'Nous avons le plaisir de vous annoncer la première édition du festival 100% en ligne "La Luciole" qui se tiendra sur Claptime !\nLe principe ? Créer une bande-annonce pour un film fictif le temps d\'un week-end 🎬',
      {
        text: 'Infos et inscriptions',
        url: 'https://www.clap-time.com/festivals/la-luciole-2020',
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
