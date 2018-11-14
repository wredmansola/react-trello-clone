import React, { Component } from 'react';
import { Input, Icon, Modal, Button, Badge } from 'antd';

import { getBadgeColor } from '.././../../../../utils/index';

import styles from './CardModal.module.css';

const { TextArea } = Input;

const ImportanceTags = ['Low', 'Medium', 'High'];

class CardModal extends Component {
  state = {
    modalIsVisible: false,
    cardDescription: '',
    descriptionEditMode: false,
    importance: '',
    showImportanceChoose: false
  };

  handleEnableEditDescription = () => {
    this.setState({
      cardDescription: this.props.card.description,
      descriptionEditMode: true
    });
  };

  handleDisableEditDescription = () => {
    this.setState({
      descriptionEditMode: false
    });
  };

  handleEditCardDescription = (event, listKey, cardKey, card) => {
    event.preventDefault();

    const updatedCard = { ...card };
    updatedCard.description = this.state.cardDescription;
    this.props.onEditCard(listKey, cardKey, updatedCard);
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

  handleSelectImportance = (event, listKey, cardKey, card, importance) => {
    event.preventDefault();

    const updatedCard = { ...card };
    updatedCard.importance = importance;
    this.props.onEditCard(listKey, cardKey, updatedCard);
    this.handleDisableImportanceChoose();
  };

  render() {
    const { listKey, card, visible, onOk, onCancel } = this.props;
    const { descriptionEditMode, showImportanceChoose } = this.state;

    return (
      <Modal
        title={card.title}
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
                  this.setState({ cardDescription: event.target.value })
                }
                value={this.state.cardDescription}
                autosize
                autoFocus
              />
              <Button
                className={styles.descriptionBtn}
                onClick={event =>
                  this.handleEditCardDescription(event, listKey, card.key, card)
                }
              >
                <Icon type="save" />
                Save
              </Button>
              <Icon type="close" onClick={this.handleDisableEditDescription} />
            </form>
          ) : card.description ? (
            <p
              onClick={this.handleEnableEditDescription}
              className={styles.descriptionText}
            >
              {card.description}
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
                      card.key,
                      card,
                      tag
                    )
                  }
                />
              ))}
            </div>
          ) : card.importance ? (
            <div>
              <Badge
                onClick={this.handleEnableImportanceChoose}
                count={card.importance}
                style={{ backgroundColor: getBadgeColor(card.importance) }}
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

export default CardModal;
