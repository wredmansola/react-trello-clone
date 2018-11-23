import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { isEmpty } from 'lodash';

import { db } from '../../firebase';
import withAuthorization from '../../utils/withAuthorization';
import { getBoardKey, mergeDataWithKey } from '../../utils/index';

import BoardTitle from '../../components/BoardTitle';
import Loader from '../../components/Loader';
import { AddList, Lists } from './styled';
import FormCreation from '../../components/FormCreation';
import Cards from './Cards';
import List from '../../components/List';
import ListTitle from '../../components/ListTitle';

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
    Promise.all([db.onceGetBoard(boardKey), db.onceGetLists(boardKey)])
      .then(snapshots => {
        const board = snapshots[0].val();
        const lists = mergeDataWithKey(snapshots[1].val());
        this.setState(() => ({ boardKey, board, lists }));
      })
      .finally(() =>
        this.setState(() => ({
          isLoading: false
        }))
      );
  };

  handleCreateList = listTitle => {
    const { boardKey } = this.state;
    return db.doCreateList(boardKey, { title: listTitle }).then(response => {
      const lists = [...this.state.lists];
      lists.push(response);
      this.setState({
        lists
      });
    });
  };

  handleUpdateList = (listKey, title) => {
    const { boardKey } = this.state;
    return db.doUpdateList(boardKey, listKey, { title }).then(response => {
      const lists = [...this.state.lists];
      lists.push(response);
      this.setState(() => ({
        lists
      }));
    });
  };

  handleDeleteList = (boardKey, listKey) => {
    return db.doDeleteList(boardKey, listKey).then(() => {
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
      <Loader />
    ) : (
      !isEmpty(board) && (
        <React.Fragment>
          <BoardTitle
            title={board.title}
            favorite={board.favorite}
            onAddToFavorite={this.handleAddToFavorites}
            color={board.color}
          />

          <Lists>
            {lists.map((list, index) => (
              <List key={index}>
                <ListTitle
                  boardKey={boardKey}
                  listKey={list.key}
                  title={list.title}
                  onEditList={this.handleUpdateList}
                  onDeleteList={this.handleDeleteList}
                />
                <Cards list={list} />
              </List>
            ))}
            <AddList>
              <FormCreation
                placeholder="Create new list"
                onCreate={this.handleCreateList}
              />
            </AddList>
          </Lists>
        </React.Fragment>
      )
    );
  }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(
  DragDropContext(HTML5Backend)(BoardScreen)
);
