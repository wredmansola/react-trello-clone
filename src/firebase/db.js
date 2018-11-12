import { db } from './firebase';

/**
 * @param {string} id
 * @param {string} username
 * @param {string} email
 */
export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email
  });

export const onceGetUsers = () => db.ref('users').once('value');

// Board API

export const doAddBoard = board =>
  db.ref('boards').push({
    ...board
  });

export const onceGetBoards = () => db.ref('boards').once('value');

/**
 *
 * @param {string} key
 */
export const onceGetBoard = key => db.ref(`boards/-${key}`).once('value');

/**
 * @param {string} key
 * @returns {Promise<firebase.database.DataSnapshot> | *}
 */
export const onceGetLists = key => db.ref(`lists/-${key}`).once('value');

/**
 * @param {string} boardKey
 * @param {string} listTitle
 */
export const doCreateList = (boardKey, listTitle) =>
  db.ref(`lists/-${boardKey}`).push({
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
    .remove()
    .then(() =>
      db
        .ref('carts/')
        .child(`-${listKey}`)
        .remove()
    );

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

/**
 *
 * @param {string} listKey
 * @param {string} cartTitle
 */
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
    ...cart
  });

/**
 * @param {string} oldListKey
 * @param {string} newListKey
 * @param {string} cartKey
 * @param {string} cart
 */
export const doMoveCart = (oldListKey, newListKey, cartKey, cart) =>
  db
    .ref(`carts/-${oldListKey}`)
    .child(`-${cartKey}`)
    .remove()
    .then(() =>
      db.ref(`carts/-${newListKey}/-${cartKey}`).set({
        ...cart
      })
    );

/**
 * @param {string} listKey
 * @param {string} cartKey
 */
export const doDeleteCart = (listKey, cartKey) =>
  db
    .ref(`carts/-${listKey}/`)
    .child(`-${cartKey}`)
    .remove();
