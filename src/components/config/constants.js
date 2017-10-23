import Rebase from 're-base';
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBZHwAIAzAG1cNjxHLgzzicr_NLkmucYGc",
    authDomain: "maydaisy-platform.firebaseapp.com",
    databaseURL: "https://maydaisy-platform.firebaseio.com",
    projectId: "maydaisy-platform",
    storageBucket: "maydaisy-platform.appspot.com",
    messagingSenderId: "89018820797"
};

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database())

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth

export { base }