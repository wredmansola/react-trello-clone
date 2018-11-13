import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

import { ItemTypes } from '../../../../constants/ItemTypes';
import CartModal from './Modal';

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
  state = {
    cart: {},
    cartTitle: '',
    editMode: false,
    modalIsVisible: false
  };

  handleEnableEditMode = () => {
    this.setState({
      cartTitle: this.props.cart.title,
      editMode: true
    });
  };

  handleDisableEditMode = () => {
    this.setState({
      editMode: false
    });
  };

  handleEditCart = (event, listKey, cartKey, cart) => {
    event.preventDefault();

    const updatedCart = { ...cart };
    updatedCart.title = this.state.cartTitle;
    this.props.onEditCart(listKey, cartKey, updatedCart);
    this.handleDisableEditMode();
  };

  moveCart = (oldListKey, newListKey, cartKey, cart) => {
    this.props.onMoveCart(oldListKey, newListKey, cartKey, cart);
  };

  deleteCart = (listKey, cartKey) => {
    this.props.onDeleteCart(listKey, cartKey);
  };

  showModal = () => {
    this.setState({
      modalIsVisible: true
    });
  };

  handleOk = e => {
    this.setState({
      modalIsVisible: false
    });
  };

  handleCancel = e => {
    this.setState({
      modalIsVisible: false
    });
  };

  render() {
    const { listKey, cart, connectDragSource, onEditCart } = this.props;
    const { editMode, cartTitle, modalIsVisible } = this.state;

    return connectDragSource(
      <div className={styles.cart}>
        <Card style={{ width: 250 }} onBlur={this.handleDisableEditMode}>
          {editMode ? (
            <form
              onSubmit={event =>
                this.handleEditCart(event, listKey, cart.key, cart)
              }
            >
              <Input
                className={styles.cartTitleForm}
                value={cartTitle}
                onChange={e => this.setState({ cartTitle: e.target.value })}
                autoFocus
              />
            </form>
          ) : (
            <p className={styles.cartTitle} onClick={this.showModal}>
              {cart.title}
            </p>
          )}
          {!editMode && (
            <div>
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
                <Icon className={styles.cartControls} type="ellipsis" />
              </Popover>
              {cart.description && <Icon type="align-left" />}
            </div>
          )}
        </Card>

        <CartModal
          listKey={listKey}
          cart={cart}
          visible={modalIsVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          onEditCart={onEditCart}
        />
      </div>
    );
  }
}

export default DragSource(ItemTypes.CART, cartSource, collect)(Cart);
