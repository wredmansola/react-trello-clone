import React from 'react';
import { withRouter } from 'react-router-dom';

import SignInForm from './Form';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';

import styles from './SignIn.module.css';

const SignInPage = ({ history }) => (
  <div className={styles.signIn}>
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

export default withRouter(SignInPage);
