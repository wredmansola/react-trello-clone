import React, { Component } from 'react';
import { isEmpty } from 'lodash';

import { Link } from 'react-router-dom';
import withAuthorization from '../../utils/withAuthorization';
import { mergeDataWithKey } from '../../utils/index';
import { db } from '../../firebase';

import { Icon } from 'antd';
import BoardLink from '../../components/BoardLink';
import Loader from '../../components/Loader';
import { BoardTypes, BoardTypeTitle, Boards } from './styled';

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

  render() {
    const { isLoading } = this.state;
    const { boards } = this.state;
    const starredBoards = boards.filter(board => board.favorite);

    return isLoading ? (
      <Loader />
    ) : (
      <Boards>
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
      </Boards>
    );
  }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(BoardsScreen);
