import React, { Component } from 'react'
import * as firebase from 'firebase';
import { firebaseAuth } from '../config/constants';
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel, Grid, Row, Col, Button, Glyphicon, DropdownButton, MenuItem } from 'react-bootstrap';
import { base } from '../config/constants';

export default class NewSubscription extends Component {

  constructor() {
    super();
    this.state = {
      subscriptionData: {},
      loading: true,
      subscriptionStep: 1,
      newFrom: '',
      newCardMessage: '',
      newAddress: ''
    }
  }

  handleSelect = (eventKey) => {
    this.props.onRegionSelection(eventKey);
  }


  componentDidMount () {
    this.setState({loading: false});
    console.log("select region is : ", this.props.selectRegion);
    }

  render () {

    var data = this.state.subscriptionData;
    var loadingState = this.state.loading;
    var subscriptionStep = this.state.subscriptionStep;
    var selectRegion = this.props.selectRegion;
    var _this = this;

    let content = null;
    if (loadingState) {
        content = <div>Loading...</div>
    } else if (subscriptionStep==1){
        content = (
            <div>
                <h2 className="login-title"><strong>Choose Plan</strong></h2>

                    <DropdownButton title={selectRegion} className="subscription-region-select" id="subscriptioin-regionselect-dropdown" onSelect={this.handleSelect}>
                        <MenuItem eventKey="HK - Admiralty">HK - Admiralty</MenuItem>
                        <MenuItem eventKey="HK - Central">HK - Central</MenuItem>
                        <MenuItem eventKey="HK - Chai Wan">HK - Chai Wan</MenuItem>
                    </DropdownButton>
                <Button bsStyle="" className="button" onClick={() => this.setState({subscriptionStep: 2})}>Next</Button>
            </div>
        )
    } else if (subscriptionStep==2){
        content = (
            <div>
                <h2 className="login-title"><strong>Card Message</strong></h2>
                <Button bsStyle="" className="button" onClick={() => this.setState({subscriptionStep: 3})}>Next</Button>
            </div>
        )
    } else if (subscriptionStep==3){
        content = (
            <div>
                <h2 className="login-title"><strong>Delivery Details</strong></h2>
                <Button bsStyle="" className="button" onClick={() => this.setState({subscriptionStep: 4})}>Next</Button>
            </div>
        )
    } else if (subscriptionStep==4){
        content = (
            <div>
                <h2 className="login-title"><strong>Payment</strong></h2>
                <Button bsStyle="" className="button" onClick={() => this.setState({subscriptionStep: 5})}>Next</Button>
            </div>
        )
    } else if (subscriptionStep==5){
        content = (
            <div>Review & Confirm</div>
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
                <Link to="/newsubscription" className="nav-selected">
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
                  {content}
              </Col>
            </Row>
          </Grid>
        </div>
      )
  }
}