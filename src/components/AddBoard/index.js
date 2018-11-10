import React from 'react';
import { Form, Icon, Input, Button } from 'antd';

import styles from './AddBoard.module.css';

class AddBoardForm extends React.Component {
  state = {
    boardTitle: ''
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onCreateBoard(this.state.boardTitle);
    this.setState({
      boardTitle: ''
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          className={styles.addBoardForm}
          placeholder="Add board"
          value={this.state.boardTitle}
          onChange={event => this.setState({ boardTitle: event.target.value })}
        />
      </form>
    );
  }
}

export default AddBoardForm;
