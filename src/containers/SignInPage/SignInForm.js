import React, { Component } from 'react';

import WrappedSignInForm from '../../components/SignIn/index';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @param {string} email
   * @param {string} password
   */
  async onSubmit(email, password) {
    const { history } = this.props;
    return auth.doSignInWithEmailAndPassword(email, password).then(() => {
      history.push(routes.HOME);
    });
  }

  render() {
    return <WrappedSignInForm onSubmit={this.onSubmit} />;
  }
}

export default SignInForm;
