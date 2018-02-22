import { ref, firebaseAuth } from '../config/constants'
import ReactPixel from 'react-facebook-pixel';
ReactPixel.init('814639808740001');
ReactPixel.fbq('track');

export function auth (email, pw, languageChanged) {

  //saving email to newsletter list, to be combined with guest txn list
  var currentTime = new Date().getTime();
  var newEmail = {email: email, language: languageChanged, dateAdded: currentTime, source: 'auth',};
  var newPostKey = ref.child(`newsLetterList/${languageChanged}`).push().key;
  var updates = {};
  updates[`newsLetterList/${languageChanged}/` + newPostKey] = newEmail;
  ref.update(updates);
  
  ReactPixel.track('Lead');

  //create new account
  return firebaseAuth().createUserWithEmailAndPassword(email, pw).then(saveUser);
}

export function logout () {
  return firebaseAuth().signOut()
}

export function login (email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword (email) {
  return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}/info`).set({
    email: user.email,
    uid: user.uid
  }).then(() => user)
}
