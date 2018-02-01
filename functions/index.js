'use strict';

//initialize firebase functions
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

//initialize algolia
const algoliasearch = require('algoliasearch');

const algolia = algoliasearch(functions.config().algolia.appid, functions.config().algolia.adminkey);

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

    var mailOptions;

    if (language === 'en') {
        mailOptions = {
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
    } else if (language === 'zh') {
        mailOptions = {
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
      console.log('new order alert email sent to florist:', email);
    });
}

function sendEmailCustomerOnTxn (email, arrangementCode, arrangementName, deliveryDate, referenceCode, language) {

    var mailOptions;

    if (language === 'en') {
        mailOptions = {
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
    } else if (language === 'zh') {
        mailOptions = {
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
      console.log('new order alert email sent to customer:', email);
    });
}

function sendEmailAdminOnTxn (FloristID, arrangementCode, arrangementName, deliveryDate, referenceCode) {
    
        var mailOptions;
    
        mailOptions = {
            from: `MayDaisy Update <noreply@maydaisy.com>`, 
            to: 'mike@maydaisy.com'
        };
        mailOptions.subject = `New Txn`;
        mailOptions.text = `We have got a new Txn! WooHoo~~~`;
        mailOptions.html = (
            `<h3>We have got a new Txn! WooHoo~~~</h3>
            <p>Florist: ${FloristID}</p> 
            <p>Reference Code: ${referenceCode}</p> 
            <p>Arrangement: ${arrangementName}</p>
            <p>Arrangement ID: ${arrangementCode}</p>
            <p>Delivery Date: ${deliveryDate}</p>
            <p>Please <a href="https://maydaisy.com/login">login</a> to check details.</p>`
        );
       
        return mailTransport.sendMail(mailOptions).then(() => {
          console.log('new order alert email sent to admin');
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
       console.log('floristEmail is ', floristEmail);
    }).then(() => {
        return sendEmailFloristOnTxn(floristEmail, arrangementCode, arrangementName, deliveryDate, referenceCode, language) 
            && sendEmailCustomerOnTxn(senderEmail, arrangementCode, arrangementName, deliveryDate, referenceCode, language)
            && sendEmailAdminOnTxn(FloristID, arrangementCode, arrangementName, deliveryDate, referenceCode);
    })
});

/////////

function sendEmailCustomerOnReceived (email, arrangementCode, arrangementName, deliveryDate, referenceCode, status, floristName, floristCode, language) {
    var mailOptions;
    
    if (language === 'en') {
        mailOptions = {
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
        <p>For more details, please <a href="https://maydaisy.com/en/auth/login">login</a> to access your order history.</p>`
        );
    } else if (language === 'zh') {
        mailOptions = {
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
        <p>如要查看詳情，請<a href="https://maydaisy.com/en/auth/login">登入</a>五月菊。</p>`
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
    
    var mailOptions;

    if (language ==='en') {
        mailOptions = {
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
        <p>For more details, please <a href="https://maydaisy.com/en/auth/login">login</a>  to access your order history.</p>`
        );
    } else if (language ==='zh') {
        mailOptions = {
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
        <p>如要查看詳情，請<a href="https://maydaisy.com/zh/auth/login">登入</a>五月菊。</p>`
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
    var reviewed = event.data.child('reviewed').val();
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


exports.ReviewsStats = functions.database.ref('/florists/{FloristID}/reviews/{ReviewID}').onCreate(event => {
    var FloristID = event.params.FloristID;
    var ReviewID = event.params.ReviewID;
    var score = event.data.child('rating').val();
    var newAverageRating;
    var newRatingCount;
    var updates = {};

    admin.database().ref('/florists/' + FloristID + '/reviewsStats/').once('value', function(snapshot) {
        var ratingCount = snapshot.child('ratingCount').val();
        var averageRating = snapshot.child('averageRating').val();

        if (ratingCount && averageRating) {
            newAverageRating = Math.round(((ratingCount*averageRating + score)/(ratingCount + 1)*100))/100;
        } else {
            newAverageRating = score;
        }

        if (snapshot.hasChild('ratingCount')) {
            newRatingCount = snapshot.child('ratingCount').val() + 1;
        } else {
            newRatingCount = 1;
        }
     }).then(() => {
        updates['/florists/' + FloristID + '/reviewsStats/ratingCount'] = newRatingCount;
        updates['/florists/' + FloristID + '/reviewsStats/averageRating'] = newAverageRating;
        admin.database().ref().update(updates);
     })
});

/////////

exports.PromoCodeStats = functions.database.ref('/allTransactions/{FloristID}/{TxnID}').onUpdate(event => {
    var TxnID = event.params.TxnID;
    var codeUsed = event.data.child('codeUsed').val();
    var referenceCode = event.data.child('referenceCode').val();
    var updates = {};
    var newUsedCount;

    if (codeUsed !== '') {
        console.log('codeUsed is : ', codeUsed);
        admin.database().ref('/promoCode/' + codeUsed + '/').once('value', function(snapshot) {
            var txnReference;
            var usedCount = snapshot.child('usedCount').val();
            newUsedCount = usedCount + 1;
            if (snapshot.hasChild('txnReference')) {
                txnReference = snapshot.child('txnReference').val();
                txnReference.push(referenceCode);
            } else {
                txnReference = [];
                txnReference.push(referenceCode);
            }
         }).then(() => {
            updates['/promoCode' + codeUsed + '/usedCount'] = newUsedCount;
            updates['/promoCode' + codeUsed + '/txnReference'] = txnReference;
            admin.database().ref().update(updates);
         })

    } 
        
});

/////////

exports.algoliaUpdate = functions.database.ref('/arrangementsList/{arrangementID}').onUpdate(event => {
    const arrangementID = event.params.arrangementID;
    const data = event.data.val();
    const index = algolia.initIndex('arrangementsList');
    var updates = {};
    data['objectID'] = arrangementID;

    if (!event.data.child('random').changed()) {
        //shuffle arrangements, to be effective next time
        updates['/arrangementsList/' + arrangementID + '/random'] = Math.floor(Math.random() * 999) + 1;
        admin.database().ref().update(updates);
    }

    return index.saveObject(data, (err, content) => {
        if (err) throw err
        console.log('Arrangement updated in Algolia Index', data.objectID);
    })
});


exports.algoliaDelete = functions.database.ref('/arrangementsList/{arrangementID}').onDelete(event => {
    const arrangementID = event.params.arrangementID;
    const index = algolia.initIndex('arrangementsList');

    return index.deleteObject(arrangementID, (err) => {
        if (err) throw err
        console.log('Arrangement deleted in Algolia Index', arrangementID);
    })
});

/////////