module.exports = ({
  users,
  getRandomDatetime,
  getSearchableValue,
  slugify,
}) => {
  const getItem = (
    id,
    name,
    tagline,
    profileId,
    status,
    description,
    links = [],
    categories = [],
    acceptSubmissions = true,
  ) => {
    const createdAt = getRandomDatetime();
    return {
      __typename: 'Collection',
      createdAt,
      createdBy: users.regular.username,
      collectionProfileId: profileId,
      tagline,
      description,
      id,
      name,
      owner: users.regular.username,
      searchField: getSearchableValue(name),
      slug: slugify(name, { lower: true }),
      status,
      links,
      categories,
      updatedAt: createdAt,
      acceptSubmissions,
    };
  };
  return [
    getItem(
      '4e4d8b71-d671-4b62-bbf1-d63741f73457',
      'Animation',
      "Pour tous les amoureux de l'image animée",
      '125bc79f-1958-4b8e-b3f1-c764c24a70e2',
      'PUBLISHED',
      'Fan de Wallace et Gromit, vous avez vu tous les Ghibli et Disney a bercé votre enfance ? Alors vous êtes au bon endroit !',
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
      [
        {
          id: 'ee5Ev5MHK',
          category: 'Courts-métrages',
          description: 'Du dessin animé à la pâte à modeler !',
        },
        {
          id: 'tFysUvKjX',
          category: 'Clips',
          description: "Lorsque musique et animation s'accordent parfaitement",
        },
      ],
      true,
    ),
    getItem(
      '189b65c5-6e61-4391-9b11-380eb4058fd9',
      'En quête de sens',
      "Voir le présent autrement. Penser l'avenir différemment.",
      '125bc79f-1958-4b8e-b3f1-c764c24a70e2',
      'DRAFT',
      'Le cinéma pour réinventer le monde et faire bouger les choses, pour découvrir de nouvelles perspectives et de nouveaux horizons.',
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
      [
        {
          id: 'nK3k19u2b',
          category: 'Société',
          description: 'Témoigner pour mieux lutter',
        },
        {
          id: 'jURaSJeWT',
          category: 'Alternatives',
          description: 'Récits inspirés et inspirants',
        },
        {
          id: '3FmcRzg9i',
          category: 'Évasion',
          description: "S'échapper de la routine quelques instants",
        },
      ],
      true,
    ),
    getItem(
      'db773154-36cd-4376-830f-423917b23bf0',
      'La crème du court',
      'Des bons films non pasteurisés',
      'c00c68f7-5e27-4ea0-be09-a7cf55154b02',
      'PUBLISHED',
      'De quelques secondes à 59 minutes, du court et seulement du court ! Un format qui fait la part belle à la liberté et à la créativité !',
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
      [
        {
          id: 'oFDPaRHU3',
          category: 'Feel good',
          description: 'Parfait pour les coups de blues',
        },
        {
          id: 'Mws7TKNka',
          category: 'Sans prise de tête',
          description:
            "Des bons films pour se détendre en mangeant son pop-corn. Parce qu'on n'est pas venus ici pour souffrir, ok ?",
        },
        {
          id: 'peB2JhvtC',
          category: 'Les très courts',
          description:
            "Parce que le temps c'est de l'argent, pas plus de 3 minutes",
        },
        {
          id: 'vZBU7cbN9',
          category: 'Objets filmiques non identifiés',
          description: 'Alors... Comment vous expliquer...',
        },
        {
          id: 'c7QmBVkOo',
          category: 'Un peu de sérieux',
          description: 'Un cinéma qui fait réfléchir',
        },
        {
          id: 'Xyqo7OTJk',
          category: 'Frissons garantis',
          description: 'À regarder dans le noir total',
        },
        {
          id: 'VS3lm95l72',
          category: 'Culturez-vous',
          description: 'Pour devenir imbattable au Trivial Pursuit',
        },
      ],
      true,
    ),
    getItem(
      '4e51be7e-f314-4a63-a20f-c3afb4196f00',
      'La scène ouverte',
      "L'espace de diffusion ouvert à tous.",
      'c00c68f7-5e27-4ea0-be09-a7cf55154b02',
      'PUBLISHED',
      'Ici, pas de chichis : tout le monde est le bienvenu !\nDu réalisateur aguerri au cinéaste en herbe, jetez un nouveau regard sur la diversité du cinéma.',
      [],
      [
        {
          id: '2tTUw7PBJ',
          category: 'Fictions',
        },
        {
          id: 'ia3o2wPRS',
          category: 'Documentaires',
        },
        {
          id: '2hn3AUqdHB',
          category: 'Clips',
        },
        {
          id: 'xjJKt0nG2',
          category: 'Spectacles vivants',
        },
      ],
      true,
    ),
    getItem(
      'fac6597e-9713-4d95-a982-eed3e91a70f7',
      'La Luciole',
      'Le festival 100% online organisé par l’équipe de La Nuit des Caméras !',
      '8dae0870-a7e0-400f-a003-e919b2f5c0df',
      'DRAFT',
      'Même si le festival La Nuit des Caméras a été repoussé en avril 2021, nous ne voulions pas en rester là.\nC\'est ainsi qu’est né "La Luciole" !\nLe principe ? Réaliser la bande-annonce d’un film fictif le temps d’un week-end.\nIl y aura des contraintes, un jury professionnel, des prix… et plein de surprises à venir !',
      [
        {
          type: 'WEBSITE',
          url: 'https://www.lanuitdescameras.fr/laluciole',
        },
      ],
      [
        {
          id: '3mSG3ezXS',
          category: 'Édition 2020',
        },
      ],
      false,
    ),
  ];
};
