import React, { Component } from 'react';

class CreateList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listTitle: ''
    };

    this.createList = this.createList.bind(this);
  }

  createList(boardKey, listTitle) {
    this.props.onCreateList(boardKey, listTitle);
    this.setState({ listTitle: '' });
  }

  render() {
    const { boardKey } = this.props;
    const { listTitle } = this.state;

    return (
      <div>
        Create list&nbsp;
        <input
          onChange={event => this.setState({ listTitle: event.target.value })}
          value={this.state.listTitle}
        />
        <button onClick={event => this.createList(boardKey, listTitle)}>
          Add
        </button>
      </div>
    );
  }
}

export default CreateList;
