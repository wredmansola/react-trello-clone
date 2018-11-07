import React, { Component } from 'react';
import { Modal, Icon } from 'antd';

import styles from './AddBoard.module.css';

import WrappedAddBoardForm from '../AddBoardForm';

export default class AddBoard extends Component {
  state = {
    modalVisible: false
  };

  setModalVisible = modalVisible => {
    this.setState({ modalVisible });
  };

  render() {
    const { onCreateBoard } = this.props;
    return (
      <div className={styles.addBoardWrapper}>
        <div className={styles.addBoard}>
          <Icon
            type="plus"
            theme="outlined"
            onClick={() => this.setModalVisible(true)}
          />
        </div>
        <div>
          <Modal
            footer={null}
            title="Add board"
            style={{ top: 20 }}
            visible={this.state.modalVisible}
            onCancel={() =>
              this.setState({ modalVisible: !this.state.modalVisible })
            }
          >
            <WrappedAddBoardForm
              onCreateBoard={onCreateBoard}
              onPopupClose={() =>
                this.setState({ modalVisible: !this.state.modalVisible })
              }
            />
          </Modal>
        </div>
      </div>
    );
  }
}
