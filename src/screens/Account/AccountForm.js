import React from 'react';
import { byPropKey } from '../../utils';

import styles from './AccountForm.module.css';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null
};

class AccountForm extends React.Component {
  state = { ...INITIAL_STATE };

  onSubmit = event => {
    event.preventDefault();

    const { passwordOne } = this.state;
    this.props
      .onSubmit(passwordOne)
      .then(() => {
        this.props.form.setFieldsValue({
          passwordOne: '',
          passwordTwo: ''
        });
      })
      .catch(error => {
        this.setState(byPropKey('error', error.message));
      });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { error } = this.state;
    const passwordOne = this.props.form.getFieldValue('passwordOne');
    const passwordTwo = this.props.form.getFieldValue('passwordTwo');
    const isInvalid =
      !passwordOne ||
      !passwordTwo ||
      passwordOne !== passwordTwo ||
      passwordOne === '';
    return (
      <div className="styles.form">
        <Form onSubmit={event => this.onSubmit(event)} className="login-form">
          <FormItem>
            {getFieldDecorator('passwordOne', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                onChange={event =>
                  this.setState(byPropKey('passwordOne', event.target.value))
                }
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('passwordTwo', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                onChange={event =>
                  this.setState(byPropKey('passwordTwo', event.target.value))
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
              Reset my password
            </Button>
          </FormItem>
          <div className={styles.errors}>{error}</div>
        </Form>
      </div>
    );
  }
}

const WrappedAccountForm = Form.create()(AccountForm);

export default WrappedAccountForm;
