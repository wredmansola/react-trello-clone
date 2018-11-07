import React from 'react';
import { Form, Icon, Input, Button } from 'antd';

import styles from './AddBoardForm.module.css';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AddBoardForm extends React.Component {
  state = {
    boardTitle: ''
  };
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  createBoard = () => {
    this.props.onCreateBoard(this.state.boardTitle);
    this.setState({
      boardTitle: ''
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });

    this.props.onCreateBoard(this.state.boardTitle);
    this.props.onPopupClose();
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    // Only show error after a field is touched.
    const boardTitleError =
      isFieldTouched('boardTitle') && getFieldError('boardTitle');
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem
          className={styles.boardInput}
          validateStatus={boardTitleError ? 'error' : ''}
          help={boardTitleError || ''}
        >
          {getFieldDecorator('boardTitle', {
            rules: [
              { required: true, message: 'Please input your board title!' }
            ]
          })(
            <Input
              prefix={<Icon type="dashboard" theme="outlined" />}
              placeholder="Board title"
              onChange={event =>
                this.setState({ boardTitle: event.target.value })
              }
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Add
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedAddBoardInput = Form.create()(AddBoardForm);

export default WrappedAddBoardInput;
