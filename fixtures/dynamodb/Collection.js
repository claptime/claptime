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
    description,
    links = [],
    categories = [],
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
      links,
      categories,
      updatedAt: createdAt,
    };
  };
  return [
    getItem(
      '4e4d8b71-d671-4b62-bbf1-d63741f73457',
      'Animation',
      "Pour tous les amoureux de l'image animée",
      'c00c68f7-5e27-4ea0-be09-a7cf55154b02',
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
    ),
    getItem(
      '189b65c5-6e61-4391-9b11-380eb4058fd9',
      'En quête de sens',
      "Voir le présent autrement. Penser l'avenir différemment.",
      'c00c68f7-5e27-4ea0-be09-a7cf55154b02',
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
    ),
    getItem(
      'db773154-36cd-4376-830f-423917b23bf0',
      'La crème du court',
      'Des bons films non pasteurisés',
      'c00c68f7-5e27-4ea0-be09-a7cf55154b02',
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
    ),
    getItem(
      '4e51be7e-f314-4a63-a20f-c3afb4196f00',
      'La scène ouverte',
      "L'espace de diffusion ouvert à tous.",
      'c00c68f7-5e27-4ea0-be09-a7cf55154b02',
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
    ),
  ];
};
