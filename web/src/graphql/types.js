export const LEVELS = {
  SKIP: 0,
  MINIMAL: 1,
  REGULAR: 2,
  COMPLETE: 3,
};

const defaultParams = {
  level: LEVELS.SKIP,
  variables: {},
};

const ifAtLeast = (level, comparisonLevel) => level >= comparisonLevel || '';
const ifNotSkipped = (level) => ifAtLeast(level, LEVELS.MINIMAL);
const getVariables = (variables = {}) => {
  if (Object.keys(variables).length === 0) {
    return '';
  }
  return `(${Object.keys(variables)
    .map((name) => `${name}: ${variables[name]}`)
    .join(', ')})`;
};
export const Connection = ({ variables, children }) => `
${getVariables(variables)} {
  items ${children}
  nextToken
}`;

export const ApiResponse = () => `{
  status
  reason
  data
}`;

export const Link = () => `{
  type
  url
}`;

export const NotificationPreference = () => `{
  type
  channel
  frequency
}`;

export const Profile = ({
  level = LEVELS.REGULAR,
  roles = defaultParams,
  videoNodes = defaultParams,
} = {}) => `
{
  id
  createdAt
  owner
  name
  ${
    ifAtLeast(level, LEVELS.REGULAR) &&
    `
  biography
  links ${Link()}
  searchField
  createdBy
  `
  }
  ${
    ifNotSkipped(roles.level) &&
    `roles ${Connection({
      children: Credit(roles),
      variables: roles.variables,
    })}`
  }
  ${
    ifNotSkipped(videoNodes.level) &&
    `videoNodes ${Connection({
      children: VideoNode(videoNodes),
      variables: videoNodes.variables,
    })}`
  }
}`;

export const Collection = ({
  level = LEVELS.REGULAR,
  profile = defaultParams,
  videoNodes = defaultParams,
} = {}) => `
{
  id
  slug
  name
  status
  createdAt
  owner
  ${
    ifAtLeast(level, LEVELS.REGULAR) &&
    `
  tagline
  collectionProfileId
  description
  links ${Link()}
  categories {
    id
    category
    description
  }
  `
  }
  ${
    ifAtLeast(level, LEVELS.COMPLETE) &&
    `
  searchField
  createdBy
  `
  }
  ${ifNotSkipped(profile.level) && `profile ${Profile(profile)}`}
  ${
    ifNotSkipped(videoNodes.level) &&
    `videoNodes ${Connection({
      children: CollectionVideoNode(videoNodes),
      variables: videoNodes.variables,
    })}`
  }
}`;

export const News = () => `
{
  id
  title
  description
  button {
    text
    url
  }
  links {
    type
    url
  }
  createdAt
  createdBy
  owner
}
`;

export const VideoNode = ({
  level = LEVELS.REGULAR,
  profile = defaultParams,
  nextNode = defaultParams,
  parentNode = defaultParams,
  views = defaultParams,
  collections = defaultParams,
  credits = defaultParams,
  childNodes = defaultParams,
} = {}) => `
{
  id
  createdAt
  owner
  ${
    ifAtLeast(level, LEVELS.REGULAR) &&
    `
  title
  status
  videoNodeProfileId
  category
  duration
  releaseYear
  type
  nodeType
  ttl
  childrenCount
  `
  }
  ${
    ifAtLeast(level, LEVELS.COMPLETE) &&
    `
  createdBy
  updatedAt
  synopsis
  festivals
  searchField
  donationsAvailable
  videoNodeNextNodeId
  videoNodeParentNodeId
  `
  }
  ${ifNotSkipped(profile.level) && `profile ${Profile(profile)}`}
  ${ifNotSkipped(nextNode.level) && `nextNode ${VideoNode(nextNode)}`}
  ${ifNotSkipped(parentNode.level) && `parentNode ${VideoNode(parentNode)}`}
  ${
    ifNotSkipped(views.level) &&
    `views ${Connection({ children: View(views), variables: views.variables })}`
  }
  ${
    ifNotSkipped(collections.level) &&
    `collections ${Connection({
      children: Collection(collections),
      variables: collections.variables,
    })}`
  }
  ${
    ifNotSkipped(credits.level) &&
    `credits ${Connection({
      children: Credit(credits),
      variables: credits.variables,
    })}`
  }
  ${
    ifNotSkipped(childNodes.level) &&
    `childNodes ${Connection({
      children: VideoNode(childNodes),
      variables: childNodes.variables,
    })}`
  }
}`;

export const CollectionVideoNode = ({
  level = LEVELS.REGULAR,
  collection = defaultParams,
  videoNode = defaultParams,
} = {}) => `{
  id
  categoryId
  collectionVideoNodeCollectionId
  collectionVideoNodeVideoNodeId
  createdAt
  owner
  ${ifNotSkipped(collection.level) && `collection ${Collection(collection)}`}
  ${ifNotSkipped(videoNode.level) && `videoNode ${VideoNode(videoNode)}`}
}`;

export const Credit = ({
  profile = defaultParams,
  videoNode = defaultParams,
} = {}) => `{
  id
  role
  customProfile
  creditVideoId
  creditVideoNodeId
  owner
  ${ifNotSkipped(profile.level) && `profile ${Profile(profile)}`}
  ${ifNotSkipped(videoNode.level) && `videoNode ${VideoNode(videoNode)}`}
}`;

export const UserCollection = ({ collection = defaultParams } = {}) => `{
  list
  userSettingsCollectionsId
  userCollectionCollectionId
  createdAt
  ${ifNotSkipped(collection.level) && `collection ${Collection(collection)}`}
}`;

export const UserProfile = ({ profile = defaultParams } = {}) => `{
  list
  userSettingsProfilesId
  userProfileProfileId
  createdAt
  ${ifNotSkipped(profile.level) && `profile ${Profile(profile)}`}
}`;

export const UserSettings = ({
  videoNodes = defaultParams,
  collections = defaultParams,
  profiles = defaultParams,
} = {}) => `{
  id
  clapValue
  uiState
  profileId
  notifications ${NotificationPreference()}
  owner
  ${
    ifNotSkipped(videoNodes.level) &&
    `videoNodes ${Connection({
      children: VideoNode(videoNodes),
      variables: videoNodes.variables,
    })}`
  }
  ${
    ifNotSkipped(collections.level) &&
    `collections ${Connection({
      children: Collection(collections),
      variables: collections.variables,
    })}`
  }
  ${
    ifNotSkipped(profiles.level) &&
    `profiles ${Connection({
      children: Profile(profiles),
      variables: profiles.variables,
    })}`
  }
}`;

export const UserVideoNode = ({ videoNode = defaultParams } = {}) => `{
  list
  userSettingsVideoNodesId
  userVideoNodeVideoNodeId
  createdAt
  ${ifNotSkipped(videoNode.level) && `videoNode ${VideoNode(videoNode)}`}
}`;

export const View = ({ videoNode = defaultParams }) => `{
  id
  viewVideoNodeId
  createdAt
  owner
  ${ifNotSkipped(videoNode.level) && `videoNode ${VideoNode(videoNode)}`}
}`;
