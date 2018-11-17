import React, { Component } from 'react';
import { Modal } from 'antd';

import CardDescription from './CardDescription';
import CardImportance from './CardImportance';
import CardDueDate from './CardDueDate';
import CardDueDateDisplay from './CardDueDateDisplay';

import styles from './CardModal.module.css';

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
        <div className={styles.cardContent}>
          {card.date &&
            card.time && (
              <CardDueDateDisplay date={card.date} time={card.time} />
            )}
          <CardDescription
            listKey={listKey}
            card={card}
            onEditCard={onEditCard}
          />
          <CardImportance
            listKey={listKey}
            card={card}
            onEditCard={onEditCard}
          />
        </div>
        <div className={styleMedia.cardPanel}>
          <CardDueDate listKey={listKey} card={card} onEditCard={onEditCard} />
        </div>
      </Modal>
    );
  }
}

export default CardModal;
