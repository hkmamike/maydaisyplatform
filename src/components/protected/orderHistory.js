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
    detailsUpdate: 'Details',
    referenceCode: 'Reference Code:',
    to: 'To:',
    deliveryDay: 'Delivery Day:',
    orderStatus: 'Order Status:',
    recipient: 'Recipient:',
    address: 'Address:',
    recipientNum: "Recipient's # :",
    card: 'Card :',
    backButton: 'Back',
    tip2: '**To change delivery address, flower type, or plan, please create a new subscription and unsubscribe from this one. Sorry for any inconvience caused.',
    submitReviewTitle: 'Review',
    submitReviewText1: 'Please share your experience, it helps good florists get more exposure!',
    submitReviewText2: 'Only verified customers with purchases are allowed to submit a review.',
    cancelButton: 'Close',
    noOrder: 'You do not have any order history.',
    errorOccured: 'An error occured, please try again later.',
    reviewSubmitted: 'Your review has been submited.',
    browseMarket: 'Browse Market',
    arrangement: 'Arrangement:',
    florist: 'Florist:',
    howWasYourExp: "how was your experience with this florist?",
    rating: 'Rating:',
    submitButton: 'Submit',
    order_submitted: 'Submitted',
    order_received: 'Acknowledged',
    order_fulfilled: 'Fulfilled',
    buttonToShop: 'My Shop',
    buttonToAccount: 'My Account',
    price: 'Price:',

    deliverTo: 'Deliver to:',
    HK_CentralWestern: 'Central & Western',
    HK_Eastern: 'Eastern',
    HK_Southern: 'Southern',
    HK_WanChai: 'Wan Chai',
    KL_KowloonCity: 'Kowloon City',
    KL_KwunTong: 'Kwun Tong',
    KL_ShamShuiPo: 'Sham Shui Po',
    KL_WongTaiSin: 'Wong Tai Sin',
    KL_YauTsimMong: 'Yau Tsim Mong',
    NT_Islands: 'Outlying Islands',
    NT_KwaiTsing: 'Kwai Tsing',
    NT_North: 'Northern Region',
    NT_SaiKung: 'Sai Kung',
    NT_ShaTin: 'Sha Tin',
    NT_TaiPo: 'Tai Po',
    NT_TsuenWan: 'Tsuen Wan',
    NT_TuenMun: 'Tuen Mun',
    NT_YuenLong: 'Yuen Long',
    specialPickUpLocation: 'Self Pick Up',
  },
  ch: {
    orderHistory1: ' ',
    orderHistory2: '購買記錄',
    addressBook1: ' ',
    addressBook2: '地址記錄',
    accountInformation1: ' ',
    accountInformation2: '帳戶資料',
    allOrders: '所有記錄',
    detailsUpdate: '記錄詳情',
    referenceCode: '參考代號:',
    to: '收花人:',
    deliveryDay: '送花日:',
    orderStatus: '定單狀況:',
    recipient: '收花人:',
    address: '地址:',
    recipientNum: "收花人電話:",
    card: '心意卡:',
    backButton: '返回',
    submitReviewTitle: '評分',
    submitReviewText1: '如果您喜歡這間花店的服務，請為他們寫一個好評。準確的評價可以令好的花店得到更多支持。',
    submitReviewText2: '(只有花店的顧客可以選寫評論)',
    cancelButton: '返回',
    noOrder: '您目前並沒有購買記錄。',
    errorOccured: '系統錯誤，請稍後再試。',
    reviewSubmitted: '您的評論已發出。',
    browseMarket: '返回花市場',
    arrangement: '設計名稱: ',
    florist: '花店',
    howWasYourExp: "花店今次的服務如何?",
    rating: '評分:',
    submitButton: '發出',
    order_submitted: '定單已發出',
    order_received: '花店已收到',
    order_fulfilled: '花店已送花',
    buttonToShop: '我的花店',
    buttonToAccount: '我的帳戶',
    noRecord: '您目前並沒有地址記錄。',
    price: '價格:',

    deliverTo: '送往:',
    HK_CentralWestern: '中西區',
    HK_Eastern: '東區',
    HK_Southern: '南區',
    HK_WanChai: '灣仔區',
    KL_KowloonCity: '九龍城區',
    KL_KwunTong: '觀塘區',
    KL_ShamShuiPo: '深水埗區',
    KL_WongTaiSin: '黃大仙區',
    KL_YauTsimMong: '油尖旺區',
    NT_Islands: '離島區',
    NT_KwaiTsing: '葵青區',
    NT_North: '北區',
    NT_SaiKung: '西貢區',
    NT_ShaTin: '沙田區',
    NT_TaiPo: '大埔區',
    NT_TsuenWan: '荃灣區',
    NT_TuenMun: '屯門區',
    NT_YuenLong: '元朗區',
    specialPickUpLocation: '免費自取',
  }
});

const ButtonToShop = ({ title, history }) => (
  <Button bsStyle="" className="head-button-white" onClick={() => history.push('/auth/ordersdashboard')}>{strings.buttonToShop}</Button>
);

const ButtonToAccount = ({ title, history }) => (
  <Button bsStyle="" className="head-button-teal" onClick={() => history.push('/auth/orderhistory')}>{strings.buttonToAccount}</Button>
);

const ButtonToMarket = ({ title, history }) => (
  <Button bsStyle="" className="no-order-button" onClick={() => history.push('/arrangements')}>{strings.browseMarket}</Button>
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
                <Button bsStyle="" className="order-details-review-button" onClick={this.open}>{strings.submitReviewTitle}</Button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                    <Modal.Title><strong>{strings.submitReviewTitle}</strong></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <p>{strings.submitReviewText1}</p>
                    <p>{strings.submitReviewText2}</p>
                    <h2>{strings.rating} {rating}</h2>
                    <StarRatingComponent 
                        name="rate1" 
                        starCount={5}
                        value={rating}
                        onStarClick={this.onStarClick}
                    />
                    <FormGroup>
                        <FormControl className="card-text-area data-field-update" placeholder={strings.howWasYourExp} componentClass="textarea" value={reviewMessage} onChange={this.handleReviewChange}/>
                    </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button bsStyle="" className="button button-back" onClick={this.close}>{strings.cancelButton}</Button>
                    <Button bsStyle="" className="button" onClick={this.submitReview}>{strings.submitButton}</Button>
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
                    this.setState({orderDetails: data, loading: false, cardMessage: data.cardMessage, recipientNum: data.recipientNum, uid: user.uid, reviewed: data.reviewed});
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
                reviewDate: reviewDate,
                sender: this.state.orderDetails.senderName

            }
        });
        base.update(`users/${uid}/transactions/${referenceCode}`, {
            data: {
                reviewed: true
            }
        })
        base.update(`allTransactions/${florist}/${referenceCode}`, {
            data: {
                reviewed: true
            }
        }).then(() => 
            this.setState({ InfoMessage: strings.reviewSubmitted, reviewed: true}, () => this.props.onHandleBack()
        ));
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
            <div className="order-details">
              <Row className="show-grid">
                  <Col md={4}></Col>
                  <Col md={2}>
                      <div><strong>{strings.orderStatus}</strong></div>
                  </Col>
                  <Col md={5} className="order-details-inline">
                      <div className="order-details-status">
                        {strings[orderDetails.status]}
                      </div>
                      <div className='order-details-button-box'>
                        {!orderDetails.reviewed && !this.state.reviewed &&
                        <SubmitReview
                          uid={this.state.uid}
                          florist={orderDetails.florist}
                          floristName={orderDetails.floristName}
                          referenceCode={orderDetails.referenceCode}
                          onSubmitReview={this.handleSubmitReview}
                        />}
                      </div>
                  </Col>
                  <Col md={1}>
                  </Col>
              </Row>
              <Row className="show-grid">
                  <Col md={4}></Col>
                  <Col md={2}>
                      <div><strong>{strings.referenceCode}</strong></div>
                  </Col>
                  <Col md={5}>
                    <div>{orderDetails.referenceCode}</div>
                  </Col>
                  <Col md={1}>
                  </Col>
              </Row>
              <Row className="show-grid">
                  <Col md={4}></Col>
                  <Col md={2}>
                      <div><strong>{strings.deliveryDay}</strong></div>
                  </Col>
                  <Col md={5}>
                    <div>{orderDetails.deliveryDate}</div>
                  </Col>
                  <Col md={1}></Col>
              </Row>
              <Row className="show-grid">
                  <Col md={4}></Col>
                  <Col md={2}>
                      <div><strong>{strings.arrangement}</strong></div>
                  </Col>
                  <Col md={5}>
                    <div className="order-history-arrangement-name"><Link to={`/florist/${orderDetails.florist}/${orderDetails.arrangementCode}`}>{orderDetails.arrangementName}</Link></div>
                  </Col>
                  <Col md={1}></Col>
              </Row>
              <Row className="show-grid">
                  <Col md={4}></Col>
                  <Col md={2}>
                      <div><strong>{strings.price}</strong></div>
                  </Col>
                  <Col md={5}>
                    <div>{orderDetails.currency}{orderDetails.price/100}</div>
                  </Col>
                  <Col md={1}></Col>
              </Row>
              <Row className="show-grid">
                  <Col md={4}></Col>
                  <Col md={2}>
                      <div><strong>{strings.florist}</strong></div>
                  </Col>
                  <Col md={5}>
                    <div className="order-history-florist-name"><Link to={`/florist/${orderDetails.florist}`}>{orderDetails.floristName}</Link></div>
                  </Col>
                  <Col md={1}></Col>
              </Row>
              <Row className="show-grid">
                  <Col md={4}></Col>
                  <Col md={2}>
                      <div><strong>{strings.recipient}</strong></div>
                  </Col>
                  <Col md={5}>
                    <div>{orderDetails.recipient}</div>
                  </Col>
                  <Col md={1}></Col>
              </Row>
              <Row className="show-grid">
                  <Col md={4}></Col>
                  <Col md={2}>
                      <div><strong>{strings.deliverTo}</strong></div>
                  </Col>
                  <Col md={5}>
                    <div>{strings[orderDetails.marketRegion]}</div>
                  </Col>
                  <Col md={1}></Col>
              </Row>
              <Row className="show-grid">
                  <Col md={4}></Col>
                  <Col md={2}>
                      <div><strong>{strings.address}</strong></div>
                  </Col>
                  <Col md={5}>
                    <div>{orderDetails.address}</div>
                  </Col>
                  <Col md={1}></Col>
              </Row>
              <Row className="show-grid">
                  <Col md={4}></Col>
                  <Col md={2}>
                      <div><strong>{strings.card}</strong></div>
                  </Col>
                  <Col md={5}>
                    <div className="history-text-area data-field-update">{cardMessage}</div>
                  </Col>
                  <Col md={1}></Col>
              </Row>
              <Row className="show-grid">
                  <Col sm={5}>
                  </Col>
                  <Col sm={7}>
                    <Button bsStyle="" className="button button-back" onClick={() => this.handleBack()}>{strings.backButton}</Button>
                  </Col>
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
    this.fireBaseListenerForOrder = firebaseAuth().onAuthStateChanged((user) => {
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
    this.fireBaseListenerForOrder && this.fireBaseListenerForOrder();
  }
  handleChooseOrder(chosenKey, stripeTxnID) {
    this.setState({orderDetailsStatus: 1, selectedOrder: chosenKey, stripeTxnID: stripeTxnID},  () => window.scrollTo(0, 0));
  }
  handleBack() {
    this.setState({orderDetailsStatus: 0}, () => window.scrollTo(0, 0));

    // reloading data since a review might have been posted
    base.fetch(`users/${this.state.userID}/transactions/`, {
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

    // console.log('data check: ', Object.keys(data).length);
    if (Object.keys(data).length===0) {
      ordersHeader = null;
      orders = (
        <div className="no-sub-section">            
          <div className="center-text">{strings.noOrder}</div>
          <Route path="/" render={(props) => <ButtonToMarket {...props}/>} />
        </div>
      )
    } else {
      ordersHeader = (
      <Grid>
        <Row className="order-list-titles">
          <Col xs={4} sm={4}>{strings.to}</Col>
          <Col xs={4} sm={3}>{strings.deliveryDay}</Col>
          <Col xs={4} sm={3}>{strings.orderStatus}</Col>
          <Col sm={2} xsHidden>{strings.florist}</Col>
        </Row>
      </Grid>
      )
      orders = Object.keys(data).map(function(key) {
        var chosenKey = data[key].referenceCode;
        var stripeTxnID = data[key].stripeTxnID;
        return (
          <div key={key}>
            <Grid>
              <div className="order-list-item" onClick={() => this.handleChooseOrder(chosenKey, stripeTxnID)}>
                <Row className="show-grid">
                  <Col xs={4} sm={4}>
                    <div>{data[key].recipient}</div>
                  </Col>
                  <Col xs={4} sm={3}>
                    <div>{data[key].deliveryDate}</div>
                  </Col>
                  <Col xs={4} sm={3}>
                    <div>{strings[data[key].status]}</div>
                  </Col>
                  <Col sm={2} xsHidden>
                    <div>{data[key].floristName}</div>
                  </Col>
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
          {ordersHeader}
          {orders.reverse && orders.reverse()}
          {!orders.reverse && orders}
        </div>
      )
    } else if (orderDetailsStatus===1) {
      content = (
        <div>
          <Grid>
            <Row className="show-grid loggedin-flow">
              <div className="horizontal-line"></div>
              <Col xs={12}>
                  <div className="flow-nav" onClick={() => this.setState({orderDetailsStatus: 0}, () => window.scrollTo(0, 0))}>{strings.allOrders}</div>
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
          <Row className="head-button-inline">
            <div className="head-button-section">            
              <Route path="/" render={(props) => <ButtonToShop {...props}/>} />
            </div>
            <div className="head-button-section">            
              <Route path="/" render={(props) => <ButtonToAccount {...props}/>} />
            </div>
          </Row>
          <Row className="show-grid loggedin-nav">
            <Col xs={4} className="loggedin-nav-button">
              <Link to="/auth/orderhistory" className="nav-selected">
                <i className="fa fa-tags fa-lg nav-icon"></i>
                <div className="nav-icon-title">{strings.orderHistory1}<br/>{strings.orderHistory2}</div>
              </Link>
            </Col>
            <Col xs={4} className="loggedin-nav-button">
              <Link to="/auth/addressbook">
                <i className="fa fa-plus fa-lg nav-icon"></i>
                <div className="nav-icon-title">{strings.addressBook1}<br/>{strings.addressBook2}</div>
              </Link>
            </Col>
            <Col xs={4} className="loggedin-nav-button">
              <Link to="/auth/userinfo">
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