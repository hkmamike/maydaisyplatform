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

  handleFromChange(e, key) {
    console.log("event object is : ", e);
    console.log("key is ", key);
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
            {/* <Row className="show-grid">
              <Col md={2}><h4>Address:</h4></Col>
              <Col md={6}><input value={data[key].address}></input></Col>
            </Row>
            <Row className="show-grid">
              <Col md={2}><h4>Card Message:</h4></Col>
              <Col md={6}><input value={data[key].cardMessage}></input></Col>
            </Row> */}
            <Row className="show-grid">
              <Col md={2}><h4>From:</h4></Col>
              <Col md={6}><input value={data[key].from} onChange={(e) => _this.handleFromChange(e,key)}></input></Col>
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