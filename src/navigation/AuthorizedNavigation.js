import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Dropdown, Icon } from 'antd';

import * as routes from '../constants/routes';
import SignOutButton from '../screens/SignOut';

import styled from 'styled-components';
import Button from '../components/Button';
import { Nav, NavItems, NavUser } from './styled';

const StyledLink = styled(Link)`
  display: inline-block !important;
`;

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

class NavigationAuth extends Component {
  render() {
    return (
      <Nav>
        <NavItems>
          <Link to={routes.BOARDS}>
            <Button>
              <Icon type="home" />
            </Button>
          </Link>
        </NavItems>
        <NavUser>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button>
              <Icon type="setting" theme="outlined" />
            </Button>
          </Dropdown>
        </NavUser>
      </Nav>
    );
  }
}

export default withRouter(NavigationAuth);
