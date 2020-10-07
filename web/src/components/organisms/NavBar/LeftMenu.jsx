import React from 'react';

import { Menu } from 'antd';
import PropTypes from 'claptime/lib/prop-types';

import { useUserState } from 'claptime/lib/user';

import { SearchBar } from 'claptime/components/molecules';

const LeftMenu = ({ mode }) => {
  const user = useUserState();
  return (
    <Menu theme="light" mode={mode}>
      {user.isLoggedIn ? (
        <Menu.Item key="search">
          <SearchBar />
        </Menu.Item>
      ) : null}
    </Menu>
  );
};

LeftMenu.propTypes = {
  mode: PropTypes.string.isRequired,
};

export default LeftMenu;
