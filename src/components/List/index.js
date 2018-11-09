import React from 'react';

import styles from './List.module.css';

import ListTitle from './ListTitle';
import Carts from '../../containers/Carts';

const List = ({ list, onDeleteList, onEditList, boardKey }) => (
  <div className={styles.list}>
    <ListTitle
      boardKey={boardKey}
      listKey={list.key}
      listTitle={list.title}
      onEditList={onEditList}
      onDeleteList={onDeleteList}
    />
    <Carts list={list} />
  </div>
);

export default List;
