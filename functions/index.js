'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

///////
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

////////
sendEmailFloristOnTxn = (email) => {
    const mailOptions = {
        from: `${APP_NAME} <noreply@maydaisy.com>`, 
        to: email
    };
    mailOptions.subject = `A customer placed an order at your ${APP_NAME} shop!`;
    mailOptions.text = `Please login to check your orders dashboard.`;
    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('new order alert email sent to:', email);
    });
}

exports.EmailFloristOnTxn = functions.database.ref('/allTransactions/{FloristID}').onWrite(event => {
    var FloristID = event.params.FloristID;
    var email;

    admin.database().ref('/florists/' + FloristID + '/email/').once('value', function(snapshot) { 
       email = snapshot.val();
    });

    return sendEmailFloristOnTxn(email);
});
/////////