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

function sendWelcomeEmail(email, displayName) {
    const mailOptions = {
      from: `MayDaisy <mike@maydaisy.com>`,
      to: email
    };
  
    mailOptions.subject = `Welcome to MayDaisy!`;
    mailOptions.text = `Hey ${displayName || ''}, welcome to MayDaisy. We are a community and marketplace for florists and flower lovers. Hope you will enjoy your experience with us. We are still building out our website infrastructure so somethings like this email don't look very polished yet. Please give us feedback on how we can make your experience better!`;
    mailOptions.html = (
        `<h3>Welcome!</h3>
        <p>Hey ${displayName || ''}, welcome to MayDaisy. We are a community and marketplace for florists and flower lovers. Hope you will enjoy your experience with us. We are still building out our website infrastructure so somethings like this email don't look very polished yet. Please give us feedback on how we can make your experience better!</p> 
        <p>Have a good day ahead,</p>
        <p>Mike</p>`
        );
    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('New welcome email sent to:', email);
    });
  }

exports.WelcomeEmail = functions.auth.user().onCreate(event => {

    const user = event.data; // The Firebase user.
    const email = user.email; // The email of the user.
    const displayName = user.displayName; // The display name of the user.

    return sendWelcomeEmail(email, displayName);
});
///////////

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
        return sendEmailFloristOnTxn(email, arrangementCode, arrangementName, deliveryDate, referenceCode, floristName, floristCode);
    })
});

/////////

function sendEmailCustomerOnReceived (email, arrangementCode, arrangementName, deliveryDate, referenceCode, status, floristName, floristCode) {
    const mailOptions = {
        from: `MayDaisy Update <noreply@maydaisy.com>`, 
        to: email
    };
    mailOptions.subject = `${arrangementCode} - Order Received`;
    mailOptions.text = `Your florist has received the order. Reference Code: ${referenceCode}, Arrangement: ${arrangementName}, Arrangement ID: ${arrangementCode}, Delivery Date: ${deliveryDate}, Status: ${status}.`;
    mailOptions.html = (
    `<h3>Just want to update you that your florist has received the order.</h3>
    <p>Reference Code: ${referenceCode}</p> 
    <p>Arrangement: ${arrangementName}</p>
    <p>Arrangement ID: ${arrangementCode}</p>
    <p>Florist: <a href=https://www.maydaisy.com/florist/"${floristCode}" target="_blank">${floristName}</a></p>
    <p>Status: ${status}</p>  
    <p>Delivery Date: ${deliveryDate}</p>
    <p>For more details, please login to access your order history</p>`
    );
    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('status update email sent to:', email);
    });
}

function sendEmailCustomerOnFulfilled (email, arrangementCode, arrangementName, deliveryDate, referenceCode, status, floristName, floristCode) {
    const mailOptions = {
        from: `MayDaisy Update <noreply@maydaisy.com>`, 
        to: email
    };
    mailOptions.subject = `${arrangementCode} - Order Fulfilled`;
    mailOptions.text = `Your florist has fulfilled the order. Reference Code: ${referenceCode}, Arrangement: ${arrangementName}, Arrangement ID: ${arrangementCode}, Delivery Date: ${deliveryDate}, Status: ${status}.`;
    mailOptions.html = (
    `<h3>Just want to update you that your florist has fulfilled the order. If you love the flowers, please leave a review. It would make her very happy!</h3>
    <p>Reference Code: ${referenceCode}</p> 
    <p>Arrangement: ${arrangementName}</p>
    <p>Arrangement ID: ${arrangementCode}</p>
    <p>Florist: <a href=https://www.maydaisy.com/florist/"${floristCode}" target="_blank">${floristName}</a></p>
    <p>Status: ${status}</p>  
    <p>Delivery Date: ${deliveryDate}</p>
    <p>For more details, please login to access your order history</p>`
    );
    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('status update email sent to:', email);
    });
}

exports.EmailCustomerOnUpdate = functions.database.ref('/allTransactions/{CusID}/transactions/{TxnID}').onUpdate(event => {
    var CusID = event.params.CusID;
    var TxnID = event.params.TxnID;
    var email;
    var status = event.data.child('status').val();
    var arrangementCode = event.data.child('arrangementCode').val();
    var arrangementName = event.data.child('arrangementName').val();
    var deliveryDate = event.data.child('deliveryDate').val();
    var referenceCode = event.data.child('referenceCode').val();
    var floristName = event.data.child('floristName').val();
    var floristCode = event.data.child('floristCode').val();

    admin.database().ref('/users/' + CusID + '/info/email').once('value', function(snapshot) {
       email = snapshot.val();
    }).then(() => {
        
        if (status==='order_received') {
            return sendEmailCustomerOnReceived(email, arrangementCode, arrangementName, deliveryDate, referenceCode, status, floristName, floristCode);
        }
        if (status==='order_fulfilled') {
            return sendEmailCustomerOnFulfilled(email, arrangementCode, arrangementName, deliveryDate, referenceCode, status, floristName, floristCode);
        }
    })
});

/////////