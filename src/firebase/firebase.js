import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var config = {
    apiKey: "AIzaSyBzCWI63GArP8iwB11C-4_ON_u9BYR9IAY",
    authDomain: "trello-e352d.firebaseapp.com",
    projectId: "trello-e352d",
    storageBucket: "trello-e352d.appspot.com",
    messagingSenderId: "418832723345",
    appId: "1:418832723345:web:4a361f9c072ed68f9dbe30",
    measurementId: "G-K8ZK9LB83C"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.database();

export { auth, db };
