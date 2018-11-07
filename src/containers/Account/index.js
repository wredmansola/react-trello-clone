import React from 'react';

import AuthUserContext from '../../utils/AuthUserContext';
import { PasswordForgetLink } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import withAuthorization from '../../utils/withAuthorization';
import styles from './Account.module.css';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div className={styles.account}>
        <h2>Account: {authUser.email}</h2>
        <PasswordChangeForm />
        <PasswordForgetLink />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(AccountPage);
