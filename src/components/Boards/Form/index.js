import React from 'react';
import { Input } from 'antd';

import styles from './AddBoardForm.module.css';

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
      <form onSubmit={this.handleSubmit} className={styles.boardForm}>
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
