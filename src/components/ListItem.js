import React, { Component } from 'react';

import mergeDataWithKey from '../utils';
import Cart from './Cart';

class ListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartName: '',
      editMode: false,
      listTitle: ''
    };

    this.addCart = this.addCart.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.confirm = this.confirm.bind(this);
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

  toggleEditMode() {
    const { list } = this.props;
    this.setState({
      editMode: !this.state.editMode,
      listTitle: list.value.title
    });
  }

  confirm() {
    let updatedList = { ...this.props.list };
    updatedList.value.title = this.state.listTitle;
    this.props.editList(updatedList.key, updatedList.value);
    this.setState({
      editMode: !this.state.editMode
    });
  }

  render() {
    const { list, index, deleteCart, deleteList, editCart } = this.props;
    const carts = this.props.list.value.carts
      ? mergeDataWithKey(this.props.list.value.carts)
      : [];
    const { cartName, editMode } = this.state;
    return (
      <div className="list-item" key={index}>
        <div className="list-title">
          {editMode ? (
            <div className="list-edit-container">
              <input
                value={this.state.listTitle}
                onChange={event =>
                  this.setState({ listTitle: event.target.value })
                }
              />
              <button onClick={this.confirm}>Confirm</button>
            </div>
          ) : (
            <div className="list-title-row">
              <b>{list.value.title}</b>
              <span onClick={this.toggleEditMode} className="edit-list">
                E
              </span>
              <span onClick={e => deleteList(list.key)} className="delete-list">
                X
              </span>
            </div>
          )}
        </div>
        {carts.map((cart, index) => {
          return (
            <div key={index}>
              <Cart
                onDelete={deleteCart}
                onEdit={editCart}
                listId={list.key}
                cart={cart}
              />
            </div>
          );
        })}
        <div className="list-add-cart">
          <input
            onChange={event => this.setState({ cartName: event.target.value })}
            value={this.state.cartName}
          />
          <button
            className="btn"
            onClick={e => this.addCart(list.key, cartName)}
          >
            Add cart
          </button>
        </div>
      </div>
    );
  }
}

export default ListItem;
