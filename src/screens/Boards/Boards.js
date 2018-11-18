import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import withAuthorization from '../../utils/withAuthorization';
import { mergeDataWithKey } from '../../utils/index';
import { db } from '../../firebase';

import { Icon } from 'antd';
import BoardLink from '../../components/BoardLink';
import { BoardTypes, BoardTypeTitle } from './styled';
import Loader from '../../components/Loader';
import { isEmpty } from 'lodash';

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
    const starredBoards = boards.filter(board => board.favorite);
    console.log(isEmpty(starredBoards));

    return isLoading ? (
      <Loader />
    ) : (
      <div>
        {!isEmpty(starredBoards) && (
          <BoardTypes>
            <BoardTypeTitle>
              <Icon type="star" />
              Starred Boards
            </BoardTypeTitle>

            {starredBoards.map((board, index) => {
              return (
                <Link to={`b/${board.key}`} key={index}>
                  <BoardLink
                    title={board.title}
                    color={board.color}
                    favorite={board.favorite}
                  />
                </Link>
              );
            })}
          </BoardTypes>
        )}

        <BoardTypes>
          <BoardTypeTitle>
            <Icon type="user" />
            Personal Boards
          </BoardTypeTitle>

          {boards.map((board, index) => {
            return (
              <Link to={`b/${board.key}`} key={index}>
                <BoardLink
                  title={board.title}
                  color={board.color}
                  favorite={board.favorite}
                />
              </Link>
            );
          })}
        </BoardTypes>
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(BoardsScreen);
