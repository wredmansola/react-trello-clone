import React, { Component } from 'react';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      cartName: '',
      cart: this.props.cart
    };

    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  toggleEditMode() {
    const { cart } = this.props;
    this.setState({
      cartName: cart.value.title,
      editMode: !this.state.editMode
    });
  }

  confirm() {
    let updatedCart = { ...this.state.cart };
    updatedCart.value.title = this.state.cartName;

    const { listId, cart } = this.props;
    this.props.onEdit(listId, cart.key, cart.value);
    this.setState({
      editMode: !this.state.editMode,
      cart: updatedCart
    });
  }

  render() {
    const { listId, onDelete } = this.props;
    const { editMode, cart } = this.state;
    return (
      <div className="cart">
        {editMode ? (
          <div className="cart-edit-container">
            <input
              onChange={event =>
                this.setState({ cartName: event.target.value })
              }
              value={this.state.cartName}
            />
            <button onClick={this.confirm}>Confirm</button>
          </div>
        ) : (
          <div>
            <span>{cart.value.title}</span>
            <span onClick={this.toggleEditMode} className="edit-cart">
              E
            </span>
            <span
              className="delete-cart"
              onClick={e => onDelete(listId, cart.key)}
            >
              X
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default Cart;
