import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import * as routes from '../../constants/routes';
import withAuthentication from '../../utils/withAuthentication';

import Navigation from '../Navigation';
import LandingPage from '../../pages/Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignInPage/index';
import PasswordForgetPage from '../PasswordForget';
import BoardsPage from '../Boards';
import AccountPage from '../Account';
import Board from '../Board/index';
import NotFound from '../../pages/NotFound';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <Switch className="container">
            <Route exact path={routes.LANDING} component={LandingPage} />
            <Route exact path={routes.SIGN_UP} component={SignUpPage} />
            <Route exact path={routes.SIGN_IN} component={SignInPage} />
            <Route
              exact
              path={routes.PASSWORD_FORGET}
              component={PasswordForgetPage}
            />
            <Route exact path={routes.BOARDS} component={BoardsPage} />
            <Route exact path={routes.ACCOUNT} component={AccountPage} />
            <Route exact path={routes.BOARD} component={Board} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default withAuthentication(App);
