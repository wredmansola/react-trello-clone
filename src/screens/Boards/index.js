import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import withAuthorization from '../../utils/withAuthorization';
import { mergeDataWithKey } from '../../utils/index';
import { db, user } from '../../firebase';
import AddBoardForm from './AddBoardForm';

import { Button } from 'antd';
import styles from './Boards.module.css';

class BoardsScreen extends Component {
  state = {
    boards: [],
    isLoading: false
  };

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    db.onceGetBoards()
      .then(snapshot => {
        if (!snapshot.val()) {
          return;
        }
        this.setState({
          boards: mergeDataWithKey(snapshot.val())
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false
        });
      });
  }

  handleCreateBoard = board => {
    db.doCreateBoard(board).then(response => {
      let updatedBoards = this.state.boards;
      console.log(response);
      updatedBoards.push(response);
      this.setState({
        boards: updatedBoards
      });
    });
  };

  render() {
    const { isLoading } = this.state;
    const { boards } = this.state;
    let userUid = user.getUser().uid;

    return isLoading ? (
      <div className={styles.loader}>
        <Button shape="circle" loading />
      </div>
    ) : (
      <div className={styles.boards}>
        <h1 className="title">My boards</h1>

        <AddBoardForm
          userUid={userUid}
          onCreateBoard={this.handleCreateBoard}
        />

        {boards.map((board, index) => {
          const shortTitle = board.title.substring(0, 2);
          return (
            <div className={styles.boardItem} key={index}>
              <div className={styles.board}>
                <Link to={`b/${board.key}`}>{shortTitle}</Link>
                {board.title}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(BoardsScreen);
