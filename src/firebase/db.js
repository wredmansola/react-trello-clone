import { db } from './firebase';
import { getUser } from './user';

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email
  });

export const onceGetUsers = () => db.ref('users').once('value');

const boardsRef = db.ref('boards');
const listsRef = db.ref('lists');

export const doCreateBoard = async board => {
  const uid = getUser().uid;
  const id = boardsRef.push().key;
  await boardsRef
    .child(uid)
    .child(id)
    .set(board);
  board.key = id;
  return board;
};

export const onceGetBoards = () => {
  const uid = getUser().uid;
  return boardsRef.child(uid).once('value');
};

export const doEditBoard = (boardKey, board) => {
  const uid = getUser().uid;

  boardsRef
    .child(uid)
    .child(boardKey)
    .update({
      ...board
    })
    .then(() => board);
};

export const onceGetBoard = key => {
  const uid = getUser().uid;

  return boardsRef
    .child(uid)
    .child(`${key}`)
    .once('value');
};

export const onceGetLists = key => listsRef.child(key).once('value');

export const doCreateList = async (boardKey, list) => {
  const id = listsRef.push().key;
  await listsRef
    .child(boardKey)
    .child(id)
    .set(list);
  list.key = id;
  return list;
};

export const doDeleteList = (boardKey, listKey) =>
  db
    .ref(`lists/${boardKey}`)
    .child(`${listKey}`)
    .remove()
    .then(() =>
      db
        .ref('cards/')
        .child(`${listKey}`)
        .remove()
    );

export const doUpdateList = (boardKey, listKey, list) => {
  listsRef
    .child(boardKey)
    .child(listKey)
    .update({
      list
    });
  return list;
};

export const doAddCard = (listKey, cardTitle) =>
  db.ref(`cards/${listKey}`).push({
    title: cardTitle
  });

export const onceGetCard = listKey => db.ref(`cards/${listKey}`).once('value');

export const doEditCard = (listKey, cardKey, card) =>
  db.ref(`cards/${listKey}/${cardKey}`).update({
    ...card
  });

export const doMoveCard = (oldListKey, newListKey, cardKey, card) =>
  db
    .ref(`cards/${oldListKey}`)
    .child(`${cardKey}`)
    .remove()
    .then(() =>
      db.ref(`cards/${newListKey}/${cardKey}`).set({
        ...card
      })
    );

export const doDeleteCard = (listKey, cardKey) =>
  db
    .ref(`cards/${listKey}/`)
    .child(`${cardKey}`)
    .remove();
