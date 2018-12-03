import React, { Component } from 'react';

import { auth } from '../../firebase';
import { Form, Icon, Input, Button } from 'antd';
import { byPropKey } from '../../utils/index';
import styled from 'styled-components';

const FormItem = Form.Item;

const INITIAL_STATE = {
  email: '',
  error: null
};

class PasswordForgetScreen extends Component {
  state = { ...INITIAL_STATE };

  async handleSubmit(event) {
    event.preventDefault();

    const { email } = this.state;

    this.props.onSubmit(email).catch(error => {
      this.setState(byPropKey('error', error.message));
    });

    return auth.doPasswordReset(email);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { error } = this.state;

    return (
      <PasswordForgetForm>
        <h1 className="title">Password Forget</h1>
        <Form
          onSubmit={event => this.handleSubmit(event)}
          className="login-form"
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
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Restore
            </Button>
          </FormItem>
          <Error>{error}</Error>
        </Form>
      </PasswordForgetForm>
    );
  }
}

const PasswordForgetForm = styled.div`
  min-width: 300px;
  margin: auto;
`;

const Error = styled.div`
  color: red;
`;

export default Form.create()(PasswordForgetScreen);
