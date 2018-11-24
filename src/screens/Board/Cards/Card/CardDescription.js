import React, { Component } from 'react';
import { Input, Icon, Button } from 'antd';

const { TextArea } = Input;

export default class CartDescription extends Component {
  state = {
    cardDescription: '',
    descriptionEditMode: false
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

  handleEditCardDescription = (event, callback, listKey, cardKey, card) => {
    event.preventDefault();

    const updatedCard = { ...card };
    updatedCard.description = this.state.cardDescription;
    callback(listKey, cardKey, updatedCard);
    this.handleDisableEditDescription();
  };

  render() {
    const { descriptionEditMode } = this.state;
    const { listKey, card, onEditCard } = this.props;

    return (
      <div>
        <h3>
          <Icon type="align-left" /> Description
        </h3>
        {descriptionEditMode ? (
          <form>
            <TextArea
              onChange={event =>
                this.setState({ cardDescription: event.target.value })
              }
              value={this.state.cardDescription}
              autosize
              autoFocus
            />
            <Button
              onClick={event =>
                this.handleEditCardDescription(
                  event,
                  onEditCard,
                  listKey,
                  card.key,
                  card
                )
              }
            >
              <Icon type="save" />
              Save
            </Button>
            <Icon type="close" onClick={this.handleDisableEditDescription} />
          </form>
        ) : card.description ? (
          <p onClick={this.handleEnableEditDescription}>{card.description}</p>
        ) : (
          <div onClick={this.handleEnableEditDescription}>
            Write description
          </div>
        )}
      </div>
    );
  }
}
