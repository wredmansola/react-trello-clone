import React, { Component } from 'react';

import Boards from '../../components/Boards';
import withAuthorization from '../../utils/withAuthorization';
import { mergeDataWithKey } from '../../utils/index';
import { db } from '../../firebase';
import BoardTitle from '../../components/Boards/BoardTitle';
import WrappedAddBoardInput from '../../components/AddBoard';
import styles from './Boards.module.css';
import { Button } from 'antd';

class BoardsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boards: [],
      isLoading: false
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
    this.setState({
      isLoading: true
    });
    db.onceGetBoards().then(snapshot => {
      if (!snapshot.val()) {
        return;
      }
      this.setState({
        boards: mergeDataWithKey(snapshot.val()),
        isLoading: false
      });
    });
  }

  render() {
    const { isLoading } = this.state;
    const { boards } = this.state;

    return isLoading ? (
      <div className={styles.loader}>
        <Button shape="circle" loading />
      </div>
    ) : (
      <div className={styles.boards}>
        <BoardTitle />
        <WrappedAddBoardInput onCreateBoard={this.createBoard} />
        <Boards boards={boards} onCreateBoard={this.createBoard} />
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(BoardsPage);
