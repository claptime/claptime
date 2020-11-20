// https://kentcdodds.com/blog/how-to-use-react-context-effectively
import React from 'react';
import Router from 'next/router';

import consts from 'claptime/consts';
import PropTypes from 'claptime/lib/prop-types';
import userActions from './actions';

const {
  DEFAULT_CLAP_VALUE,
  userSettings: {
    notifications: {
      types: { NEWSLETTER, LABFILMS_NEWSLETTER },
      channels: { EMAIL },
    },
  },
} = consts;

const clone = (obj) => JSON.parse(JSON.stringify(obj));

const UserStateContext = React.createContext();
const UserDispatchContext = React.createContext();

const initialState = {
  loaded: false,
  settings: {
    clapValue: DEFAULT_CLAP_VALUE,
    profileId: null,
    uiState: {},
  },
  userCollections: [],
};

function userReducer(state, action) {
  switch (action.type) {
    case 'loaded':
      return {
        ...state,
        // is user isn't logged, user is loaded
        // otherwise we wait for settings
        loaded: !action.payload.isLoggedIn,
        ...action.payload,
      };
    case 'settingsLoaded':
      return {
        ...state,
        loaded: true,
        settings: {
          ...state.settings,
          ...action.payload,
        },
        hasPublicProfile:
          typeof action.payload.profileId === 'string' ||
          state.hasPublicProfile,
        // For now, a user is considered as onboarded if he set consent for both newsletters
        isOnboarded:
          action.payload.notifications &&
          action.payload.notifications.find(
            ({ type, channel }) => type === NEWSLETTER && channel === EMAIL,
          ) &&
          action.payload.notifications.find(
            ({ type, channel }) =>
              type === LABFILMS_NEWSLETTER && channel === EMAIL,
          ),
      };
    case 'settingUpdated':
      return {
        ...state,
        settings: {
          ...state.settings,
          [action.payload.name]: action.payload.value,
        },
        hasPublicProfile:
          action.payload.name === 'profileId'
            ? action.payload.value
            : state.hasPublicProfile,
      };
    case 'userListItemAdded': {
      const { collections, profiles, videos } = state.settings;
      if (
        action.payload.type === 'Collection' &&
        !collections.find(
          ({ list, userCollectionCollectionId }) =>
            action.payload.data.list === list &&
            action.payload.data.userCollectionCollectionId ===
              userCollectionCollectionId,
        )
      ) {
        collections.push(action.payload.data);
      }
      if (
        action.payload.type === 'Profile' &&
        !profiles.find(
          ({ list, userProfileProfileId }) =>
            action.payload.data.list === list &&
            action.payload.data.userProfileProfileId === userProfileProfileId,
        )
      ) {
        profiles.push(action.payload.data);
      }
      if (
        action.payload.type === 'VideoNode' &&
        !videos.find(
          ({ list, userVideoNodeVideoNodeId }) =>
            action.payload.data.list === list &&
            action.payload.data.userVideoNodeVideoNodeId ===
              userVideoNodeVideoNodeId,
        )
      ) {
        videos.push(action.payload.data);
      }
      return {
        ...state,
        settings: {
          ...state.settings,
          collections,
          profiles,
          videos,
        },
      };
    }
    case 'userListItemRemoved':
      return {
        ...state,
        settings: {
          ...state.settings,
          collections: state.settings.collections.filter(
            ({ list, userCollectionCollectionId }) =>
              action.payload.type !== 'Collection' ||
              action.payload.list !== list ||
              action.payload.id !== userCollectionCollectionId,
          ),
          profiles: state.settings.profiles.filter(
            ({ list, userProfileProfileId }) =>
              action.payload.type !== 'Profile' ||
              action.payload.list !== list ||
              action.payload.id !== userProfileProfileId,
          ),
          videos: state.settings.videos.filter(
            ({ list, userVideoNodeVideoNodeId }) =>
              action.payload.type !== 'VideoNode' ||
              action.payload.list !== list ||
              action.payload.id !== userVideoNodeVideoNodeId,
          ),
        },
      };
    case 'signOut':
      return {
        ...clone(initialState),
        loaded: true,
        isLoggedIn: false,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function UserProvider({ children }) {
  const [state, dispatch] = React.useReducer(userReducer, clone(initialState));
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useUserState() {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
}

function useUserDispatch() {
  const context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider');
  }
  return context;
}

function useIsAuthenticated() {
  const user = useUserState();
  if (!user.isLoggedIn) {
    if (user.loaded) {
      Router.push('/');
    }
    return false;
  }
  return true;
}

function useIsAdmin() {
  const user = useUserState();
  if (!user.isLoggedIn || !user.groups || !user.groups.includes('admin')) {
    if (user.loaded) {
      Router.push('/');
    }
    return false;
  }
  return true;
}

export {
  UserProvider,
  useIsAdmin,
  useIsAuthenticated,
  useUserState,
  useUserDispatch,
  userActions,
};
