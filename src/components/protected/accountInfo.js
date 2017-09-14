import React, { Component } from 'react'
import { firebaseAuth } from '../config/constants';
import { Link } from 'react-router-dom';
import { base } from '../config/constants';
import { Grid, Row, Col, FormGroup } from 'react-bootstrap';

export default class AccountInfo extends Component {

  constructor() {
    super();
    this.state = {
      userData: {},
      loading: false
    }
  }

  componentDidMount () {
    firebaseAuth().onAuthStateChanged((user) => {
      this.subscriptionDataRef = base.fetch(`users/${user.uid}/info/`, {
        context: this,
        then(data) {
          this.setState({userData: data, loading: false});
        }
      });
    });
  }

  render () {

    var loadingState = this.state.loading;
    var userData = this.state.userData;

    let content = null;
    if (loadingState) {
      content = <div className="loader"></div>
    } else {
      content = (
        <div>
          <Grid>
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
                    <div><strong>User ID:</strong></div>
                  </Col>
                  <Col sm={8}>
                    <div>{userData.uid}</div>
                  </Col>
                </FormGroup>
              </Row>
              {/* <Row className="show-grid">
                <FormGroup>
                  <Col xs={11} xsPush={1} smPush={7} mdPush={8}>
                    <Button bsStyle="" className="button sub-details-update" onClick={() => this.handleSubUpdate(selectRegion, planID, recipientNum, cardMessage)}>Update</Button>
                  </Col>
                </FormGroup>
              </Row> */}
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
                  <div className="horizontal-line"></div>
                  {content}
              </Col>
            </Row>
          </Grid>
        </div>
      )
  }
}