import React, { Component } from 'react';

import mergeDataWithKey from '../utils';
import Cart from './Cart';

class ListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartName: ''
    };

    this.addCart = this.addCart.bind(this);
  }

  addCart(id, cartName) {
    if (!cartName) {
      return;
    }
    this.props.addCart(id, cartName);
    this.setState({
      cartName: ''
    });
  }

  render() {
    const { list, index, deleteList } = this.props;
    const carts = this.props.list.value.carts
      ? mergeDataWithKey(this.props.list.value.carts)
      : [];
    const { cartName } = this.state;
    return (
      <div className="list-item" key={index}>
        <div className="list-title">
          <b>{list.value.title}</b>
          <span onClick={e => deleteList(list.key)} className="delete-list">
            X
          </span>
        </div>
        {carts.map((cart, index) => {
          return (
            <div key={index}>
              <Cart
                onDelete={this.props.deleteCart}
                listId={list.key}
                cart={cart}
              />
            </div>
          );
        })}
        <input
          onChange={event => this.setState({ cartName: event.target.value })}
          value={this.state.cartName}
        />
        <button className="btn" onClick={e => this.addCart(list.key, cartName)}>
          Add cart
        </button>
      </div>
    );
  }
}

export default ListItem;
