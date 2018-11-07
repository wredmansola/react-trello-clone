import React from 'react';

import Board from '../Board';

import styles from './Boards.module.css';

const Boards = ({ boards }) => (
  <div className={styles.boards}>
    {boards.map((board, index) => {
      const shortTitle = board.title.substring(0, 2);
      return (
        <div className={styles.boardItem} key={index}>
          <div>
            <Board board={board} shortTitle={shortTitle} />
          </div>
        </div>
      );
    })}
  </div>
);

export default Boards;
