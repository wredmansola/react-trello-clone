import React from 'react';
import { Input, Select } from 'antd';

import styles from './AddBoardForm.module.css';

const InputGroup = Input.Group;
const Option = Select.Option;

class AddBoardForm extends React.Component {
  state = {
    board: {
      title: '',
      color: ''
    }
  };

  handleSubmit = (event, userUid) => {
    event.preventDefault();

    let updatedBoard = { ...this.state.board };
    updatedBoard.userUid = userUid;
    this.props.onCreateBoard(updatedBoard);
    this.setState({
      board: {
        title: '',
        color: ''
      }
    });
  };

  handleColorChange = event => {
    const updatedBoard = { ...this.state.board };
    updatedBoard.color = event;
    this.setState({
      board: updatedBoard
    });
  };

  handleTitleChange = event => {
    const updatedBoard = { ...this.state.board };
    updatedBoard.title = event.target.value;
    this.setState({ board: updatedBoard });
  };

  render() {
    const { userUid } = this.props;
    return (
      <form
        onSubmit={event => this.handleSubmit(event, userUid)}
        className={styles.boardForm}
      >
        <InputGroup compact>
          <Select
            style={{ width: 150 }}
            placeholder="Select a color"
            onChange={this.handleColorChange}
          >
            <Option value="Blue">Blue</Option>
            <Option value="Green">Green</Option>
            <Option value="Purple">Purple</Option>
          </Select>

          <Input
            className={styles.addBoardForm}
            placeholder="Add board"
            value={this.state.board.title}
            onChange={this.handleTitleChange}
          />
        </InputGroup>
      </form>
    );
  }
}

export default AddBoardForm;
