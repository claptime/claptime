module.exports = ({ users, getRandomDatetime, getSearchableValue }) => {
  const getItem = (id, name, biography, links = []) => {
    const createdAt = getRandomDatetime();
    return {
      __typename: 'Profile',
      createdAt,
      createdBy: users.regular.username,
      id,
      name,
      biography,
      links,
      owner: users.regular.username,
      searchField: getSearchableValue(name),
      updatedAt: createdAt,
    };
  };
  return [
    getItem(
      'c00c68f7-5e27-4ea0-be09-a7cf55154b02',
      'Claptime',
      'Thibaut et Christophe sont passionnés de court-métrage et de culture indépendante. Quand ils ne sont pas en train de développer de nouvelles fonctionnalités sur votre plateforme préférée, ils sont probablement en train de vous dénicher de nouvelles pépites cinématographiques.',
      [
        {
          type: 'INSTAGRAM',
          url: 'https://www.instagram.com/itsclaptime/',
        },
        {
          type: 'FACEBOOK',
          url: 'https://www.facebook.com/itsclaptime/',
        },
      ],
    ),
    getItem(
      '125bc79f-1958-4b8e-b3f1-c764c24a70e2',
      'Nicolas Bougère',
      'Après des études d’art, Nicolas Bougère fait de l’éducation à l’image et à l’animation, réalise différents films de commande et co-réalise son premier court métrage « M.S.T ». En 2015 il travaille sur le jeu vidéo « 2 dark » à la création et l’animation des personnages. Il alterne depuis les commandes et ses projets personnels de gravure, d’illustration, et d’animation.',
      [
        {
          type: 'INSTAGRAM',
          url: 'https://www.instagram.com/nicolas_bougere/',
        },
        {
          type: 'LABFILMS',
          url: 'https://www.labfilms.org/membres/christophe-bougere',
        },
        { type: 'WEBSITE', url: 'https://z-uo.com/' },
      ],
    ),
    getItem(
      'efbab7c3-8d1e-4d7d-98be-4e7fe6878407',
      'Charlie Chaplin',
      "Sir Charles Spencer Chaplin Junior, plus connu sous le nom de Charlie Chaplin, est né le 16 avril 1889 à Londres au Royaume-Uni, soit 4 jours avant Adolf Hitler, qu'il tente de ridiculiser à l'écran. Il est décédé le 25 décembre 1977 à Veney. Après avoir étudié la pantomime, il obtient ses premiers contrats au théâtre et y rencontre Stan Laurel (Laurel et Hardy). Lors d'une tournée aux Etats-Unis, le studio Keystone lui propose un emploi. Les films sont tournés très rapidement et dans l'affolement. On lui demande d'improviser un déguisement et c'est ainsi que Charlie Chaplin crée le personnage de Charlot le vagabond. A partir de 1914, il réalise lui-même ses films, qui rencontrent un succès immense. Ses cachets sont décuplés et les studios veulent tous sortir leur Charlot. Alors que tous les acteurs et cinéastes se sentent exploités par l'industrie, Charlie Chaplin fonde la United Artists. https://fr.wikipedia.org/wiki/Charlie_Chaplin",
    ),
    getItem(
      '423d94e6-385e-42c6-994a-f33db8c5126c',
      'Nina Paley',
      "Nina Paley est une dessinatrice et animatrice américaine née le 3 mai 1968 à Urbana dans l'État de l'Illinois aux États-Unis.",
    ),
    getItem(
      'fa7c51b6-912f-4973-a1da-8a5c3988d488',
      'John Hubley',
      "John Hubley est un animateur américain et réalisateur d'animation connu pour ses expérimentations formelles et pour son réalisme émotionnel qui l'a poussé à engager son propre enfant pour interpréter des personnages de ses films.",
    ),
  ];
};
