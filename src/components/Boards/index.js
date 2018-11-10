import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import withAuthorization from '../../utils/withAuthorization';
import { mergeDataWithKey } from '../../utils/index';
import { db } from '../../firebase';
import AddBoardForm from './Form';

import { Button } from 'antd';
import styles from './Boards.module.css';

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

    return isLoading ? (
      <div className={styles.loader}>
        <Button shape="circle" loading />
      </div>
    ) : (
      <div className={styles.boards}>
        <h1 className="title">My boards</h1>

        <AddBoardForm onCreateBoard={this.createBoard} />

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

export default withAuthorization(authCondition)(BoardsPage);
