import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

import CartForm from './CartForm';
import { db } from '../../firebase';
import Cart from './index';
import { mergeDataWithKey } from '../../utils/index';

import { findIndex } from 'lodash';
import { ItemTypes } from '../../constants/ItemTypes';

const cartTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    item.onMoveCart(
      component,
      item.listKey,
      props.list.key,
      item.cart.key,
      item.cart
    );
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class CartsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carts: {}
    };

    this.addCart = this.addCart.bind(this);
    this.editCart = this.editCart.bind(this);
    this.moveCart = this.moveCart.bind(this);
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
   * @param {string} oldListKey
   * @param {string} newListKey
   * @param {string} cartKey
   * @param {string} cart
   */
  moveCart(component, oldListKey, newListKey, cartKey, cart) {
    db.doMoveCart(oldListKey, newListKey, cartKey, cart).then(() => {
      const cartItems = this.state.carts[oldListKey].filter(
        cart => cart.key !== cartKey
      );
      const updatedCarts = { ...this.state.carts };
      updatedCarts[oldListKey] = cartItems;
      this.setState({
        carts: updatedCarts
      });

      const destCartWrap = { ...component.state.carts };
      const destCarts = destCartWrap[newListKey] || [];
      destCarts.push(cart);
      destCartWrap[newListKey] = destCarts;
      component.setState({
        carts: destCartWrap
      });
    });
  }

  /**
   * @param {string} listKey
   * @param {string} cartKey
   */
  deleteCart(listKey, cartKey) {
    db.doDeleteCart(listKey, cartKey).then(() => {
      const updatedCarts = { ...this.state.carts };
      const listCarts = this.state.carts[listKey].filter(
        cart => cart.key !== cartKey
      );
      updatedCarts[listKey] = listCarts;
      this.setState({
        carts: updatedCarts
      });
    });
  }

  render() {
    const { list, connectDropTarget, isOver } = this.props;
    const { carts } = this.state;

    const listCarts = carts[list.key] ? carts[list.key] : [];
    return connectDropTarget(
      <div className="carts-container">
        <CartForm onAddCart={this.addCart} listKey={list.key} />
        {listCarts.map((cart, index) => (
          <Cart
            key={index}
            listKey={list.key}
            cart={cart}
            onEditCart={this.editCart}
            onMoveCart={this.moveCart}
            onDeleteCart={this.deleteCart}
          />
        ))}
      </div>
    );
  }
}

export default DropTarget(ItemTypes.CART, cartTarget, collect)(CartsContainer);
