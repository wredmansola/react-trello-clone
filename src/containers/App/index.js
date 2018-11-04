import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import * as routes from '../../constants/routes';
import withAuthentication from '../../utils/withAuthentication';

import Navigation from '../Navigation';
import LandingPage from '../../pages/Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import BoardPage from '../../components/Board/index';
import NotFound from '../../pages/NotFound';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Navigation />
          <Switch>
            <Route exact path={routes.LANDING} component={LandingPage} />
            <Route exact path={routes.SIGN_UP} component={SignUpPage} />
            <Route exact path={routes.SIGN_IN} component={SignInPage} />
            <Route
              exact
              path={routes.PASSWORD_FORGET}
              component={PasswordForgetPage}
            />
            <Route exact path={routes.HOME} component={HomePage} />
            <Route exact path={routes.ACCOUNT} component={AccountPage} />
            <Route exact path={routes.BOARD} component={BoardPage} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default withAuthentication(App);
