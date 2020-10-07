import { Auth } from 'aws-amplify';
import { gql } from '@apollo/client';

import {
  createUserSettings,
  getUserSettings,
  updateUserSettings,
  createUserCollection,
  deleteUserCollection,
  listUserCollections,
  createUserProfile,
  deleteUserProfile,
  listUserProfiles,
  createUserVideoNode,
  deleteUserVideoNode,
  listUserVideoNodes,
} from 'claptime/graphql/users';
import { setChatValue } from 'claptime/lib/chat';
import { getDefault } from 'claptime/lib/languages';
import { authClient as apolloClient } from 'claptime/lib/apollo';
import { listItems } from 'claptime/utils';

const loadUserSettings = (dispatch) => async () => {
  const cognitoUser = await Auth.currentAuthenticatedUser();
  const {
    data: { getUserSettings: userSettings },
  } = await apolloClient.query({
    query: gql(getUserSettings),
    variables: {
      id: cognitoUser.username,
    },
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  });
  const payload = {};
  if (userSettings) {
    const [userCollections, userProfiles, userVideos] = await Promise.all([
      listItems({
        apolloClient,
        query: listUserCollections,
        queryName: 'getUserSettings',
        itemsPath: ['collections', 'items'],
        variables: {
          userId: cognitoUser.username,
        },
        limit: 50,
      }),
      listItems({
        apolloClient,
        query: listUserProfiles,
        queryName: 'getUserSettings',
        itemsPath: ['profiles', 'items'],
        variables: {
          userId: cognitoUser.username,
        },
        limit: 50,
      }),
      listItems({
        apolloClient,
        query: listUserVideoNodes,
        queryName: 'getUserSettings',
        itemsPath: ['videoNodes', 'items'],
        variables: {
          userId: cognitoUser.username,
        },
        limit: 50,
      }),
    ]);
    payload.collections = userCollections;
    payload.profiles = userProfiles;
    payload.videos = userVideos;
    payload.id = userSettings.id;
    if (userSettings.clapValue) {
      payload.clapValue = userSettings.clapValue;
    }
    if (userSettings.profileId) {
      payload.profileId = userSettings.profileId;
    }
    if (userSettings.uiState) {
      payload.uiState = JSON.parse(userSettings.uiState);
    }
    if (userSettings.notifications) {
      payload.notifications = userSettings.notifications;
    }
  } else {
    await apolloClient.mutate({
      mutation: gql(createUserSettings),
      variables: {
        input: {
          id: cognitoUser.username,
        },
      },
    });
    payload.id = cognitoUser.username;
    payload.collections = [];
    payload.profiles = [];
    payload.videos = [];
  }
  dispatch({
    type: 'settingsLoaded',
    payload,
  });
};

const loadCognitoUser = (dispatch) => async ({
  reloadUserSettings = false,
}) => {
  try {
    const {
      username,
      attributes,
      signInUserSession,
    } = await Auth.currentAuthenticatedUser({ bypassCache: true });
    // logged in
    const groups = signInUserSession.idToken.payload['cognito:groups'] || [];
    dispatch({
      type: 'loaded',
      payload: {
        birthDate: attributes.birthdate,
        email: attributes.email,
        firstName: attributes.given_name,
        isLoggedIn: true,
        lastName: attributes.family_name,
        locale: attributes.locale,
        username,
        groups,
        isAdmin: groups.includes('admin'),
      },
    });
    setChatValue('email', attributes.email);
    setChatValue('nickname', attributes.given_name);

    if (reloadUserSettings) {
      loadUserSettings(dispatch)();
    }
  } catch (e) {
    // not logged in
    dispatch({
      type: 'loaded',
      payload: {
        isLoggedIn: false,
      },
    });
  }
};

const signOut = (dispatch) => async () => {
  dispatch({
    type: 'signOut',
  });
};

const updateUserAttributes = (dispatch) => async ({
  firstName,
  lastName,
  birthDate,
  locale,
}) => {
  const cognitoUser = await Auth.currentAuthenticatedUser();
  await Auth.updateUserAttributes(cognitoUser, {
    given_name: firstName,
    family_name: lastName,
    birthdate: birthDate,
    locale: locale || getDefault(),
  });
  return loadUserSettings(dispatch)();
};

const updateUserSetting = (dispatch) => async ({
  name,
  value,
  previousValue,
}) => {
  const clonedPreviousValue = JSON.parse(JSON.stringify(previousValue));
  try {
    // first update state, and rollback if it fails
    dispatch({
      type: 'settingUpdated',
      payload: {
        name,
        value,
      },
    });
    const cognitoUser = await Auth.currentAuthenticatedUser();
    await apolloClient.mutate({
      mutation: gql(updateUserSettings),
      variables: {
        input: {
          id: cognitoUser.username,
          [name]: typeof value === 'object' ? JSON.stringify(value) : value,
          owner: cognitoUser.username,
        },
      },
    });
  } catch (e) {
    dispatch({
      type: 'settingUpdated',
      payload: {
        name,
        value: clonedPreviousValue,
      },
    });
  }
};

const addItemToList = (dispatch) => async ({ type, list, id }) => {
  let mutation;
  let mutationName;
  let itemIdFieldName;
  let userIdFieldName;
  switch (type) {
    case 'Collection':
      mutation = createUserCollection;
      mutationName = 'createUserCollection';
      itemIdFieldName = 'userCollectionCollectionId';
      userIdFieldName = 'userSettingsCollectionsId';
      break;
    case 'Profile':
      mutation = createUserProfile;
      mutationName = 'createUserProfile';
      itemIdFieldName = 'userProfileProfileId';
      userIdFieldName = 'userSettingsProfilesId';
      break;
    case 'VideoNode':
      mutation = createUserVideoNode;
      mutationName = 'createUserVideoNode';
      itemIdFieldName = 'userVideoNodeVideoNodeId';
      userIdFieldName = 'userSettingsVideoNodesId';
      break;
    default:
      break;
  }
  try {
    const cognitoUser = await Auth.currentAuthenticatedUser();
    const { data } = await apolloClient.mutate({
      mutation: gql(mutation),
      variables: {
        input: {
          list,
          [itemIdFieldName]: id,
          [userIdFieldName]: cognitoUser.username,
        },
      },
    });
    dispatch({
      type: 'userListItemAdded',
      payload: {
        type,
        data: data[mutationName],
      },
    });
  } catch (e) {
    console.error(e);
  }
};

const removeItemFromList = (dispatch) => async ({ type, list, id }) => {
  let mutation;
  let itemIdFieldName;
  let userIdFieldName;

  switch (type) {
    case 'Collection':
      mutation = deleteUserCollection;
      itemIdFieldName = 'userCollectionCollectionId';
      userIdFieldName = 'userSettingsCollectionsId';
      break;
    case 'Profile':
      mutation = deleteUserProfile;
      itemIdFieldName = 'userProfileProfileId';
      userIdFieldName = 'userSettingsProfilesId';
      break;
    case 'VideoNode':
      mutation = deleteUserVideoNode;
      itemIdFieldName = 'userVideoNodeVideoNodeId';
      userIdFieldName = 'userSettingsVideoNodesId';
      break;
    default:
      break;
  }
  try {
    const cognitoUser = await Auth.currentAuthenticatedUser();
    await apolloClient.mutate({
      mutation: gql(mutation),
      variables: {
        input: {
          list,
          [itemIdFieldName]: id,
          [userIdFieldName]: cognitoUser.username,
        },
      },
    });
    dispatch({
      type: 'userListItemRemoved',
      payload: {
        type,
        list,
        id,
      },
    });
  } catch (e) {
    console.error(e);
  }
};

export default {
  loadCognitoUser,
  loadUserSettings,
  signOut,
  updateUserAttributes,
  updateUserSetting,
  addItemToList,
  removeItemFromList,
};
