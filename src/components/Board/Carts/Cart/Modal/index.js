import React, { Component } from 'react';
import { Input, Icon, Modal, Button, Badge } from 'antd';

import { getBadgeColor } from '.././../../../../utils/index';

import styles from './CartModal.module.css';

const { TextArea } = Input;

const ImportanceTags = ['Low', 'Medium', 'High'];

class CartModal extends Component {
  state = {
    modalIsVisible: false,
    cartDescription: '',
    descriptionEditMode: false,
    importance: '',
    showImportanceChoose: false
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

  handleEnableImportanceChoose = () => {
    this.setState({
      showImportanceChoose: true
    });
  };

  handleDisableImportanceChoose = () => {
    this.setState({
      showImportanceChoose: false
    });
  };

  handleSelectImportance = (event, listKey, cartKey, cart, importance) => {
    event.preventDefault();

    const updatedCart = { ...cart };
    updatedCart.importance = importance;
    this.props.onEditCart(listKey, cartKey, updatedCart);
    this.handleDisableImportanceChoose();
  };

  render() {
    const { listKey, cart, visible, onOk, onCancel } = this.props;
    const { descriptionEditMode, showImportanceChoose } = this.state;

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
          ) : cart.description ? (
            <p
              onClick={this.handleEnableEditDescription}
              className={styles.descriptionText}
            >
              {cart.description}
            </p>
          ) : (
            <div
              className={styles.descriptionEmptyText}
              onClick={this.handleEnableEditDescription}
            >
              Write description
            </div>
          )}
        </div>

        <div className={styles.importance}>
          <h3>
            <Icon type="tag" /> Importance
          </h3>
          {showImportanceChoose ? (
            <div className={styles.importanceList}>
              {ImportanceTags.map((tag, index) => (
                <Badge
                  key={index}
                  count={tag}
                  style={{ backgroundColor: getBadgeColor(tag) }}
                  className={styles.importanceTag}
                  onClick={event =>
                    this.handleSelectImportance(
                      event,
                      listKey,
                      cart.key,
                      cart,
                      tag
                    )
                  }
                />
              ))}
            </div>
          ) : cart.importance ? (
            <div>
              <Badge
                onClick={this.handleEnableImportanceChoose}
                count={cart.importance}
                style={{ backgroundColor: getBadgeColor(cart.importance) }}
              />
            </div>
          ) : (
            <div
              className={styles.importanceChoose}
              onClick={this.handleEnableImportanceChoose}
            >
              Choose importance
            </div>
          )}
        </div>
      </Modal>
    );
  }
}

export default CartModal;
