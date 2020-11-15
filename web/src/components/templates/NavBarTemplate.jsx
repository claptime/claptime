import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';

import { Spin } from 'claptime/components/atoms';
import NavBar from 'claptime/components/organisms/NavBar';
import Footer from 'claptime/components/organisms/Footer';

import PropTypes from 'claptime/lib/prop-types';
import { useUserState } from 'claptime/lib/user';
import consts from 'claptime/consts';

const { Header } = Layout;

const {
  style: {
    navbar: { height: navbarHeight },
    colors: { primary },
  },
  device: { laptop },
} = consts;

const StyledHeader = styled(Header)`
  .ant-menu-submenu {
    color: ${(props) => props.color || 'black'};
  }
  height: ${navbarHeight};
  padding: 25px;
  font-style: normal;
  font-stretch: normal;
  width: 100%;
  background-color: ${primary};

  @media ${laptop} {
    &,
    .ant-menu {
      background-color: transparent;
    }
  }
`;

const NavBarTemplate = ({ children, collapsed }) => {
  const [windowDimensions, setWindowDimensions] = useState({});
  useEffect(() => {
    function handleResize() {
      setWindowDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const user = useUserState();

  if (!user.loaded) {
    return (
      <div
        style={{
          height: '100vh',
        }}
      >
        <Spin />
      </div>
    );
  }

  return (
    <>
      <Layout>
        <StyledHeader color={primary}>
          <NavBar
            logoSize={collapsed ? 'small' : 'large'}
            logoColor={windowDimensions.width >= 1024 ? primary : 'white'}
          />
        </StyledHeader>
        {children}
        <Footer />
      </Layout>
    </>
  );
};

NavBarTemplate.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  collapsed: PropTypes.bool,
};

NavBarTemplate.defaultProps = {
  collapsed: false,
};

export default NavBarTemplate;
