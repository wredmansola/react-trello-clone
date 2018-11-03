import React, { Component } from 'react';

class ListHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      listTitle: ''
    };

    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.editList = this.editList.bind(this);
  }

  toggleEditMode() {
    const x = 1;
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
    const { editMode } = this.state;
    const {
      listTitle,
      onEditList,
      onDeleteList,
      boardKey,
      listKey
    } = this.props;

    return editMode ? (
      <div>
        <div className="list-edit-container">
          <input
            value={this.state.listTitle}
            onChange={event => this.setState({ listTitle: event.target.value })}
          />
          <button
            onClick={event => this.editList(onEditList, boardKey, listKey)}
          >
            Apply
          </button>
        </div>
      </div>
    ) : (
      <div>
        <b>{listTitle}</b>
        <span onClick={this.toggleEditMode} className="edit-list">
          E
        </span>
        <span
          onClick={event => onDeleteList(boardKey, listKey)}
          className="delete-list"
        >
          X
        </span>
      </div>
    );
  }
}

export default ListHeader;
