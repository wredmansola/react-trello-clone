import React, { Component } from 'react';

class CartForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartTitle: ''
    };
  }

  addCart(listKey, cartTitle) {
    const { onAddCart } = this.props;
    onAddCart(listKey, cartTitle);
    this.setState({
      cartTitle: ''
    });
  }

  render() {
    const { listKey } = this.props;
    const { cartTitle } = this.state;

    return (
      <div className="list-add-cart">
        <input
          onChange={event => this.setState({ cartTitle: event.target.value })}
          value={this.state.cartTitle}
        />
        <button
          className="btn"
          onClick={event => this.addCart(listKey, cartTitle)}
        >
          Add cart
        </button>
      </div>
    );
  }
}

export default CartForm;
