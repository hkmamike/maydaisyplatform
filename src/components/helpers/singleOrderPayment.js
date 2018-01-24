import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { Button } from 'react-bootstrap';
import * as firebase from 'firebase';
import { base } from '../config/constants';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
  en:{
    subscribeButton: 'Place Order',
    checkOutName: 'MayDaisy',
    checkOutDescription: 'Flower Purchase',
    checkOutLabel: 'Place Order'

  },
  ch: {
    subscribeButton: '訂購',
    checkOutName: '五月菊',
    checkOutDescription: '鮮花訂購',
    checkOutLabel: '訂購'
  }
});

export default class PlaceOrder extends React.Component {

    constructor() {
        super();
        this.state = {
          errorMessage: '',
          stripeSubID: '',
          firstPayment: '',
          firstDelivery: ''
        }
    }

    componentWillMount() {
        strings.setLanguage(this.props.languageChanged);
    }
    
    componentWillReceiveProps (nextProps) {
        if (nextProps.languageChanged==='ch') {
            strings.setLanguage('ch');
        } else if (nextProps.languageChanged==='en') {
            strings.setLanguage('en');
        }
    }
    
    progressOrderStep = (referenceCode, stripeTxnID, deliveryDate) => {
        this.props.onOrderStep(referenceCode, stripeTxnID, deliveryDate);
        console.log('proceeding to confirmation page');
    }

    showLoader () {
        this.props.onLoading();
    }

    onToken = (token) => {
        var floristID = this.props.floristID;
        var marketRegion = this.props.marketRegion;
        var floristName = this.props.floristName;
        var arrangementCode = this.props.arrangement;
        var arrangementName = this.props.arrangementName;
        var arrangementImage = this.props.arrangementImage;
        var currency = this.props.currency;
        var price = this.props.price;
        var arrangementPrice = this.props.arrangementPrice;
        var arrangementOriginalPrice = this.props.arrangementOriginalPrice;
        var promoCodeApplied = this.props.promoCodeApplied;
        var deliveryFee = this.props.deliveryFee;
        var selectDeliveryType = this.props.selectDeliveryType;
        var languageChanged = this.props.languageChanged;
        var senderName = this.props.sender;
        var senderNum = this.props.senderNum;
        var senderEmail = token.email;
        var recipient = this.props.recipient;
        var recipientNum = this.props.recipientNum;
        var company = this.props.company;
        var address = this.props.address;
        var deliveryInstruction = this.props.deliveryInstruction;
        var deliveryDate = this.props.deliveryDate.format("YYYY-MMM-DD");
        var cardMessage = this.props.cardMessage;
        var stripeTokID = token.id;
        var stripeCusID;
        var stripeTxnID;
        var last4;
        var cardType;
        var cardExpYear;
        var cardExpMonth;
        var referenceRan = Math.floor(Math.random()*(999 - 100) + 100);
        var dateNow = new Date().getTime();
        var monthNow = new Date().getMonth() + 1;
        var referenceCode = "" + dateNow + referenceRan;
        var orderRoute = this.props.orderRoute;
        var senderEmailOnReg = this.props.email;
        var uid = '';
        var addressBookChecked = false;
        var floristRevenueMin = (this.props.arrangementPrice * 0.8) + (this.props.deliveryFee * 0.96);
        var floristRevenue85 = (this.props.arrangementPrice * 0.85) + (this.props.deliveryFee * 0.96);
        var floristRevenue90 = (this.props.arrangementPrice * 0.9) + (this.props.deliveryFee * 0.96);
        var floristRevenueBase = this.props.arrangementPrice + this.props.deliveryFee;

        if (orderRoute === 'login') {
            addressBookChecked = this.props.addressBookChecked;
            uid = firebase.auth().currentUser.uid;
        }



        console.log('stripe created token. Forwarding to web server : ', token);
        console.log('reference code is :', referenceCode);
        this.showLoader();

        fetch('https://wt-47cf129daee3aa0bf6d4064463e232ef-0.run.webtask.io/web-task-stripe-order-marketplace'
        +'?paymentSource=' + token.id
        +'&paymentEmail=' + token.email, {
        method: 'POST',
        })
        .then(response => {
            response.json().then(data => {
                console.log('customer created. Proceeding to charge : ', data);
                stripeCusID = data.id;
                last4 = data.sources.data[0].last4;
                cardType = data.sources.data[0].brand;
                cardExpYear = data.sources.data[0].exp_year;
                cardExpMonth = data.sources.data[0].exp_month;
                fetch('https://wt-47cf129daee3aa0bf6d4064463e232ef-0.run.webtask.io/webtask-stripe-charge' 
                +'?paymentCustomer=' + stripeCusID
                +'&paymentCurrency=' + currency
                +'&paymentAmount=' + price, {
                    method: 'POST',
                })
                .then(response => {
                    response.json().then(data => {
                        console.log('response from charge: ', data);
                        stripeTxnID = data.id;

                        this.setState({
                            stripeTxnID: stripeTxnID,
                        });

                        console.log ('floristID is :', floristID);

                        base.post(`allTransactions/${floristID}/${referenceCode}`, {
                            data: {
                                city: 'HK',
                                reviewed: false,
                                status: 'order_submitted',
                                florist: floristID,
                                floristName: floristName,
                                uid: uid,
                                marketRegion: marketRegion,
                                price: price,
                                orderMonth: monthNow,
                                currency: currency,
                                arrangementPrice: arrangementPrice,
                                arrangementOriginalPrice: arrangementOriginalPrice,
                                promoCodeApplied: promoCodeApplied,
                                deliveryFee: deliveryFee,
                                floristRevenueBase: floristRevenueBase,
                                floristRevenue85: floristRevenue85,
                                floristRevenue90: floristRevenue90,
                                floristRevenueMin: floristRevenueMin,
                                arrangementName: arrangementName,
                                arrangementImage: arrangementImage,
                                arrangementCode: arrangementCode,
                                deliveryDate: deliveryDate,
                                senderName: senderName,
                                senderNum: senderNum,
                                senderEmail: senderEmail,
                                senderEmailOnReg: senderEmailOnReg,
                                recipient: recipient,
                                recipientNum: recipientNum,
                                company: company,
                                address: address,
                                cardMessage: cardMessage,
                                stripeTokID: stripeTokID,
                                stripeCusID: stripeCusID,
                                stripeTxnID: stripeTxnID,
                                orderReceivedAt: dateNow,
                                last4: last4,
                                cardType: cardType,
                                cardExpYear: cardExpYear,
                                cardExpMonth: cardExpMonth,
                                referenceCode: referenceCode,
                                selectDeliveryType: selectDeliveryType,
                                languageChanged: languageChanged,
                                deliveryInstruction: deliveryInstruction,
                                orderRoute: orderRoute,
                                orderReceivedEmailSent: 'false',
                                orderFulfilledEmailSent: 'false',
                            }
                        });
                        if (orderRoute === 'login') {
                            base.post(`users/${uid}/transactions/${referenceCode}`, {
                                data: {
                                    city: 'HK',
                                    reviewed: false,
                                    status: 'order_submitted',
                                    florist: floristID,
                                    floristName: floristName,
                                    uid: uid,
                                    marketRegion: marketRegion,
                                    price: price,
                                    orderMonth: monthNow,
                                    currency: currency,
                                    arrangementPrice: arrangementPrice,
                                    arrangementOriginalPrice: arrangementOriginalPrice,
                                    promoCodeApplied: promoCodeApplied,
                                    deliveryFee: deliveryFee,
                                    arrangementName: arrangementName,
                                    arrangementImage: arrangementImage,
                                    arrangementCode: arrangementCode,
                                    deliveryDate: deliveryDate,
                                    senderName: senderName,
                                    senderNum: senderNum,
                                    senderEmail: senderEmail,
                                    senderEmailOnReg: senderEmailOnReg,
                                    recipient: recipient,
                                    recipientNum: recipientNum,
                                    company: company,
                                    address: address,
                                    cardMessage: cardMessage,
                                    stripeTokID: stripeTokID,
                                    stripeCusID: stripeCusID,
                                    stripeTxnID: stripeTxnID,
                                    orderReceivedAt: dateNow,
                                    last4: last4,
                                    cardType: cardType,
                                    cardExpYear: cardExpYear,
                                    cardExpMonth: cardExpMonth,
                                    referenceCode: referenceCode,
                                    selectDeliveryType: selectDeliveryType,
                                    languageChanged: languageChanged,
                                    deliveryInstruction: deliveryInstruction,
                                    orderRoute: orderRoute,
                                }
                            });

                            base.update(`users/${uid}/info/`, {
                                data: {
                                    name: senderName,
                                    phone: senderNum,
                                }
                            });

                            if (addressBookChecked) {
                                base.post(`users/${uid}/address/${referenceCode}`, {
                                    data: {
                                        city: 'HK',
                                        uid: uid,
                                        referenceCode: referenceCode,
                                        recipient: recipient,
                                        recipientNum: recipientNum,
                                        company: company,
                                        address: address,
                                        selectDeliveryType: selectDeliveryType,
                                        deliveryInstruction: deliveryInstruction,
                                        defaultAddress: false
                                    }
                                });
                            }
                        } else if (orderRoute === 'guest') {
                            base.post(`guestTransactions/${referenceCode}`, {
                                data: {
                                    city: 'HK',
                                    reviewed: false,
                                    status: 'order_submitted',
                                    florist: floristID,
                                    floristName: floristName,
                                    price: price,
                                    orderMonth: monthNow,
                                    marketRegion: marketRegion,
                                    currency: currency,
                                    arrangementPrice: arrangementPrice,
                                    arrangementOriginalPrice: arrangementOriginalPrice,
                                    promoCodeApplied: promoCodeApplied,
                                    floristRevenueBase: floristRevenueBase,
                                    floristRevenue85: floristRevenue85,
                                    floristRevenue90: floristRevenue90,
                                    floristRevenueMin: floristRevenueMin,
                                    deliveryFee: deliveryFee,
                                    arrangementName: arrangementName,
                                    arrangementImage: arrangementImage,
                                    arrangementCode: arrangementCode,
                                    deliveryDate: deliveryDate,
                                    senderName: senderName,
                                    senderNum: senderNum,
                                    senderEmail: senderEmail,
                                    senderEmailOnReg: senderEmailOnReg,
                                    recipient: recipient,
                                    recipientNum: recipientNum,
                                    company: company,
                                    address: address,
                                    cardMessage: cardMessage,
                                    stripeTokID: stripeTokID,
                                    stripeCusID: stripeCusID,
                                    stripeTxnID: stripeTxnID,
                                    orderReceivedAt: dateNow,
                                    last4: last4,
                                    cardType: cardType,
                                    cardExpYear: cardExpYear,
                                    cardExpMonth: cardExpMonth,
                                    referenceCode: referenceCode,
                                    selectDeliveryType: selectDeliveryType,
                                    languageChanged: languageChanged,
                                    deliveryInstruction: deliveryInstruction,
                                    orderRoute: orderRoute,
                                }
                            });
                            base.push(`newsLetterList`, {
                                data: {
                                    email: senderEmail,
                                    language: languageChanged,
                                    dateAdded: dateNow,
                                }
                            });
                        }
                        console.log ('subscriptioin processing succeeded.');
                        this.progressOrderStep(referenceCode, stripeTxnID, deliveryDate);
                    });
                });
            });
        })
    }

    render() {
        return (
            <StripeCheckout
                name={strings.checkOutName}
                description={strings.checkOutDescription}
                image="https://firebasestorage.googleapis.com/v0/b/onebloom-cfa9d.appspot.com/o/logo.png?alt=media&token=d3f89daa-2818-4ec2-9aed-b006e7cd9f24" //app icon
                panelLabel="Pay" // prepended to the amount in the bottom pay button
                amount={this.props.price} // cents
                currency={this.props.currency}
                stripeKey="pk_test_5AFpArfSAWtcsdRPGtFItgiH" //live or testing key
                locale="auto"
                label={strings.checkOutLabel}
                allowRememberMe = {true} // "Remember Me" option (default true)
                token={this.onToken} // submit callback
            >
                <Button bsStyle="" className="button-new-sub">{strings.subscribeButton}</Button>
            </StripeCheckout>
        )
    }
}