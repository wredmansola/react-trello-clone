import React, { Component } from 'react';
import { Modal } from 'antd';

import CartDescription from './CartDescription';
import CartImportance from './CartImportance';

class CardModal extends Component {
  state = {
    modalIsVisible: false
  };

  render() {
    const { listKey, card, visible, onOk, onCancel, onEditCard } = this.props;

    return (
      <Modal
        title={card.title}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
      >
        <CartDescription
          listKey={listKey}
          card={card}
          onEditCard={onEditCard}
        />

        <CartImportance listKey={listKey} card={card} onEditCard={onEditCard} />
      </Modal>
    );
  }
}

export default CardModal;
