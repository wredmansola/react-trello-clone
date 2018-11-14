import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import * as routes from '../constants/routes';
import withAuthentication from '../utils/withAuthentication';

import Navigation from './Navigation';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import BoardsPage from './Boards';
import BoardPage from './Board';
import AccountPage from './Account';
import NotFoundPage from './NotFound';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <Switch className="container">
            {
              <Route
                exact
                path={routes.LANDING}
                render={() => <Redirect to={routes.BOARDS} />}
              />
            }
            <Route exact path={routes.SIGN_UP} component={SignUpPage} />
            <Route exact path={routes.SIGN_IN} component={SignInPage} />
            <Route
              exact
              path={routes.PASSWORD_FORGET}
              component={PasswordForgetPage}
            />
            {<Route exact path={routes.BOARDS} component={BoardsPage} />}
            <Route exact path={routes.ACCOUNT} component={AccountPage} />
            <Route exact path={routes.BOARD} component={BoardPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default withAuthentication(App);
