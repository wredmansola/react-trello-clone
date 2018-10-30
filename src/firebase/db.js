import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email
  });

export const onceGetUsers = () => db.ref('users').once('value');

// Other Entity APIs ...

export const doAddBoard = board =>
  db.ref('boards').push({
    ...board
  });

export const onceGetBoards = () => db.ref('boards').once('value');

export const onceGetBoard = id => db.ref(`boards/-${id}`).once('value');

export const doAddList = (boardId, list) =>
  db.ref(`boards/-${boardId}/lists`).push({
    ...list
  });

export const doDeleteList = (boardId, listId) =>
  db
    .ref(`boards/-${boardId}/lists`)
    .child(`-${listId}`)
    .remove();

export const doAddCart = (boardId, listId, cart) =>
  db.ref(`boards/-${boardId}/lists/-${listId}/carts`).push({
    ...cart
  });

export const doDeleteCart = (boardId, listId, cartId) =>
  db
    .ref(`boards/-${boardId}/lists/-${listId}/carts`)
    .child(`-${cartId}`)
    .remove();

export const doEditCart = (boardId, listId, cartId, cart) =>
  db.ref(`boards/-${boardId}/lists/-${listId}/carts/-${cartId}`).set({
    ...cart
  });
