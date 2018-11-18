import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import * as routes from '../constants/routes';
import withAuthentication from '../utils/withAuthentication';

import Navigation from '../navigation';
import SignUpScreen from './SignUp';
import SignInScreen from './SignIn';
import PasswordForgetScreen from './PasswordForget';
import BoardsScreen from './Boards';
import BoardScreen from './Board';
import AccountScreen from './Account';
import NotFoundScreen from './NotFound';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Navigation />
          <Switch className="container">
            {
              <Route
                exact
                path={routes.LANDING}
                render={() => <Redirect to={routes.BOARDS} />}
              />
            }
            <Route exact path={routes.SIGN_UP} component={SignUpScreen} />
            <Route exact path={routes.SIGN_IN} component={SignInScreen} />
            <Route
              exact
              path={routes.PASSWORD_FORGET}
              component={PasswordForgetScreen}
            />
            {<Route exact path={routes.BOARDS} component={BoardsScreen} />}
            <Route exact path={routes.ACCOUNT} component={AccountScreen} />
            <Route exact path={routes.BOARD} component={BoardScreen} />
            <Route component={NotFoundScreen} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default withAuthentication(App);
