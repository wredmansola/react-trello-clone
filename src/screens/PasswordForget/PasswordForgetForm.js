import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';

import { byPropKey } from '../../utils/index';

import styles from './PasswordForgetForm.module.css';

const FormItem = Form.Item;

const INITIAL_STATE = {
  email: '',
  error: null
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit(event) {
    const { email } = this.state;

    this.props.onSubmit(email).catch(error => {
      this.setState(byPropKey('error', error.message));
    });

    event.preventDefault();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { error } = this.state;
    const isInvalid = !error;

    return (
      <div className={styles.form}>
        <h1 className="title">Password Forget</h1>
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
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              disabled={isInvalid}
            >
              Restore
            </Button>
          </FormItem>
          <div className="errors">{error}</div>
        </Form>
      </div>
    );
  }
}

const WrappedPasswordForgetForm = Form.create()(PasswordForgetForm);

export default WrappedPasswordForgetForm;
