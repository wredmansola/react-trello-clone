import React, { Component } from 'react';

import { auth } from '../../firebase';
import WrappedAccountForm from '../Account';

class PasswordChangeScreen extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = password => {
    auth.doPasswordUpdate(password);
  };

  render() {
    return <WrappedAccountForm onSubmit={this.onSubmit} />;
  }
}

export default PasswordChangeScreen;
