import React, { Component } from 'react'
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel, Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';

export default class Subscriptions extends Component {

  constructor() {
    super();
    this.state = {
      planName: null
    }
  }

  componentDidMount () {
    const planNameRef = firebase.database().ref().child('react/speed/');
    planNameRef.on('value', snap => {
      this.setState({
        planName: snap.val()
      });
    });
  } 

  render () {
    return (
      <div className="loggedin-background">
        <Grid>
          <Row className="show-grid">
            <Col md={5} className="loggedin-content">
              <div className="loggedin-margin-box">
                <h2 className="login-title"><strong>Subscriptions</strong></h2>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}