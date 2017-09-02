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
      newCardMessage: ''
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

  handleCardChange(e, key) {
    this.setState({ newCardMessage: e.target.value });
  }

  handleFromChange(e, key) {
    this.setState({ newFrom: e.target.value });
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
              <FormGroup>
                <Col md={2}></Col>
                <Col md={3}>
                    <div><strong>Subscription ID:</strong></div>
                </Col>
                <Col md={6}>
                  <div>{data[key].stripeSubID}</div>
                </Col>
              </FormGroup>
            </Row>
            <Row className="show-grid">
              <FormGroup>
                <Col md={2}></Col>
                <Col md={3}>
                    <div><strong>To:</strong></div>
                </Col>
                <Col md={6}>
                  <div>{data[key].recipient}</div>
                </Col>
              </FormGroup>
            </Row>
            <Row className="show-grid">
              <FormGroup>
                <Col md={2}></Col>
                <Col md={3}>
                    <div><strong>Frequency:</strong></div>
                </Col>
                <Col md={6}>
                  <div>{data[key].deliveryDay}</div>
                </Col>
              </FormGroup>
            </Row>
            <Row className="show-grid">
              <FormGroup>
                <Col md={2}></Col>
                <Col md={3}>
                    <div><strong>Cost per week:</strong></div>
                </Col>
                <Col md={6}>
                  <div>{data[key].grandTotalPerWeek/100}</div>
                </Col>
              </FormGroup>
            </Row>
            <Row className="show-grid">
              <FormGroup>
                <Col md={2}></Col>
                <Col md={3}>
                  <div><strong>Address:</strong></div>
                </Col>
                <Col md={6}>
                  <div>{data[key].address}</div>
                  <div>*To change delivery address, please re-subscribe.</div>
                </Col>
              </FormGroup>
            </Row>
            <Row className="show-grid">
              <FormGroup>
                <Col md={2}></Col>
                <Col md={3}>
                  <div><strong>Card Message:</strong></div>
                </Col>
                <Col md={6}>
                  <FormControl componentClass="textarea" className="cardMessage" placeholder={data[key].cardMessage} onChange={(e) => _this.handleCardChange(e,key)}/>
                </Col>
              </FormGroup>
            </Row>
            <Row className="show-grid">
              <FormGroup>
                <Col md={2}></Col>
                <Col md={3}>
                  <div><strong>From:</strong></div>
                </Col>
                <Col md={6}>
                  <FormControl type="text" placeholder={data[key].senderName} onChange={(e) => _this.handleFromChange(e,key)}/>
                </Col>
              </FormGroup>
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
                <div className="horizontal-line"></div>
                {content}
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}