import React, { Component } from 'react'
import { firebaseAuth } from '../config/constants';
import { login, resetPassword } from '../helpers/auth'
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel, Grid, Row, Col, Button, DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap';
import PlaceOrder from '../helpers/singleOrderPayment'
import LocalizedStrings from 'react-localization';
import * as firebase from 'firebase';

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
    termsTip1: '**By clicking "Place Order" below, you confirm that you have viewed and accept our ',
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
    noAccountFound: 'No account is registered under this email.'
  },
  ch: {
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
    noAccountFound: '並沒有以此電郵登記的帳戶。'
  }
});

function setErrorMsg(error) {
    return {
      loginMessage: error
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
        stripeTransactionID: ''
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
                // var uid = firebase.auth().currentUser.uid;
                // var thisRef = this;
                // firebase.database().ref(`users/${uid}/info`).once('value', function(snapshot) {
                //     var snapshotVal = snapshot.val();
                //     thisRef.setState({
                //         sender: snapshotVal.name,
                //         senderNum: snapshotVal.phone
                //     });
                // });
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
    componentWillMount() {
        strings.setLanguage(this.props.languageChanged);
    }

    componentDidMount() {
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
        var thisRef = this;
        this.fireBaseListenerForUserData = firebaseAuth().onAuthStateChanged((user) => {
            firebase.database().ref(`users/${user.uid}/info`).once('value', function(snapshot) {
                var snapshotVal = snapshot.val();
                thisRef.setState({
                    sender: snapshotVal.name,
                    senderNum: snapshotVal.phone
                });
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
    var arrangementPrice = this.props.arrangementPrice;
    var deliveryFee = this.props.deliveryFee;

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
                        <Col sm={3}><div><strong>{strings.locationType}</strong></div></Col>
                        <Col sm={6}>
                            <DropdownButton title={strings[selectLocationType]} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={this.handleLocationTypeSelect}>
                                <MenuItem eventKey="location_office">{strings.location_office}</MenuItem>
                                <MenuItem eventKey="location_home">{strings.location_home}</MenuItem>
                                <MenuItem eventKey="location_cemetery">{strings.location_cemetery}</MenuItem>
                            </DropdownButton>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col sm={2}></Col>
                        <Col sm={3}><div><strong>{strings.deliveryType}</strong></div></Col>
                        <Col sm={6}>
                            <DropdownButton title={strings[selectDeliveryType]} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={this.handleDeliveryTypeSelect}>
                                <MenuItem eventKey="delivery_self">{strings.delivery_self}</MenuItem>
                                <MenuItem eventKey="delivery_gift">{strings.delivery_gift}</MenuItem>
                            </DropdownButton>
                        </Col>
                    </Row>
                    { this.state.selectDeliveryType == 'delivery_gift' &&
                        <Row className="show-grid">
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <div><strong>{strings.cardMessage}</strong></div>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <FormControl value={this.state.cardMessage} componentClass="textarea" className="cardMessage" placeholder={strings.cardMessagePlaceholder} onChange={this.handleCardMessage}/>
                                    <div className="subscription-tips">{strings.cardMessageTip1_1}{strings.cardMessageTip1_2}</div>
                                </FormGroup>
                            </Col>
                        </Row>
                    }
                    <Row className="show-grid">
                        <Col sm={2}></Col>
                        <Col sm={3}>
                            <div><strong>{strings.from}</strong></div>
                        </Col>
                        <Col sm={6}>
                            <FormGroup>
                                <FormControl value={this.state.sender} type="text" placeholder={strings.fromPlaceholder} onChange={this.handleSender}/>
                                <div className="subscription-tips">{strings.fromTip}</div>
                            </FormGroup>
                        </Col>
                    </Row>
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
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <ControlLabel>{strings.recipientName}</ControlLabel>
                            </Col>
                            <Col sm={6}>
                                <FormControl value={this.state.recipient} type="text" onChange={this.handleRecipient} placeholder={strings.recipientNamePlaceholder}/>
                            </Col>
                        </FormGroup>
                    </Row>
                    {this.state.selectLocationType==='location_office' &&
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <ControlLabel>{strings.recipientNum}</ControlLabel>
                            </Col>
                            <Col sm={6}>
                                <FormControl value={this.state.recipientNum} type="text" placeholder={strings.recipientNumPlaceholder} onChange={this.handleRecipientNum}/>
                            </Col>
                        </FormGroup>
                    </Row>}
                    {this.state.selectLocationType==='location_home' &&
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <ControlLabel>{strings.recipientNum}</ControlLabel>
                            </Col>
                            <Col sm={6}>
                                <FormControl value={this.state.recipientNum} type="text" placeholder={strings.recipientNumPlaceholder} onChange={this.handleRecipientNum}/>
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
                                <FormControl value={this.state.company} type="text" placeholder={strings.recipientCompanyPlaceholder} onChange={this.handleCompany}/>
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
                                <FormControl value={this.state.address} componentClass="textarea" className="recipientAddress" onChange={this.handleAddress} placeholder={strings.recipientAddressPlaceholder}/>
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
                                <FormControl value={this.state.deliveryInstruction} componentClass="textarea" className="deliveryInstruction" onChange={this.handleDeliveryInstruction} placeholder={strings.deliveryInstructionPlaceholder}/>
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
                                <FormControl value={this.state.senderNum} type="text" placeholder={strings.senderNumPlaceholder} onChange={this.handleSenderNum}/>
                                <div className="subscription-tips">{strings.senderNumTip}</div>
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
                <Grid>
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
                    <Grid>
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
                                    <div>{this.state.arrangementDeliveryCurrency}{this.state.arrangementDeliveryFee}</div>
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
                                <div className="subscription-tips"><strong>{strings.termsTip1}<Link to='/terms' target="_blank">{strings.termsTip2}</Link></strong>{strings.termsTip3}</div>
                            </Col>
                        </Row>

                        <Row className="show-grid">
                            <Col sm={5}></Col>
                            <Col sm={4}>
                                <PlaceOrder
                                    price={(this.state.arrangementPrice + this.state.arrangementDeliveryFee)*100}
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
                            <div className="subscription-tips">{strings.referenceCodeTip}</div>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col sm={2}></Col>
                        <Col sm={3}>
                            <div><strong>{strings.stripeTxnID}</strong></div>
                        </Col>
                        <Col sm={6}>
                            <div>{this.state.stripeTxnID}</div>
                            <div className="subscription-tips">{strings.subIDTip}</div>
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