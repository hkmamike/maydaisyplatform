import React, { Component } from 'react'
import { firebaseAuth } from '../config/constants';
import { Link, Route } from 'react-router-dom';
import { FormGroup, FormControl, Grid, Row, Col, Button, Glyphicon, Modal } from 'react-bootstrap';
import { base } from '../config/constants';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
  en:{
    mySubscriptions1: 'Order',
    mySubscriptions2: 'History',
    newSubscription1: 'Address',
    newSubscription2: 'Book',
    accountInformation1: 'Account',
    accountInformation2: 'Information',
    subscriptionsList: 'Subscriptions List',
    detailsUpdate: 'Details & Update',
    referenceCode: 'Reference Code:',
    subID: 'Stripe Sub ID:',
    to: 'To:',
    deliveryDay: 'Delivery Day:',
    detailsButton: 'Details',
    flowerType: 'Flower Type:',
    plan: 'Plan :',
    recipient: 'Recipient:',
    address: 'Address:',
    recipientNum: "Recipient's # :",
    card: 'Card :',
    unSubscribeButton: 'Unsubscribe',
    backButton: 'Back',
    updateButton: 'Update',
    tip1_1: '*The cut off time to change card message is ',
    tip1_2: '11:59 p.m. on Wednesday',
    tip1_3: " prior to the next week's delivery.",
    tip2: '**To change delivery address, flower type, or plan, please create a new subscription and unsubscribe from this one. Sorry for any inconvience caused.',
    unSubModalTitle: 'Cancel Subscription',
    unSubText1: 'We are sorry to see you go. To continue, click "Unsubscribe" to confirm.',
    unSubText2: 'Please note that if your cancelation request is received after 11:59 pm HKT on Wednesday, your card has already been charged this week and one more delivery will be made in the following week.',
    unSubText3: 'For further assistance, please reach out to our support hotline: (852)9346-8427.',
    cancelButton: 'Close',
    everyMonday: 'Every Monday',
    everyTuesday: 'Every Tuesday',
    everyWednesday: 'Every Wednesday',
    flower_all: 'Seasonal Flower (all)',
    flower_rose: 'Seasonal Flower (rose only)',
    plan_classic: 'Classic (1-2 blooms, HKD53/week)',
    plan_elegant: 'Elegant (2-4 blooms, HKD93/week)',
    noSub: 'You do not have any subscription.',
    errorOccured: 'An error occured, please try again later.',
    subscriptionUpdated: 'Subscription has been updated.',
    subscriptionCanceled: 'Subscription has been canceled.',
  },
  ch: {}
});

const ButtonToNewSubscriptioin = ({ title, history }) => (
  <Button bsStyle="" className="no-sub-button" onClick={() => history.push('/newsubscription')}>{strings.newSubscription2}</Button>
);

class CancelSubModal extends React.Component {
  constructor() {
    super();
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.unSubscribe = this.unSubscribe.bind(this);
    this.state = {
      showModal: false
    }
  }

  close() {
    this.setState({showModal: false});
  }
  open() {
    this.setState({showModal: true});
  }
  unSubscribe() {
    var uid = this.props.uid;
    var selectRegion = this.props.selectRegion;
    var planID = this.props.planID;
    var subID = this.props.subID;
    var stripeSub = this.props.stripeSub;
    console.log ('parameters are:', uid, selectRegion, planID, subID)
    this.props.onUnsubscribe(uid, selectRegion, planID, subID, stripeSub);
    this.close();
  }
  render() {
    return (
      <div>
        <Button bsStyle="" className="sub-details-unsub"onClick={this.open}>{strings.unSubscribeButton}</Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title><strong>{strings.unSubModalTitle}</strong></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{strings.unSubText1}</h4>
            <p>{strings.unSubText2}</p>
            <p>{strings.unSubText3}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="" className="button button-back" onClick={this.close}>{strings.cancelButton}</Button>
            <Button bsStyle="" className="button" onClick={this.unSubscribe}>{strings.unSubscribeButton}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

class SubDetails extends React.Component {

  constructor() {
    super();
    this.handleBack = this.handleBack.bind(this);
    this.handleSubUpdate = this.handleSubUpdate.bind(this);
    this.handleNumChange = this.handleNumChange.bind(this);
    this.handleCancelSub = this.handleCancelSub.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.state = {
      loading: true,
      subDetails: {},
      cardMessage: '',
      recipientNum: ''
    }
  }

  componentWillMount () {
    this.fireBaseListenerForSubDetails = firebaseAuth().onAuthStateChanged((user) => {
      base.fetch(`users/${user.uid}/subscriptions/${this.props.selectedSub}`, {
        context: this,
        then(data) {
          console.log('data is :', data);
          this.setState({subDetails: data, loading: false, cardMessage: data.cardMessage, recipientNum: data.recipientNum, uid: user.uid});
        }
      });
    });
  }

  componentWillUnmount () {
    //returns the unsubscribe function
    this.fireBaseListenerForSubDetails && this.fireBaseListenerForSubDetails();
  }

  handleCancelSub(uid, selectRegion, planID, subID, stripeSub) {
    fetch('https://wt-47cf129daee3aa0bf6d4064463e232ef-0.run.webtask.io/webtask-stripe-cancel-sub'
      +'?subID=' + stripeSub, {
      method: 'POST'
    }).then(response => {
        response.json().then(data => {
          console.log('response from subscription cancel request: ', data);
          base.remove(`allSubscriptions/hongKong/${selectRegion}/${planID}/${subID}`);
          base.fetch(`users/${uid}/subscriptions/${subID}`, {
            context: this,
            then(data) {
              var postData = data;
              base.post(`users/${uid}/canceledSubscriptions/${subID}`, {
                data: postData
              });
              base.remove(`users/${uid}/subscriptions/${subID}`);
            }
          });
          this.props.onSubscriptionCancelSuccess();
        });
      });
  }

  handleBack = () => {
    this.props.onHandleBack();
  }
  handleSubUpdate = (selectRegion, planID, recipientNum, cardMessage) => {
    this.props.onHandleSubUpdate(selectRegion, planID, recipientNum, cardMessage);
  }
  handleNumChange(e) {
    this.setState({ recipientNum: e.target.value });
  }
  handleMessageChange(e) {
    this.setState({ cardMessage: e.target.value });
  }
  render() {
    var selectedSub = this.props.selectedSub;
    var stripeSub = this.props.stripeSub;
    var subDetails = this.state.subDetails;
    var loadingState = this.state.loading;
    var recipientNum = this.state.recipientNum;
    var cardMessage = this.state.cardMessage;
    var selectRegion = this.state.subDetails.selectRegion;
    var selectLocationType = this.state.subDetails.selectLocationType;
    var planID = this.state.subDetails.planID;
    let content = null;

    if (loadingState) {
      content = <div className="loader"></div>
    } else {
      content = (
        <div>
          <Grid>
            { this.props.subInfoMessage &&
              <div className="alert alert-success update-message" role="alert">
                <Glyphicon glyph="exclamation-sign" className="icons"/>&nbsp;{this.props.subInfoMessage} 
              </div>
            }
            <div className="sub-list-item">
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>{strings.referenceCode}</strong></div>
                  </Col>
                  <Col sm={5}>
                    <div>{subDetails.referenceCode}</div>
                  </Col>
                  <Col sm={3}>
                    <CancelSubModal
                      onUnsubscribe={this.handleCancelSub}
                      uid={this.state.uid}
                      selectRegion={selectRegion}
                      planID={planID}
                      subID={selectedSub}
                      stripeSub={stripeSub}
                    />
                  </Col>
                </FormGroup>
              </Row>

              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>{strings.subID}</strong></div>
                  </Col>
                  <Col sm={8}>
                    <div>{stripeSub}</div>
                  </Col>
                </FormGroup>
              </Row>
              
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>{strings.flowerType}</strong></div>
                  </Col>
                  <Col sm={8}>
                    <div>{strings[subDetails.selectPlanType]}</div>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>{strings.plan}</strong></div>
                  </Col>
                  <Col sm={8}>
                    <div>{strings[subDetails.selectPlanSize]}</div>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>{strings.recipient}</strong></div>
                  </Col>
                  <Col sm={8}>
                    <div>{subDetails.recipient}</div>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>{strings.deliveryDay}</strong></div>
                  </Col>
                  <Col sm={8}>
                    <div>{strings[subDetails.deliveryDay]}</div>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>{strings.address}</strong></div>
                  </Col>
                  <Col sm={8}>
                    <div>{subDetails.address}</div>
                  </Col>
                </FormGroup>
              </Row>
              { selectLocationType === "location_office" && <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>{strings.recipientNum}</strong></div>
                  </Col>
                  <Col sm={7}>
                    <FormControl className="data-field-update" type="text" value={recipientNum} onChange={this.handleNumChange}/>
                  </Col>
                </FormGroup>
              </Row>}
              { selectLocationType === "location_home" && <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>{strings.recipientNum}</strong></div>
                  </Col>
                  <Col sm={7}>
                    <FormControl className="data-field-update" type="text" value={recipientNum} onChange={this.handleNumChange}/>
                  </Col>
                </FormGroup>
              </Row>}
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>{strings.card}</strong></div>
                  </Col>
                  <Col sm={7}>
                    <FormControl className="card-text-area data-field-update" componentClass="textarea" value={cardMessage} onChange={this.handleMessageChange}/>
                    <div className="subscription-tips">{strings.tip1_1}<strong>{strings.tip1_2}</strong>{strings.tip1_3}</div>
                    <div className="subscription-tips">{strings.tip2}</div>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={5}>
                  </Col>
                  <Col sm={4}>
                    <Button bsStyle="" className="button sub-details-back" onClick={() => this.handleBack()}>{strings.backButton}</Button>
                    <Button bsStyle="" className="button sub-details-update" onClick={() => this.handleSubUpdate(selectRegion, planID, recipientNum, cardMessage)}>{strings.updateButton}</Button>
                  </Col>
                </FormGroup>
              </Row>
            </div>
          </Grid>
        </div>
      )
    }
    return (
      <div>{content}</div>
    )
  }
}

export default class Subscriptions extends Component {

  constructor() {
    super();
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleChooseSub = this.handleChooseSub.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleSubUpdate = this.handleSubUpdate.bind(this);
    this.subscriptionCancelSuccess = this.subscriptionCancelSuccess.bind(this);
    this.subscriptionCancelFail = this.subscriptionCancelFail.bind(this);
    this.state = {
      subscriptionData: {},
      loading: true,
      newFrom: '',
      newCardMessage: '',
      subDetailsStatus: 0,
      selectedSub: '',
      userID: '',
      subInfoMessage: null
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.languageChanged==='ch') {
      strings.setLanguage('ch');
    } else if (nextProps.languageChanged==='en') {
      strings.setLanguage('en');
    }
  }

  componentWillMount() {
    strings.setLanguage(this.props.languageChanged);
  }

  componentDidMount () {
    window.scrollTo(0, 0);
    this.fireBaseListenerForSub = firebaseAuth().onAuthStateChanged((user) => {
      base.fetch(`users/${user.uid}/subscriptions/`, {
        context: this,
        then(data) {
          this.setState({subscriptionData: data, loading: false, userID: user.uid});
        }
      });
    });
  }

  componentWillUnmount () {
    //returns the unsubscribe function
    this.fireBaseListenerForSub && this.fireBaseListenerForSub();
  }

  handleCardChange(e, key) {
    this.setState({ newCardMessage: e.target.value });
  }
  handleFromChange(e, key) {
    this.setState({ newFrom: e.target.value });
  }
  handleChooseSub(chosenKey, stripeSub) {
    this.setState({subDetailsStatus: 1, selectedSub: chosenKey, stripeSub: stripeSub});
  }
  handleBack() {
    this.setState({subDetailsStatus: 0});
  }
  handleSubUpdate(selectRegion, planID, recipientNum, cardMessage) {
    var uid = this.state.userID;
    var selectedSub = this.state.selectedSub;
    console.log('handleSubUpdate checkpoint, uid is : ', uid, 'selectedSub is : ', selectedSub);

    base.update(`users/${uid}/subscriptions/${selectedSub}`, {
      data: {
        recipientNum: recipientNum,
        cardMessage: cardMessage,
      }
    });
    base.update(`allSubscriptions/hongKong/${selectRegion}/${planID}/${selectedSub}`, {
      data: {
        recipientNum: recipientNum,
        cardMessage: cardMessage,
      }
    }).then(() => 
        this.setState({ subInfoMessage: strings.subscriptionUpdated})
      ).catch(err => {
        console.log('An error occured when updating account information.');
        this.setState({ subInfoMessage: strings.errorOccured});
      });
  }
  subscriptionCancelSuccess() {
    this.setState({subInfoMessage: strings.subscriptionCanceled, subDetailsStatus: 0});
    base.fetch(`users/${this.state.userID}/subscriptions/`, {
      context: this,
      then(data) {
        this.setState({subscriptionData: data, loading: false});
      }
    });
  }
  subscriptionCancelFail() {
    this.setState({subInfoMessage: strings.errorOccured});
  }

  render () {

    var data = this.state.subscriptionData;
    var loadingState = this.state.loading;
    var subDetailsStatus = this.state.subDetailsStatus;
    var subscriptions;

    // console.log('data check: ', Object.keys(data).length);
    if (Object.keys(data).length===0) {
      subscriptions = (
        <div className="no-sub-section">            
          <div className="center-text">{strings.noSub}</div>
          <Route path="/" render={(props) => <ButtonToNewSubscriptioin {...props}/>} />
        </div>
      )
    } else {
      subscriptions = Object.keys(data).map(function(key) {
        var chosenKey = data[key].referenceCode;
        var stripeSub = data[key].stripeSubID;
        return (
          <div key={key}>
            <Grid>
              <div className="sub-list-item">
                <Row className="show-grid">
                  <FormGroup>
                    <Col sm={1}></Col>
                    <Col sm={3}>
                        <div><strong>{strings.referenceCode}</strong></div>
                    </Col>
                    <Col sm={3}>
                      <div>{data[key].referenceCode}</div>
                    </Col>
                  </FormGroup>
                </Row>
                <Row className="show-grid">
                  <FormGroup>
                    <Col sm={1}></Col>
                    <Col sm={3}>
                        <div><strong>{strings.to}</strong></div>
                    </Col>
                    <Col sm={3}>
                      <div>{data[key].recipient}</div>
                    </Col>
                  </FormGroup>
                </Row>
                <Row className="show-grid">
                  <FormGroup>
                    <Col sm={1}></Col>
                    <Col sm={3}>
                        <div><strong>{strings.deliveryDay}</strong></div>
                    </Col>
                    <Col sm={3}>
                      <div>{strings[data[key].deliveryDay]}</div>
                    </Col>
                  </FormGroup>
                </Row>
                <Row className="show-grid">
                  <FormGroup>
                    {/* <Col xs={} sm={5}></Col> */}
                    <Col xs={1} xsOffset={6} smOffset={9} mdOffset={10}>
                      <Button bsStyle="" className="button sub-details-button" onClick={() => this.handleChooseSub(chosenKey, stripeSub)}>{strings.detailsButton}</Button>
                    </Col>
                  </FormGroup>
                </Row>
              </div>
            </Grid>
          </div>
        )
      }, this)
    }
  
    let content = null;
    if (loadingState) {
      content = (
        <div>
          <div className="horizontal-line"></div>
          <div className="loader"></div>
        </div>
      )
    } else if (subDetailsStatus===0){
      content = (
        <div>
          <Grid>
            <Row className="show-grid loggedin-flow">
              <div className="horizontal-line"></div>
              <Col xs={12}>
                  <div className="flow-selected">{strings.subscriptionsList}</div>
                    <i className="fa fa-chevron-right"></i>
                  <div>{strings.detailsUpdate}</div>
              </Col>
              <div className="horizontal-line"></div>
            </Row>
          </Grid>
          {subscriptions}
        </div>
      )
    } else if (subDetailsStatus===1) {
      content = (
        <div>
          <Grid>
            <Row className="show-grid loggedin-flow">
              <div className="horizontal-line"></div>
              <Col xs={12}>
                  <div>{strings.subscriptionsList}</div>
                    <i className="fa fa-chevron-right"></i>
                  <div className="flow-selected">{strings.detailsUpdate}</div>
              </Col>
              <div className="horizontal-line"></div>
            </Row>
          </Grid>
          <SubDetails 
            selectedSub={this.state.selectedSub} 
            stripeSub = {this.state.stripeSub}
            subInfoMessage={this.state.subInfoMessage} 
            onHandleBack={this.handleBack} 
            onHandleSubUpdate={this.handleSubUpdate}
            onSubscriptionCancelSuccess={this.subscriptionCancelSuccess}
            onSubscriptionCancelFail={this.subscriptionCancelFail}
          />
        </div>
      )
    }

    return (
      <div className="loggedin-background">
        <Grid>
          <Row className="show-grid loggedin-nav">
            <Col xs={4} className="loggedin-nav-button">
              <Link to="/subscriptions" className="nav-selected">
                <i className="fa fa-tags fa-lg nav-icon"></i>
                <div className="nav-icon-title">{strings.mySubscriptions1}<br/>{strings.mySubscriptions2}</div>
              </Link>
            </Col>
            <Col xs={4} className="loggedin-nav-button">
              <Link to="/newsubscription">
                <i className="fa fa-plus fa-lg nav-icon"></i>
                <div className="nav-icon-title">{strings.newSubscription1}<br/>{strings.newSubscription2}</div>
              </Link>
            </Col>
            <Col xs={4} className="loggedin-nav-button">
              <Link to="/accountinfo">
                <i className="fa fa-user-circle fa-lg nav-icon"></i>
                <div className="nav-icon-title">{strings.accountInformation1}<br/>{strings.accountInformation2}</div>
              </Link>
            </Col>
          </Row>
          <Row className="show-grid loggedin-margin-box">
            <Col className="loggedin-content">
              {content}
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}