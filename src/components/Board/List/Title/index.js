import React, { Component } from 'react';

import styles from './ListTitle.module.css';
import { Menu, Dropdown, Modal, Icon } from 'antd';

class ListTitle extends Component {
  state = {
    listTitle: '',
    editMode: false,
    visible: false
  };

  handleOk() {
    this.setState({
      visible: false
    });
    this.props.onDeleteList(this.props.boardKey, this.props.listKey);
  }

  handleCancel() {
    this.setState({
      visible: false
    });
  }

  showModal() {
    this.setState({
      visible: true
    });
  }

  handleToggleEditMode() {
    this.setState({
      editMode: !this.state.editMode,
      listTitle: this.props.listTitle
    });
  }

  /**
   * @param {function} onEditList
   * @param {string} boardKey
   * @param {string} listKey
   */
  handleEditList(callback, boardKey, listKey) {
    const { listTitle } = this.state;
    callback(boardKey, listKey, listTitle);
    this.setState({
      editMode: !this.state.editMode
    });
  }

  handleDeleteList(callback, boardKey, listKey) {
    callback(boardKey, listKey);
  }

  render() {
    const {
      listTitle,
      onDeleteList,
      onEditList,
      boardKey,
      listKey
    } = this.props;

    const { editMode } = this.state;

    return editMode ? (
      <div>
        <form
          onBlur={this.handleToggleEditMode}
          onSubmit={e => this.handleEditList(onEditList, boardKey, listKey)}
        >
          <input
            className={styles.listTitleEdit}
            onChange={e => this.setState({ listTitle: e.target.value })}
            value={this.state.listTitle}
            autoFocus
          />
        </form>
      </div>
    ) : (
      <div>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="0">
                <div
                  role="button"
                  tabIndex="0"
                  onClick={e => this.handleToggleEditMode()}
                >
                  <Icon type="edit" /> Edit list
                </div>
              </Menu.Item>
              <Menu.Item>
                <div role="button" tabIndex="0" onClick={e => this.showModal()}>
                  <Icon type="delete" /> Delete list
                </div>
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <h2 className={styles.listTitle}>{listTitle}</h2>
        </Dropdown>

        <Modal
          title="Confirm deleting"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          onDeleteList={onDeleteList}
          boardKey={boardKey}
          listKey={listKey}
        >
          <p>Delete list?</p>
        </Modal>
      </div>
    );
  }
}

export default ListTitle;
