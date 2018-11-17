import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

import { db } from '../../../firebase';
import { mergeDataWithKey } from '../../../utils/index';

import { findIndex } from 'lodash';
import { ItemTypes } from '../../../constants/ItemTypes';

import ItemCard from './Card';
import CreateCard from './CreateCard';

import styles from './Cards.module.css';

const cardTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    item.onMoveCard(
      component,
      item.listKey,
      props.list.key,
      item.card.key,
      item.card
    );
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class Cards extends Component {
  state = {
    cards: {},
    showCreateCardForm: false,
    cardEditing: false
  };

  componentDidMount = () => {
    db.onceGetCard(this.props.list.key).then(snapshot => {
      const snapshotVal = snapshot.val();
      if (!snapshotVal) {
        return;
      }
      const updatedCards = { ...this.state.cards };
      updatedCards[this.props.list.key] = mergeDataWithKey(snapshotVal);
      this.setState({
        cards: updatedCards
      });
    });
  };

  createCard = (listKey, cardTitle) => {
    if (!cardTitle) {
      return;
    }
    db.doAddCard(listKey, cardTitle)
      .then(() => db.onceGetCard(listKey))
      .then(snapshot => {
        const snapshotVal = snapshot.val();
        if (!snapshotVal) {
          return;
        }
        const updatedCards = { ...this.state.cards };
        updatedCards[listKey] = mergeDataWithKey(snapshotVal);

        this.setState({
          cards: updatedCards
        });
      });
  };

  editCard = (listKey, cardKey, card) => {
    db.doEditCard(listKey, cardKey, card).then(() => {
      const updatedCards = { ...this.state.cards };
      const cardIndex = findIndex(updatedCards[listKey], card => {
        return card.key === cardKey;
      });
      updatedCards[listKey][cardIndex] = card;
      this.setState({
        cards: updatedCards
      });
    });
  };

  moveCard = (component, oldListKey, newListKey, cardKey, card) => {
    db.doMoveCard(oldListKey, newListKey, cardKey, card).then(() => {
      const cardItems = this.state.cards[oldListKey].filter(
        card => card.key !== cardKey
      );
      const updatedCards = { ...this.state.cards };
      updatedCards[oldListKey] = cardItems;
      this.setState({
        cards: updatedCards
      });

      const destCardWrap = { ...component.state.cards };
      const destCards = destCardWrap[newListKey] || [];
      destCards.push(card);
      destCardWrap[newListKey] = destCards;
      component.setState({
        cards: destCardWrap
      });
    });
  };

  deleteCard = (listKey, cardKey) => {
    db.doDeleteCard(listKey, cardKey).then(() => {
      const updatedCards = { ...this.state.cards };
      const listCards = this.state.cards[listKey].filter(
        card => card.key !== cardKey
      );
      updatedCards[listKey] = listCards;
      this.setState({
        cards: updatedCards
      });
    });
  };

  handleShowCreateCard = () => {
    this.setState({
      showCreateCardForm: true
    });
  };

  handleHideCreateCard = () => {
    this.setState({
      showCreateCardForm: false
    });
  };

  handleCardEditing = () => {
    this.setState({
      cardEditing: true
    });
  };

  handleCardStopEditing = () => {
    this.setState({
      cardEditing: false
    });
  };

  render() {
    const { list, connectDropTarget } = this.props;
    const { cards, showCreateCardForm, cardEditing } = this.state;

    const listCards = cards[list.key] ? cards[list.key] : [];
    return connectDropTarget(
      <div
        className={styles.cards}
        onMouseEnter={this.handleShowCreateCard}
        onMouseLeave={this.handleHideCreateCard}
      >
        {listCards.map((card, index) => (
          <ItemCard
            key={index}
            listKey={list.key}
            card={card}
            onEditCard={this.editCard}
            onMoveCard={this.moveCard}
            onDeleteCard={this.deleteCard}
          />
        ))}
        {(showCreateCardForm || cardEditing) && (
          <CreateCard
            onCreateCard={this.createCard}
            onCardEditing={this.handleCardEditing}
            onCardStopEditing={this.handleCardStopEditing}
            listKey={list.key}
          />
        )}
      </div>
    );
  }
}

export default DropTarget(ItemTypes.CARD, cardTarget, collect)(Cards);
