import React from 'react';
import { byPropKey } from '../../../utils';
import { Form, Icon, Input, Button } from 'antd';
import { auth } from '../../../firebase';
import * as routes from '../../../constants/routes';

import styles from './SignIn.module.css';

const FormItem = Form.Item;

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
};

class SignInForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(event) {
    event.preventDefault();

    const { email, password } = this.state;
    const { history } = this.props;

    return auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        history.push(routes.BOARDS);
      })
      .catch(error => {
        this.setState(byPropKey('error', error.message));
      });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { error, email, password } = this.state;
    const isInvalid = !email || !password;

    return (
      <div className={styles.form}>
        <h1 className={styles.title}>Sign In</h1>
        <Form
          onSubmit={event => this.onSubmit(event)}
          className={styles.loginForm}
        >
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Email"
                onChange={event =>
                  this.setState(byPropKey('email', event.target.value))
                }
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                onChange={event =>
                  this.setState(byPropKey('password', event.target.value))
                }
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.loginFormButton}
              disabled={isInvalid}
            >
              Log in
            </Button>
          </FormItem>
          <div className={styles.errors}>{error}</div>
        </Form>
      </div>
    );
  }
}

const WrappedSignInForm = Form.create()(SignInForm);

export default WrappedSignInForm;
