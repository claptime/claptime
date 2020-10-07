import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Auth } from 'aws-amplify';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import PropTypes from 'claptime/lib/prop-types';
import { Button } from 'claptime/components/atoms';
import NotificationsAvatar from 'components/molecules/NotificationsAvatar';
import { useUserState } from 'claptime/lib/user';
import consts from 'claptime/consts';

import AuthenticatorModal from '../AuthenticatorModal';

const { style, blog } = consts;

const {
  colors: { primary },
} = style;

const StyledMenuItem = styled(Menu.Item)`
  font-weight: ${({ current }) => (current ? 'bold' : 'normal')};
`;

const StyledButton = styled.button`
  all: unset;
  font-size: 16px;
`;

const RightMenu = ({ mode }) => {
  const { pathname } = useRouter();
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [initialAuthState, setInitialAuthState] = useState('signin');
  const user = useUserState();

  return (
    <>
      <Menu
        color={primary}
        theme="light"
        mode={mode}
        defaultOpenKeys={
          mode === 'inline'
            ? ['submenu-browse', 'submenu-user', 'submenu-about']
            : []
        }
      >
        <Menu.SubMenu
          key="submenu-browse"
          title={t('navbar.browse').toLowerCase()}
        >
          <StyledMenuItem
            color={primary}
            key="browse-profiles"
            current={pathname === '/profiles' ? 1 : 0}
          >
            <Link href="/profiles">
              <a>{t('navbar.browseProfiles')}</a>
            </Link>
          </StyledMenuItem>
          <StyledMenuItem
            color={primary}
            key="browse-collections"
            current={pathname === '/collections' ? 1 : 0}
          >
            <Link href="/collections">
              <a>{t('navbar.browseCollections')}</a>
            </Link>
          </StyledMenuItem>
          {user.isLoggedIn
            ? [
                <StyledMenuItem
                  color={primary}
                  key="browse-my-favorites"
                  current={pathname === '/my-favorites' ? 1 : 0}
                >
                  <Link href="/my-favorites">
                    <a>{t('navbar.browseMyFavorites')}</a>
                  </Link>
                </StyledMenuItem>,
                <StyledMenuItem
                  color={primary}
                  key="browse-my-list"
                  current={pathname === '/my-list' ? 1 : 0}
                >
                  <Link href="/my-list">
                    <a>{t('navbar.browseMyList')}</a>
                  </Link>
                </StyledMenuItem>,
              ]
            : null}
        </Menu.SubMenu>
        {user.isLoggedIn ? (
          <Menu.SubMenu
            key="submenu-user"
            title={
              <span>
                {user.firstName} <UserOutlined />
              </span>
            }
          >
            <StyledMenuItem color={primary} key="account">
              <Link href="/my-account">
                <a>{t('navbar.myAccount')}</a>
              </Link>
            </StyledMenuItem>
            <StyledMenuItem color={primary} key="profile">
              <Link href="/my-profile">
                <a>{t('navbar.myProfile')}</a>
              </Link>
            </StyledMenuItem>
            {user.isAdmin ? (
              <StyledMenuItem color={primary} key="admin">
                <Link href="/admin">
                  <a>{t('navbar.admin')}</a>
                </Link>
              </StyledMenuItem>
            ) : null}
            <StyledMenuItem color={primary} key="help">
              <a
                rel="noopener noreferrer"
                target="_blank"
                href={consts.helpCenter}
              >
                {t('navbar.help')}
              </a>
            </StyledMenuItem>
            <StyledMenuItem
              color={primary}
              key="signOut"
              onClick={() => Auth.signOut()}
            >
              {t('register.logout')}
            </StyledMenuItem>
          </Menu.SubMenu>
        ) : (
          [
            <Menu.SubMenu key="submenu-about" title={t('navbar.about')}>
              <StyledMenuItem
                color={primary}
                key="concept"
                current={pathname === '/about/spectators' ? 1 : 0}
              >
                <Link href="/about/spectators">
                  <a>{t('navbar.spectators').toLowerCase()}</a>
                </Link>
              </StyledMenuItem>
              <StyledMenuItem
                color={primary}
                key="filmmakers"
                current={pathname === '/about/filmmakers' ? 1 : 0}
              >
                <Link href="/about/filmmakers">
                  <a>{t('navbar.filmmakers').toLowerCase()}</a>
                </Link>
              </StyledMenuItem>
              <StyledMenuItem
                color={primary}
                key="press"
                current={pathname === '/about/press' ? 1 : 0}
              >
                <Link href="/about/press">
                  <a>{t('navbar.press').toLowerCase()}</a>
                </Link>
              </StyledMenuItem>
              <StyledMenuItem color={primary} key="blog">
                <a rel="noopener noreferrer" target="_blank" href={blog}>
                  {t('navbar.blog')}
                </a>
              </StyledMenuItem>
            </Menu.SubMenu>,
            <StyledMenuItem color={primary} key="subscribe">
              <StyledButton
                type="button"
                onClick={() => {
                  setInitialAuthState('signup');
                  setShowModal(true);
                }}
              >
                {t('navbar.subscribe').toLowerCase()}
              </StyledButton>
            </StyledMenuItem>,
            <StyledMenuItem color={primary} key="signIn">
              <Button
                style={{ height: '20px', lineHeight: '20px' }}
                color={primary}
                text={t('register.login')}
                onClick={() => {
                  setShowModal(true);
                  setInitialAuthState('signin');
                }}
              />
            </StyledMenuItem>,
          ]
        )}
        {user.isLoggedIn && (
          <StyledMenuItem>
            <NotificationsAvatar />
          </StyledMenuItem>
        )}
      </Menu>
      <AuthenticatorModal
        initialAuthState={initialAuthState}
        visible={showModal}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
};

RightMenu.propTypes = {
  mode: PropTypes.string.isRequired,
};

export default RightMenu;
