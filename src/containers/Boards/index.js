import React, { Component } from 'react';

import Boards from '../../components/Boards';
import AddBoard from '../../components/AddBoard';
import withAuthorization from '../../utils/withAuthorization';
import { mergeDataWithKey } from '../../utils/index';
import { db } from '../../firebase';
import BoardTitle from '../../components/Boards/BoardTitle';
import { Divider } from 'antd';

class BoardsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boards: []
    };
  }

  createBoard = title => {
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
  };

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

  render() {
    const { boards } = this.state;
    return (
      <div>
        <BoardTitle />
        <AddBoard onCreateBoard={this.createBoard} />
        <Boards boards={boards} onCreateBoard={this.createBoard} />
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(BoardsPage);
