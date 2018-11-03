import React, { Component } from 'react';

import CartForm from './CartForm';
import { db } from '../firebase';
import Cart from './Cart';
import { mergeDataWithKey, getBoardKey } from '../utils/index';
import ListHeader from './ListHeader';

import { findIndex } from 'lodash';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carts: {}
    };

    this.addCart = this.addCart.bind(this);
    this.editCart = this.editCart.bind(this);
    this.deleteCart = this.deleteCart.bind(this);
  }

  componentDidMount() {
    db.onceGetCart(this.props.list.key).then(snapshot => {
      const snapshotVal = snapshot.val();
      if (!snapshotVal) {
        return;
      }
      const updatedCarts = { ...this.state.carts };
      updatedCarts[this.props.list.key] = mergeDataWithKey(snapshotVal);
      this.setState({
        carts: updatedCarts
      });
    });
  }

  /**
   * @param {string} listKey
   * @param {string} cartTitle
   */
  addCart(listKey, cartTitle) {
    if (!cartTitle) {
      return;
    }
    db.doAddCart(listKey, cartTitle)
      .then(() => db.onceGetCart(listKey))
      .then(snapshot => {
        const snapshotVal = snapshot.val();
        if (!snapshotVal) {
          return;
        }
        const updatedCarts = { ...this.state.carts };
        updatedCarts[listKey] = mergeDataWithKey(snapshotVal);

        this.setState({
          carts: updatedCarts
        });
      });
  }

  /**
   * @param {string} listKey
   * @param {string} cartKey
   * @param {string} cart
   */
  editCart(listKey, cartKey, cart) {
    db.doEditCart(listKey, cartKey, cart).then(() => {
      const updatedCarts = { ...this.state.carts };
      const cartIndex = findIndex(updatedCarts[listKey], cart => {
        return cart.key === cartKey;
      });
      updatedCarts[listKey][cartIndex] = cart;
      this.setState({
        carts: updatedCarts
      });
    });
  }

  /**
   * @param {string} listKey
   * @param {string} cartKey
   */
  deleteCart(listKey, cartKey) {
    db.doDeleteCart(listKey, cartKey).then(() => {
      const updatedCarts = [...this.state.carts[listKey]].filter(
        cart => cart.key !== cartKey
      );
      this.setState({
        carts: updatedCarts
      });
    });
  }

  render() {
    const { list, onEditList, onDeleteList } = this.props;
    const { carts } = this.state;
    const boardKey = getBoardKey();

    const listCarts = carts[list.key] ? carts[list.key] : [];
    return (
      <div className="list">
        <ListHeader
          boardKey={boardKey}
          listKey={list.key}
          listTitle={list.title}
          onEditList={onEditList}
          onDeleteList={onDeleteList}
        />
        <CartForm onAddCart={this.addCart} listKey={list.key} />
        {listCarts.map((cart, index) => (
          <Cart
            key={index}
            listKey={list.key}
            cart={cart}
            onEditCart={this.editCart}
            onDeleteCart={this.deleteCart}
          />
        ))}
      </div>
    );
  }
}

export default List;
