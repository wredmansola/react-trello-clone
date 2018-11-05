import React from 'react';
import { withRouter } from 'react-router-dom';

import './index.css';

import SignInForm from './SignInForm';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';

const SignInPage = ({ history }) => (
  <div className="sign-in">
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

export default withRouter(SignInPage);
