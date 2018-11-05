import React from 'react';
import { byPropKey } from '../../utils';
import { Form, Icon, Input, Button } from 'antd';
import './index.css';

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
  }

  onSubmit(event) {
    const { email, password } = this.state;

    this.props.onSubmit(email, password).catch(error => {
      console.log(error);
      this.setState(byPropKey('error', error.message));
    });

    event.preventDefault();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { error } = this.state;

    return (
      <div className="sign-in">
        <h1 className="title">Sign In</h1>
        <Form onSubmit={event => this.onSubmit(event)} className="login-form">
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
              className="login-form-button"
            >
              Log in
            </Button>
          </FormItem>
          <div className="errors">{error}</div>
        </Form>
      </div>
    );
  }
}

const WrappedSignInForm = Form.create()(SignInForm);

export default WrappedSignInForm;
