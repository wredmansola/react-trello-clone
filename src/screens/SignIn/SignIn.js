import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import SignInForm from './SignInForm';
import SignUpLink from '../SignUp/SignUpLink';
import PasswordForgetLink from '../PasswordForget/PasswordForgetLink';

const SignInScreen = ({ history }) => (
  <StyledSignInScreen>
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink />
  </StyledSignInScreen>
);

const StyledSignInScreen = styled.div`
  min-width: 300px;
  margin: auto;
`;

export default withRouter(SignInScreen);
