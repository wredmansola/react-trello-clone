import React, { Component } from 'react';
import { TimePicker, DatePicker, Icon, Button, Popover } from 'antd';
import moment from 'moment';

import styles from './CardDueDate.module.css';

export default class CardDueDate extends Component {
  state = {
    date: '',
    time: ''
  };
  onDateChange = (date, dateString) => {
    this.setState({
      date: dateString
    });
  };

  onTimeChange = (time, timeString) => {
    this.setState({
      time: timeString
    });
  };

  handleEditCard = (event, callback, listKey, cardKey, card) => {
    event.preventDefault();

    const updatedCard = { ...card };
    updatedCard.date = this.state.date;
    updatedCard.time = this.state.time;
    callback(listKey, cardKey, updatedCard);
  };

  render() {
    const { card, listKey, onEditCard } = this.props;
    let isValid = this.state.date && this.state.time;

    return (
      <div>
        <Popover
          placement="bottom"
          title="Change Due Date"
          content={
            <div className={styles.menu}>
              <div>
                <DatePicker onChange={this.onDateChange} />
              </div>
              <div>
                <TimePicker onChange={this.onTimeChange} />
              </div>
              <div className={styles.controls}>
                <Button
                  onClick={event =>
                    this.handleEditCard(
                      event,
                      onEditCard,
                      listKey,
                      card.key,
                      card
                    )
                  }
                  disabled={!isValid}
                >
                  Ok
                </Button>
                <Button>Cancel</Button>
              </div>
            </div>
          }
          trigger="click"
        >
          <Button>
            <Icon type="clock-circle" /> <b>Due Date</b>
          </Button>
        </Popover>
      </div>
    );
  }
}
