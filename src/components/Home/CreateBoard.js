import React, { Component } from 'react';

class createBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boardTitle: ''
    };

    this.createBoard = this.createBoard.bind(this);
  }

  createBoard() {
    this.props.onCreateBoard(this.state.boardTitle);
    this.setState({
      boardTitle: ''
    });
  }

  render() {
    return (
      <div>
        Create board: &nbsp;
        <input
          onChange={event => this.setState({ boardTitle: event.target.value })}
          value={this.state.boardTitle}
        />
        <button onClick={this.createBoard}>Add</button>
      </div>
    );
  }
}

export default createBoard;
