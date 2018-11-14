import React, { Component } from 'react';

import WrappedPasswordForgetForm from './PasswordForgetForm';
import { auth } from '../../firebase';

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

export default PasswordForgetPage;
