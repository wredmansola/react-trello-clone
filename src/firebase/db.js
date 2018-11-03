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

/**
 *
 * @param {string} key
 * @returns {Promise<firebase.database.DataSnapshot> | *}
 */
export const onceGetLists = key => db.ref(`lists/-${key}`).once('value');

export const doCreateList = (boardId, listTitle) =>
  db.ref(`lists/-${boardId}`).push({
    title: listTitle
  });

/**
 *
 * @param {string} boardKey
 * @param {string} listKey
 */
export const doDeleteList = (boardKey, listKey) =>
  db
    .ref(`lists/-${boardKey}`)
    .child(`-${listKey}`)
    .remove();

/**
 * @param {string} boardKey
 * @param {string} listKey
 * @param {string} listTitle
 * @returns {firebase.firestore.Transaction | firebase.firestore.WriteBatch | Promise<void> | Promise<any> | IDBRequest | void}
 */
export const doEditList = (boardKey, listKey, listTitle) =>
  db.ref(`lists/-${boardKey}/-${listKey}`).update({
    title: listTitle
  });

export const doAddCart = (listKey, cartTitle) =>
  db.ref(`carts/-${listKey}`).push({
    title: cartTitle
  });

/**
 * @param {string} listKey
 */
export const onceGetCart = listKey => db.ref(`carts/-${listKey}`).once('value');

/**
 * @param {string} listId
 * @param {string} cartId
 * @param {object} cart
 */
export const doEditCart = (listKey, cartKey, cart) =>
  db.ref(`carts/-${listKey}/-${cartKey}`).update({
    title: cart.title
  });

/**
 * @param {string} listKey
 * @param {string} cartKey
 */
export const doDeleteCart = (listKey, cartKey) =>
  db
    .ref(`carts/-${listKey}/`)
    .child(`-${cartKey}`)
    .remove();
