import React from 'react';
import { Link } from 'react-router-dom';

import AuthUserContext from '../../utils/AuthUserContext';
import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
  </AuthUserContext.Consumer>
);

const NavigationAuth = () => (
  <div className="nav">
    <div>
      <Link to={routes.LANDING}>Landing</Link>
    </div>
    <div>
      <Link to={routes.HOME}>Home</Link>
    </div>
    <div>
      <Link to={routes.ACCOUNT}>Account</Link>
    </div>
    <div>
      <SignOutButton />
    </div>
  </div>
);

const NavigationNonAuth = () => (
  <div>
    <div>
      <Link to={routes.LANDING}>Landing</Link>
    </div>
    <div>
      <Link to={routes.SIGN_IN}>Sign In</Link>
    </div>
  </div>
);

export default Navigation;
