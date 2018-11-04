import { auth } from './firebase';

/**
 * Sign Up
 * @param {string} email
 * @param {string} password
 */
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

/**
 * Sign In
 * @param {string} email
 * @param {string} password
 */
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

/**
 * Sign out
 */
export const doSignOut = () => auth.signOut();

/**
 * Password Reset
 * @param {string} email
 */
export const doPasswordReset = email => auth.sendPasswordResetEmail(email);

/**
 * Password Change
 * @param {string} password
 */
export const doPasswordUpdate = password =>
  auth.currentUser.updatePassword(password);
