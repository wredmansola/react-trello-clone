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
        .ref('cards/')
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
 * @param {string} cardTitle
 */
export const doAddCard = (listKey, cardTitle) =>
  db.ref(`cards/-${listKey}`).push({
    title: cardTitle
  });

/**
 * @param {string} listKey
 */
export const onceGetCard = listKey => db.ref(`cards/-${listKey}`).once('value');

/**
 * @param {string} listId
 * @param {string} cardId
 * @param {object} card
 */
export const doEditCard = (listKey, cardKey, card) =>
  db.ref(`cards/-${listKey}/-${cardKey}`).update({
    ...card
  });

/**
 * @param {string} oldListKey
 * @param {string} newListKey
 * @param {string} cardKey
 * @param {string} card
 */
export const doMoveCard = (oldListKey, newListKey, cardKey, card) =>
  db
    .ref(`cards/-${oldListKey}`)
    .child(`-${cardKey}`)
    .remove()
    .then(() =>
      db.ref(`cards/-${newListKey}/-${cardKey}`).set({
        ...card
      })
    );

/**
 * @param {string} listKey
 * @param {string} cardKey
 */
export const doDeleteCard = (listKey, cardKey) =>
  db
    .ref(`cards/-${listKey}/`)
    .child(`-${cardKey}`)
    .remove();
