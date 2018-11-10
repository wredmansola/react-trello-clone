import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

import { ItemTypes } from '../../../../constants/ItemTypes';

import styles from './Cart.module.css';
import { Card, Icon, Input, Popover } from 'antd';

const cartSource = {
  beginDrag(props) {
    return props;
  },
  endDrag(props) {
    return props;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      cartTitle: '',
      cart: {}
    };

    this.handleEnableEditMode = this.handleEnableEditMode.bind(this);
    this.handleDisableEditMode = this.handleDisableEditMode.bind(this);
    this.editCart = this.editCart.bind(this);
  }

  handleEnableEditMode() {
    this.setState({
      cartTitle: this.props.cart.title,
      editMode: true
    });
  }

  handleDisableEditMode() {
    this.setState({
      editMode: false
    });
  }

  editCart(event, listKey, cartKey, cart) {
    event.preventDefaut();

    const updatedCart = { ...cart };
    updatedCart.title = this.state.cartTitle;
    this.props.onEditCart(listKey, cartKey, updatedCart);
    this.handleDisableEditMode();
  }

  moveCart(oldListKey, newListKey, cartKey, cart) {
    this.props.onMoveCart(oldListKey, newListKey, cartKey, cart);
  }

  deleteCart(listKey, cartKey) {
    this.props.onDeleteCart(listKey, cartKey);
  }

  render() {
    const { listKey, cart, connectDragSource, isDragging } = this.props;
    const { editMode, cartTitle } = this.state;

    return connectDragSource(
      <div className={styles.cart}>
        <Card style={{ width: 250 }} onBlur={this.handleDisableEditMode}>
          {editMode ? (
            <form onSubmit={e => this.editCart(e, listKey, cart.key, cart)}>
              <Input
                className={styles.cartTitleForm}
                value={cartTitle}
                onChange={e => this.setState({ cartTitle: e.target.value })}
                autoFocus
              />
            </form>
          ) : (
            <p>{cart.title}</p>
          )}
          {!editMode && (
            <Popover
              placement="rightTop"
              content={
                <div>
                  <div
                    className={styles.cartOperations}
                    onClick={this.handleEnableEditMode}
                  >
                    <Icon type="edit" /> Edit cart
                  </div>
                  <div
                    className={styles.cartOperations}
                    onClick={e => this.deleteCart(listKey, cart.key)}
                  >
                    <Icon type="delete" trigger="click" /> Delete cart
                  </div>
                </div>
              }
              trigger="click"
            >
              <Icon type="ellipsis" />
            </Popover>
          )}
        </Card>
      </div>
    );
  }
}

export default DragSource(ItemTypes.CART, cartSource, collect)(Cart);
