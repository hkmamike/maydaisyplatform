import React, { Component } from 'react'
import * as firebase from 'firebase';
import { firebaseAuth } from '../config/constants';
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel, Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';
import { base } from '../config/constants';

export default class Subscriptions extends Component {

  constructor() {
    super();
    this.state = {
      subscriptionData: {},
      loading: true
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

  render () {

    var data = this.state.subscriptionData;
    var loadingState = this.state.loading;

    var subscriptions = Object.keys(data).map(function(key) {
      return (
        <div key={key}>
          <div>Subscription ID: {data[key].subscriptionID}</div>
          <div>To: {data[key].to}</div>
          <div>Frequency: {data[key].frequency}</div>
          <div>Location Type: {data[key].locationType}</div>
          <div>cost per week: {data[key].planCost}</div>
          <div>Area: {data[key].planArea}</div>
          <div>Address: {data[key].address}</div>
          <div>Card Message: {data[key].cardMessage}</div>
          <div>From: {data[key].from}</div>
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