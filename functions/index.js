'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.SignUpResponse = functions.database.ref('/signUp/{CityID}/areas/{RegionID}/records').onWrite(event => {

    var CityID = event.params.CityID;
    var RegionID = event.params.RegionID;

    admin.database().ref('/signUp/'+ CityID +'/areas/' + RegionID + '/signUpCount/').once('value', function(snapshot) {
        var prevCount = snapshot.val();
        var newCount = prevCount + 1;
        var updates = {};
        updates['/signUp/'+ CityID +'/areas/' + RegionID + '/signUpCount/'] = newCount;
        admin.database().ref().update(updates);
        console.log ('New Sign Up Recorded, total sign up count: ', newCount);
    });
});