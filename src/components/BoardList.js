import React from 'react';
import { Link } from 'react-router-dom';

const BoardList = ({ boards }) => (
  <div>
    List of boardes:
    <br />
    {boards.map((board, index) => (
      <div class="board-list" key={index}>
        <Link to={`b/${board.key}`}>{board.value.title}</Link>
      </div>
    ))}
  </div>
);

export default BoardList;
