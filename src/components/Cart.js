import React, { Component } from 'react';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      cartTitle: '',
      cart: {}
    };

    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.editCart = this.editCart.bind(this);
  }

  toggleEditMode() {
    const { cart } = this.props;
    this.setState({
      cartTitle: cart.title,
      editMode: !this.state.editMode
    });
  }

  editCart(listKey, cartKey, cart) {
    const updatedCart = { ...cart };
    updatedCart.title = this.state.cartTitle;
    this.props.onEditCart(listKey, cartKey, updatedCart);
    this.setState({
      editMode: false
    });
  }

  deleteCart(listKey, cartKey) {
    this.props.onDeleteCart(listKey, cartKey);
  }

  render() {
    const { listKey, cart } = this.props;
    const { editMode } = this.state;

    return (
      <div className="cart">
        {editMode ? (
          <div className="edit-container">
            <input
              onChange={event =>
                this.setState({ cartTitle: event.target.value })
              }
              value={this.state.cartTitle}
            />
            <button onClick={() => this.editCart(listKey, cart.key, cart)}>
              edit
            </button>
          </div>
        ) : (
          <div>
            <span>{cart.title}</span>
            <span onClick={this.toggleEditMode} className="edit-cart">
              E
            </span>
            <span
              onClick={event => this.deleteCart(listKey, cart.key)}
              className="delete-cart"
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
