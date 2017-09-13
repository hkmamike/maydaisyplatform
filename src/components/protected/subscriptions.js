import React, { Component } from 'react'
import { firebaseAuth } from '../config/constants';
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, Grid, Row, Col } from 'react-bootstrap';
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

  handleSubmit() {};

  render () {

    var data = this.state.subscriptionData;
    var loadingState = this.state.loading;
    var _this = this;

    var subscriptions = Object.keys(data).map(function(key) {
      return (
        <div key={key}>
          <Grid>
            <div className="sub-list-item">
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
            </div>
          </Grid>
        </div>
      )
    })

    let content = null;
    if (loadingState) {
      content = <div>Loading...</div>
    } else {
      content = (
        <div>
          <Grid>
            <Row className="show-grid loggedin-flow">
              <div className="horizontal-line"></div>
              <Col xs={12}>
                  <div className="flow-selected">Subscriptions List</div>
                    <i className="fa fa-chevron-right"></i>
                  <div>Details & Update</div>
              </Col>
              <div className="horizontal-line"></div>
            </Row>
          </Grid>
          {subscriptions}
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
                {content}
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}