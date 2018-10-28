import React, { Component } from 'react';
import withAuthorization from './withAuthorization';
import { db } from '../firebase';

import BoardList from './BoardList';

import expandWithKey from '../utils';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boardName: '',
      boards: []
    };

    this.createBoard = this.createBoard.bind(this);
  }

  componentDidMount() {
    db.onceGetBoards().then(snapshot => {
      if (!snapshot.val()) {
        return;
      }
      this.setState({
        boards: expandWithKey(snapshot.val())
      });
    });
  }

  createBoard() {
    if (!this.state.boardName) {
      return;
    }
    db.doAddBoard({
      title: this.state.boardName
    }).then(
      db.onceGetBoards().then(snapshot =>
        this.setState({
          boards: expandWithKey(snapshot.val())
        })
      )
    );
  }

  render() {
    const { boards } = this.state;
    return (
      <div>
        <h1>Home</h1>
        Create board: &nbsp;
        <input
          onChange={event => this.setState({ boardName: event.target.value })}
          value={this.state.boardName}
        />
        <button onClick={this.createBoard}>Add</button>
        <BoardList boards={boards} />
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(HomePage);
