import React from 'react';

import styles from './List.module.css';

import ListTitle from './Title';
import Carts from '../Carts';

const ListItem = ({ list, onDeleteList, onEditList, boardKey }) => (
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

export default ListItem;
