import React from 'react';
import { withRouter } from 'react-router-dom';

import styles from './SignIn.module.css';

import SignInForm from './SignInForm';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';

const SignInPage = ({ history }) => (
  <div className={styles.signIn}>
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

export default withRouter(SignInPage);
