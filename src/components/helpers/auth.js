import { ref, firebaseAuth } from '../config/constants'

export function auth (email, pw, languageChanged) {

  // obsolete, saving just in case
  // return firebaseAuth().createUserWithEmailAndPassword(email, pw)
  //   .then(saveUser)

  //saving email to newsletter list, to be combined with guest txn list
  var currentTime = new Date().getTime();
  var newEmail = {email: email, language: languageChanged, dateAdded: currentTime};
  var newPostKey = ref.child(`newsLetterList/${languageChanged}`).push().key;
  var updates = {};
  updates['newsLetterList/' + newPostKey] = newEmail;
  ref.update(updates);

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
