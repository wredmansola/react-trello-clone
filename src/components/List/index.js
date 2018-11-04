import React, { Component } from 'react';

import ListHeader from './ListHeader';
import CartsContainer from '../Cart/CartsContainer';

class List extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { list, onEditList, onDeleteList, boardKey } = this.props;

    return (
      <div className="list">
        <ListHeader
          boardKey={boardKey}
          listKey={list.key}
          listTitle={list.title}
          onEditList={onEditList}
          onDeleteList={onDeleteList}
        />
        <CartsContainer list={list} />
      </div>
    );
  }
}

export default List;
