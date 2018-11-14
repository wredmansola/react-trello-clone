import React, { Component } from 'react';
import { TimePicker, DatePicker, Icon, Button, Popover } from 'antd';
import moment from 'moment';

import styles from './CardDueDate.module.css';

function onDateChange(date, dateString) {
  console.log(date, dateString);
}

function onTimeChange(time, timeString) {
  console.log(time, timeString);
}

export default class CardDueDate extends Component {
  render() {
    return (
      <div>
        <Popover
          placement="bottom"
          title="Change Due Date"
          content={
            <div className={styles.menu}>
              <div>
                <DatePicker onChange={onDateChange} />
              </div>
              <div>
                <TimePicker
                  onChange={onTimeChange}
                  defaultOpenValue={moment('12:00:00', 'HH:mm:ss')}
                />
              </div>
              <div className={styles.controls}>
                <Button>Ok</Button>
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
