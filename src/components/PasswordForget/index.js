import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import WrappedPasswordForgetForm from './PasswordForgetForm';

import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

class PasswordForgetPage extends Component {
  constructor() {
    super();

    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(email) {
    return auth.doPasswordReset(email);
  }

  render() {
    return <WrappedPasswordForgetForm onSubmit={this.onSubmit} />;
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

export { PasswordForgetLink };
