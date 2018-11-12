import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { auth, db } from '../../firebase';
import * as routes from '../../constants/routes';
import WrappedSignUpForm from './Form';

class SignUpPage extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(email, password, username) {
    const { history } = this.props;
    return auth
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        db.doCreateUser(authUser.user.uid, username, email);
        history.push(routes.BOARDS);
      });
  }

  render() {
    return <WrappedSignUpForm onSubmit={this.onSubmit} />;
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
);

export default withRouter(SignUpPage);

export { SignUpLink };
