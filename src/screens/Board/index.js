import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Button, Icon } from 'antd';
import { isEmpty } from 'lodash';

import { db } from '../../firebase';
import withAuthorization from '../../utils/withAuthorization';
import { getBoardKey, mergeDataWithKey } from '../../utils/index';

import List from './List';
import CreateListForm from './List/CreateListForm';

import styles from './Board.module.css';

class BoardScreen extends Component {
  state = {
    isLoading: false,
    board: {},
    boardKey: '',
    lists: []
  };

  componentDidMount = () => {
    this.setState({
      isLoading: true
    });
    const boardKey = getBoardKey();
    db.onceGetBoard(boardKey)
      .then(snapshot => {
        if (!snapshot.val()) {
          return;
        }
        this.setState({
          boardKey,
          board: snapshot.val()
        });
      })
      .then(() => db.onceGetLists(boardKey))
      .then(snapshot => {
        const snapshotVal = snapshot.val();
        if (!snapshotVal) {
          return;
        }
        this.setState({
          boardKey,
          lists: mergeDataWithKey(snapshotVal)
        });
      })
      .catch(reason => console.error(reason))
      .finally(() =>
        this.setState({
          isLoading: false
        })
      );
  };

  createList = (boardKey, listTitle) => {
    if (!listTitle) {
      return;
    }
    db.doCreateList(boardKey, listTitle)
      .then(() => db.onceGetLists(boardKey))
      .then(snapshot => {
        let snapshotVal = snapshot.val();
        if (!snapshotVal) {
          return;
        }
        this.setState({
          lists: mergeDataWithKey(snapshotVal)
        });
      });
  };

  editList = (boardKey, listKey, listTitle) => {
    if (!listTitle) {
      return;
    }
    db.doEditList(boardKey, listKey, listTitle)
      .then(() => db.onceGetLists(boardKey))
      .then(snapshot => {
        let snapshotVal = snapshot.val();
        if (!snapshotVal) {
          return;
        }
        this.setState({
          lists: mergeDataWithKey(snapshotVal)
        });
      });
  };

  deleteList = (boardKey, listKey) => {
    db.doDeleteList(boardKey, listKey).then(() => {
      const updatedLists = this.state.lists.filter(
        list => list.key !== listKey
      );
      this.setState({
        lists: updatedLists
      });
    });
  };

  handleAddToFavorites = (boardKey, board) => {
    let updatedBoard = { ...board };
    updatedBoard.favorite = !board.favorite;
    db.doEditBoard(boardKey, updatedBoard);
    this.setState({
      board: updatedBoard
    });
  };

  render() {
    let { boardKey, board, lists } = this.state;
    return this.state.isLoading ? (
      <div className={styles.loader}>
        <Button shape="circle" loading />
      </div>
    ) : (
      !isEmpty(board) && (
        <div className={styles.board}>
          <div className={styles.title}>
            <h2 className={styles.title}>{board.title}</h2>
            <div>
              <Icon
                type="star"
                className={board.favorite && styles.active}
                onClick={event => this.handleAddToFavorites(boardKey, board)}
              />
            </div>
          </div>
          <CreateListForm boardKey={boardKey} onCreateList={this.createList} />

          <div className={styles.lists}>
            {lists.map((list, index) => (
              <List
                boardKey={boardKey}
                key={index}
                list={list}
                onEditList={this.editList}
                onDeleteList={this.deleteList}
              />
            ))}
          </div>
        </div>
      )
    );
  }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(
  DragDropContext(HTML5Backend)(BoardScreen)
);
