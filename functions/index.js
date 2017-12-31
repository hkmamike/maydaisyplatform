'use strict';

//initialize firebase functions
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

//initialize algolia
const algoliasearch = require('algoliasearch');

const algolia = algoliasearch(functions.config().algolia.appid, functions.config().algolia.adminkey);
const index = algolia.initIndex('arrangementsList');

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
        `
        <h3>Welcome!</h3>
        <p>Hey ${displayName || ''}, welcome to MayDaisy. We are a community and marketplace for florists and flower lovers. Hope you will enjoy your experience with us. Please give us feedback on how we can make your experience better!</p> 
        <p>Have a good day ahead,</p>
        <p>Mike</p>
        `
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

function sendEmailFloristOnTxn (email, arrangementCode, arrangementName, deliveryDate, referenceCode, language) {

    if (language === 'en') {
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
    } else if (language === 'ch') {
        const mailOptions = {
            from: `五月菊通知 <noreply@maydaisy.com>`, 
            to: email
        };
        mailOptions.subject = `收到新定購!`;
        mailOptions.text = `五月菊更新通知: 您的五月菊商店收到一個新訂單!. 參考碼: ${referenceCode}, 設計: ${arrangementName}, 設計ID: ${arrangementCode}, 送貨日期: ${deliveryDate}. 如要查看詳情，請登入五月菊。`;
        mailOptions.html = (
        `<h3>五月菊更新通知: 您的五月菊商店收到一個新訂單</h3>
        <p>參考碼: ${referenceCode}</p> 
        <p>設計: ${arrangementName}</p>
        <p>設計ID: ${arrangementCode}</p>
        <p>送貨日期: ${deliveryDate}</p>
        <p>如要查看詳情，請<a href="https://maydaisy.com/login">登入</a>五月菊。</p>`
        );
    }


    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('new order alert email sent to:', email);
    });
}

function sendEmailCustomerOnTxn (email, arrangementCode, arrangementName, deliveryDate, referenceCode, language) {
    if (language === 'en') {
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
    } else if (language === 'ch') {
        const mailOptions = {
            from: `五月菊通知 <noreply@maydaisy.com>`, 
            to: email
        };
        mailOptions.subject = `訂單已發出`;
        mailOptions.text = `您的訂單已發發給花匠，以下是訂單記錄。參考碼: ${referenceCode}, 設計: ${arrangementName}, 設計ID: ${arrangementCode}, 送貨日期: ${deliveryDate}. 如要查看詳情，請登入五月菊。`;
        mailOptions.html = (
            `<h3>您的訂單已發發給花匠，以下是訂單記錄。</h3>
            <p>參考碼: ${referenceCode}</p> 
            <p>設計: ${arrangementName}</p>
            <p>設計ID: ${arrangementCode}</p>
            <p>送貨日期: ${deliveryDate}</p>
            <p>如要查看詳情，請<a href="https://maydaisy.com/login">登入</a>五月菊。</p>`
        );
    }
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
    var senderEmail = event.data.child('senderEmail').val();
    var language = event.data.child('languageChanged').val();

    admin.database().ref('/florists/' + FloristID + '/email/').once('value', function(snapshot) {
       floristEmail = snapshot.val();
    }).then(() => {
        return sendEmailFloristOnTxn(floristEmail, arrangementCode, arrangementName, deliveryDate, referenceCode, language) 
            && sendEmailCustomerOnTxn(senderEmail, arrangementCode, arrangementName, deliveryDate, referenceCode, language);
    })
});

/////////

function sendEmailCustomerOnReceived (email, arrangementCode, arrangementName, deliveryDate, referenceCode, status, floristName, floristCode, language) {
    if (language === 'en') {
        const mailOptions = {
            from: `MayDaisy Update <noreply@maydaisy.com>`, 
            to: email
        };
        mailOptions.subject = `Order Received`;
        mailOptions.text = `Your florist has received the order. Reference Code: ${referenceCode}, Arrangement: ${arrangementName}, Arrangement ID: ${arrangementCode}, Delivery Date: ${deliveryDate}, Status: Order Received.`;
        mailOptions.html = (
        `<h3>Just want to update you that your florist has received the order.</h3>
        <p>Reference Code: ${referenceCode}</p> 
        <p>Arrangement: ${arrangementName}</p>
        <p>Arrangement ID: ${arrangementCode}</p>
        <p>Florist: <a href="https://maydaisy.com/florist/${floristCode}" target="_blank">${floristName}</a></p>
        <p>Status: Order Received</p>  
        <p>Delivery Date: ${deliveryDate}</p>
        <p>For more details, please <a href="https://maydaisy.com/login">login</a> to access your order history.</p>`
        );
    } else if (language === 'ch') {
        const mailOptions = {
            from: `五月菊通知 <noreply@maydaisy.com>`, 
            to: email
        };
        mailOptions.subject = `花匠已收到訂單`;
        mailOptions.text = `五月菊更新通知: 您的花匠已收到您的訂單。參考碼: ${referenceCode}, 設計: ${arrangementName}, 設計ID: ${arrangementCode}, 送貨日期: ${deliveryDate}, 狀態: 已收到訂單.`;
        mailOptions.html = (
        `<h3>五月菊更新通知: 您的花匠已收到您的訂單。</h3>
        <p>參考碼: ${referenceCode}</p> 
        <p>設計: ${arrangementName}</p>
        <p>設計ID: ${arrangementCode}</p>
        <p>花匠: <a href="https://maydaisy.com/florist/${floristCode}" target="_blank">${floristName}</a></p>
        <p>狀態: 已收到訂單</p>  
        <p>送貨日期: ${deliveryDate}</p>
        <p>如要查看詳情，請<a href="https://maydaisy.com/login">登入</a>五月菊。</p>`
        );
    }
    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('status update email sent to:', email);
      var updates = {};
      updates['/allTransactions/' + floristCode + '/' + referenceCode + '/orderReceivedEmailSent/'] = 'true';
      admin.database().ref().update(updates);
    });
}

function sendEmailCustomerOnFulfilled (email, arrangementCode, arrangementName, deliveryDate, referenceCode, status, floristName, floristCode, language) {
    if (language ==='en') {
        const mailOptions = {
            from: `MayDaisy Update <noreply@maydaisy.com>`, 
            to: email
        };
        mailOptions.subject = `Order Fulfilled`;
        mailOptions.text = `Your florist has fulfilled the order. Reference Code: ${referenceCode}, Arrangement: ${arrangementName}, Arrangement ID: ${arrangementCode}, Delivery Date: ${deliveryDate}, Status: ${status}.`;
        mailOptions.html = (
        `<h3>Just want to update you that your florist has delivered the order. If you and your recipient love the flowers, please leave a review. It would make her very happy!</h3>
        <p>Reference Code: ${referenceCode}</p> 
        <p>Arrangement: ${arrangementName}</p>
        <p>Arrangement ID: ${arrangementCode}</p>
        <p>Florist: <a href="https://maydaisy.com/florist/${floristCode}" target="_blank">${floristName}</a></p>
        <p>Status: Fulfilled</p>  
        <p>Delivery Date: ${deliveryDate}</p>
        <p>For more details, please <a href="https://maydaisy.com/login">login</a>  to access your order history.</p>`
        );
    } else if (langauge ==='ch') {
        const mailOptions = {
            from: `五月菊通知 <noreply@maydaisy.com>`, 
            to: email
        };
        mailOptions.subject = `花匠已送花`;
        mailOptions.text = `五月菊更新通知: 您的花匠已經送花。 參考碼: ${referenceCode}, 設計: ${arrangementName}, 設計ID: ${arrangementCode}, 送貨日期: ${deliveryDate}, 狀態: Order Fulfilled.`;
        mailOptions.html = (
        `<h3>五月菊更新通知: 您的花匠已經送花。如果您喜歡您所選的花匠的設計和服務，請給她寫一個好評。</h3>
        <p>參考碼: ${referenceCode}</p> 
        <p>設計: ${arrangementName}</p>
        <p>設計ID: ${arrangementCode}</p>
        <p>花匠: <a href="https://maydaisy.com/florist/${floristCode}" target="_blank">${floristName}</a></p>
        <p>狀態: Fulfilled</p>  
        <p>送貨日期: ${deliveryDate}</p>
        <p>如要查看詳情，請<a href="https://maydaisy.com/login">登入</a>五月菊。</p>`
        );
    }
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
    var language = event.data.child('languageChanged').val();
        
    if (status==='order_received' && orderReceivedEmailSent==='false') {
        return sendEmailCustomerOnReceived(email, arrangementCode, arrangementName, deliveryDate, referenceCode, status, floristName, floristCode, language);
    }
    if (status==='order_fulfilled' && orderFulfilledEmailSent==='false') {
        return sendEmailCustomerOnFulfilled(email, arrangementCode, arrangementName, deliveryDate, referenceCode, status, floristName, floristCode, language);
    }
});

/////////

exports.algoliaUpdate = functions.database.ref('/arrangementsList/{arrangementID}').onUpdate(event => {
    var arrangementID = event.params.arrangementID;
    const data = event.data.val();
    data['objectID'] = arrangementID;

    return index.saveObjects(data, (err, content) => {
        if (err) throw err
        console.log('Arrangement updated in Algolia Index', data.objectID);
    })
});


exports.algoliaDelete = functions.database.ref('/arrangementsList/{arrangementID}').onDelete(event => {
    var arrangementID = event.params.arrangementID;

    return index.deleteObjects('myID', (err) => {
        if (err) throw err
        console.log('Arrangement deleted in Algolia Index', arrangementID);
    })
});

/////////