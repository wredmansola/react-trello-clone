import React, { Component } from 'react';

import { db } from '../firebase';
import ListItem from './ListItem';
import mergeDataWithKey from '../utils';

class ListItems extends Component {
  constructor(props) {
    super(props);

    this.addCart = this.addCart.bind(this);
    this.deleteCart = this.deleteCart.bind(this);
  }

  addCart(listId, cartName) {
    const { boardId, updateList } = this.props;
    db.doAddCart(boardId, listId, { title: cartName })
      .then(() => db.onceGetBoard(boardId))
      .then(snapshot => {
        let snapshotVal = snapshot.val();
        if (!snapshotVal) {
          return;
        }
        const lists = mergeDataWithKey(snapshotVal.lists);
        updateList(lists);
      });
  }

  deleteCart(listId, cartId) {
    const { boardId, updateList } = this.props;
    db.doDeleteCart(boardId, listId, cartId)
      .then(() => db.onceGetBoard(boardId))
      .then(snapshot => {
        let snapshotVal = snapshot.val();
        if (!snapshotVal) {
          return;
        }
        const lists = mergeDataWithKey(snapshotVal.lists);
        updateList(lists);
      });
  }

  render() {
    const { lists } = this.props;
    return lists.length
      ? lists.map((list, index) => {
          return (
            <div className="list" key={index}>
              <ListItem
                list={list}
                index={index}
                addCart={this.addCart}
                deleteCart={this.deleteCart}
                deleteList={this.props.deleteList}
              />
            </div>
          );
        })
      : null;
  }
}

export default ListItems;
