import React from 'react';
import { withRouter } from 'react-router-dom';

import SignInForm from './SignInForm';
import { SignUpLink } from '../SignUp';
import PasswordForgetLink from '../PasswordForget/PasswordForgetLink';

import styles from './SignIn.module.css';

const SignInScreen = ({ history }) => (
  <div className={styles.signIn}>
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

export default withRouter(SignInScreen);
