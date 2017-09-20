import React, { Component } from 'react'
import { firebaseAuth } from '../config/constants';
import { Link } from 'react-router-dom';
import { base } from '../config/constants';
import { Grid, Row, Col, FormGroup, FormControl, Button, Glyphicon } from 'react-bootstrap';
import { resetPassword } from '../helpers/auth'

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
                    <div><strong>Email:</strong></div>
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
                    <div><strong>Name:</strong></div>
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
                    <div><strong>Phone #:</strong></div>
                  </Col>
                  <Col sm={7}>
                    <FormControl className="data-field-update" type="text" value={accountPhone} onChange={this.handleAccountPhoneChange}/>
                    <div className="subscription-tips">*We may use this number to contact you regarding your account and subscription only.</div>
                  </Col>
                </FormGroup>
              </Row>

              <Row className="show-grid">
                <FormGroup>
                  <Col xs={10} xsPush={2} smPush={5} mdPush={6}>
                    <Button bsStyle="" className="button" onClick={() => this.handleAccountUpdate(accountName, accountPhone)}>Update Account</Button>
                    <Button bsStyle="" className="button" onClick={() => this.resetPassword()}>Reset Password</Button>
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
                <Link to="/subscriptions">
                  <i className="fa fa-tags fa-lg nav-icon"></i>
                  <div className="nav-icon-title">My<br/>Subscriptions</div>
                </Link>
              </Col>
              <Col xs={4} className="loggedin-nav-button">
                <Link to="/newsubscription">
                  <i className="fa fa-plus fa-lg nav-icon"></i>
                  <div className="nav-icon-title">New<br/>Subscription</div>
                </Link>
              </Col>
              <Col xs={4} className="loggedin-nav-button">
                <Link to="/accountinfo" className="nav-selected">
                    <i className="fa fa-user-circle fa-lg nav-icon"></i>
                    <div className="nav-icon-title">Account<br/>Information</div>
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