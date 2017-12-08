import React, { Component } from 'react'
import { firebaseAuth } from '../config/constants';
import { Link, Route } from 'react-router-dom';
import { base } from '../config/constants';
import { Grid, Row, Col, FormGroup, FormControl, Button, Glyphicon } from 'react-bootstrap';
import { resetPassword } from '../helpers/auth'
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
  en:{

    orderHistory1: 'Order',
    orderHistory2: 'History',
    addressBook1: 'Address',
    addressBook2: 'Book',
    accountInformation1: 'Account',
    accountInformation2: 'Information',
    email: 'Email:',
    name: 'Name:',
    phoneNum: 'Phone:',
    phoneNumTip: '*We may use this number to contact you regarding your account and orders only.',
    updateAccountButton: 'Update Account',
    resetPWButton: 'Reset Password',
    errorOccured: 'An error occured, please try again later.',
    accountUpdated: 'Account Information has been saved.',
    resetPWSent: 'Password reset email has been sent to ',
    buttonToShop: 'My Shop',
    buttonToAccount: 'My Account',
  },
  ch: {
    orderHistory1: ' ',
    orderHistory2: '購買記錄',
    addressBook1: ' ',
    addressBook2: '地址記錄',
    accountInformation1: ' ',
    accountInformation2: '帳戶資料',
    email: '電郵:',
    name: '姓名:',
    phoneNum: '電話:',
    phoneNumTip: '*電話號碼只會用作跟您的訂購和帳戶有關的聯絡。',
    updateAccountButton: '更新帳戶資料',
    resetPWButton: '重設密碼',
    errorOccured: '系統錯誤，請稍後再試。',
    accountUpdated: '帳戶資料已更新。',
    resetPWSent: '密碼重設方法已寄出: ',
    buttonToShop: '我的花店',
    buttonToAccount: '我的帳戶',
  }
});

const ButtonToShop = ({ title, history }) => (
  <Button bsStyle="" className="head-button-white" onClick={() => history.push('/ordersdashboard')}>{strings.buttonToShop}</Button>
);

const ButtonToAccount = ({ title, history }) => (
  <Button bsStyle="" className="head-button-teal" onClick={() => history.push('/orderhistory')}>{strings.buttonToAccount}</Button>
);

export default class MarketAccountInfo extends Component {

  constructor() {
    super();
    this.handleAccountNameChange = this.handleAccountNameChange.bind(this);
    this.handleAccountPhoneChange = this.handleAccountPhoneChange.bind(this);
    this.handleAccountUpdate = this.handleAccountUpdate.bind(this);
    this.state = {
      userData: {},
      loading: true,
      accountName: '',
      accountPhone: '',
      accountInfoMessage: null
    }
  }

  componentDidMount () {
    this.fireBaseListenerForSub = firebaseAuth().onAuthStateChanged((user) => {
      base.fetch(`users/${user.uid}/transactions/`, {
        context: this,
        then(data) {
          this.setState({orderData: data, loading: false, userID: user.uid});
        }
      });
      base.fetch(`users/${user.uid}/info/`, {
        context: this,
        then(data) {
          this.setState({userData: data, loading: false, accountEmail: data.email, accountName: data.name, accountPhone: data.phone, uid: data.uid});
        }
      });
    });
  }

  componentWillMount() {
    strings.setLanguage(this.props.languageChanged);
  }

  componentWillReceiveProps (nextProps) {
      if (nextProps.languageChanged==='ch') {
          strings.setLanguage('ch');
      } else if (nextProps.languageChanged==='en') {
          strings.setLanguage('en');
      }
  }

  handleAccountNameChange(e) {
    this.setState({ accountName: e.target.value });
  }
  handleAccountPhoneChange(e) {
    this.setState({ accountPhone: e.target.value });
  }

  handleAccountUpdate (name, phone) {
    var uid = this.state.uid;
    base.update(`users/${uid}/info/`, {
      data: {
          name: name,
          phone: phone
      }
    }).then(() => 
        this.setState({ accountInfoMessage: `${strings.accountUpdated}`})
      ).catch(err => {
        console.log('An error occured when updating account information.');
        this.setState({ accountInfoMessage: `${strings.errorOccured}`});
      });
  };
  
  resetPassword = () => {
    resetPassword(this.state.accountEmail)
      .then(() => 
        this.setState({ accountInfoMessage: `${strings.resetPWSent}${this.state.accountEmail}.`})
      ).catch(err => {
        this.setState({ accountInfoMessage: `${strings.errorOccured}`})
      });
  }

  render () {

    var loadingState = this.state.loading;
    var userData = this.state.userData;
    var accountName = this.state.accountName;
    var accountPhone = this.state.accountPhone;

    let content = null;
    if (loadingState) {
      content = <div>
                  <div className="horizontal-line"></div>
                  <div className="loader"></div>
                </div>
    } else {
      content = (
        <div>
          <Grid>
            <Row className="show-grid">
              <div className="horizontal-line"></div>
              { this.state.accountInfoMessage &&
                <div className="alert alert-success update-message" role="alert">
                  <Glyphicon glyph="exclamation-sign" className="icons"/>&nbsp;{this.state.accountInfoMessage} 
                </div>
              }
            </Row>
            <div className="account-details">
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={4}></Col>
                  <Col sm={3} md={1}>
                    <div><strong>{strings.email}</strong></div>
                  </Col>
                  <Col sm={8} md={5}>
                    <div>{userData.email}</div>
                  </Col>
                </FormGroup>
              </Row>

              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={4}></Col>
                  <Col sm={3} md={1}>
                    <div><strong>{strings.name}</strong></div>
                  </Col>
                  <Col sm={7} md={5}>
                    <FormControl className="data-field-update" type="text" value={accountName} onChange={this.handleAccountNameChange}/>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={4}></Col>
                  <Col sm={3} md={1}>
                    <div><strong>{strings.phoneNum}</strong></div>
                  </Col>
                  <Col sm={7} md={5}>
                    <FormControl className="data-field-update" type="text" value={accountPhone} onChange={this.handleAccountPhoneChange}/>
                    <div className="subscription-tips">{strings.phoneNumTip}</div>
                  </Col>
                </FormGroup>
              </Row>

              <Row className="show-grid">
                <FormGroup>
                  <Col xs={12} xsPush={1} smPush={5} mdPush={5}>
                    <Button bsStyle="" className="button" onClick={() => this.handleAccountUpdate(accountName, accountPhone)}>{strings.updateAccountButton}</Button>
                    <Button bsStyle="" className="button" onClick={() => this.resetPassword()}>{strings.resetPWButton}</Button>
                  </Col>
                </FormGroup>
              </Row>
            </div>
          </Grid>
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
                <Link to="/orderhistory">
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
                <Link to="/accountinfo" className="nav-selected">
                  <i className="fa fa-user-circle fa-lg nav-icon"></i>
                  <div className="nav-icon-title">{strings.accountInformation1}<br/>{strings.accountInformation2}</div>
                </Link>
              </Col>
              {/* <div className="horizontal-line"></div> */}
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