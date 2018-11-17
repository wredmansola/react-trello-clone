import React, { Component } from 'react';
import moment from 'moment';
import { Icon } from 'antd';

import styles from './Date.module.css';

export default class Date extends Component {
  render() {
    let { date } = this.props;
    let formatedDate = moment(date).format('MMM Do');
    return (
      <span className={styles.date}>
        <Icon type="clock-circle" /> {formatedDate}
      </span>
    );
  }
}
