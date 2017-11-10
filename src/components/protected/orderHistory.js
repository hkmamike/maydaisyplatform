import React, { Component } from 'react'
import { firebaseAuth } from '../config/constants';
import { Link, Route } from 'react-router-dom';
import { FormGroup, FormControl, Grid, Row, Col, Button, Glyphicon, Modal } from 'react-bootstrap';
import { base } from '../config/constants';
import LocalizedStrings from 'react-localization';
import StarRatingComponent from 'react-star-rating-component';
import moment from 'moment';

let strings = new LocalizedStrings({
  en:{
    orderHistory1: 'Order',
    orderHistory2: 'History',
    addressBook1: 'Address',
    addressBook2: 'Book',
    accountInformation1: 'Account',
    accountInformation2: 'Information',
    allOrders: 'All Orders',
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
    submitReviewTitle: 'Submit a review',
    submitReviewText1: 'Rate this florist, it helps good florists get more exposure!',
    submitReviewText2: 'Only verified customers with purchases are allowed to submit a review.',
    cancelButton: 'Close',
    everyMonday: 'Every Monday',
    everyTuesday: 'Every Tuesday',
    everyWednesday: 'Every Wednesday',
    flower_all: 'Seasonal Flower (all)',
    flower_rose: 'Seasonal Flower (rose only)',
    plan_classic: 'Classic (1-2 blooms, HKD53/week)',
    plan_elegant: 'Elegant (2-4 blooms, HKD93/week)',
    noOrder: 'You do not have any order history.',
    errorOccured: 'An error occured, please try again later.',
    reviewSubmitted: 'Your review has been submited.',
    browseMarket: 'Browse Market'
  },
  ch: {}
});

const ButtonToMarket = ({ title, history }) => (
  <Button bsStyle="" className="no-sub-button" onClick={() => history.push('/arrangements')}>{strings.browseMarket}</Button>
);

class SubmitReview extends React.Component {
    constructor() {
      super();
      this.open = this.open.bind(this);
      this.close = this.close.bind(this);
      this.submitReview = this.submitReview.bind(this);
      this.handleReviewChange = this.handleReviewChange.bind(this);
      this.onStarClick = this.onStarClick.bind(this);
      this.state = {
        showModal: false,
        rating: 5,
        reviewMessage: ''
      }
    }
    
    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }
    close() {
      this.setState({showModal: false});
    }
    open() {
      this.setState({showModal: true});
    }
    handleReviewChange(e) {
        this.setState({ reviewMessage: e.target.value });
    }
    submitReview() {
      var uid = this.props.uid;
      var referenceCode = this.props.referenceCode;
      var florist = this.props.florist;
      var floristName = this.props.floristName;
      var rating = this.state.rating;
      var reviewMessage = this.state.reviewMessage;
      var reviewDate = moment().format("DD-MMM-YYYY");
      this.props.onSubmitReview(uid, referenceCode, florist, floristName, rating, reviewMessage, reviewDate);
      this.close();
    }
    render() {
        var rating = this.state.rating;
        var reviewMessage = this.state.reviewMessage;
        return (
            <div>
                <Button bsStyle="" className="sub-details-unsub"onClick={this.open}>Submit a review</Button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                    <Modal.Title><strong>{strings.submitReviewTitle}</strong></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <h4>{strings.submitReviewText1}</h4>
                    <p>{strings.submitReviewText2}</p>
                    <h2>Rating: {rating}</h2>
                    <StarRatingComponent 
                        name="rate1" 
                        starCount={5}
                        value={rating}
                        onStarClick={this.onStarClick}
                    />
                    <FormGroup>
                        <FormControl className="card-text-area data-field-update" placeholder="how was your experience with this florist?" componentClass="textarea" value={reviewMessage} onChange={this.handleReviewChange}/>
                    </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button bsStyle="" className="button button-back" onClick={this.close}>{strings.cancelButton}</Button>
                    <Button bsStyle="" className="button" onClick={this.submitReview}>Submit</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
  }

class OrderDetails extends React.Component {

    constructor() {
        super();
        this.handleBack = this.handleBack.bind(this);
        this.handleSubmitReview = this.handleSubmitReview.bind(this);
        this.state = {
        loading: true,
        orderDetails: {}
        }
    }

    componentWillMount () {
        this.fireBaseListenerForSubDetails = firebaseAuth().onAuthStateChanged((user) => {
            base.fetch(`users/${user.uid}/transactions/${this.props.selectedOrder}`, {
                context: this,
                then(data) {
                    console.log('data is :', data);
                    this.setState({orderDetails: data, loading: false, cardMessage: data.cardMessage, recipientNum: data.recipientNum, uid: user.uid});
                }
            });
        });
    }

    componentWillUnmount () {
        //returns the unsubscribe function
        //this.fireBaseListenerForSubDetails && this.fireBaseListenerForSubDetails();
    }

    handleSubmitReview (uid, referenceCode, florist, floristName, rating, reviewMessage, reviewDate) {
        base.post(`florists/${florist}/reviews/${referenceCode}`, {
            data: {
                uid: uid,
                referenceCode: referenceCode,
                floristName : floristName,
                florist: florist,
                rating: rating,
                reviewMessage: reviewMessage,
                reviewDate,
                sender: this.state.orderDetails.senderName

            }
        });
        base.update(`users/${uid}/transactions/${referenceCode}`, {
            data: {
                status: 'Reviewed'
            }
        })
        base.update(`allTransactions/${florist}/${referenceCode}`, {
            data: {
                status: 'Reviewed'
            }
        }).then(() => 
            this.setState({ InfoMessage: strings.reviewSubmitted})
        ).catch(err => {
            console.log('An error occured when updating account information.');
            this.setState({ InfoMessage: strings.errorOccured});
        });
    }

    handleBack = () => {
        this.props.onHandleBack();
    }
    handleNumChange(e) {
        this.setState({ recipientNum: e.target.value });
    }
    handleMessageChange(e) {
        this.setState({ cardMessage: e.target.value });
    }

  render() {
    var selectedOrder = this.props.selectedOrder;
    var stripeTxnID = this.props.stripeTxnID;
    var orderDetails = this.state.orderDetails;
    var selectLocationType = this.state.orderDetails[selectLocationType];
    var loadingState = this.state.loading;
    var recipientNum = this.state.recipientNum;
    var cardMessage = this.state.cardMessage;
    let content = null;

    if (loadingState) {
      content = <div className="loader"></div>
    } else {
      content = (
        <div>
          <Grid>
            { this.state.InfoMessage &&
              <div className="alert alert-success update-message" role="alert">
                <Glyphicon glyph="exclamation-sign" className="icons"/>&nbsp;{this.state.InfoMessage} 
              </div>
            }
            <div className="sub-list-item">
                <Row className="show-grid">
                    <FormGroup>
                    <Col sm={1}></Col>
                    <Col sm={3}>
                        <div><strong>Status:</strong></div>
                    </Col>
                    <Col sm={5}>
                        <div>{orderDetails.status}</div>
                    </Col>
                    <Col sm={3}>
                        <SubmitReview
                            uid={this.state.uid}
                            florist={orderDetails.florist}
                            floristName={orderDetails.floristName}
                            referenceCode={orderDetails.referenceCode}
                            onSubmitReview={this.handleSubmitReview}
                        />
                    </Col>
                    </FormGroup>
                </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>{strings.referenceCode}</strong></div>
                  </Col>
                  <Col sm={5}>
                    <div>{orderDetails.referenceCode}</div>
                  </Col>
                  <Col sm={3}>
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
                    <div>{stripeTxnID}</div>
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
                    <div>{orderDetails.deliveryDate}</div>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>Arrangement:</strong></div>
                  </Col>
                  <Col sm={8}>
                    <div>{orderDetails.arrangementName}</div>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>Florist:</strong></div>
                  </Col>
                  <Col sm={8}>
                    <div className="order-history-florist-name"><Link to={`/florist/${orderDetails.florist}`}>{orderDetails.floristName}</Link></div>
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
                    <div>{orderDetails.recipient}</div>
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
                    <div>{orderDetails.address}</div>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>{strings.card}</strong></div>
                  </Col>
                  <Col sm={7}>
                    <div className="card-text-area data-field-update">{cardMessage}</div>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={5}>
                  </Col>
                  <Col sm={4}>
                    <Button bsStyle="" className="button sub-details-back" onClick={() => this.handleBack()}>{strings.backButton}</Button>
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

export default class OrderHistory extends Component {

  constructor() {
    super();
    this.handleChooseOrder = this.handleChooseOrder.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.state = {
      orderData: {},
      loading: true,
      newCardMessage: '',
      orderDetailsStatus: 0,
      selectedOrder: '',
      userID: '',
      orderInfoMessage: null
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
      base.fetch(`users/${user.uid}/transactions/`, {
        context: this,
        then(data) {
          this.setState({orderData: data, loading: false, userID: user.uid});
        }
      });
    });
  }
  componentWillUnmount () {
    //returns the unsubscribe function
    this.fireBaseListenerForSub && this.fireBaseListenerForSub();
  }
  handleChooseOrder(chosenKey, stripeTxnID) {
    this.setState({orderDetailsStatus: 1, selectedOrder: chosenKey, stripeTxnID: stripeTxnID});
  }
  handleBack() {
    this.setState({orderDetailsStatus: 0});
  }

  render () {

    var data = this.state.orderData;
    var loadingState = this.state.loading;
    var orderDetailsStatus = this.state.orderDetailsStatus;
    var orders;

    // console.log('data check: ', Object.keys(data).length);
    if (Object.keys(data).length===0) {
      orders = (
        <div className="no-sub-section">            
          <div className="center-text">{strings.noOrder}</div>
          <Route path="/" render={(props) => <ButtonToMarket {...props}/>} />
        </div>
      )
    } else {
      orders = Object.keys(data).map(function(key) {
        var chosenKey = data[key].referenceCode;
        var stripeTxnID = data[key].stripeTxnID;
        return (
          <div key={key}>
            <Grid>
              <div className="sub-list-item">
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
                      <div>{data[key].deliveryDate}</div>
                    </Col>
                  </FormGroup>
                </Row>
                <Row className="show-grid">
                  <FormGroup>
                    <Col sm={1}></Col>
                    <Col sm={3}>
                        <div><strong>Order Status</strong></div>
                    </Col>
                    <Col sm={3}>
                      <div>{data[key].status}</div>
                    </Col>
                  </FormGroup>
                </Row>
                <Row className="show-grid">
                  <FormGroup>
                    {/* <Col xs={} sm={5}></Col> */}
                    <Col xs={1} xsOffset={6} smOffset={9} mdOffset={10}>
                      <Button bsStyle="" className="button sub-details-button" onClick={() => this.handleChooseOrder(chosenKey, stripeTxnID)}>{strings.detailsButton}</Button>
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
    } else if (orderDetailsStatus===0){
      content = (
        <div>
          <Grid>
            <Row className="show-grid loggedin-flow">
              <div className="horizontal-line"></div>
              <Col xs={12}>
                  <div className="flow-selected">{strings.allOrders}</div>
                    <i className="fa fa-chevron-right"></i>
                  <div>{strings.detailsUpdate}</div>
              </Col>
              <div className="horizontal-line"></div>
            </Row>
          </Grid>
          {orders}
        </div>
      )
    } else if (orderDetailsStatus===1) {
      content = (
        <div>
          <Grid>
            <Row className="show-grid loggedin-flow">
              <div className="horizontal-line"></div>
              <Col xs={12}>
                  <div>{strings.allOrders}</div>
                    <i className="fa fa-chevron-right"></i>
                  <div className="flow-selected">{strings.detailsUpdate}</div>
              </Col>
              <div className="horizontal-line"></div>
            </Row>
          </Grid>
          <OrderDetails
            selectedOrder={this.state.selectedOrder} 
            stripeTxnID = {this.state.stripeTxnID}
            orderInfoMessage={this.state.orderInfoMessage} 
            onHandleBack={this.handleBack}
          />
        </div>
      )
    }

    return (
      <div className="loggedin-background">
        <Grid>
          <Row className="show-grid loggedin-nav">
            <Col xs={4} className="loggedin-nav-button">
              <Link to="/orderhistory" className="nav-selected">
                <i className="fa fa-tags fa-lg nav-icon"></i>
                <div className="nav-icon-title">{strings.orderHistory1}<br/>{strings.orderHistory2}</div>
              </Link>
            </Col>
            <Col xs={4} className="loggedin-nav-button">
              <Link to="/addressbook">
                <i className="fa fa-plus fa-lg nav-icon"></i>
                <div className="nav-icon-title">{strings.addressBook1}<br/>{strings.addressBook2}</div>
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