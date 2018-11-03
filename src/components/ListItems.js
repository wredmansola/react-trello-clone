import React, { Component } from 'react';

import { db } from '../firebase';
import ListItem from './List';
import { mergeDataWithKey } from '../utils/index';

class ListItems extends Component {
  constructor(props) {
    super(props);

    this.addCart = this.addCart.bind(this);
    this.deleteCart = this.deleteCart.bind(this);
    this.editCart = this.editCart.bind(this);

    this.deleteList = this.deleteList.bind(this);
    this.editList = this.editList.bind(this);
  }


  deleteList(listId) {
    db.doDeleteList(this.state.boardId, listId)
      .then(() => db.onceGetBoard(this.state.boardId))
      .then(snapshot => {
        let snapshotVal = snapshot.val();
        const lists = snapshotVal.lists
          ? mergeDataWithKey(snapshotVal.lists)
          : [];
        this.updateList(lists);
      });
  }

  editList(listId, list) {
    db.doEditList(this.state.boardId, listId, list);
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

  editCart(listId, cartId, cart, oldListId) {
    if (oldListId) {
      this.deleteCart(oldListId, cartId);
    }
    const { boardId } = this.props;
    db.doEditCart(boardId, listId, cartId, cart);
    // .then(() => db.onceGetBoard(boardId))
    // .then(snapshot => {
    //   let snapshotVal = snapshot.val();
    //   console.log(snapshotVal);
    //   if (!snapshotVal) {
    //     return;
    //   }
    // });
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
                editCart={this.editCart}
                deleteCart={this.deleteCart}
                deleteList={this.props.deleteList}
                editList={this.props.editList}
              />
            </div>
          );
        })
      : null;
  }
}

export default ListItems;
