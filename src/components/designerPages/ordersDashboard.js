import React, { Component } from 'react'
import { firebaseAuth } from '../config/constants';
import { Link, Route } from 'react-router-dom';
import { FormGroup, Grid, Row, Col, Button, Glyphicon, Modal } from 'react-bootstrap';
import { base } from '../config/constants';
import LocalizedStrings from 'react-localization';

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
    deliveryDay: 'Delivery Day:',
    orderStatus: 'Status:',

    order_submitted: 'Submitted',
    order_received: 'Acknowledged',
    order_fulfilled: 'Fulfilled',

    arrangement: 'Arrangement:',
    deliveryType: 'Delivery Type:',
    delivery_gift: 'Gift',
    delivery_self: 'Reward Self',
    locationType: 'Location Type',

    location_office: 'Office',
    location_home: 'Home',
    location_cemetery: 'Cemetery',

    location: 'Location',
    address: 'Address:',

    recipient: 'Recipient:',
    recipientNum: "Recipient's #:",
    card: 'Card :',
    deliveryInstruction: 'Instruction:',
    sender: 'Sender:',
    senderNum: "Sender's #: ",
    senderEmail: "Sender's email",

    backButton: 'Back',
    updateButton: 'Update',
    cancelButton: 'Close',

    progressUpdateTitle: 'Progress Update - Order Received',
    progressUpdateText1: 'Update customers on delivery progress keeps them happy.',
    progressUpdateText2: 'Florist who give timely update receive 50% more 5 stars reviews and are twice as likely to get customer referrals.',
    progressUpdateText3: 'When you click the red button below, we will send an email to the customer on your behalf to acknowledge that you have received this order.',
    
    orderUpdate: 'Your update has been sent.',

    progressUpdate2Title: 'Progress Update - Order Fulfilled',
    progressUpdate2Text1: 'Timely update keeps customers happy.',
    progressUpdate2Text2: 'According to our study, florists who give timely update receive 50% more 5 stars reviews and are twice as likely to get customer referrals.',
    progressUpdate2Text3: 'When you click the red button below, we will send an email to the customer on your behalf to let him/her know that this order has been fulfilled.',
    
    noOrder: 'You do not have any order history.',
    errorOccured: 'An error occured, please try again later.',
    reviewSubmitted: 'Your review has been submited.',

    buttonToShop: 'My Shop',
    buttonToAccount: 'My Account',
    
    tipForDeliverySelf: 'This is a delivery for the customer him(her)self, feel free to write a message yourself!',
    orderReceived: 'Order Received',
    orderFulfilled: 'Order Fulfilled',

  },
  ch: {
    ordersDashboard1: ' ',
    ordersDashboard2: '定單列表',
    designs1: " ",
    designs2: '貨品列表',
    shopInformation1: ' ',
    shopInformation2: '店舖資料',

    allOrders: '所有定單',
    detailsUpdate: '詳情+更新',
    
    referenceCode: '參考號碼:',
    deliveryDay: '送花日:',
    orderStatus: '狀況:',

    order_submitted: '定單已發出',
    order_received: '花店已收到',
    order_fulfilled: '花店已送花',

    location_office: '辦公室',
    location_home: '住家',
    location_cemetery: '墓園',

    arrangement: '貨品:',
    deliveryType: '用途:',
    delivery_gift: '禮物',
    delivery_self: '自用',
    locationType: '地點類型:',
    location: '地點:',
    address: '地址:',
    recipient: '收花人:',
    recipientNum: "收花人電話:",
    card: '心意卡:',
    deliveryInstruction: '客人指示:',
    sender: '送花人:',
    senderNum: "送花人電話:",
    senderEmail: "送花人電郵:",
    backButton: '返回',
    updateButton: '更新',
    cancelButton: '取消',

    progressUpdateTitle: '進度更新 - 已收到定單',
    progressUpdateText1: '提供進度更新有效提高客人們的滿意度。',
    progressUpdateText2: '提供及時進度更新的花匠們一般會多得到百分之五十的的5星評分和兩倍的顧客推薦機會。',
    progressUpdateText3: '當您按下更新鍵，我們會用電郵通知客人您已收到定單。',
    
    orderUpdate: '進度更新已發出。',

    progressUpdate2Title: '進度更新 - 已送貨',
    progressUpdate2Text1: '提供進度更新有效提高客人們的滿意度。',
    progressUpdate2Text2: '提供及時進度更新的花匠們一般會多得到百分之五十的的5星評分和兩倍的顧客推薦機會。',
    progressUpdate2Text3: '當您按下更新鍵，我們會用電郵通知客人您已完成定單的送貨。',
    

    noOrder: '您目前並沒有定單記錄。',
    errorOccured: '系統錯誤，請稍後再試。',

    buttonToShop: '我的花店',
    buttonToAccount: '我的帳戶',

    tipForDeliverySelf: '客人的定單用途為自用，您可以為他(她)寫下祝福語。',
    orderReceived: '已收到',
    orderFulfilled: '已送花',
  }
});


const ButtonToShop = ({ title, history }) => (
  <Button bsStyle="" className="head-button-pink" onClick={() => history.push('/ordersdashboard')}>{strings.buttonToShop}</Button>
);

const ButtonToAccount = ({ title, history }) => (
  <Button bsStyle="" className="head-button-white" onClick={() => history.push('/orderhistory')}>{strings.buttonToAccount}</Button>
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
                <Button bsStyle="" className="ordersdashboard-update-button" onClick={this.open}>{strings.updateButton}</Button>
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
                    <Button bsStyle="" className="button" onClick={this.orderReceivedUpdate}>{strings.orderReceived}</Button>
                    }

                    { this.props.status === 'order_received' &&
                    <Button bsStyle="" className="button" onClick={this.orderFulfilledUpdate}>{strings.orderFulfilled}</Button>
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
      base.fetch(`allTransactions/${this.props.designerCode}/${this.props.selectedOrder}`, {
        context: this,
        then(data) {
            this.setState({orderDetails: data, loading: false});
        }
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
            <div className="ordersdashboard-details">
                <Row className="show-grid">
                    <FormGroup>
                    <Col sm={1}></Col>
                    <Col sm={3}>
                        <div><strong>{strings.orderStatus}</strong></div>
                    </Col>
                    <Col sm={5}>
                        <div>{strings[orderDetails.status]}</div>
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
                      <div><strong>{strings.arrangement}</strong></div>
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
                      <div><strong>{strings.deliveryType}</strong></div>
                  </Col>
                  <Col sm={8}>
                    <div>{strings[orderDetails.selectDeliveryType]}</div>
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
                      <div><strong>{strings.locationType}</strong></div>
                  </Col>
                  <Col sm={8}>
                    <div>{strings[orderDetails.selectLocationType]}</div>
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
                        <div>{orderDetails.cardMessage}</div>
                    }
                    { orderDetails.selectDeliveryType === 'delivery_self'&& 
                        <div>{strings.tipForDeliverySelf}</div>
                    }
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>{strings.deliveryInstruction}</strong></div>
                  </Col>
                  <Col sm={7}>
                    <div>{orderDetails.deliveryInstruction}</div>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>{strings.sender}</strong></div>
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
                      <div><strong>{strings.senderNum}</strong></div>
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
                      <div><strong>{strings.senderEmail}</strong></div>
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
    base.fetch(`allTransactions/${this.props.designerCode}`, {
        context: this,
        queries: {
            orderByChild: 'referenceCode'
        },
        then(data) {
            this.setState({orderData: data, loading: false});
        }
    });
    base.fetch(`allTransactions/${this.props.designerCode}`, {
      context: this,
      queries: {
          orderByChild: 'referenceCode'
      },
      then(data) {
          this.setState({orderData: data, loading: false});
      }
    });
  }
  componentDidMount () {
    window.scrollTo(0, 0);
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {

      this.setUpStepListener = base.bindToState(`users/${user.uid}/info/shopSetupStep`, {
        context: this,
        state: 'shopSetupStep'
      });

      this.setUpStepListener = base.bindToState(`users/${user.uid}/info/isDesigner`, {
        context: this,
        state: 'isDesigner'
      });

    });
  }
  componentWillUnmount () {
    //returns the unsubscribe function

    // this.fireBaseListenerForOrder && this.fireBaseListenerForOrder();
    // this.authListenerForShopSetup && this.authListenerForShopSetup();

    this.removeListener && this.removeListener();
    base.removeBinding(this.setUpStepListener);
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
    var ordersHeader;
    let headerNav = null;
    let content = null;

    // console.log('data check: ', Object.keys(data).length);
    if (Object.keys(data).length===0) {
      ordersHeader = null;
      orders = (
        <div className="no-sub-section">            
          <div className="center-text">{strings.noOrder}</div>
        </div>
      )
    } else {
      ordersHeader = (
        <Grid>
          <Row className="ordersdashboard-list-titles">
            <Col xs={4}>{strings.referenceCode}</Col>
            <Col xs={4}>{strings.deliveryDay}</Col>
            <Col xs={4}>{strings.orderStatus}</Col>
          </Row>
        </Grid>
      )
      orders = Object.keys(data).map(function(key) {
        var chosenKey = data[key].referenceCode;
        return (
          <div key={key} onClick={() => this.handleChooseOrder(chosenKey)}>
            <Grid>
              <div className="ordersdashboard-list-item">
                <Row className="show-grid">
                    <Col xs={4}>
                      <div>{data[key].referenceCode}</div>
                    </Col>
                    <Col xs={4}>
                      <div>{data[key].deliveryDate}</div>
                    </Col>
                    <Col xs={4}>
                      <div>{strings[data[key].status]}</div>
                    </Col>
                </Row>
              </div>
            </Grid>
          </div>
        )
      }, this)
    }

    if (this.state.isDesigner==="y" && (loadingState || orderDetailsStatus===0 || orderDetailsStatus===1)) {
      headerNav = (
        <div>
          <Row className="show-grid loggedin-nav">
            <Col xs={4} className="loggedin-nav-button">
              <Link to="/ordersdashboard" className="nav-selected">
                <i className="fa fa-book fa-lg nav-icon"></i>
                <div className="nav-icon-title">{strings.ordersDashboard1}<br/>{strings.ordersDashboard2}</div>
              </Link>
            </Col>
            <Col xs={4} className="loggedin-nav-button">
              <Link to="/designs">
                <i className="fa fa-star fa-lg nav-icon"></i>
                <div className="nav-icon-title">{strings.designs1}<br/>{strings.designs2}</div>
              </Link>
            </Col>
            <Col xs={4} className="loggedin-nav-button">
              <Link to="/shopinfo">
                <i className="fa fa-home fa-lg nav-icon"></i>
                <div className="nav-icon-title">{strings.shopInformation1}<br/>{strings.shopInformation2}</div>
              </Link>
            </Col>
          </Row>
        </div>
      )
    } else {
      headerNav = (
        <div>
        </div>
      )
    }

    if (loadingState) {
      content = (
        <div>
          <div className="horizontal-line"></div>
          <div className="loader"></div>
        </div>
      )
    } else if (this.state.isDesigner==="y"  && orderDetailsStatus===0){
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
          {ordersHeader}
          {orders}
        </div>
      )
    } else if (this.state.isDesigner==="y" && orderDetailsStatus===1) {
      content = (
        <div>
          <Grid>
            <Row className="show-grid loggedin-flow">
              <div className="horizontal-line"></div>
              <Col xs={12}>
                  <div className='flow-nav' onClick={() => this.setState({orderDetailsStatus: 0}, () => window.scrollTo(0, 0))}>{strings.allOrders}</div>
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
    } else if (this.state.shopSetupStep ===0) {
      content = (
        <div>
          
          <div>shopSetupStep: {this.state.shopSetupStep}, signup form </div>
          <div>We are currently accepting new florists in the following regions</div>
          <div>If you are interested, please fill out this form: first name, last name, phone, email, flower shop name, website url, how did you hear about us</div>

        </div>
      )
    } else if (this.state.shopSetupStep ===1) {
      content = (
        <div>you are all set, our </div>
      )
    }

    return (
      <div className="loggedin-background">
        <Grid>
          <Row className="head-button-inline">
            <div className="head-button-section">            
              <Route path="/" render={(props) => <ButtonToShop {...props}/>} />
            </div>
            <div className="head-button-section">            
              <Route path="/" render={(props) => <ButtonToAccount {...props}/>} />
            </div>
          </Row>
          {headerNav}
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