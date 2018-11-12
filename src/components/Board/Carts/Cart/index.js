import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

import { ItemTypes } from '../../../../constants/ItemTypes';

import styles from './Cart.module.css';
import { Card, Icon, Input, Popover, Modal, Button } from 'antd';

const { TextArea } = Input;

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

    // Modal
    modalIsVisible: false,
    cartDescription: '',
    descriptionEditMode: false
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

  // ==================== Modal start ====================

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

  handleEnableEditDescription = () => {
    this.setState({
      cartDescription: this.props.cart.description,
      descriptionEditMode: true
    });
  };

  handleDisableEditDescription = () => {
    this.setState({
      descriptionEditMode: false
    });
  };

  handleEditCartDescription = (event, listKey, cartKey, cart) => {
    event.preventDefault();

    const updatedCart = { ...cart };
    updatedCart.description = this.state.cartDescription;
    this.props.onEditCart(listKey, cartKey, updatedCart);
    this.handleDisableEditDescription();
  };

  // ==================== Modal end ====================

  render() {
    const { listKey, cart, connectDragSource } = this.props;
    const {
      editMode,
      cartTitle,
      descriptionEditMode,
      cartDescription
    } = this.state;

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

        <Modal
          title={cart.title}
          visible={this.state.modalIsVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div className={styles.description}>
            <h3 className={styles.descriptionTitle}>
              <Icon type="align-left" /> Description
              <Icon
                className={styles.descriptionEditIcon}
                type="edit"
                onClick={this.handleEnableEditDescription}
              />
            </h3>
            {descriptionEditMode ? (
              <form className={styles.descriptionForm}>
                <TextArea
                  className={styles.descriptionArea}
                  onChange={event =>
                    this.setState({ cartDescription: event.target.value })
                  }
                  value={this.state.cartDescription}
                  autosize
                  autoFocus
                />
                <Button
                  className={styles.descriptionBtn}
                  onClick={event =>
                    this.handleEditCartDescription(
                      event,
                      listKey,
                      cart.key,
                      cart
                    )
                  }
                >
                  <Icon type="save" />
                  Save
                </Button>
                <Icon
                  type="close"
                  onClick={this.handleDisableEditDescription}
                />
              </form>
            ) : (
              <p className={styles.descriptionText}>{cart.description}</p>
            )}

            <div className={styles.importance}>{/* TODO: Tags */}</div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default DragSource(ItemTypes.CART, cartSource, collect)(Cart);
