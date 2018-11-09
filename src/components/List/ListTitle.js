import React, { Component } from 'react';
import styles from './List.module.css';
import { Menu, Dropdown, Icon } from 'antd';

class ListTitle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listTitle: ''
    };

    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.editList = this.editList.bind(this);
  }

  toggleEditMode() {
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
  editList(onEditList, boardKey, listKey) {
    const { listTitle } = this.state;
    onEditList(boardKey, listKey, listTitle);
    this.setState({
      editMode: !this.state.editMode
    });
  }

  render() {
    const {
      listTitle,
      onEditList,
      onDeleteList,
      boardKey,
      listKey
    } = this.props;

    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <h2 className={styles.listTitle}>{listTitle}</h2>
      </Dropdown>
    );
  }
}

const menu = (
  <Menu>
    <Menu.Item key="0">
      <span>Edit list</span>
    </Menu.Item>
    <Menu.Item key="1">
      <span>Delete list</span>
    </Menu.Item>
  </Menu>
);

export default ListTitle;
