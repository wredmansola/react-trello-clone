import React, { Component } from 'react';
import { Icon, Badge } from 'antd';

import styles from './CartImportance.module.css';
import { getBadgeColor } from '../../../../utils/index';

const ImportanceTags = ['Low', 'Medium', 'High'];

export default class CartImportance extends Component {
  state = {
    importance: '',
    showImportanceChoose: false
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

  handleSelectImportance = (
    event,
    callback,
    listKey,
    cardKey,
    card,
    importance
  ) => {
    event.preventDefault();

    const updatedCard = { ...card };
    updatedCard.importance = importance;
    callback(listKey, cardKey, updatedCard);
    this.handleDisableImportanceChoose();
  };

  render() {
    const { showImportanceChoose } = this.state;
    const { listKey, card, onEditCard } = this.props;

    return (
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
                    onEditCard,
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
    );
  }
}
