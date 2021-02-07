import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import styled from 'styled-components';

import PropTypes from 'claptime/lib/prop-types';

import { Logo } from 'claptime/components/atoms';
import Notifications from 'claptime/components/molecules/Notifications';
import consts from 'claptime/consts';
import { useUserState } from 'claptime/lib/user';

import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';

const { style } = consts;
const {
  colors: { primary },
} = style;

const StyledNav = styled.nav`
  align-items: center;

  .ant-menu-horizontal {
    border-bottom: none;
  }

  .ant-menu-inline {
    border-right: none;
  }

  .ant-menu-item,
  .ant-menu-submenu-title {
    font-weight: normal;
    font-size: 16px;
  }

  .logo {
    height: 100%;
  }

  .menu {
    width: calc(100%);
  }

  .menu-items {
    flex-grow: 1;
    display: inline-flex;
    justify-content: space-between;
  }

  .ant-menu-horizontal > .ant-menu-item > a {
    font-size: 16px;
  }

  .bars-menu {
    height: 32px;
    display: none;
    background: none;
    border-color: white;
    align-self: center;
    position: absolute;
    right: 3%;
  }
  .bars-btn {
    display: block;
    width: 20px;
    height: 2px;
    background: white;
    position: relative;
  }
  .bars-btn:after,
  .bars-btn:before {
    content: attr(x);
    width: 20px;
    position: absolute;
    top: -5px;
    left: 0;
    height: 2px;
    background: white;
  }
  .bars-btn:after {
    top: auto;
    bottom: -5px;
  }

  .ant-menu-horizontal > .ant-menu-item,
  .ant-menu-horizontal > .ant-menu-item:hover,
  .ant-menu-horizontal > .ant-menu-item-active,
  .ant-menu-submenu-horizontal.ant-menu-submenu,
  .ant-menu-submenu-horizontal.ant-menu-submenu:hover {
    border-bottom: 0 !important;
  }
  #claptime-notifications-menu-container {
    display: none;
  }
  @media (max-width: 1023px) {
    .logo g,
    .logo g path {
      fill: white;
    }

    #claptime-notifications-menu-container {
      display: block;
      margin-left: auto;
      margin-right: 80px;
    }
    .bars-menu {
      display: inline-block;
    }

    .menu-items {
      display: none;
    }

    .ant-layout-header {
      line-height: 50px;
      height: 100px;
    }

    .menu {
      line-height: 50px;
    }
  }
  .ant-menu-horizontal > .ant-menu-item-selected {
    border: none;
  }
`;

const StyledDrawer = styled(Drawer)`
  /* searchBar */
  .global-search-wrapper {
    width: 85%;
  }
  .ant-menu-item-selected {
    background-color: transparent !important;
  }

  .ant-menu-submenu-arrow::before,
  .ant-menu-submenu-arrow::after {
    background: linear-gradient(to right, white, white) !important;
  }

  .ant-menu-inline {
    border-right: none;
  }

  .ant-menu-inline .ant-menu-item {
    height: auto;
  }

  .ant-drawer-content,
  .ant-menu,
  .ant-menu-sub.ant-menu-inline,
  .ant-menu-item-active,
  .ant-menu-submenu-active,
  .ant-menu-submenu-title:hover,
  .ant-menu-sub,
  .ant-menu-sub li,
  .ant-menu-sub a,
  .ant-menu-item > a,
  .ant-menu-item-selected,
  button {
    background-color: ${primary} !important;
    color: white !important;
  }

  button svg rect {
    stroke: white;
  }

  .ant-menu-item:hover {
    font-weight: bold;
  }

  .ant-drawer-close {
    color: white;
    top: 15px;
    right: 15px;
  }
`;

const NavBar = ({ logoSize }) => {
  const [visible, setVisible] = useState(false);
  const user = useUserState();

  return (
    <StyledNav className="nav-bar" style={{ width: '100%', display: 'flex' }}>
      <div className="logo" style={{ height: 40, textAlign: 'center' }}>
        <Logo size={logoSize} />
      </div>
      <div className="menu-items">
        <LeftMenu mode="horizontal" />
        <RightMenu mode="horizontal" />
      </div>

      {user.isLoggedIn && (
        <div id="claptime-notifications-menu-container">
          <Notifications />
        </div>
      )}
      <Button
        className="bars-menu"
        type="primary"
        onClick={() => setVisible(true)}
      >
        <span className="bars-btn" />
      </Button>
      <StyledDrawer
        placement="right"
        onClose={() => setVisible(false)}
        visible={visible}
        width="100%"
        closable
      >
        <LeftMenu mode="inline" />
        <RightMenu mode="inline" />
      </StyledDrawer>
    </StyledNav>
  );
};

NavBar.propTypes = {
  logoSize: PropTypes.oneOf(['small', 'large']),
};

NavBar.defaultProps = {
  logoSize: 'large',
};

export default NavBar;
