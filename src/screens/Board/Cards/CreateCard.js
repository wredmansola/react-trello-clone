import React, { Component } from 'react';
import { Input } from 'antd';
import styles from './CreateCard.module.css';

class CreateCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardTitle: ''
    };
  }

  handleCreateCard(event, listKey, cardTitle) {
    event.preventDefault();

    const { onCreateCard } = this.props;
    onCreateCard(listKey, cardTitle);
    this.setState({
      cardTitle: ''
    });
  }

  render() {
    const { listKey, onCardEditing, onCardStopEditing } = this.props;
    const { cardTitle } = this.state;

    return (
      <div className={styles.form}>
        <form
          onSubmit={event => this.handleCreateCard(event, listKey, cardTitle)}
        >
          <Input
            onChange={event => this.setState({ cardTitle: event.target.value })}
            value={this.state.cardTitle}
            onClick={e => onCardEditing()}
            onBlur={e => onCardStopEditing()}
            placeholder="Add card"
          />
        </form>
      </div>
    );
  }
}

export default CreateCard;
