import React, { Component } from 'react';
import { Input, Icon } from 'antd';
import styles from './CreateCart.module.css';

class CreateCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartTitle: ''
    };
  }

  handleCreateCart(event, listKey, cartTitle) {
    event.preventDefault();

    const { onCreateCart } = this.props;
    onCreateCart(listKey, cartTitle);
    this.setState({
      cartTitle: ''
    });
  }

  render() {
    const { listKey, onCartEditing, onCartStopEditing } = this.props;
    const { cartTitle } = this.state;

    return (
      <div className={styles.form}>
        <form
          onSubmit={event => this.handleCreateCart(event, listKey, cartTitle)}
        >
          <Input
            onChange={event => this.setState({ cartTitle: event.target.value })}
            value={this.state.cartTitle}
            onClick={e => onCartEditing()}
            onBlur={e => onCartStopEditing()}
            placeholder="Add cart"
          />
        </form>
      </div>
    );
  }
}

export default CreateCart;
