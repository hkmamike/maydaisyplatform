import React, { Component } from 'react'
import { firebaseAuth } from '../config/constants';
import { Link } from 'react-router-dom';
import { base } from '../config/constants';
import { Grid, Row, Col, FormGroup, FormControl, Button, Glyphicon } from 'react-bootstrap';
import { resetPassword } from '../helpers/auth'
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
  en:{
    mySubscriptions1: 'My',
    mySubscriptions2: 'Subscriptions',
    newSubscription1: 'New',
    newSubscription2: 'Subscription',
    accountInformation1: 'Account',
    accountInformation2: 'Information',
    email: 'Email:',
    name: 'Name:',
    phoneNum: 'Phone number:',
    phoneNumTip: '*We may use this number to contact you regarding your account and subscription only.',
    updateAccountButton: 'Update Account',
    resetPWButton: 'Reset Password'
  },
  ch: {
    mySubscriptions1: ' ',
    mySubscriptions2: '我的訂購',
    newSubscription1: ' ',
    newSubscription2: '新訂購',
    accountInformation1: ' ',
    accountInformation2: '帳戶資料',
    email: '電郵:',
    name: '姓名:',
    phoneNum: '電話:',
    phoneNumTip: '*電話號碼只會用作跟您的訂購和帳戶有關的聯絡。',
    updateAccountButton: '更新帳戶資料',
    resetPWButton: '重設密碼'
  }
});

export default class AccountInfo extends Component {

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

  componentDidMount () {
    firebaseAuth().onAuthStateChanged((user) => {
      base.fetch(`users/${user.uid}/info/`, {
        context: this,
        then(data) {
          this.setState({userData: data, loading: false, accountEmail: data.email, accountName: data.name, accountPhone: data.phone, uid: data.uid});
        }
      });
    });
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
        this.setState({ accountInfoMessage: 'Account Information has been saved.'})
      ).catch(err => {
        console.log('An error occured when updating account information.');
        this.setState({ accountInfoMessage: 'An error occured, please try again later.'});
      });
  };
  
  resetPassword = () => {
    resetPassword(this.state.accountEmail)
      .then(() => 
        this.setState({ accountInfoMessage: `Password reset email has been sent to ${this.state.accountEmail}.`})
      ).catch(err => {
        this.setState({ accountInfoMessage: `An error occured, please try again later.`})
      });
  }

  render () {

    var loadingState = this.state.loading;
    var userData = this.state.userData;
    var accountName = this.state.accountName;
    var accountPhone = this.state.accountPhone;

    let content = null;
    if (loadingState) {
      content = <div className="loader"></div>
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
            <div className="sub-list-item">
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                    <div><strong>{strings.email}</strong></div>
                  </Col>
                  <Col sm={8}>
                    <div>{userData.email}</div>
                  </Col>
                </FormGroup>
              </Row>

              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                    <div><strong>{strings.name}</strong></div>
                  </Col>
                  <Col sm={7}>
                    <FormControl className="data-field-update" type="text" value={accountName} onChange={this.handleAccountNameChange}/>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                    <div><strong>{strings.phoneNum}</strong></div>
                  </Col>
                  <Col sm={7}>
                    <FormControl className="data-field-update" type="text" value={accountPhone} onChange={this.handleAccountPhoneChange}/>
                    <div className="subscription-tips">{strings.phoneNumTip}</div>
                  </Col>
                </FormGroup>
              </Row>

              <Row className="show-grid">
                <FormGroup>
                  <Col xs={10} xsPush={2} smPush={5} mdPush={6}>
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
            <Row className="show-grid loggedin-nav">
              <Col xs={4} className="loggedin-nav-button">
                <Link to="/subscriptions" className="nav-selected">
                  <i className="fa fa-tags fa-lg nav-icon"></i>
                  <div className="nav-icon-title">{strings.mySubscriptions1}<br/>{strings.mySubscriptions2}</div>
                </Link>
              </Col>
              <Col xs={4} className="loggedin-nav-button">
                <Link to="/newsubscription">
                  <i className="fa fa-plus fa-lg nav-icon"></i>
                  <div className="nav-icon-title">{strings.newSubscription1}<br/>{strings.newSubscription2}</div>
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