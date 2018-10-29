import React from 'react';

const Cart = ({ cart, listId, onDelete }) => {
  console.log(listId);
  return (
    <div className="cart">
      <span>{cart.value.title}</span>
      <span className="delete-list" onClick={e => onDelete(listId, cart.key)}>
        X
      </span>
    </div>
  );
};

export default Cart;
