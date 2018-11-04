import React, { Component } from 'react';

import Boards from '../../components/Home';
import CreateBoard from '../../components/Home/CreateBoard';
import withAuthorization from '../../utils/withAuthorization';
import { mergeDataWithKey } from '../../utils/index';
import { db } from '../../firebase';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
        boards: mergeDataWithKey(snapshot.val())
      });
    });
  }

  createBoard(title) {
    if (!title) {
      return;
    }
    db.doAddBoard({
      title
    }).then(
      db.onceGetBoards().then(snapshot =>
        this.setState({
          boards: mergeDataWithKey(snapshot.val())
        })
      )
    );
  }

  render() {
    const { boards } = this.state;
    return (
      <div>
        <h1>My boards</h1>
        <CreateBoard onCreateBoard={this.createBoard} />
        <Boards boards={boards} />
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(HomePage);
