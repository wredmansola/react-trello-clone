import React from 'react';
import { byPropKey } from '../../utils';
import { Form, Icon, Input, Button } from 'antd';
import styles from './AccountForm.module.css';

const FormItem = Form.Item;

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null
};

class AccountForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit(event) {
    const { email, password } = this.state;

    this.props.onSubmit(email, password).catch(error => {
      this.setState(byPropKey('error', error.message));
    });

    event.preventDefault();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { passwordOne, passwordTwo, error } = this.state;
    const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

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
              className="login-form-button"
              disabled={isInvalid}
            >
              Reset my password
            </Button>
          </FormItem>
          <div className="errors">{error}</div>
        </Form>
      </div>
    );
  }
}

const WrappedAccountForm = Form.create()(AccountForm);

export default WrappedAccountForm;
