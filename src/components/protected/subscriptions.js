import React, { Component } from 'react'
import { firebaseAuth } from '../config/constants';
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, Grid, Row, Col, Button, Glyphicon, Modal } from 'react-bootstrap';
import { base } from '../config/constants';

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
    console.log ('parameters are:', uid, selectRegion, planID, subID)
    this.props.onUnsubscribe(uid, selectRegion, planID, subID);
    this.close();
  }
  render() {
    return (
      <div>
        <Button bsStyle="" className="sub-details-unsub"onClick={this.open}>Unsubscribe</Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title><strong>Cancel Subscription</strong></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>We are sorry to see you go. To continue, click "Unsubscribe" to confirm.</h4>
            <p>Please note that if your cancelation request is received after 11:59 pm HKT on Wednesday, your card has already been charged this week and one more delivery will be made in the following week.</p>
            <p>For further assistance, please reach out to our support hotline: (852)9346-8427.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="" className="button button-back" onClick={this.close}>Close</Button>
            <Button bsStyle="" className="button" onClick={this.unSubscribe}>Unsubscribe</Button>
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

  componentDidMount () {
    firebaseAuth().onAuthStateChanged((user) => {
      base.fetch(`users/${user.uid}/subscriptions/${this.props.selectedSub}`, {
        context: this,
        then(data) {
          this.setState({subDetails: data, loading: false, cardMessage: data.cardMessage, recipientNum: data.recipientNum, uid: user.uid});
        }
      });
    });
  }

  handleCancelSub(uid, selectRegion, planID, subID) {
    fetch('https://wt-47cf129daee3aa0bf6d4064463e232ef-0.run.webtask.io/webtask-stripe-cancel-sub'
      +'?subID=' + subID, {
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
      }, error => {
            error.json().then( error => {
              console.log ('subscription cancel failed.');
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
    var subDetails = this.state.subDetails;
    var loadingState = this.state.loading;
    var recipientNum = this.state.recipientNum;
    var cardMessage = this.state.cardMessage;
    var selectRegion = this.state.subDetails.selectRegion;
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
                      <div><strong>Sub ID:</strong></div>
                  </Col>
                  <Col sm={5}>
                    <div>{selectedSub}</div>
                  </Col>
                  <Col sm={3}>
                    <CancelSubModal
                      onUnsubscribe={this.handleCancelSub}
                      uid={this.state.uid}
                      selectRegion={selectRegion}
                      planID={planID}
                      subID={selectedSub}
                    />
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>Flower Type:</strong></div>
                  </Col>
                  <Col sm={8}>
                    <div>{subDetails.selectPlanType}</div>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>Plan:</strong></div>
                  </Col>
                  <Col sm={8}>
                    <div>{subDetails.selectPlanSize}</div>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>Recipient:</strong></div>
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
                      <div><strong>Delivery Day:</strong></div>
                  </Col>
                  <Col sm={8}>
                    <div>{subDetails.deliveryDay}</div>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>Address:</strong></div>
                  </Col>
                  <Col sm={8}>
                    <div>{subDetails.address}</div>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>Recipient's #:</strong></div>
                  </Col>
                  <Col sm={7}>
                    <FormControl className="data-field-update" type="text" value={recipientNum} onChange={this.handleNumChange}/>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>Card:</strong></div>
                  </Col>
                  <Col sm={7}>
                    <FormControl className="card-text-area data-field-update" componentClass="textarea" value={cardMessage} onChange={this.handleMessageChange}/>
                    <div className="subscription-tips">*The cut off time to change card message is <strong>11:59 pm on Wednesday</strong> prior to the next week's delivery. </div>
                    <div className="subscription-tips">**To change delivery address, flower type, or plan, please create a new subscription and unsubscribe from this one.</div>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={5}>
                  </Col>
                  <Col sm={4}>
                    <Button bsStyle="" className="button sub-details-back" onClick={() => this.handleBack()}>Back</Button>
                    <Button bsStyle="" className="button sub-details-update" onClick={() => this.handleSubUpdate(selectRegion, planID, recipientNum, cardMessage)}>Update</Button>
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
    this.subscriptionSuccess = this.subscriptionSuccess.bind(this);
    this.subscriptionFail = this.subscriptionFail.bind(this);
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

  componentDidMount () {
    firebaseAuth().onAuthStateChanged((user) => {
      var userID = user.uid
      base.fetch(`users/${user.uid}/subscriptions/`, {
        context: this,
        then(data) {
          this.setState({subscriptionData: data, loading: false, userID: userID});
        }
      });
    });
  }

  handleCardChange(e, key) {
    this.setState({ newCardMessage: e.target.value });
  }
  handleFromChange(e, key) {
    this.setState({ newFrom: e.target.value });
  }
  handleChooseSub(chosenKey) {
    this.setState({subDetailsStatus: 1, selectedSub: chosenKey});
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
        this.setState({ subInfoMessage: 'Subscriptioin has been updated.'})
      ).catch(err => {
        console.log('An error occured when updating account information.');
        this.setState({ subInfoMessage: 'An error occured, please try again later.'});
      });
  }
  subscriptionSuccess() {
    this.setState({subInfoMessage: 'Subscription has been canceled.'});
  }
  subscriptionFail() {
    this.setState({subInfoMessage: 'An error occured, please try again later.'});
  }

  render () {

    var data = this.state.subscriptionData;
    var loadingState = this.state.loading;
    var subDetailsStatus = this.state.subDetailsStatus;
    var subscriptions;

    // console.log('data check: ', Object.keys(data).length);
    if (Object.keys(data).length===0) {
      subscriptions = <div className="center-text">You do not have any subscription</div>
    } else {
      subscriptions = Object.keys(data).map(function(key) {
        var chosenKey = data[key].stripeSubID;
        return (
          <div key={key}>
            <Grid>
              <div className="sub-list-item">
                <Row className="show-grid">
                  <FormGroup>
                    <Col sm={1}></Col>
                    <Col sm={3}>
                        <div><strong>Sub ID:</strong></div>
                    </Col>
                    <Col sm={3}>
                      <div>{data[key].stripeSubID}</div>
                    </Col>
                  </FormGroup>
                </Row>
                <Row className="show-grid">
                  <FormGroup>
                    <Col sm={1}></Col>
                    <Col sm={3}>
                        <div><strong>To:</strong></div>
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
                        <div><strong>Frequency:</strong></div>
                    </Col>
                    <Col sm={3}>
                      <div>{data[key].deliveryDay}</div>
                    </Col>
                  </FormGroup>
                </Row>
                <Row className="show-grid">
                  <FormGroup>
                    {/* <Col xs={} sm={5}></Col> */}
                    <Col xs={1} xsOffset={6} smOffset={9} mdOffset={10}>
                      <Button bsStyle="" className="button sub-details-button" onClick={() => this.handleChooseSub(chosenKey)}>Details</Button>
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
                  <div className="flow-selected">Subscriptions List</div>
                    <i className="fa fa-chevron-right"></i>
                  <div>Details & Update</div>
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
                  <div>Subscriptions List</div>
                    <i className="fa fa-chevron-right"></i>
                  <div className="flow-selected">Details & Update</div>
              </Col>
              <div className="horizontal-line"></div>
            </Row>
          </Grid>
          <SubDetails 
            selectedSub={this.state.selectedSub} 
            subInfoMessage={this.state.subInfoMessage} 
            onHandleBack={this.handleBack} 
            onHandleSubUpdate={this.handleSubUpdate}
            onSubscriptionCancelSuccess={this.subscriptionSuccess}
            onSubscriptionCancelFail={this.subscriptionFail}
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
                <div className="nav-icon-title">My<br/>Subscriptions</div>
              </Link>
            </Col>
            <Col xs={4} className="loggedin-nav-button">
              <Link to="/newsubscription">
                <i className="fa fa-plus fa-lg nav-icon"></i>
                <div className="nav-icon-title">New<br/>Subscription</div>
              </Link>
            </Col>
            <Col xs={4} className="loggedin-nav-button">
              <Link to="/accountinfo">
                <i className="fa fa-user-circle fa-lg nav-icon"></i>
                <div className="nav-icon-title">Account<br/>Information</div>
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