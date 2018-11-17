import React, { Component } from 'react';
import { Icon } from 'antd';

import styles from './CardDueDateDisplay.module.css';

export default class CardDueDateDisplay extends Component {
  render() {
    let { date, time } = this.props;
    return (
      <div>
        <h3>
          <Icon type="clock-circle" /> Due Date
        </h3>
        <div className={styles.date}>
          {date}, {time}
        </div>
      </div>
    );
  }
}
