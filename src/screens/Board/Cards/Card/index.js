import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

import { ItemTypes } from '../../../../constants/ItemTypes';
import CardModal from './CardModal';
import Date from './Date';
import { getBadgeColor } from '../../../../utils/index';

import styles from './Card.module.css';
import { Icon, Input, Popover, Badge } from 'antd';
import Card from '../../../../components/Card';

const cardSource = {
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

class ItemCard extends Component {
  state = {
    card: {},
    cardTitle: '',
    editMode: false,
    modalIsVisible: false
  };

  handleEnableEditMode = () => {
    this.setState({
      cardTitle: this.props.card.title,
      editMode: true
    });
  };

  handleDisableEditMode = () => {
    this.setState({
      editMode: false
    });
  };

  handleEditCard = (event, listKey, cardKey, card) => {
    event.preventDefault();

    const updatedCard = { ...card };
    updatedCard.title = this.state.cardTitle;
    this.props.onEditCard(listKey, cardKey, updatedCard);
    this.handleDisableEditMode();
  };

  moveCard = (oldListKey, newListKey, cardKey, card) => {
    this.props.onMoveCard(oldListKey, newListKey, cardKey, card);
  };

  deleteCard = (listKey, cardKey) => {
    this.props.onDeleteCard(listKey, cardKey);
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
    const { listKey, card, connectDragSource, onEditCard } = this.props;
    const { editMode, cardTitle, modalIsVisible } = this.state;

    return connectDragSource(
      <div className={styles.card}>
        <Card title={card.title} />

        <CardModal
          listKey={listKey}
          card={card}
          visible={modalIsVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          onEditCard={onEditCard}
        />
      </div>
    );
  }
}

export default DragSource(ItemTypes.CARD, cardSource, collect)(ItemCard);
