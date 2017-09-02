import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { Button } from 'react-bootstrap';
import * as firebase from 'firebase';
import { base } from '../config/constants';
 
export default class ChargeMoney extends React.Component {
  onToken = (token) => {
    var uid = firebase.auth().currentUser.uid;
    var selectRegion = this.props.selectRegion;
    var planID = this.props.planID;

    var selectPlanType = this.props.selectPlanType;
    var selectPlanSize = this.props.selectPlanSize;
    var grandTotalPerWeek = this.props.grandTotal;

    var senderName = this.props.sender;
    var senderNum = this.props.senderNum;
    var senderEmail = token.email;

    var recipient = this.props.recipient;
    var recipientNum = this.props.recipientNum;
    var company = this.props.company;
    var address = this.props.address;
    var cardMessage = this.props.cardMessage;

    var stripeTokID = token.id;
    var stripeCusID;
    var stripeSubID;

    console.log('sending token to webtask, token is : ', token);
    fetch('https://wt-47cf129daee3aa0bf6d4064463e232ef-0.run.webtask.io/webtask-stripe-order'
    +'?paymentSource=' + token.id
    +'&paymentEmail=' + token.email, {
      method: 'POST',
    }).then(response => {
        response.json().then(data => {
            console.log ('customer has been created: ', data);
            console.log ('customer id is:', data.id);
            stripeCusID = data.id;
            console.log ('plandID is :', this.props.planID);
            fetch('https://wt-47cf129daee3aa0bf6d4064463e232ef-0.run.webtask.io/webtask-stripe-payment' 
            + '?customerID=' + data.id 
            + '&planID=' + this.props.planID, {
                method: 'POST',
            })
            .then(response => {
                response.json().then(data => {
                    console.log ('subscription response: ', data);
                    stripeSubID = data.id;
                    console.log ('2check to see if token is visible: ', token);
                    base.update(`allSubscriptions/hongKong/${selectRegion}/${planID}/${uid}`, {
                        data: {
                              selectPlanType: selectPlanType,
                              selectPlanSize: selectPlanSize,
                              grandTotalPerWeek: grandTotalPerWeek,
                              senderName: senderName,
                              senderNum: senderNum,
                              senderEmail: senderEmail,
                              recipient: recipient,
                              recipientNum: recipientNum,
                              company: company,
                              address: address,
                              cardMessage: cardMessage,
                              stripeTokID: stripeTokID,
                              stripeCusID: stripeCusID,
                              stripeSubID: stripeSubID
                        }
                    });
                });
            });
        });
    })
}
 

//   submitSubscription (
//         token,
//         uid,
//         stripeCusID,
//         selectRegion,
//         planID, 
//         flowers, 
//         size, 
//         sender,
//         senderNum,
//         senderEmail,
//         recipient, 
//         recipientNum, 
//         comapny, 
//         address,
//         cardMessage,
//         pricePerWeek) {
//     base.update(`allSubscriptions/hongKong/${selectRegion}/${planID}/${stripeCusID}`, {
//       data: {
//             paymentToken: token.id,
//             flowers: flowers,
//             size: size,
//             sender: sender,
//             senderNum: senderNum,
//             senderEmail, senderEmail,
//             senderID: uid,
//             recipient: recipient,
//             recipientNum: recipientNum,
//             addressLocation: company,
//             address: address,
//             cardMessage: cardMessage,
//             price: pricePerWeek
//         }
//     });
//     var generatedKey = immediatelyAvailableReference.key;
//     this.setState({loading: false, formSubmitted: true});
//   }

  // ...
  render() {
    return (
      // ...
      <StripeCheckout
        name="One Bloom"
        description="Flower Subscription"
        image="" //app icon
        panelLabel="Pay" // prepended to the amount in the bottom pay button
        amount={this.props.price} // cents
        currency="HKD"
        stripeKey="pk_test_5AFpArfSAWtcsdRPGtFItgiH"
        locale="auto"
        label="Subscribe"
        allowRememberMe = {false} // "Remember Me" option (default true)
        token={this.onToken} // submit callback    
      >
        <Button bsStyle="" className="button">Subscribe</Button>
      </StripeCheckout>
    )
  }
}