import React, { Component } from 'react'
import { firebaseAuth } from '../config/constants';
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, Grid, Row, Col, Button, Glyphicon} from 'react-bootstrap';
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
      order_received: '已收定單',
      order_fulfilled: '已送花',
  
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
      reviewSubmitted: '您的評論已發出。',
  
      buttonToShop: '我的花店',
      buttonToAccount: '我的帳戶',
  
      tipForDeliverySelf: '客人的定單用途為自用，您可以為他(她)寫下祝福語。',
      orderReceived: '已收到',
      orderFulfilled: '已送花',
  
      submitButton: '遞交',
      submitButtonSubmitted: '已遞交 ',
  
  
      floristRegistrationTitle: '成為五月菊花匠',
      floristRegistrationSubtitle: "您目前在五月菊沒有花店。如果您是一個有獨特風格的花藝師，可以考慮加入五月菊。我們可以將您的藝術帶到更多客人的面前，您亦可以在五月菊的圈子找到跟您一樣熱衷於花藝的朋友。",
      
      floristRegistrationStep1Title: '我們已收到您的登記!',
      floristRegistrationStep1Subtitle: "為了令已註冊的五月菊花匠可以收到足夠的定單，我們會隨著平台的發展邀請新的花匠加入。但無論我們可否給您發出邀請，我們會在收到登記之後的7天之內聯繫您，如果介時您還沒收到任何聯絡，請給我們發一個電郵(contact@maydaisy.com)。",
      
      registrationFormTitle: '登記',
      floristSource: "您是從何聽說五月菊的?",
      floristFirstName: "姓:",
      floristLastName: "名:",
      shopName: "花店名稱:",
      shopWeb: "網站:",
      floristPhone: "電話:",
  
      floristFirstNamePlaceholder: "姓",
      floristLastNamePlaceholder: "名",
      shopNamePlaceholder: "花店名稱",
      shopWebPlaceholder: "url/ facebook/instagram",
      floristPhonePlaceholder: "電話",
  
  
      newsLetter: '五月菊刊物',
      socialMedia: '社交媒體',
      tradeShow: '貿易展覽會',
      searchEngine: '搜索引擎',
      onlineAdvertisement: '網上廣告',
      offlineAdvertisement: '線下廣告',
      otherSources: '其他',
      select: '選擇',
      floristReferral: '朋友介紹',
  
      formIncompleteMessage: '*請填寫所有資訊欄',
  
      whatToExpect: '五月菊的好處:',
      expectation1: '自由:',
      expectation1_1: " 賣您的設計，定您的價格，用您的送貨方式。",
      expectation2: '彈性:',
      expectation2_1: " 彈性的開店時間，定明您的預定需時。",
      expectation3: '沒有上架費:',
      expectation3_1: " 您只需為成功收費的定單付交易費。",
      expectation4: '雙贏的合作，令你可以更集中:',
      expectation4_1: " 視乎當季的市場推廣成本，您將會收到最多90％，不少於80％的收益。收取的交易費將投資在市場推廣、支付處理、和五月菊平台的發展。",
      expectation5: '您的客人:',
      expectation5_1: " 在五月菊發展您的花藝事業，利用我們的評論平台建立您的聲望。",
  
      totalPrice: '總價:',
      originalPrice: '設計原價:',
      arrangementPrice: '設計折後價:',
      deliveryFee: '送貨費:',
      deliveryRegion: '送貨區域:',
  
      floristRevenueMin: '最低收益:',
      orderMonth: '結算月:',
    }
  });

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
                <Link to="/admin-registration">
                    <i className="fa fa-book fa-lg nav-icon"></i>
                    <div className="nav-icon-title">Registration</div>
                </Link>
                </Col>
                <Col xs={4} className="loggedin-nav-button">
                <Link to="/admin-florists" className="nav-selected">
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