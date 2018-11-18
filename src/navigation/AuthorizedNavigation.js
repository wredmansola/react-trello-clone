import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';
import SignOutButton from '../screens/SignOut';

import { Menu, Dropdown, Icon } from 'antd';
import styled from 'styled-components';
import Button from '../components/Button';

const Nav = styled.nav`
  background: #026aa7;
  padding: 4px;
  margin-bottom: 10px;
`;

const NavItems = styled.div`
  display: inline-block;
  margin-right: 10px;
  a {
    display: inline-block;
  }
`;

const NavUser = styled.div`
  position: absolute;
  right: 0;
  top: 4px;
  div {
    display: inline-block;
  }
`;

const StyledLink = styled(Link)`
  display: inline-block !important;
`;

const NavigationAuth = () => (
  <Nav>
    <NavItems>
      <Link to={routes.BOARDS}>
        <Button>
          <Icon type="home" />
        </Button>
      </Link>
    </NavItems>
    <NavUser>
      <Button>
        <Icon type="plus" />
      </Button>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button>
          <Icon type="setting" theme="outlined" />
        </Button>
      </Dropdown>
    </NavUser>
  </Nav>
);

const menu = (
  <Menu>
    <Menu.Item key="0">
      <Icon type="user" theme="outlined" />
      <StyledLink to={routes.ACCOUNT}>Settings</StyledLink>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">
      <Icon type="logout" theme="outlined" />
      <SignOutButton />
    </Menu.Item>
  </Menu>
);

export default NavigationAuth;
