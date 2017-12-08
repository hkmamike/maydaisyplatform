import React, { Component } from 'react'
import { firebaseAuth } from '../config/constants';
import { login, resetPassword } from '../helpers/auth'
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel, Grid, Row, Col, Button, DropdownButton, MenuItem, Glyphicon, Modal,Checkbox } from 'react-bootstrap';
import PlaceOrder from '../helpers/singleOrderPayment'
import LocalizedStrings from 'react-localization';
import * as firebase from 'firebase';
import { base } from '../config/constants';

let strings = new LocalizedStrings({
  en:{
    navLogin: 'Login',
    navCard: 'Message',
    navDelivery: 'Delivery',
    navReview: 'Review',
    navPayment: 'Payment',
    nextButton: 'Next',
    backButton: 'Back',
    cardMessage: 'Card Message:',
    cardMessagePlaceholder: 'card Message - optional',
    cardMessageTip1_1: '*Please include the desired recipient name and sender signature on the card.',
    cardMessageTip1_2: " ",
    from: 'From:',
    fromPlaceholder: "sender's name",
    fromTip: '*If you have included a signature on the card message, we will use that and this will only serve to update your account information.',
    recipientName: "Recipient's name:",
    recipientNamePlaceholder: 'for delivery',
    recipientNum: "Recipient's number:",
    recipientNumPlaceholder: 'for delivery',
    recipientCompany: 'Location name:',
    recipientCompanyPlaceholder: "recipient's company or location name",
    recipientAddress: 'Address:',
    recipientAddressPlaceholder: 'delivery address',
    saveThis: 'save this to my address book.',
    deliveryInstruction: "Delivery Instruction:",
    deliveryInstructionPlaceholder: "Florists will try their best to accommodate. Please reference selected florist's delivery policy.",
    senderNum: "Sender's number:",
    senderNumPlaceholder: 'your phone number',
    senderNumTip: '*We will use this to update your account information and to service your subscription.',
    total: 'Total:',
    arrangementPrice: 'Subtotal:',
    deliveryFee: 'Delivery Fee:',
    deliveryDay: 'Delivery Day:',
    orderButton: 'Place Order',
    termsTip1: '*By clicking "Place Order" below, you confirm that you have viewed and accept our ',
    termsTip2: 'Terms of Services',
    termsTip3: '.',
    referenceCode: 'Reference Code:',
    referenceCodeTip: '*This is the reference code for this transaction with MayDaisy. Please use this number if you need to contact customer support.',
    stripeTxnID: 'Stripe ID:',
    subIDTip: '*This is the transaction ID issued by our payment processor - Stripe.',
    orderHistoryButton: 'Order History',
    locationType: 'Location Type:',
    location_office: 'Office ',
    location_home: 'Home',
    location_cemetery: 'Cemetery',
    orderSucceed: 'Success! You have placed an order.',
    deliveryType: 'Gift? :',
    delivery_self: 'For Myself',
    delivery_gift: 'Gift',



    loginTitle: 'Welcome Back',
    loginSubtitle: 'Log in to continue',
    loginButton: 'Login',
    forgotPW: 'Forgot Password?',
    createAccount: 'Create Account',
    email: 'Email',
    password: 'Password',
    invalidCredential: 'Invalid username/password.',
    resetSent1_1: 'Password reset email has been sent to ',
    resetSent1_2: '.',
    noAccountFound: 'No account is registered under this email.',

    importButton: 'Import',
    importTitle: 'Import Delivery Address',
    selectedAddress: 'Selected Address ID:',
    selectButton: 'Select',
    noRecord: 'You currently have no saved address.',

  },
  ch: {

    navLogin: '登入',
    navCard: '心意卡',
    navDelivery: '配送資料',
    navReview: '檢查',
    navPayment: '付款',

    nextButton: '繼續',
    backButton: '返回',

    deliveryType: '用途:',
    delivery_self: '自用',
    delivery_gift: '禮物',

    cardMessage: '信息:',
    cardMessagePlaceholder: '心意卡信息 - 非必要',
    cardMessageTip1_1: '*請在此欄填寫心意卡手寫信息的上下款。',
    cardMessageTip1_2: " ",
    from: '送花人:',
    fromPlaceholder: "送花人名字",
    fromTip: '*花匠在手寫心意卡信息時會以心意卡信息欄中的名稱為準，如您已經在心意卡信息欄中填寫名稱，此欄只會用作送花和帳戶資訊更新。',
    recipientName: "收花人:",
    recipientNamePlaceholder: '配送用',
    recipientNum: "收花人電話:",
    recipientNumPlaceholder: '配送用',
    recipientCompany: '地點名稱:',
    recipientCompanyPlaceholder: "收花人公司或地點名稱",
    recipientAddress: '地址:',
    saveThis: '儲存這地址到我的地址記錄。',
    recipientAddressPlaceholder: '配送用',
    deliveryInstruction: "送貨指示:",
    deliveryInstructionPlaceholder: "你的花匠會盡力跟指示安排，送貨詳情以花店的送貨規則為準，請參閱。",
    senderNum: "送花人電話:",
    senderNumPlaceholder: '您的電話號碼',
    senderNumTip: '*此欄會用作帳戶資訊更新和訂單跟進。',
    total: '總價:',
    arrangementPrice: '貨品價格:',
    deliveryFee: '配送費:',
    deliveryDay: '配送日:',
    orderButton: '訂購',
    termsTip1: '*如您繼續並按下"訂購"，您確認您已經閱讀並同意接受我們的',
    termsTip2: '服務條款',
    termsTip3: '.',
    referenceCode: 'Reference Code:',
    referenceCodeTip: '*如要聯絡客戶服務部，請提供這個交易參考號碼。',
    stripeTxnID: 'Stripe 訂購號碼:',
    subIDTip: '*這是我們的支付平台發出的訂購號碼。',
    orderHistoryButton: '購買記錄',
    orderSucceed: '您已成功新增一個訂購！',

    loginTitle: '歡迎回來',
    loginSubtitle: '如要繼續請登入',
    loginButton: '登入',
    forgotPW: '忘記密碼?',
    createAccount: '建立帳戶', 
    email: '電郵',
    password: '密碼',
    invalidCredential: '電郵或密碼錯誤。',
    resetSent1_1: '密碼重設方法已寄出:',
    resetSent1_2: ' ',
    noAccountFound: '並沒有以此電郵登記的帳戶。',

    importButton: '載入',
    importTitle: '載入送貨地址',
    selectedAddress: '已選地址ID:',
    selectButton: '選擇',

    noRecord: 'No Record',
  }
});

function setErrorMsg(error) {
    return {
      loginMessage: error
    }
}

class ImportAddressModal extends React.Component {
    constructor() {
      super();
      this.open = this.open.bind(this);
      this.close = this.close.bind(this);
      this.importAddress = this.importAddress.bind(this);
      this.state = {
        showModal: false,
        addressData: {},
      }
    }
    close() {
      this.setState({showModal: false});
    }
    open() {
      this.setState({showModal: true});
    }
    importAddress = () => {
      this.props.onImportAddress(this.state.selectedAddress);
      this.close();
    }
    selectAddress = (key) => {
        this.setState({selectedAddress: key});
    }
    componentDidMount() {
        var uid = firebase.auth().currentUser.uid;
        base.fetch(`users/${uid}/address/`, {
            context: this,
            then(data) {
                this.setState({addressData: data});
            }
        });
    }
    render() {
        var data = this.state.addressData;
        var addresses;
        var addressesHeader;
        if (Object.keys(data).length===0) {
            addressesHeader = null;
            addresses = (
              <div className="no-sub-section">            
                <div className="center-text">{strings.noRecord}</div>
              </div>
            )
        } else {
            addressesHeader = (
                <Grid>
                    <Row className="import-list-titles">
                    <Col xs={6}>{strings.recipientName}</Col>
                    <Col xs={6}>{strings.recipientAddress}</Col>
                    </Row>
                </Grid>
            )
            addresses = Object.keys(data).map(function(key) {
                return (
                    <div key={key}>
                        <Grid>
                            <div className="import-list-item" onClick={() => {this.selectAddress(key)}}>
                                <Row className="show-grid">
                                    <Col xs={6}>
                                    <div className='import-address-name'>{data[key].recipient}</div>
                                    </Col>
                                    <Col xs={6}>
                                        <div>{data[key].address}</div>
                                    </Col>
                                </Row>
                            </div>
                        </Grid>
                    </div>
                )
            }, this)
        }

        return (
            <div>
                <Button bsStyle="" className="sub-details-unsub" onClick={this.open}>{strings.importButton}</Button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                    <Modal.Title><strong>{strings.importTitle}</strong></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {addressesHeader}
                        {addresses}
                        <div className="selected-import-address">{strings.selectedAddress} {this.state.selectedAddress}</div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button bsStyle="" className="button button-back" onClick={this.close}>{strings.backButton}</Button>
                    <Button bsStyle="" className="button" onClick={this.importAddress}>{strings.importButton}</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default class Order extends Component {

    constructor() {
        super();
        // this.handleSubscriptionStep = this.handleSubscriptionStep.bind(this);
        this.handleLoading = this.handleLoading.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePWChange = this.handlePWChange.bind(this);
        this.handleOrderStep = this.handleOrderStep.bind(this);
        this.state = {
            loading: true,
            orderStep: 0,
            cardMessage: '',
            sender: '',
            address: '',
            selectLocationType: 'location_office',
            selectDeliveryType: 'delivery_gift',
            recipient: '',
            recipientNum: '',
            company: '',
            senderNum: '',
            stripeTransactionID: '',
            email: '',
            password: '',
            addressBookChecked: false,
        }
    }

    resetPassword = () => {
        resetPassword(this.state.email)
        .then(() => this.setState(setErrorMsg(`${strings.resetSent1_1}${this.state.email}${strings.resetSent1_2}`)))
        .catch((error) => this.setState(setErrorMsg(strings.noAccountFound)))
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    handlePWChange(e) {
        this.setState({ password: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault()
        login(this.state.email, this.state.password).then(() => {
                this.setState({orderStep:1});
            }).catch((error) => {
            this.setState(setErrorMsg(strings.invalidCredential));
        })
      }

    handleOrderStep(referenceCode, stripeTxnID, deliveryDate) {
        this.setState({orderStep : 5, referenceCode: referenceCode, stripeTxnID: stripeTxnID, deliveryDate: deliveryDate, loading: false}, () => {window.scrollTo(0, 0);});
    }

    handleLoading() {
        this.setState({loading: true});
    }

    handleLocationTypeSelect = (eventKey) => {
        this.setState({selectLocationType: eventKey});
    }
    handleDeliveryTypeSelect = (eventKey) => {
        this.setState({selectDeliveryType: eventKey});
    }
    handleCardMessage = (e) => {
        this.setState({cardMessage: e.target.value});
    }
    handleSender = (e) => {
        this.setState({sender: e.target.value});
    }
    handleRecipient = (e) => {
        this.setState({recipient: e.target.value});
    }
    handleRecipientNum = (e) => {
        this.setState({recipientNum: e.target.value});
    }
    handleCompany = (e) => {
        this.setState({company: e.target.value});
    }
    handleAddress = (e) => {
        this.setState({address: e.target.value});
    }
    handleDeliveryInstruction = (e) => {
        this.setState({deliveryInstruction: e.target.value});
    }
    handleSenderNum = (e) => {
        this.setState({senderNum: e.target.value});
    }
    handleImportAddress = (selectedAddress) => {
        var thisRef = this;
        var uid = firebase.auth().currentUser.uid;
        firebase.database().ref(`users/${uid}/address/${selectedAddress}`).once('value', function(snapshot) {
            var snapshotVal = snapshot.val();
            thisRef.setState({
                recipient: snapshotVal.recipient,
                recipientNum: snapshotVal.recipientNum,
                company: snapshotVal.company,
                address: snapshotVal.address,
                deliveryinstruction: snapshotVal.deliveryInstruction,
                selectLocationType: snapshotVal.selectLocationType,
                deliveryInstruction: snapshotVal.deliveryInstruction,
            });
        });
    }
    addressBookOption = (e) => {
        this.setState({addressBookChecked: e.target.checked});
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        var thisRef = this;
        var marketRegion = this.props.marketRegion;
        var floristID = this.props.match.params.floristID;
        if (firebase.auth().currentUser !== null) {
            this.setState({orderStep:1});
        }
        this.setState({loading: false});
        this.setState ({arrangement: this.props.match.params.arrangement, floristID: this.props.match.params.floristID}, () => {
            firebase.database().ref(`arrangementsList/${this.state.arrangement}`).once('value', function(snapshot) {
                var snapshotVal = snapshot.val();
                thisRef.setState({
                    loading: false,
                    arrangementApproval: snapshotVal.approval,
                    arrangementDescription: snapshotVal.description,
                    arrangementPrice: snapshotVal.price,
                    arrangementCurrency: snapshotVal.currency,
                    arrangementSeasonality: snapshotVal.seasonality,
                    arrangementID: snapshotVal.id,
                    arrangementImage: snapshotVal.image,
                    arrangementName: snapshotVal.name,
                    arrangementFlorist: snapshotVal.florist,
                    arrangementFloristName: snapshotVal.floristName,
                });
            });
            firebase.database().ref(`florists/${floristID}/deliveryFee`).once('value', function(snapshot) {
                var snapshotVal = snapshot.val();
                thisRef.setState({
                    arrangementDeliveryFee: snapshotVal[marketRegion],
                    arrangementDeliveryCurrency: snapshotVal.currency,
                });
            });
        });
    }
    componentWillMount () {

        strings.setLanguage(this.props.languageChanged);

        var thisRef = this;
        this.fireBaseListenerForUserData = firebaseAuth().onAuthStateChanged((user) => {
            firebase.database().ref(`users/${user.uid}/info`).once('value', function(snapshot) {
                var snapshotVal = snapshot.val();
                if (snapshotVal) {
                    thisRef.setState({
                        sender: snapshotVal.name,
                        senderNum: snapshotVal.phone
                    });
                }
            });
        });
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.languageChanged==='ch') {
        strings.setLanguage('ch');
        } else if (nextProps.languageChanged==='en') {
        strings.setLanguage('en');
        }
    }

    componentWillUnmount () {
        //returns the unsubscribe function
        this.fireBaseListenerForUserData && this.fireBaseListenerForUserData();
    }

  render() {

    var loadingState = this.state.loading;
    var orderStep = this.state.orderStep;
    var marketRegion = this.props.marketRegion;
    var selectLocationType = this.state.selectLocationType;
    var selectDeliveryType = this.state.selectDeliveryType;

    let content = null;
    if (orderStep===0){
        content = (
            <div>
                <Grid>
                    <Row className="show-grid loggedin-flow">
                        <div className="horizontal-line"></div>
                        <Col xs={12}>
                            <div className="flow-selected">{strings.navLogin}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navCard}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navDelivery}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navReview}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navPayment}</div>
                        </Col>
                        <div className="horizontal-line"></div>
                    </Row>
                </Grid>
                <div className="login-image">
                    <Grid>
                    <Row className="show-grid login-margin-box">
                        <Col className="login-image-prompt">
            
                            <form className="login-form" onSubmit={this.handleSubmit}>
                            <h2 className="login-title"><strong>{strings.loginTitle}</strong></h2>
                            <div className="login-subtitle">{strings.loginSubtitle}</div>
                            <div className="horizontal-line"></div>
                            { this.state.loginMessage &&
                                <div className="alert alert-danger login-error" role="alert">
                                <Glyphicon glyph="exclamation-sign" className="icons"/>&nbsp;{this.state.loginMessage} 
                                </div>
                            }
                            <FormGroup>
                                <FormControl className="login-form-field" type="text" value={this.state.email} placeholder={strings.email} onChange={this.handleEmailChange}/>
                                <FormControl className="login-form-field" type="password" value={this.state.password} placeholder={strings.password} onChange={this.handlePWChange}/>
                            </FormGroup>
            
                            <Button bsStyle="" type="submit" className="button">{strings.loginButton}</Button>
                            <div className="link-group">
                                <a onClick={this.resetPassword} className="alert-link link-forgot-pw">{strings.forgotPW}</a>
                                <Link to="/register" className="link-create-account">{strings.createAccount}</Link>
                            </div>
                            </form>
                        </Col>
                    </Row>
                    </Grid>
                </div>
            </div>
        )
    } else if (orderStep===1){
        content = (
            <div>
                <Grid>
                    <Row className="show-grid loggedin-flow">
                        <div className="horizontal-line"></div>
                        <Col xs={12}>
                            <div>{strings.navLogin}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div className="flow-selected">{strings.navCard}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navDelivery}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navReview}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navPayment}</div>
                        </Col>
                        <div className="horizontal-line"></div>
                    </Row>
                </Grid>
                <Grid>
                    <Row className="show-grid">
                        <Col sm={2}></Col>
                        <Col sm={3}><div><strong>{strings.deliveryType}</strong></div></Col>
                        <Col sm={6}>
                            <FormGroup>
                                <DropdownButton title={strings[selectDeliveryType]} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={this.handleDeliveryTypeSelect}>
                                    <MenuItem eventKey="delivery_self">{strings.delivery_self}</MenuItem>
                                    <MenuItem eventKey="delivery_gift">{strings.delivery_gift}</MenuItem>
                                </DropdownButton>
                            </FormGroup>
                        </Col>
                    </Row>
                    { this.state.selectDeliveryType === 'delivery_gift' &&
                        <Row className="show-grid">
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <div><strong>{strings.cardMessage}</strong></div>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <FormControl value={this.state.cardMessage} componentClass="textarea" className="cardMessage" placeholder={strings.cardMessagePlaceholder} onChange={this.handleCardMessage}/>
                                    <div className="order-tips">{strings.cardMessageTip1_1}{strings.cardMessageTip1_2}</div>
                                </FormGroup>
                            </Col>
                        </Row>
                    }
                    { this.state.selectDeliveryType ==='delivery_gift' && 
                        <Row className="show-grid">
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <div><strong>{strings.from}</strong></div>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <FormControl value={this.state.sender} type="text" placeholder={strings.fromPlaceholder} onChange={this.handleSender}/>
                                    <div className="order-tips">{strings.fromTip}</div>
                                </FormGroup>
                            </Col>
                        </Row>
                    }
                    <Row className="show-grid">
                        <Col sm={5}></Col>
                        <Col sm={4}>
                            <Button bsStyle="" className="button-new-sub" onClick={() => this.setState({orderStep: 2}, () => {window.scrollTo(0, 0);})}>{strings.nextButton}</Button>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    } else if (orderStep===2){
        content = (
            <div>
                <Grid>
                    <Row className="show-grid loggedin-flow">
                        <div className="horizontal-line"></div>
                        <Col xs={12}>
                            <div>{strings.navLogin}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navCard}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div className="flow-selected">{strings.navDelivery}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navReview}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navPayment}</div>
                        </Col>
                        <div className="horizontal-line"></div>
                    </Row>
                </Grid>
                
                <Grid>
                    <Row className="show-grid">
                        <Col sm={9}></Col>
                        <Col sm={3}>
                            <ImportAddressModal
                                uid={this.state.uid}
                                onImportAddress={this.handleImportAddress}
                            />
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <ControlLabel>{strings.recipientName}</ControlLabel>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <FormControl value={this.state.recipient} type="text" onChange={this.handleRecipient} placeholder={strings.recipientNamePlaceholder}/>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                    </Row>
                    {this.state.selectLocationType==='location_office' && this.state.selectDeliveryType === 'delivery_gift' &&
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <ControlLabel>{strings.recipientNum}</ControlLabel>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <FormControl value={this.state.recipientNum} type="text" placeholder={strings.recipientNumPlaceholder} onChange={this.handleRecipientNum}/>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                    </Row>}
                    {this.state.selectLocationType==='location_home' && this.state.selectDeliveryType === 'delivery_gift' &&
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <ControlLabel>{strings.recipientNum}</ControlLabel>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <FormControl value={this.state.recipientNum} type="text" placeholder={strings.recipientNumPlaceholder} onChange={this.handleRecipientNum}/>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                    </Row>}
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <ControlLabel>{strings.recipientCompany}</ControlLabel>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <FormControl value={this.state.company} type="text" placeholder={strings.recipientCompanyPlaceholder} onChange={this.handleCompany}/>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <ControlLabel>{strings.recipientAddress}</ControlLabel>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <FormControl value={this.state.address} componentClass="textarea" className="recipientAddress" onChange={this.handleAddress} placeholder={strings.recipientAddressPlaceholder}/>
                                    <Checkbox 
                                        onChange={this.addressBookOption}
                                        checked={this.state.addressBookChecked}
                                    >
                                        {strings.saveThis}
                                    </Checkbox>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <ControlLabel>{strings.deliveryInstruction}</ControlLabel>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <FormControl value={this.state.deliveryInstruction} componentClass="textarea" className="deliveryInstruction" onChange={this.handleDeliveryInstruction} placeholder={strings.deliveryInstructionPlaceholder}/>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <ControlLabel>{strings.senderNum}</ControlLabel>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <FormControl value={this.state.senderNum} type="text" placeholder={strings.senderNumPlaceholder} onChange={this.handleSenderNum}/>
                                    <div className="order-tips">{strings.senderNumTip}</div>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <Col sm={5}></Col>
                        <Col sm={4}>
                            <Button bsStyle="" className="button-new-sub" onClick={() => this.setState({orderStep: 3}, () => {window.scrollTo(0, 0);})}>{strings.nextButton}</Button>
                            <Button bsStyle="" className="button-new-sub button-back" onClick={() => this.setState({orderStep: 1}, () => {window.scrollTo(0, 0);})}>{strings.backButton}</Button>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    } else if (orderStep===3){
        content = (
            <div>
                <Grid>
                    <Row className="show-grid loggedin-flow">
                        <div className="horizontal-line"></div>
                        <Col xs={12}>
                            <div>{strings.navLogin}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navCard}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navDelivery}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div className="flow-selected">{strings.navReview}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navPayment}</div>
                        </Col>
                        <div className="horizontal-line"></div>
                    </Row>
                </Grid>
                <Grid className="review-order">
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <div><strong>{strings.recipientName}</strong></div>
                            </Col>
                            <Col sm={6}>
                                <div>{this.state.recipient}</div>
                            </Col>
                        </FormGroup>
                    </Row>
                    {this.state.selectLocationType==='location_home' && <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <div><strong>{strings.recipientNum}</strong></div>
                            </Col>
                            <Col sm={6}>
                                <div>{this.state.recipientNum}</div>
                            </Col>
                        </FormGroup>
                    </Row>}
                    {this.state.selectLocationType==='location_office' && <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <div><strong>{strings.recipientNum}</strong></div>
                            </Col>
                            <Col sm={6}>
                                <div>{this.state.recipientNum}</div>
                            </Col>
                        </FormGroup>
                    </Row>}
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <div><strong>{strings.recipientCompany}</strong></div>
                            </Col>
                            <Col sm={6}>
                                <div>{this.state.company}</div>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <div><strong>{strings.recipientAddress}</strong></div>
                            </Col>
                            <Col sm={6}>
                                <div>{this.state.address}</div>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <div><strong>{strings.deliveryInstruction}</strong></div>
                            </Col>
                            <Col sm={6}>
                                <div>{this.state.deliveryInstruction}</div>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <div><strong>{strings.deliveryDay}</strong></div>
                            </Col>
                            <Col sm={6}>
                                <div>{this.props.deliveryDate.format("YYYY-MMM-DD")}</div>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <div><strong>{strings.cardMessage}</strong></div>
                            </Col>
                            <Col sm={6}>
                                <div>{this.state.cardMessage}</div>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <div><strong>{strings.from}</strong></div>
                            </Col>
                            <Col sm={6}>
                            <div>{this.state.sender}</div>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <div><strong>{strings.senderNum}</strong></div>
                            </Col>
                            <Col sm={6}>
                                <div>{this.state.senderNum}</div>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <Col sm={5}></Col>
                        <Col sm={4}>
                            <Button bsStyle="" className="button-new-sub" onClick={() => this.setState({orderStep: 4}, () => {window.scrollTo(0, 0);})}>{strings.nextButton}</Button>
                            <Button bsStyle="" className="button-new-sub button-back" onClick={() => this.setState({orderStep: 2}, () => {window.scrollTo(0, 0);})}>{strings.backButton}</Button>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    } else if (orderStep===4){
        if (loadingState) {
            content = (
                <div>
                    <Grid>
                        <Row className="show-grid loggedin-flow">
                            <div className="horizontal-line"></div>
                            <Col xs={12}>
                                <div>{strings.navLogin}</div>
                                <i className="fa fa-chevron-right"></i>
                                <div>{strings.navCard}</div>
                                <i className="fa fa-chevron-right"></i>
                                <div>{strings.navDelivery}</div>
                                <i className="fa fa-chevron-right"></i>
                                <div>{strings.navReview}</div>
                                <i className="fa fa-chevron-right"></i>
                                <div className="flow-selected">{strings.navPayment}</div>
                            </Col>
                            <div className="horizontal-line"></div>
                        </Row>
                    </Grid>
                    <div className="loader"></div>
                </div>
            )
        } else {
            content = (
                <div>
                    <Grid>
                        <Row className="show-grid loggedin-flow">
                            <div className="horizontal-line"></div>
                            <Col xs={12}>
                                <div>{strings.navLogin}</div>
                                <i className="fa fa-chevron-right"></i>
                                <div>{strings.navCard}</div>
                                <i className="fa fa-chevron-right"></i>
                                <div>{strings.navDelivery}</div>
                                <i className="fa fa-chevron-right"></i>
                                <div>{strings.navReview}</div>
                                <i className="fa fa-chevron-right"></i>
                                <div className="flow-selected">{strings.navPayment}</div>
                            </Col>
                            <div className="horizontal-line"></div>
                        </Row>
                    </Grid>
                    <Grid className="review-order">
                        <Row className="show-grid">
                            <FormGroup>
                                <Col sm={2}></Col>
                                <Col sm={3}>
                                    <div><strong>{strings.arrangementPrice}</strong></div>
                                </Col>
                                <Col sm={6}>
                                    <div>{this.state.arrangementCurrency}{this.state.arrangementPrice}</div>
                                </Col>
                            </FormGroup>
                        </Row>
                        <Row className="show-grid">
                            <FormGroup>
                                <Col sm={2}></Col>
                                <Col sm={3}>
                                    <div><strong>{strings.deliveryFee}</strong></div>
                                </Col>
                                <Col sm={6}>
                                    <div>{this.state.arrangementCurrency}{this.state.arrangementDeliveryFee}</div>
                                </Col>
                            </FormGroup>
                        </Row>
                        <Row className="show-grid">
                            <FormGroup>
                                <Col sm={2}></Col>
                                <Col sm={3}>
                                    <div><strong>{strings.total}</strong></div>
                                </Col>
                                <Col sm={6}>
                                    <div>{this.state.arrangementCurrency}{this.state.arrangementPrice + this.state.arrangementDeliveryFee}</div>
                                </Col>
                            </FormGroup>
                        </Row>
                        <Row className="show-grid">
                            <Col sm={2}></Col>
                            <Col sm={3}><div><strong>{strings.deliveryDay}</strong></div></Col>
                            <Col sm={6}>
                                <div>{this.props.deliveryDate.format("YYYY-MMM-DD")}</div>
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <Col sm={2}></Col>
                            <Col sm={9}>
                                <div className="order-tips"><strong>{strings.termsTip1}<Link to='/terms' target="_blank">{strings.termsTip2}</Link></strong>{strings.termsTip3}</div>
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <Col sm={5}></Col>
                            <Col sm={4}>
                                <PlaceOrder
                                    price={(this.state.arrangementPrice + this.state.arrangementDeliveryFee)*100}
                                    arrangement={this.state.arrangement}
                                    currency={this.state.arrangementCurrency}
                                    marketRegion={marketRegion}
                                    selectLocationType={this.state.selectLocationType}
                                    sender={this.state.sender}
                                    senderNum={this.state.senderNum}
                                    recipient={this.state.recipient}
                                    recipientNum={this.state.recipientNum}
                                    company={this.state.company}
                                    address={this.state.address}
                                    deliveryInstruction={this.state.deliveryInstruction}
                                    cardMessage={this.state.cardMessage}
                                    onOrderStep={this.handleOrderStep}
                                    onLoading={this.handleLoading}
                                    languageChanged={this.props.languageChanged}
                                    selectDeliveryType = {this.state.selectDeliveryType}
                                    floristID={this.state.floristID}
                                    floristName={this.state.arrangementFloristName}
                                    arrangementName={this.state.arrangementName}
                                    arrangementImage={this.state.arrangementImage}
                                    deliveryDate={this.props.deliveryDate}
                                    addressBookChecked={this.state.addressBookChecked}
                                />
                                <Button bsStyle="" className="button-new-sub button-back" onClick={() => this.setState({orderStep: 3}, () => {window.scrollTo(0, 0);})}>{strings.backButton}</Button>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            )
        }
    }   else if (orderStep===5){
        content = (
            <div>
                <div className="sub-succeed">            
                    <div className="center-text">{strings.orderSucceed}</div>
                </div>
                <Grid>
                    <Row className="show-grid">
                        <Col sm={2}></Col>
                        <Col sm={3}>
                            <div><strong>{strings.referenceCode}</strong></div>
                        </Col>
                        <Col sm={6}>
                            <div>{this.state.referenceCode}</div>
                            <div className="order-tips">{strings.referenceCodeTip}</div>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col sm={2}></Col>
                        <Col sm={3}>
                            <div><strong>{strings.stripeTxnID}</strong></div>
                        </Col>
                        <Col sm={6}>
                            <div>{this.state.stripeTxnID}</div>
                            <div className="order-tips">{strings.subIDTip}</div>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                 
                        <Col sm={2}></Col>
                        <Col sm={3}>
                            <div><strong>{strings.deliveryDay}</strong></div>
                        </Col>
                        <Col sm={6}>
                            <div>{this.props.deliveryDate.format("YYYY-MMM-DD")}</div>
                        </Col>
                     
                    </Row>
                    <Row className="show-grid">
                        <Col sm={5}></Col>
                        <Col sm={4}>
                            <Button bsStyle="" className="button-new-sub button-back"><Link to="/orderhistory">{strings.orderHistoryButton}</Link></Button>
                        </Col>
                    </Row>
                </Grid>
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