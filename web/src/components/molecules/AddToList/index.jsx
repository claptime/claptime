import React from 'react';
import { Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

import { IconButton, Icons } from 'claptime/components/atoms';
import PropTypes from 'claptime/lib/prop-types';
import { userActions, useUserDispatch, useUserState } from 'claptime/lib/user';

const mapping = {
  Collection: {
    idField: 'userCollectionCollectionId',
    settingsProperty: 'collections',
    SUBSCRIBED: {
      icons: {
        With: Icons.FullHeart,
        Without: Icons.EmptyHeart,
      },
      i18n: {
        addToList: 'collection.subscribe',
        removeFromList: 'collection.unsubscribe',
      },
    },
  },
  Profile: {
    idField: 'userProfileProfileId',
    settingsProperty: 'profiles',
    FOLLOWED: {
      icons: {
        With: Icons.FullHeart,
        Without: Icons.EmptyHeart,
      },
      i18n: {
        addToList: 'profile.follow',
        removeFromList: 'profile.unfollow',
      },
    },
  },
  VideoNode: {
    idField: 'userVideoNodeVideoNodeId',
    settingsProperty: 'videos',
    TO_WATCH: {
      icons: {
        With: Icons.FullBookmark,
        Without: Icons.EmptyBookmark,
      },
      i18n: {
        addToList: 'video.addToMyList',
        removeFromList: 'video.removeFromMyList',
      },
    },
    LIKED: {
      icons: {
        With: Icons.FullHeart,
        Without: Icons.EmptyHeart,
      },
      i18n: {
        addToList: 'video.like',
        removeFromList: 'video.unlike',
      },
    },
  },
};

const AddToList = ({ id, type, list, iconColor, containerId, style }) => {
  const dispatch = useUserDispatch();
  const { isLoggedIn, settings } = useUserState();
  const { t } = useTranslation();

  if (!isLoggedIn) {
    return null;
  }

  const isInList =
    typeof settings[mapping[type].settingsProperty].find(
      (item) => item.list === list && item[mapping[type].idField] === id,
    ) === 'object';

  const onClick = async (event) => {
    event.preventDefault();
    if (isInList) {
      await userActions.removeItemFromList(dispatch)({
        list,
        type,
        id,
      });
    } else {
      await userActions.addItemToList(dispatch)({
        list,
        type,
        id,
      });
    }
  };
  const Icon = isInList
    ? mapping[type][list].icons.With
    : mapping[type][list].icons.Without;
  return (
    <Tooltip
      title={
        isInList
          ? t(mapping[type][list].i18n.removeFromList)
          : t(mapping[type][list].i18n.addToList)
      }
      getPopupContainer={() =>
        containerId ? document.getElementById(containerId) : document.body
      }
    >
      {/* without this div, tooltip is not displayed : https://codesandbox.io/s/94y3wwyk4y */}
      <div
        style={{
          display: 'inline-block',
          marginLeft: 4,
          marginRight: 4,
          ...style,
        }}
      >
        <IconButton
          color={iconColor}
          onClick={onClick}
          component={Icon}
          height="24px"
          width="24px"
        />
      </div>
    </Tooltip>
  );
};

AddToList.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['Collection', 'VideoNode', 'Profile']).isRequired,
  list: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  containerId: PropTypes.string,
  style: PropTypes.object,
};

AddToList.defaultProps = {
  containerId: undefined,
  iconColor: undefined,
  style: {},
};

export default AddToList;
