import React, { Component } from 'react'
import * as firebase from 'firebase';
import { firebaseAuth } from '../config/constants';
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel, Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';
import { base } from '../config/constants';

export default class Subscriptions extends Component {

  constructor() {
    super();
    this.handleFromChange = this.handleFromChange.bind(this);
    this.state = {
      subscriptionData: {},
      loading: true,
      newFrom: '',
      newCardMessage: '',
      newAddress: ''
    }
  }

  componentDidMount () {
    firebaseAuth().onAuthStateChanged((user) => {
      this.subscriptionDataRef = base.fetch(`users/${user.uid}/subscriptions/`, {
        context: this,
        then(data) {
          this.setState({subscriptionData: data, loading: false});
        }
      });
    });
  }

  handleAddressChange(e, key) {
    this.setState({ email: e.target.value });
  }

  handleCardChange(e, key) {
    this.setState({ email: e.target.value });
  }

  handleFromChange(e, key) {
    this.setState({ email: e.target.value });
  }

  render () {

    var data = this.state.subscriptionData;
    var loadingState = this.state.loading;
    var _this = this;

    var subscriptions = Object.keys(data).map(function(key) {
      return (
        <div key={key}>
          <Grid>
            <Row className="show-grid">
              <Col md={2}><h4>Subscription ID:</h4></Col>
              <Col md={6}><div>{data[key].subscriptionID}</div></Col>
            </Row>
            <Row className="show-grid">
              <Col md={2}><h4>Send To:</h4></Col>
              <Col md={6}><div>{data[key].to}</div></Col>
            </Row>
            <Row className="show-grid">
              <Col md={2}><h4>Frequency:</h4></Col>
              <Col md={6}><div>{data[key].frequency}</div></Col>
            </Row>
            <Row className="show-grid">
              <Col md={2}><h4>Location Type:</h4></Col>
              <Col md={6}><div>{data[key].locationType}</div></Col>
            </Row>
            <Row className="show-grid">
              <Col md={2}><h4>Cost per week:</h4></Col>
              <Col md={6}><div>{data[key].planCost}</div></Col>
            </Row>
            <Row className="show-grid">
              <Col md={2}><h4>Area:</h4></Col>
              <Col md={6}><div>{data[key].planArea}</div></Col>
            </Row>
            <Row className="show-grid">
              <Col md={2}><h4>Address:</h4></Col>
              <Col md={6}><input placeholder={data[key].address} onChange={(e) => _this.handleAddressChange(e,key)}></input></Col>
            </Row>
            <Row className="show-grid">
              <Col md={2}><h4>Card Message:</h4></Col>
              <Col md={6}><input placeholder={data[key].cardMessage} onChange={(e) => _this.handleCardChange(e,key)}></input></Col>
            </Row>
            <Row className="show-grid">
              <Col md={2}><h4>From:</h4></Col>
              <Col md={6}><input placeholder={data[key].from} onChange={(e) => _this.handleFromChange(e,key)}></input></Col>
            </Row>
          </Grid>
        </div>
      )
    })

    let content = null;
    if (loadingState) {
      content = <div>Loading...</div>
    } else {
      content = subscriptions
    }

    return (
      <div className="loggedin-background">
        <Grid>
          <Row className="show-grid loggedin-nav">
            <Col xs={4} className="loggedin-nav-button">
              <Link to="/subscriptions" className="nav-selected">
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
              <Link to="/accountinfo">
                <i className="fa fa-user-circle fa-lg nav-icon"></i>
                <div className="nav-icon-title">Account<br/>Information</div>
              </Link>
            </Col>
          </Row>
          <Row className="show-grid loggedin-margin-box">
            <Col className="loggedin-content">
                <h2 className="login-title"><strong>Subscription</strong></h2>
                {content}
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}