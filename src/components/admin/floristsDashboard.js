import React, { Component } from 'react'
import * as firebase from 'firebase';
import { firebaseAuth } from '../config/constants';
import { Link } from 'react-router-dom';
import { FormGroup, Grid, Row, Col, Button} from 'react-bootstrap';
import { base } from '../config/constants';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en:{
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
      senderEmail: "Email:",
  
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
  
      submitButton: 'Submit',
      submitButtonSubmitted: 'Submitted ',
  
  
      floristRegistrationTitle: 'Become a MayDaisy florist',
      floristRegistrationSubtitle: "You don't currently have a shop set up. If you are a florist with distinctive styles, get in touch! We can help you reach a broader customer base and connect you with a community that shares your passion.",
      
      floristRegistrationStep1Title: 'We received your registration!',
      floristRegistrationStep1Subtitle: "To ensure florists on our platform receive a meaningful volume of orders, we invite new florists to join as our customer base grows. In any case, we will contact you within 7 days to get in touch. If you don't hear from us by then, please feel free to reach out to us at contact@maydaisy.com",
      
      registrationFormTitle: 'Get in touch',
      floristSource: "How did you hear about us?",
      floristFirstName: "First Name:",
      floristLastName: "Last Name:",
      shopName: "Flower Shop:",
      shopWeb: "Website:",
      floristPhone: "Phone:",
  
      floristFirstNamePlaceholder: "first name",
      floristLastNamePlaceholder: "last name",
      shopNamePlaceholder: "shop's name",
      shopWebPlaceholder: "website/ facebook/ instagram",
      floristPhonePlaceholder: "phone #",
  
      newsLetter: 'Newsletter',
      socialMedia: 'Social Media',
      tradeShow: 'Trade Shows',
      searchEngine: 'Search Engine',
      onlineAdvertisement: 'Online Ads',
      offlineAdvertisement: 'Offline Ads',
      otherSources: 'Other Sources',
      select: 'Select Source',
      floristReferral: 'Referral',
  
      formIncompleteMessage: '*please complete the form.',
  
      whatToExpect: 'What to expect at MayDaisy:',
      expectation1: 'Freedom:',
      expectation1_1: " Sell your own designs, set your own price, and decide on your own delivery policy.",
      expectation2: 'Flexibility:',
      expectation2_1: " Decide which days to open and set your own delivery lead time.",
      expectation3: 'No Commitments:',
      expectation3_1: " You only pay us on what you sell.",
      expectation4: 'Fair Deal, More Focus:',
      expectation4_1: " Depending on marketing cost of the season, you keep 80-90% of the revenue, but no less than 80%. We invest it to help you reach a broader customer base and make the whole transaction process as smooth as possible, so you can focus on your art.",
      expectation5: 'Your customers:',
      expectation5_1: " Build your reputation with customers with our review system.",
  
      totalPrice: 'Total Price:',
      originalPrice: 'Original Price:',
      arrangementPrice: 'Discounted:',
      deliveryFee: 'Delivery Fee:',
      deliveryRegion: 'Region:',
  
      floristRevenueMin: 'Min Revenue:',
      orderMonth: 'Month:',
    },
    ch: {
    }
  });

class OrderDetails extends React.Component {
    
        constructor() {
            super();
            this.handleBack = this.handleBack.bind(this);
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
        handleBack = () => {
            this.props.onHandleBack();
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
                <div className="ordersdashboard-details">
                    <Row className="show-grid">
                        <FormGroup>
                        <Col sm={1} md={2}></Col>
                        <Col sm={3} md={2}>
                            <div><strong>{strings.orderStatus}</strong></div>
                        </Col>
                        <Col sm={5}>
                            <div>{strings[orderDetails.status]}</div>
                        </Col>
                        <Col sm={3}>
                        </Col>
                        </FormGroup>
                    </Row>
                  <Row className="show-grid">
                    <FormGroup>
                      <Col sm={1} md={2}></Col>
                      <Col sm={3} md={2}>
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
                      <Col sm={1} md={2}></Col>
                      <Col sm={3} md={2}>
                          <div><strong>{strings.deliveryDay}</strong></div>
                      </Col>
                      <Col sm={8}>
                        <div>{orderDetails.deliveryDate}</div>
                      </Col>
                    </FormGroup>
                  </Row>
                  <Row className="show-grid">
                    <FormGroup>
                      <Col sm={1} md={2}></Col>
                      <Col sm={3} md={2}>
                          <div><strong>{strings.arrangement}</strong></div>
                      </Col>
                      <Col sm={8}>
                      <div className="order-history-arrangement-name"><Link to={`/florist/${orderDetails.florist}/${orderDetails.arrangementCode}`}>{orderDetails.arrangementName}</Link></div>
                      </Col>
                    </FormGroup>
                  </Row>
                  <Row className="show-grid">
                    <FormGroup>
                    <Col sm={1} md={2}></Col>
                    <Col sm={3} md={2}>
                        <div><strong>{strings.totalPrice}</strong></div>
                    </Col>
                    <Col sm={8}>
                      <div>{orderDetails.currency}{orderDetails.price/100}</div>
                    </Col>
                    </FormGroup>
                  </Row>
                  <Row className="show-grid">
                    <FormGroup>
                      <Col sm={1} md={2}></Col>
                      <Col sm={3} md={2}>
                          <div><strong>{strings.originalPrice}</strong></div>
                      </Col>
                      <Col sm={8}>
                        <div>{orderDetails.currency}{orderDetails.arrangementOriginalPrice}</div>
                      </Col>
                    </FormGroup>
                  </Row>
                  {orderDetails.promoCodeApplied === true && <Row className="show-grid">
                    <FormGroup>
                      <Col sm={1} md={2}></Col>
                      <Col sm={3} md={2}>
                          <div><strong>{strings.arrangementPrice}</strong></div>
                      </Col>
                      <Col sm={8}>
                        <div>{orderDetails.currency}{orderDetails.arrangementPrice}</div>
                      </Col>
                    </FormGroup>
                  </Row>}
                  <Row className="show-grid">
                    <FormGroup>
                      <Col sm={1} md={2}></Col>
                      <Col sm={3} md={2}>
                          <div><strong>{strings.deliveryRegion}</strong></div>
                      </Col>
                      <Col sm={8}>
                        <div>{strings[orderDetails.marketRegion]}</div>
                      </Col>
                    </FormGroup>
                  </Row>
                  <Row className="show-grid">
                    <FormGroup>
                      <Col sm={1} md={2}></Col>
                      <Col sm={3} md={2}>
                          <div><strong>{strings.deliveryFee}</strong></div>
                      </Col>
                      <Col sm={8}>
                        <div>{orderDetails.currency}{orderDetails.deliveryFee}</div>
                      </Col>
                    </FormGroup>
                  </Row>
                  <Row className="show-grid">
                    <FormGroup>
                      <Col sm={1} md={2}></Col>
                      <Col sm={3} md={2}>
                          <div><strong>{strings.deliveryType}</strong></div>
                      </Col>
                      <Col sm={8}>
                        <div>{strings[orderDetails.selectDeliveryType]}</div>
                      </Col>
                    </FormGroup>
                  </Row>
                  { orderDetails.selectDeliveryType === 'delivery_gift' && <Row className="show-grid">
                    <FormGroup>
                      <Col sm={1} md={2}></Col>
                      <Col sm={3} md={2}>
                          <div><strong>{strings.recipient}</strong></div>
                      </Col>
                      <Col sm={8}>
                        <div>{orderDetails.recipient}</div>
                      </Col>
                    </FormGroup>
                  </Row> }
                  { orderDetails.selectDeliveryType === 'delivery_gift' && <Row className="show-grid">
                    <FormGroup>
                      <Col sm={1} md={2}></Col>
                      <Col sm={3} md={2}>
                          <div><strong>{strings.recipientNum}</strong></div>
                      </Col>
                      <Col sm={8}>
                        <div>{orderDetails.recipientNum}</div>
                      </Col>
                    </FormGroup>
                  </Row> }
                  <Row className="show-grid">
                    <FormGroup>
                      <Col sm={1} md={2}></Col>
                      <Col sm={3} md={2}>
                          <div><strong>{strings.address}</strong></div>
                      </Col>
                      <Col sm={8}>
                        <div>{orderDetails.address}</div>
                      </Col>
                    </FormGroup>
                  </Row>
                  <Row className="show-grid">
                    <FormGroup>
                      <Col sm={1} md={2}></Col>
                      <Col sm={3} md={2}>
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
                      <Col sm={1} md={2}></Col>
                      <Col sm={3} md={2}>
                          <div><strong>{strings.deliveryInstruction}</strong></div>
                      </Col>
                      <Col sm={7}>
                        <div>{orderDetails.deliveryInstruction}</div>
                      </Col>
                    </FormGroup>
                  </Row>
                  <Row className="show-grid">
                    <FormGroup>
                      <Col sm={1} md={2}></Col>
                      <Col sm={3} md={2}>
                          <div><strong>{strings.sender}</strong></div>
                      </Col>
                      <Col sm={7}>
                        <div>{orderDetails.senderName}</div>
                      </Col>
                    </FormGroup>
                  </Row>
                  <Row className="show-grid">
                    <FormGroup>
                      <Col sm={1} md={2}></Col>
                      <Col sm={3} md={2}>
                          <div><strong>{strings.senderNum}</strong></div>
                      </Col>
                      <Col sm={7}>
                        <div>{orderDetails.senderNum}</div>
                      </Col>
                    </FormGroup>
                  </Row>
                  <Row className="show-grid">
                    <FormGroup>
                      <Col sm={1} md={2}></Col>
                      <Col sm={3} md={2}>
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
                        <Button bsStyle="" className="button button-back" onClick={() => this.handleBack()}>{strings.backButton}</Button>
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

class FloristOrdersList extends Component {
    constructor() {
      super();
      this.state = {
        orderData: {},
        loading: true,
        selectedOrder: '',
      }
    }

    componentWillMount() {
      base.fetch(`allTransactions/${this.props.designerCode}`, {
          context: this,
          queries: {
              orderByChild: 'referenceCode'
          },
          then(data) {
              this.setState({orderDetailsStatus: 0, orderData: data, loading: false});
          }
      });
    }

    componentDidMount () {
      window.scrollTo(0, 0);
    }

    handleChooseOrder= (chosenKey) => {
      this.setState({orderDetailsStatus: 1, selectedOrder: chosenKey}, () => window.scrollTo(0, 0));
    }

    handleBack = () => {
        this.setState({orderDetailsStatus: 0}, () => window.scrollTo(0, 0));
    }

    //////////////
  
    render () {
  
      var data = this.state.orderData;
      var loadingState = this.state.loading;
      var orderDetailsStatus = this.state.orderDetailsStatus;
      var orders;
      var ordersHeader;
      let content = null;
  
      // console.log('data check: ', Object.keys(data).length);
      if (Object.keys(data).length===0) {
        ordersHeader = null;
        orders = (
          <div className="no-sub-section">            
            <div className="center-text">No Order</div>
          </div>
        )
      } else {
        ordersHeader = (
          <Grid>
            <Row className="ordersdashboard-list-titles">
              <Col xs={4} sm={3} md={3}>Sender</Col>
              <Col xs={4} sm={3} md={3}>DeliveryDay</Col>
              <Col xs={4} sm={3} md={2}>Status</Col>
              <Col xsHidden sm={3} md={2}>MinRevenue</Col>
              <Col xsHidden smHidden md={2}>Month</Col>
            </Row>
          </Grid>
        );
        orders = Object.keys(data).map(function(key) {
          var chosenKey = data[key].referenceCode;
          return (
            <div key={key} onClick={() => this.handleChooseOrder(chosenKey)}>
              <Grid>
                <div className="ordersdashboard-list-item">
                  <Row className="show-grid">
                      <Col xs={4} sm={3} md={3}>
                        <div>{data[key].senderName}</div>
                      </Col>
                      <Col xs={4} sm={3} md={3}>
                        <div>{data[key].deliveryDate}</div>
                      </Col>
                      <Col xs={4} sm={3} md={2}>
                        <div>{data[key].status}</div>
                      </Col>
                      <Col xsHidden sm={3} md={2}>
                        <div>{data[key].floristRevenueMin}</div>
                      </Col>
                      <Col xsHidden smHidden md={2}>
                        <div>{data[key].orderMonth}</div>
                      </Col>
                  </Row>
                </div>
              </Grid>
            </div>
          )
        }, this)
      }

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
            {ordersHeader}
            {orders.reverse && orders.reverse()}
            {!orders.reverse && orders}
          </div>
        )
      } else if (orderDetailsStatus===1) {
        content = (
          <div>
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

export default class FloristsDashboard extends Component {
    
      constructor() {
        super();
        this.state = {
          floristsData: {},
          loading: true,
          floristsDetailsStatus: 0
        }
      }

      updateList = () => {
        base.fetch(`florists/`, {
          context: this,
          then(data) {
            this.setState({floristsData: data, loading: false});
          }
        });
      }

      componentDidMount () {
        window.scrollTo(0, 0);
        this.fireBaseListenerForFlorists = firebaseAuth().onAuthStateChanged((user) => {
          console.log('auth', firebase.auth());
          this.updateList();
        });
      }
      componentWillUnmount () {
        //returns the unsubscribe function
        this.fireBaseListenerForFlorists && this.fireBaseListenerForFlorists();
      }
      handleChooseFlorist(chosenKey) {
        console.log('chosen key is', chosenKey);
        this.setState({floristsDetailsStatus: 1, selectedFlorist: chosenKey}, () => window.scrollTo(0, 0));
      }
      handleBack = () => {
        this.setState({floristsDetailsStatus: 0}, () => window.scrollTo(0, 0));
      }
    
      render () {
    
        var data = this.state.floristsData;
        var loadingState = this.state.loading;
        var floristsDetailsStatus = this.state.floristsDetailsStatus;
        var florists;
        var floristsHeader;
    
        // console.log('data check: ', Object.keys(data).length);
        if (Object.keys(data).length===0) {
            floristsHeader = null;
            florists = (
            <div className="no-sub-section">            
              <div className="center-text">No Florist</div>
            </div>
          )
        } else {
            floristsHeader = (
            <Grid>
                <Row className="registration-list-titles">
                    <Col xs={3}>Shop</Col>
                    <Col xs={3}>Phone</Col>
                    <Col xs={3}>Type</Col>
                    <Col xs={3}>LeadTime</Col>
                </Row>
            </Grid>
          )
          florists = Object.keys(data).map(function(key) {
            var chosenKey = data[key].id;
            return (
              <div key={key}>
                <Grid>
                  <div className="registration-list-item" onClick={() => this.handleChooseFlorist(chosenKey)}>
                    <Row className="show-grid">
                        <Col xs={3}>
                          <div>{data[key].name}</div>
                        </Col>
                        <Col xs={3}>
                          <div>{data[key].phone}</div>
                        </Col>
                        <Col xs={3}>
                          <div>{data[key].floristType}</div>
                        </Col>
                        <Col xs={3}>
                          <div>{data[key].deliveryLeadTime}</div>
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
        } else if (floristsDetailsStatus===0){
          content = (
            <div>
              <Grid>
                <Row className="show-grid loggedin-flow">
                  <div className="horizontal-line"></div>
                  <Col xs={12}>
                      <div className="flow-selected">All Florists</div>
                        <i className="fa fa-chevron-right"></i>
                      <div>Orders</div>
                  </Col>
                  <div className="horizontal-line"></div>
                </Row>
              </Grid>
              {floristsHeader}
              {florists.reverse()}
            </div>
          )
        } else if (floristsDetailsStatus===1) {
            content = (
                <div>
                    <Grid>
                        <Row className="show-grid loggedin-flow">
                        <div className="horizontal-line"></div>
                        <Col xs={12}>
                            <div className='flow-nav' onClick={() => this.setState({floristsDetailsStatus: 0}, () => window.scrollTo(0, 0))}>All Florists</div>
                                <i className="fa fa-chevron-right"></i>
                            <div className="flow-selected">Orders</div>
                        </Col>
                        <div className="horizontal-line"></div>
                        </Row>
                    </Grid>
                    <FloristOrdersList
                        designerCode={this.state.selectedFlorist} 
                        onHandleBack={this.handleBack}
                    />
                </div>
            )
        }

        var header = (
            <Row className="show-grid loggedin-nav">
                <Col xs={4} className="loggedin-nav-button">
                <Link to="/auth/admin-registration">
                    <i className="fa fa-book fa-lg nav-icon"></i>
                    <div className="nav-icon-title">Registration</div>
                </Link>
                </Col>
                <Col xs={4} className="loggedin-nav-button">
                <Link to="/auth/admin-florists" className="nav-selected">
                    <i className="fa fa-star fa-lg nav-icon"></i>
                    <div className="nav-icon-title">Dashboard</div>
                </Link>
                </Col>
            </Row>
        )
    
        return (
          <div className="loggedin-background">
            <Grid>
              <Row className="show-grid loggedin-margin-box">
                <Col className="loggedin-content">
                    {header}
                    {content}
                </Col>
              </Row>
            </Grid>
          </div>
        )
      }
}