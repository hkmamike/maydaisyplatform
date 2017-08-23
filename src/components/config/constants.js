import Rebase from 're-base';
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCdO59JRFsBdZvzoLE64VQEeSEcxKsdeyg",
    authDomain: "onebloom-cfa9d.firebaseapp.com",
    databaseURL: "https://onebloom-cfa9d.firebaseio.com",
    projectId: "onebloom-cfa9d",
    storageBucket: "onebloom-cfa9d.appspot.com",
    messagingSenderId: "379070404951"
};

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database())

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth

export { base }