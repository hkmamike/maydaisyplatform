'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

//create email transporter
const nodemailer = require('nodemailer');
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailEmail,
      pass: gmailPassword
    }
  });

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
function sendEmailFloristOnTxn (email, arrangementCode, arrangementName, deliveryDate, referenceCode) {
    const mailOptions = {
        from: `MayDaisy Update <noreply@maydaisy.com>`, 
        to: email
    };
    mailOptions.subject = `${arrangementCode} - New Order Received!`;
    mailOptions.text = `Customer order received at your MayDaisy shop!. Reference Code: ${referenceCode}, Arrangement: ${arrangementName}, Arrangement ID: ${arrangementCode}, Delivery Date: ${deliveryDate}. Please login to check details on your orders dashboard.`;
    mailOptions.html = (
    `<h3>A customer placed an order at your MayDaisy shop!</h3>
    <p>Reference Code: ${referenceCode}</p> 
    <p>Arrangement: ${arrangementName}</p>
    <p>Arrangement ID: ${arrangementCode}</p>
    <p>Delivery Date: ${deliveryDate}</p>
    <p>Please login to check details on your orders dashboard.</p>`
    );
    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('new order alert email sent to:', email);
    });
}

exports.EmailFloristOnTxn = functions.database.ref('/allTransactions/{FloristID}/{TxnRef}').onWrite(event => {
    var FloristID = event.params.FloristID;
    var email;
    var arrangementCode = event.data.child('arrangementCode').val();
    var arrangementName = event.data.child('arrangementName');
    var deliveryDate = event.data.child('deliveryDate').val();
    var referenceCode = event.data.child('referenceCode').val();

    admin.database().ref('/florists/' + FloristID + '/email/').once('value', function(snapshot) {
       email = snapshot.val();
    }).then(() => {
        return sendEmailFloristOnTxn(email, arrangementCode, arrangementName, deliveryDate, referenceCode);
    })
});
/////////