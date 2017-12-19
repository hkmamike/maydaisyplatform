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

  //////////
function sendWelcomeEmail(email, displayName) {
    const mailOptions = {
      from: `MayDaisy <mike@maydaisy.com>`,
      to: email
    };
  
    mailOptions.subject = `Welcome to MayDaisy!`;
    mailOptions.text = `Hey ${displayName || ''}, welcome to MayDaisy. We are a community and marketplace for florists and flower lovers. Hope you will enjoy your experience with us. We are still building out our website infrastructure so somethings like this email don't look very polished yet. Please give us feedback on how we can make your experience better!`;
    mailOptions.html = (
        `<h3>Welcome!</h3>
        <p>Hey ${displayName || ''}, welcome to MayDaisy. We are a community and marketplace for florists and flower lovers. Hope you will enjoy your experience with us. Please give us feedback on how we can make your experience better!</p> 
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
    mailOptions.subject = `New Order Received!`;
    mailOptions.text = `Customer order received at your MayDaisy shop!. Reference Code: ${referenceCode}, Arrangement: ${arrangementName}, Arrangement ID: ${arrangementCode}, Delivery Date: ${deliveryDate}. Please login to check details on your orders dashboard.`;
    mailOptions.html = (
    `<h3>A customer placed an order at your MayDaisy shop!</h3>
    <p>Reference Code: ${referenceCode}</p> 
    <p>Arrangement: ${arrangementName}</p>
    <p>Arrangement ID: ${arrangementCode}</p>
    <p>Delivery Date: ${deliveryDate}</p>
    <p>Please <a href="https://maydaisy.com/login">login</a> to check details on your orders dashboard.</p>`
    );
    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('new order alert email sent to:', email);
    });
}

function sendEmailCustomerOnTxn (email, arrangementCode, arrangementName, deliveryDate, referenceCode) {
    const mailOptions = {
        from: `MayDaisy Update <noreply@maydaisy.com>`, 
        to: email
    };
    mailOptions.subject = `Order Placed`;
    mailOptions.text = `This is an acknowledgement for your order placement, it has been forward to your selected florist. Reference Code: ${referenceCode}, Arrangement: ${arrangementName}, Arrangement ID: ${arrangementCode}, Delivery Date: ${deliveryDate}. Please login to check details on your orders dashboard.`;
    mailOptions.html = (
    `<h3>This is an acknowledgement for your order placement, it has been forwarded to your selected florist.</h3>
    <p>Reference Code: ${referenceCode}</p> 
    <p>Arrangement: ${arrangementName}</p>
    <p>Arrangement ID: ${arrangementCode}</p>
    <p>Delivery Date: ${deliveryDate}</p>
    <p>Please <a href="https://maydaisy.com/login">login</a> to check details on your orders dashboard.</p>`
    );
    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('new order alert email sent to:', email);
    });
}

exports.EmailOnTxn = functions.database.ref('/allTransactions/{FloristID}/{TxnRef}').onCreate(event => {
    var FloristID = event.params.FloristID;
    var floristEmail;
    var arrangementCode = event.data.child('arrangementCode').val();
    var arrangementName = event.data.child('arrangementName').val();
    var deliveryDate = event.data.child('deliveryDate').val();
    var referenceCode = event.data.child('referenceCode').val();
    var senderEmail;

    admin.database().ref('/florists/' + FloristID + '/email/').once('value', function(snapshot) {
       email = snapshot.val();
    }).then(() => {
        return sendEmailFloristOnTxn(floristEmail, arrangementCode, arrangementName, deliveryDate, referenceCode) 
            && sendEmailCustomerOnTxn(email, );
    })
});

/////////

function sendEmailCustomerOnReceived (email, arrangementCode, arrangementName, deliveryDate, referenceCode, status, floristName, floristCode) {
    const mailOptions = {
        from: `MayDaisy Update <noreply@maydaisy.com>`, 
        to: email
    };
    mailOptions.subject = `Order Received`;
    mailOptions.text = `Your florist has received the order. Reference Code: ${referenceCode}, Arrangement: ${arrangementName}, Arrangement ID: ${arrangementCode}, Delivery Date: ${deliveryDate}, Status: ${status}.`;
    mailOptions.html = (
    `<h3>Just want to update you that your florist has received the order.</h3>
    <p>Reference Code: ${referenceCode}</p> 
    <p>Arrangement: ${arrangementName}</p>
    <p>Arrangement ID: ${arrangementCode}</p>
    <p>Florist: <a href="https://maydaisy.com/florist/${floristCode}" target="_blank">${floristName}</a></p>
    <p>Status: ${status}</p>  
    <p>Delivery Date: ${deliveryDate}</p>
    <p>For more details, please <a href="https://maydaisy.com/login">login</a> to access your order history.</p>`
    );
    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('status update email sent to:', email);
      var updates = {};
      updates['/allTransactions/' + floristCode + '/' + referenceCode + '/orderReceivedEmailSent/'] = 'true';
      admin.database().ref().update(updates);
    });
}

function sendEmailCustomerOnFulfilled (email, arrangementCode, arrangementName, deliveryDate, referenceCode, status, floristName, floristCode) {
    const mailOptions = {
        from: `MayDaisy Update <noreply@maydaisy.com>`, 
        to: email
    };
    mailOptions.subject = `Order Fulfilled`;
    mailOptions.text = `Your florist has fulfilled the order. Reference Code: ${referenceCode}, Arrangement: ${arrangementName}, Arrangement ID: ${arrangementCode}, Delivery Date: ${deliveryDate}, Status: ${status}.`;
    mailOptions.html = (
    `<h3>Just want to update you that your florist has fulfilled the order. If you love the flowers, please leave a review. It would make her very happy!</h3>
    <p>Reference Code: ${referenceCode}</p> 
    <p>Arrangement: ${arrangementName}</p>
    <p>Arrangement ID: ${arrangementCode}</p>
    <p>Florist: <a href="https://maydaisy.com/florist/${floristCode}" target="_blank">${floristName}</a></p>
    <p>Status: ${status}</p>  
    <p>Delivery Date: ${deliveryDate}</p>
    <p>For more details, please <a href="https://maydaisy.com/login">login</a>  to access your order history.</p>`
    );
    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('status update email sent to:', email);
      var updates = {};
      updates['/allTransactions/' + floristCode + '/' + refereoceCode + '/orderFulfilledEmailSent/'] = 'true';
      admin.database().ref().update(updates);
    });
}

exports.EmailCustomerOnUpdate = functions.database.ref('/allTransactions/{FloristID}/{TxnID}').onUpdate(event => {
    var TxnID = event.params.TxnID;
    var email = event.data.child('senderEmail').val();
    var status = event.data.child('status').val();
    var arrangementCode = event.data.child('arrangementCode').val();
    var arrangementName = event.data.child('arrangementName').val();
    var deliveryDate = event.data.child('deliveryDate').val();
    var referenceCode = event.data.child('referenceCode').val();
    var floristName = event.data.child('floristName').val();
    var floristCode = event.data.child('florist').val();
    var orderReceivedEmailSent = event.data.child('orderReceivedEmailSent').val();
    var orderFulfilledEmailSent = event.data.child('orderFulfilledEmailSent').val();
    var CusID = event.data.child('uid').val();
        
    if (status==='order_received' && orderReceivedEmailSent==='false') {
        return sendEmailCustomerOnReceived(email, arrangementCode, arrangementName, deliveryDate, referenceCode, status, floristName, floristCode);
    }
    if (status==='order_fulfilled' && orderFulfilledEmailSent==='false') {
        return sendEmailCustomerOnFulfilled(email, arrangementCode, arrangementName, deliveryDate, referenceCode, status, floristName, floristCode);
    }
});

/////////