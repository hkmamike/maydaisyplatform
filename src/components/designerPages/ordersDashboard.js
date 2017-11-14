import React, { Component } from 'react'
import { firebaseAuth } from '../config/constants';
import { Link, Route } from 'react-router-dom';
import { FormGroup, FormControl, Grid, Row, Col, Button, Glyphicon, Modal, DropdownButton, MenuItem } from 'react-bootstrap';
import { base } from '../config/constants';
import LocalizedStrings from 'react-localization';
import StarRatingComponent from 'react-star-rating-component';
import moment from 'moment';

let strings = new LocalizedStrings({
  en:{
    ordersDashboard1: 'Orders',
    ordersDashboard2: 'Dashboard',
    designs1: "Shop's",
    designs2: 'Designs',
    shopInformation1: 'Shop',
    shopInformation2: 'Information',

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
    
    
    progressUpdateTitle: 'Progress Update - Order Received',
    progressUpdateText1: 'Update customers on delivery progress keeps them happy.',
    progressUpdateText2: 'Florist who give timely update receive 50% more 5 stars reviews and are twice as likely to get customer referrals.',
    progressUpdateText3: 'When you click the red button below, we will send an email to the customer on your behalf to acknowledge that you have received this order.',

    orderUpdate: 'Your update has been sent.',


    progressUpdate2Title: 'Progress Update - Order Fulfilled',
    progressUpdate2Text1: 'Timely update keeps customers happy.',
    progressUpdate2Text2: 'According to our study, florists who give timely update receive 50% more 5 stars reviews and are twice as likely to get customer referrals.',
    progressUpdate2Text3: 'When you click the red button below, we will send an email to the customer on your behalf to let him/her know that this order has been fulfilled.',


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
    browseMarket: 'Browse Market',

    order_submitted: 'Order Submitted',
    order_delivered: 'Order Delivered',
    order_received: 'Order Received'


  },
  ch: {}
});

const ButtonToMarket = ({ title, history }) => (
  <Button bsStyle="" className="no-sub-button" onClick={() => history.push('/arrangements')}>{strings.browseMarket}</Button>
);

class UpdateProgress extends React.Component {
    constructor() {
      super();
      this.open = this.open.bind(this);
      this.close = this.close.bind(this);
      this.orderReceivedUpdate = this.orderReceivedUpdate.bind(this);
      this.orderFulfilledUpdate = this.orderFulfilledUpdate.bind(this);
      this.state = {
        showModal: false,
      }
    }
    
    close() {
      this.setState({showModal: false});
    }
    open() {
      this.setState({showModal: true});
    }

    orderReceivedUpdate() {
        var selectedOrder = this.props.selectedOrder;
        var designerCode = this.props.designerCode;
        var senderID = this.props.senderID;
        this.props.onOrderReceivedUpdate(selectedOrder, designerCode, senderID);
        this.close();
    }

    orderFulfilledUpdate() {
        var selectedOrder = this.props.selectedOrder;
        var designerCode = this.props.designerCode;
        var senderID = this.props.senderID;
        this.props.onOrderFulfilledUpdate(selectedOrder, designerCode, senderID);
        this.close();
    }

    render() {
        return (
            <div>
                <Button bsStyle="" className="sub-details-unsub"onClick={this.open}>Update</Button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    
                    { this.props.status === 'order_submitted' &&
                    <div>
                        <Modal.Header closeButton>
                        <Modal.Title><strong>{strings.progressUpdateTitle}</strong></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4>{strings.progressUpdateText1}</h4>
                            <p>{strings.progressUpdateText2}</p>
                            <p>{strings.progressUpdateText3}</p>
                        </Modal.Body>
                    </div>
                    }

                    { this.props.status === 'order_received' &&
                    <div>
                        <Modal.Header closeButton>
                        <Modal.Title><strong>{strings.progressUpdate2Title}</strong></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4>{strings.progressUpdate2Text1}</h4>
                            <p>{strings.progressUpdate2Text2}</p>
                            <p>{strings.progressUpdate2Text3}</p>
                        </Modal.Body>
                    </div>
                    }

                    <Modal.Footer>
                    <Button bsStyle="" className="button button-back" onClick={this.close}>{strings.cancelButton}</Button>
                    
                    { this.props.status === 'order_submitted' &&
                    <Button bsStyle="" className="button" onClick={this.orderReceivedUpdate}>Order Received</Button>
                    }

                    { this.props.status === 'order_received' &&
                    <Button bsStyle="" className="button" onClick={this.orderFulfilledUpdate}>Order Fulfilled</Button>
                    }
                    
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
        this.handleOrderReceivedUpdate = this.handleOrderReceivedUpdate.bind(this);
        this.handleOrderFulfilledUpdate = this.handleOrderFulfilledUpdate.bind(this);
        this.state = {
        loading: true,
        orderDetails: {}
        }
    }

    componentWillMount () {
        this.fireBaseListenerForSubDetails = firebaseAuth().onAuthStateChanged((user) => {
            base.fetch(`allTransactions/${this.props.designerCode}/${this.props.selectedOrder}`, {
                context: this,
                then(data) {
                    this.setState({orderDetails: data, loading: false, uid: user.uid});
                }
            });
        });
    }

    componentWillUnmount () {
        //returns the unsubscribe function
        //this.fireBaseListenerForSubDetails && this.fireBaseListenerForSubDetails();
    }

    handleOrderReceivedUpdate (selectedOrder, designerCode, senderID) {
        base.update(`allTransactions/${designerCode}/${selectedOrder}`, {
            data: {
                status: 'order_received'
            }
        });
        base.update(`users/${senderID}/transactions/${selectedOrder}`, {
            data: {
                status: 'order_received'
            }
        }).then(() => 
            this.setState({ InfoMessage: strings.orderUpdate}, () => {
                base.fetch(`allTransactions/${designerCode}/${selectedOrder}`, {
                    context: this,
                    then(data) {
                        this.setState({orderDetails: data});
                    }
                });
            })
        );
    }

    handleOrderFulfilledUpdate (selectedOrder, designerCode, senderID) {
        base.update(`allTransactions/${designerCode}/${selectedOrder}`, {
            data: {
                status: 'order_fulfilled'
            }
        });
        base.update(`users/${senderID}/transactions/${selectedOrder}`, {
            data: {
                status: 'order_fulfilled'
            }
        }).then(() => 
            this.setState({ InfoMessage: strings.orderUpdate}, () => {
                base.fetch(`allTransactions/${designerCode}/${selectedOrder}`, {
                    context: this,
                    then(data) {
                        this.setState({orderDetails: data});
                    }
                });
            })
        );
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
    var orderDetails = this.state.orderDetails;
    var loadingState = this.state.loading;
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
                        {(orderDetails.status ==='order_received' || orderDetails.status ==='order_submitted') && <UpdateProgress
                            selectedOrder={this.props.selectedOrder}
                            designerCode={this.props.designerCode}
                            senderID={orderDetails.uid}
                            status={orderDetails.status}
                            onOrderReceivedUpdate={this.handleOrderReceivedUpdate}
                            onOrderFulfilledUpdate={this.handleOrderFulfilledUpdate}
                        />}
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
                  <div className="order-history-arrangement-name"><Link to={`/florist/${orderDetails.florist}/${orderDetails.arrangementCode}`}>{orderDetails.arrangementName}</Link></div>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>Delivery Type:</strong></div>
                  </Col>
                  <Col sm={8}>
                    <div>{orderDetails.selectDeliveryType}</div>
                  </Col>
                </FormGroup>
              </Row>
              { orderDetails.selectDeliveryType === 'delivery_gift' && <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>{strings.recipient}</strong></div>
                  </Col>
                  <Col sm={8}>
                    <div>{orderDetails.recipient}</div>
                  </Col>
                </FormGroup>
              </Row> }
              { orderDetails.selectDeliveryType === 'delivery_gift' && <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>{strings.recipientNum}</strong></div>
                  </Col>
                  <Col sm={8}>
                    <div>{orderDetails.recipientNum}</div>
                  </Col>
                </FormGroup>
              </Row> }
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>Location Type:</strong></div>
                  </Col>
                  <Col sm={8}>
                    <div>{orderDetails.selectLocationType}</div>
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
                    { orderDetails.selectDeliveryType === 'delivery_gift'&& 
                        <div className="history-text-area data-field-update">{orderDetails.cardMessage}</div>
                    }
                    { orderDetails.selectDeliveryType === 'delivery_self'&& 
                        <div className="history-text-area data-field-update">This is a delivery for the customer him(her)self, feel free to write a message yourself!</div>
                    }
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>Instruction:</strong></div>
                  </Col>
                  <Col sm={7}>
                    <div className="history-text-area data-field-update">{orderDetails.deliveryInstruction}</div>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>Sender:</strong></div>
                  </Col>
                  <Col sm={7}>
                    <div>{orderDetails.senderName}</div>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>Sender's #:</strong></div>
                  </Col>
                  <Col sm={7}>
                    <div>{orderDetails.senderNum}</div>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>Sender's email:</strong></div>
                  </Col>
                  <Col sm={7}>
                    <div>{orderDetails.senderEmail}</div>
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

export default class OrdersDashboard extends Component {
  constructor() {
    super();
    this.handleChooseOrder = this.handleChooseOrder.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.state = {
      orderData: {},
      loading: true,
      orderDetailsStatus: 0,
      selectedOrder: '',
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
    this.fireBaseListenerForOrder = firebaseAuth().onAuthStateChanged((user) => {
        base.fetch(`allTransactions/${this.props.designerCode}`, {
            context: this,
            queries: {
                orderByChild: 'referenceCode'
            },
            then(data) {
                this.setState({orderData: data, loading: false, userID: user.uid});
            }
        });
      });
  }
  componentDidMount () {
    window.scrollTo(0, 0);
  }
  componentWillUnmount () {
    //returns the unsubscribe function
    this.fireBaseListenerForOrder && this.fireBaseListenerForOrder();
  }
  handleChooseOrder(chosenKey) {
    this.setState({orderDetailsStatus: 1, selectedOrder: chosenKey});
  }
  handleBack() {
    this.setState({orderDetailsStatus: 0});

    // reloading data since a review might have been posted
    base.fetch(`allTransactions/${this.props.designerCode}`, {
        context: this,
        then(data) {
            this.setState({orderData: data});
        }
    });
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
        </div>
      )
    } else {
      orders = Object.keys(data).map(function(key) {
        var chosenKey = data[key].referenceCode;
        return (
          <div key={key}>
            <Grid>
              <div className="sub-list-item">
                <Row className="show-grid">
                  <FormGroup>
                    <Col sm={1}></Col>
                    <Col sm={3}>
                        <div><strong>Reference Code:</strong></div>
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
                        <div><strong>Order Status: </strong></div>
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
                      <Button bsStyle="" className="button sub-details-button" onClick={() => this.handleChooseOrder(chosenKey)}>{strings.detailsButton}</Button>
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
            orderInfoMessage={this.state.orderInfoMessage} 
            onHandleBack={this.handleBack}
            designerCode={this.props.designerCode}
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
                <i className="fa fa-book fa-lg nav-icon"></i>
                <div className="nav-icon-title">{strings.ordersDashboard1}<br/>{strings.ordersDashboard2}</div>
              </Link>
            </Col>
            <Col xs={4} className="loggedin-nav-button">
              <Link to="/addressbook">
                <i className="fa fa-star fa-lg nav-icon"></i>
                <div className="nav-icon-title">{strings.designs1}<br/>{strings.designs2}</div>
              </Link>
            </Col>
            <Col xs={4} className="loggedin-nav-button">
              <Link to="/userinfo">
                <i className="fa fa-home fa-lg nav-icon"></i>
                <div className="nav-icon-title">{strings.shopInformation1}<br/>{strings.shopInformation2}</div>
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