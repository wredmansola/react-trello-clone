import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Board.module.css';

const Board = ({ board, shortTitle }) => (
  <div className={styles.board}>
    <Link to={`b/${board.key}`}>{shortTitle}</Link>
    {board.title}
  </div>
);

export default Board;
