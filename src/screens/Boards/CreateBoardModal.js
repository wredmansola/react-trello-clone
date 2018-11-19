import React, { Component } from 'react';
import { Button as AButton, Input, Select, Modal } from 'antd';

import { BoardForm, StyledSelect, StyledInput } from './styled';

const InputGroup = Input.Group;
const Option = Select.Option;

export default class CreateBoardModal extends Component {
  state = {
    boardTitle: '',
    boardColor: 'Blue'
  };

  handleCreateBoard = (event, callback) => {
    event.preventDefault();
    const board = {
      title: this.state.boardTitle,
      color: this.state.boardColor
    };
    return callback(board).then(() => {
      this.setState(() => ({
        boardTitle: '',
        boardColor: 'Blue'
      }));
    });
  };

  handleBoardTitleChange = event => {
    this.setState({
      boardTitle: event.target.value
    });
  };

  handleBoardColorChange = event => {
    this.setState({
      boardColor: event
    });
  };

  render() {
    const { onCloseModal, onCreateBoard, visible } = this.props;
    const isValid = this.state.boardTitle && this.state.boardColor;

    return (
      <Modal
        title="Create board"
        width="320px"
        style={{ top: 20 }}
        visible={visible}
        onCancel={onCloseModal}
        footer={[
          <AButton
            disabled={!isValid}
            type="primary"
            onClick={event => this.handleCreateBoard(event, onCreateBoard)}
            key="0"
          >
            Create
          </AButton>
        ]}
      >
        <BoardForm
          onSubmit={event => this.handleCreateBoard(event, onCreateBoard)}
        >
          <InputGroup compact>
            <StyledSelect
              value={this.state.boardColor}
              onChange={event => this.handleBoardColorChange(event)}
            >
              <Option value="Blue">Blue</Option>
              <Option value="Green">Green</Option>
              <Option value="Purple">Purple</Option>
            </StyledSelect>
            <StyledInput
              placeholder="Add board title"
              onChange={event => this.handleBoardTitleChange(event)}
              value={this.state.boardTitle}
              autoFocus
            />
          </InputGroup>
        </BoardForm>
      </Modal>
    );
  }
}
