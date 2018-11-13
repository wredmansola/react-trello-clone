import React, { Component } from 'react';
import { Input, Icon, Modal, Button } from 'antd';

import styles from './CartModal.module.css';

const { TextArea } = Input;

class CartModal extends Component {
  state = {
    modalIsVisible: false,
    cartDescription: '',
    descriptionEditMode: false
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

  render() {
    const { listKey, cart, visible, onOk, onCancel } = this.props;
    const { descriptionEditMode } = this.state;

    return (
      <Modal
        title={cart.title}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
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
                  this.handleEditCartDescription(event, listKey, cart.key, cart)
                }
              >
                <Icon type="save" />
                Save
              </Button>
              <Icon type="close" onClick={this.handleDisableEditDescription} />
            </form>
          ) : (
            <p className={styles.descriptionText}>{cart.description}</p>
          )}

          <div className={styles.importance}>{/* TODO: Tags */}</div>
        </div>
      </Modal>
    );
  }
}

export default CartModal;
