import React from 'react';
import { Link } from 'react-router-dom';

import AuthUserContext from '../../utils/AuthUserContext';
import * as routes from '../../constants/routes';
import SignOutButton from '../SignOut';

import { Menu, Dropdown, Icon } from 'antd';
import styles from './Navigation.module.css';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
  </AuthUserContext.Consumer>
);

const NavigationAuth = () => (
  <div className={styles.nav}>
    <div>
      <div className={styles.navLinks}>
        <Link to={routes.BOARDS}>
          <Icon type="folder" /> Boards
        </Link>
      </div>
      <div className={styles.userSettings}>
        <Dropdown overlay={menu} trigger={['click']}>
          <Icon type="setting" theme="outlined" />
        </Dropdown>
      </div>
    </div>
  </div>
);

const NavigationNonAuth = () => <div />;

const menu = (
  <Menu>
    <Menu.Item key="0">
      <Link to={routes.ACCOUNT}>
        <Icon type="user" theme="outlined" />
        <span className={styles.account}>Account</span>
      </Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">
      <Icon type="logout" theme="outlined" />
      <SignOutButton />
    </Menu.Item>
  </Menu>
);

export default Navigation;
