const SignInPage = ({ history }) => (
  <div>
    <h1>Sign In</h1>
    <SignIn history={history} />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

export default SignInPage;
