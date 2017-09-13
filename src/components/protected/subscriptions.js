import React, { Component } from 'react'
import { firebaseAuth } from '../config/constants';
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, Grid, Row, Col, Button } from 'react-bootstrap';
import { base } from '../config/constants';

export default class Subscriptions extends Component {

  constructor() {
    super();
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleChooseSub = this.handleChooseSub.bind(this);
    this.state = {
      subscriptionData: {},
      loading: true,
      newFrom: '',
      newCardMessage: '',
      subDetailsStatus: 0,
      selectedSub: ''
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

  handleChooseSub(chosenKey) {
    this.setState({subDetailsStatus: 1, selectedSub: chosenKey});
  }

  handleBack() {
    this.setState({subDetailsStatus: 0});
  }

  handleSubUpdate() {
    console.log('submitting update for subscription');
  }

  render () {

    var data = this.state.subscriptionData;
    var selectedSub = this.selectedSub;
    var loadingState = this.state.loading;
    var subDetailsStatus = this.state.subDetailsStatus;
    var _this = this;

    var subscriptions = Object.keys(data).map(function(key) {
      var chosenKey = data[key].stripeSubID;
      return (
        <div key={key}>
          <Grid>
            <div className="sub-list-item">
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>Sub ID:</strong></div>
                  </Col>
                  <Col sm={3}>
                    <div>{data[key].stripeSubID}</div>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>To:</strong></div>
                  </Col>
                  <Col sm={3}>
                    <div>{data[key].recipient}</div>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  {/* <Col xs={} sm={5}></Col> */}
                  <Col xs={1} xsOffset={6} smOffset={9} mdOffset={10}>
                    <Button bsStyle="" className="button sub-details-button" onClick={() => this.handleChooseSub(chosenKey)}>Details</Button>
                  </Col>
                </FormGroup>
              </Row>
            </div>
          </Grid>
        </div>
      )
    }, this)

    var subscriptionDetails = (
      <div>
        <Grid>
          <div className="sub-list-item">
            <Row className="show-grid">
              <FormGroup>
                <Col sm={1}></Col>
                <Col sm={3}>
                    <div><strong>Sub ID:</strong></div>
                </Col>
                <Col sm={3}>
                  <div></div>
                </Col>
              </FormGroup>
            </Row>
            <Row className="show-grid">
              <FormGroup>
                <Col sm={1}></Col>
                <Col sm={3}>
                    <div><strong>To:</strong></div>
                </Col>
                <Col sm={3}>
                  <div></div>
                </Col>
              </FormGroup>
            </Row>
            <Row className="show-grid">
              <FormGroup>
                <Col xs={11} xsPush={1} smPush={7} mdPush={8}>
                  <Button bsStyle="" className="button sub-details-back" onClick={() => this.handleBack()}>Back</Button>
                  <Button bsStyle="" className="button sub-details-update" onClick={() => this.handleSubUpdate()}>Update</Button>
                </Col>
              </FormGroup>
            </Row>
          </div>
        </Grid>
      </div>
    )

    let content = null;
    if (loadingState) {
      content = <div>Loading...</div>
    } else if (subDetailsStatus===0){
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
    } else if (subDetailsStatus===1) {
      content = (
        <div>
          <Grid>
            <Row className="show-grid loggedin-flow">
              <div className="horizontal-line"></div>
              <Col xs={12}>
                  <div>Subscriptions List</div>
                    <i className="fa fa-chevron-right"></i>
                  <div className="flow-selected">Details & Update</div>
              </Col>
              <div className="horizontal-line"></div>
            </Row>
          </Grid>
          {subscriptionDetails}
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