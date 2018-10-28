import React, { Component } from 'react';
import { db } from '../firebase';
import withAuthorization from './withAuthorization';

import ListItems from './ListItems';
import mergeDataWithKey from '../utils';

class BoardPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boardTitle: '',
      boardId: '',
      listName: '',
      isLoading: false,
      lists: []
    };

    this.createList = this.createList.bind(this);
    this.updateList = this.updateList.bind(this);
    this.deleteList = this.deleteList.bind(this);
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    let boardId = window.location.href
      .split('/')
      .pop()
      .replace('-', '');
    db.onceGetBoard(boardId)
      .then(snapshot => {
        let snapshotVal = snapshot.val();
        if (!snapshotVal) {
          return;
        }
        this.setState({
          boardId,
          boardTitle: snapshotVal.title,
          lists: snapshotVal.lists ? mergeDataWithKey(snapshotVal.lists) : {}
        });
      })
      .finally(() =>
        this.setState({
          isLoading: false
        })
      );
  }

  updateList(lists) {
    this.setState({
      lists
    });
  }

  createList(boardId, listName) {
    if (!listName) {
      return;
    }
    db.doAddList(boardId, { title: listName })
      .then(() => db.onceGetBoard(boardId))
      .then(snapshot => {
        let snapshotVal = snapshot.val();
        if (!snapshotVal) {
          return;
        }
        this.setState({
          lists: mergeDataWithKey(snapshotVal.lists),
          listName: ''
        });
      });
  }

  deleteList(listId) {
    console.log(listId);
    db.doDeleteList(this.state.boardId, listId)
      .then(() => db.onceGetBoard(this.state.boardId))
      .then(snapshot => {
        let snapshotVal = snapshot.val();
        if (!snapshotVal) {
          return;
        }
        const lists = mergeDataWithKey(snapshotVal.lists);
        this.updateList(lists);
      });
  }

  render() {
    let { lists, boardTitle, boardId, listName } = this.state;
    return this.state.isLoading ? (
      <div>Loading...</div>
    ) : (
      <div class="board">
        <h1>{boardTitle}</h1>
        Create list:&nbsp;
        <input
          onChange={event => this.setState({ listName: event.target.value })}
          value={this.state.listName}
        />
        <button onClick={e => this.createList(boardId, listName)}>Add</button>
        <br />
        <ListItems
          updateList={this.updateList}
          deleteList={this.deleteList}
          boardId={boardId}
          lists={lists}
        />
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(BoardPage);
