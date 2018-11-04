import React, { Component } from 'react';

import withAuthorization from './withAuthorization';
import { db } from '../firebase';
import ListForm from './ListForm';
import { getBoardKey, mergeDataWithKey } from '../utils/index';
import List from './List';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class BoardPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      boardTitle: '',
      boardKey: '',
      lists: []
    };

    this.createList = this.createList.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.editList = this.editList.bind(this);
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    const boardKey = getBoardKey();
    db.onceGetBoard(boardKey)
      .then(snapshot => {
        const snapshotVal = snapshot.val();
        this.setState({
          boardKey,
          boardTitle: snapshotVal.title
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
      .finally(() =>
        this.setState({
          isLoading: false
        })
      );
  }

  /**
   * @param {string} boardKey
   * @param {string} listTitle
   */
  createList(boardKey, listTitle) {
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
  }

  /**
   * @param {string} boardKey
   * @param {string}listKey
   * @param {string} listTitle
   */
  editList(boardKey, listKey, listTitle) {
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
  }

  /**
   * @param {string} boardKey
   * @param {string} listKey
   */
  deleteList(boardKey, listKey) {
    db.doDeleteList(boardKey, listKey).then(() => {
      const updatedLists = this.state.lists.filter(
        list => list.key !== listKey
      );
      this.setState({
        lists: updatedLists
      });
    });
  }

  render() {
    let { boardKey, boardTitle, lists } = this.state;
    return this.state.isLoading ? (
      <div>Loading...</div>
    ) : (
      <div className="board">
        <h1>{boardTitle}</h1>
        <ListForm boardKey={boardKey} onCreateList={this.createList} />
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
    );
  }
}

const authCondition = authUser => !!authUser;
const boardPageContext = DragDropContext(HTML5Backend)(BoardPage);

export default withAuthorization(authCondition)(boardPageContext);
