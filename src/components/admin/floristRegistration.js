import React, { Component } from 'react'
import { firebaseAuth } from '../config/constants';
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, Grid, Row, Col, Button, Glyphicon} from 'react-bootstrap';
import { base } from '../config/constants';

class RegistrationDetails extends React.Component {
  
  constructor() {
      super();
      this.handleBack = this.handleBack.bind(this);
      this.state = {
      loading: true,
      registrationDetails: {},
      approvedShopName: '',
      approvedShopCode: '',
      floristType: ''
      }
  }

  componentWillMount () {
      this.fireBaseListenerForRegistrationDetails = firebaseAuth().onAuthStateChanged((user) => {
          base.fetch(`floristRegistration/${this.props.selectedRegistration}`, {
              context: this,
              then(data) {
                  this.setState({
                      registrationDetails: data, 
                      loading: false,
                  });
              }
          });
      });
  }
  componentWillUnmount () {
      //returns the unsubscribe function
      this.fireBaseListenerForRegistrationDetails && this.fireBaseListenerForRegistrationDetails();
  }
  handleBack = () => {
      this.props.onHandleBack();
  }
  handleApprovedShopCodeChange = (e) => {
    this.setState({ approvedShopCode: e.target.value });
  }
  handleApprovedShopNameChange = (e) => {
    this.setState({ approvedShopName: e.target.value });
  }
  handleFloristTypeChange = (e) => {
    this.setState({ floristType: e.target.value });
  }
  handleApprove = () => {
    this.props.onHandleRegistrationApproval(
      this.state.registrationDetails.date, 
      this.state.registrationDetails.firstName, 
      this.state.registrationDetails.lastName, 
      this.state.registrationDetails.phone, 
      this.state.approvedShopName, 
      this.state.approvedShopCode,
      this.state.registrationDetails.user,
      this.state.registrationDetails.email,
      this.state.floristType,
    );
  }

  render() {
    var loadingState = this.state.loading;
    let content = null;

    if (loadingState) {
      content = <div className="loader"></div>
    } else {
      content = (
        <div>
          <Grid>
            { this.props.infoMessage &&
              <div className="alert alert-success update-message" role="alert">
                <Glyphicon glyph="exclamation-sign" className="icons"/>&nbsp;{this.props.infoMessage} 
              </div>
            }
            <div className="registration-details">
              
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col xs={12} sm={3}>
                    <div><strong>Status:</strong></div>
                  </Col>
                  <Col xs={8} sm={6} md={4}>
                    <div>{this.state.registrationDetails.status}</div>
                  </Col>
                  <Col xs={2} sm={2} md={3}></Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col xs={12} sm={3}>
                    <div><strong>Requested shopName:</strong></div>
                  </Col>
                  <Col xs={8} sm={6} md={4}>
                    <div>{this.state.registrationDetails.shopName}</div>
                  </Col>
                  <Col xs={2} sm={2} md={3}></Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col xs={12} sm={3}>
                    <div><strong>First Name:</strong></div>
                  </Col>
                  <Col xs={8} sm={6} md={4}>
                    <div>{this.state.registrationDetails.firstName}</div>
                  </Col>
                  <Col xs={2} sm={2} md={3}></Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col xs={12} sm={3}>
                    <div><strong>Last Name:</strong></div>
                  </Col>
                  <Col xs={8} sm={6} md={4}>
                    <div>{this.state.registrationDetails.lastName}</div>
                  </Col>
                  <Col xs={2} sm={2} md={3}></Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col xs={12} sm={3}>
                    <div><strong>Florist's phone:</strong></div>
                  </Col>
                  <Col xs={8} sm={6} md={4}>
                    <div>{this.state.registrationDetails.phone}</div>
                  </Col>
                  <Col xs={2} sm={2} md={3}></Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col xs={12} sm={3}>
                    <div><strong>Shop's Website:</strong></div>
                  </Col>
                  <Col xs={8} sm={6} md={4}>
                    <div>{this.state.registrationDetails.shopWeb}</div>
                  </Col>
                  <Col xs={2} sm={2} md={3}></Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col xs={12} sm={3}>
                    <div><strong>Source:</strong></div>
                  </Col>
                  <Col xs={8} sm={6} md={4}>
                    <div>{this.state.registrationDetails.source}</div>
                  </Col>
                  <Col xs={2} sm={2} md={3}></Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col xs={12} sm={3}>
                      <div><strong>Approved Shop: </strong></div>
                  </Col>
                  <Col xs={8} sm={6} md={4}>
                    <FormControl className="data-field-update" type="text" value={this.state.approvedShopName} onChange={this.handleApprovedShopNameChange}/>
                  </Col>
                  <Col xs={2} sm={2} md={3}></Col>
                </FormGroup>
              </Row>

              <Row className="show-grid">
                <FormGroup>
                <Col sm={1} md={2}></Col>
                  <Col xs={12} sm={3}>
                      <div><strong>Shop Code: </strong></div>
                  </Col>
                  <Col xs={8} sm={6} md={4}>
                    <FormControl className="data-field-update" type="text" value={this.state.approvedShopCode} onChange={this.handleApprovedShopCodeChange}/>
                  </Col>
                  <Col xs={2} sm={2} md={3}></Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col xs={12} sm={3}>
                      <div><strong>Florist Type: </strong></div>
                  </Col>
                  <Col xs={8} sm={6} md={4}>
                    <FormControl className="data-field-update" type="text" value={this.state.floristType} onChange={this.handleFloristTypeChange}/>
                  </Col>
                  <Col xs={2} sm={2} md={3}></Col>
                </FormGroup>
              </Row>
            
              <Row className="show-grid">
                <FormGroup>
                  <Col xs={1} sm={5}>
                  </Col>
                  <Col xs={10} sm={4}>
                    <Button bsStyle="" className="button button-back" onClick={() => this.handleBack()}>Back</Button>
                    {this.state.registrationDetails.status === 'submitted' && 
                      <Button bsStyle="" className="button button-update" onClick={() => this.handleApprove()}>Aprove</Button>
                    }
                  </Col>
                </FormGroup>
              </Row>
            </div>
          </Grid>
        </div>
      )
    }
    return (
      <div>{content}</div>
    )
  }
}

export default class FloristRegistration extends Component {
    
      constructor() {
        super();
        this.state = {
          registrationData: {},
          loading: true,
          registrationDetailsStatus: 0
        }
      }

      updateList = () => {
        base.fetch(`floristRegistration/`, {
          context: this,
          then(data) {
            this.setState({registrationData: data, loading: false});
          }
        });
      }

      componentDidMount () {
        window.scrollTo(0, 0);
        this.fireBaseListenerForRegistration = firebaseAuth().onAuthStateChanged((user) => {
          this.updateList();
        });
      }
      componentWillUnmount () {
        //returns the unsubscribe function
        this.fireBaseListenerForRegistration && this.fireBaseListenerForRegistration();
      }
      handleRegistrationApproval= (date, firstName, lastName, phone, approvedShopName, approvedShopCode, user, email, floristType) => {
        base.update(`floristRegistration/${user}`, {
          data: {
            status: 'approved'
          }
        });
        base.update(`users/${user}/info`, {
          data: {
            isDesigner : 'y',
            shop: approvedShopCode,
          }
        });
        base.update(`florists/${approvedShopCode}`, {
          data: {
            city: 'HK',
            currency: 'HKD',
            id: approvedShopCode,
            deliveryAreas : ['HK_CentralWestern'],
            deliveryFee: {
              HK_CentralWestern: -1,
              HK_Eastern: -1,
              HK_Southern: -1,
              HK_WanChai: -1,
              KL_KowloonCity: -1,
              KL_KwunTong: -1,
              KL_ShamShuiPo: -1,
              KL_WongTaiSin: -1,
              KL_YauTsimMong: -1,
              NT_Islands: -1,
              NT_KwaiTsing: -1,
              NT_North: -1,
              NT_SaiKung: -1,
              NT_ShaTin: -1,
              NT_TaiPo: -1,
              NT_TsuenWan: -1,
              NT_TuenMun: -1,
              NT_YuenLong: -1,
              specialPickUpLocation: -1
            },
            email: email, 
            name: approvedShopName,
            uid: user,
            address: '',
            deliveryLeadTime: 1,
            description: '',
            facebook: '',
            instagram: '',
            profilePic: '',
            phone: phone,
            floristType: floristType,
            promoCodeA: '',
            promoCodeB: '',
            deliveryInfo: '',
            specialPickUp: '',
          }
        }).then(() => 
        this.setState({ InfoMessage: 'Approved'}, () => setTimeout(() => { 
          this.setState({registrationDetailsStatus:0});
          this.updateList();
        }, 1000))
      )
      }
      handleChooseRegistration(chosenKey) {
        console.log('chosen key is', chosenKey);
        this.setState({registrationDetailsStatus: 1, selectedRegistration: chosenKey}, () => window.scrollTo(0, 0));
      }
      handleBack = () => {
        this.setState({registrationDetailsStatus: 0}, () => window.scrollTo(0, 0));
      }
    
      render () {
    
        var data = this.state.registrationData;
        var loadingState = this.state.loading;
        var registrationDetailsStatus = this.state.registrationDetailsStatus;
        var registrations;
        var registrationsHeader;
    
        // console.log('data check: ', Object.keys(data).length);
        if (Object.keys(data).length===0) {
          registrationsHeader = null;
          registrations = (
            <div className="no-sub-section">            
              <div className="center-text">No Registration</div>
            </div>
          )
        } else {
          registrationsHeader = (
            <Grid>
              <Row className="registration-list-titles">
                <Col xs={3}>Shop</Col>
                <Col xs={3}>Website</Col>
                <Col xs={3}>Phone</Col>
                <Col xs={3}>Status</Col>
              </Row>
            </Grid>
          )
          registrations = Object.keys(data).map(function(key) {
            var chosenKey = data[key].user;
            return (
              <div key={key}>
                <Grid>
                  <div className="registration-list-item" onClick={() => this.handleChooseRegistration(chosenKey)}>
                    <Row className="show-grid">
                        <Col xs={3}>
                          <div>{data[key].shopName}</div>
                        </Col>
                        <Col xs={3}>
                          <div>{data[key].shopWeb}</div>
                        </Col>
                        <Col xs={3}>
                          <div>{data[key].phone}</div>
                        </Col>
                        <Col xs={3}>
                          <div>{data[key].status}</div>
                        </Col>
                    </Row>
                  </div>
                </Grid>
              </div>
            )
          }, this)
        }
      
        let content = null;
        if (loadingState) {
          content = (
            <div>
              <div className="horizontal-line"></div>
              <div className="loader"></div>
            </div>
          )
        } else if (registrationDetailsStatus===0){
          content = (
            <div>
              <Grid>
                <Row className="show-grid loggedin-flow">
                  <div className="horizontal-line"></div>
                  <Col xs={12}>
                      <div className="flow-selected">All Registrations</div>
                        <i className="fa fa-chevron-right"></i>
                      <div>Details</div>
                  </Col>
                  <div className="horizontal-line"></div>
                </Row>
              </Grid>
              {registrationsHeader}
              {registrations.reverse()}
            </div>
          )
        } else if (registrationDetailsStatus===1) {
          content = (
            <div>
              <Grid>
                <Row className="show-grid loggedin-flow">
                  <div className="horizontal-line"></div>
                  <Col xs={12}>
                      <div className='flow-nav' onClick={() => this.setState({registrationDetailsStatus: 0}, () => window.scrollTo(0, 0))}>All Registrations</div>
                        <i className="fa fa-chevron-right"></i>
                      <div className="flow-selected">Details</div>
                  </Col>
                  <div className="horizontal-line"></div>
                </Row>
              </Grid>
              <RegistrationDetails
                selectedRegistration={this.state.selectedRegistration} 
                onHandleBack={this.handleBack}
                onHandleRegistrationApproval={this.handleRegistrationApproval}
                infoMessage={this.state.infoMessage}
              />
            </div>
          )
        }

        var header = (
          <Row className="show-grid loggedin-nav">
            <Col xs={4} className="loggedin-nav-button">
            <Link to="/auth/admin-registration" className="nav-selected">
                <i className="fa fa-book fa-lg nav-icon"></i>
                <div className="nav-icon-title">Registration</div>
            </Link>
            </Col>
            <Col xs={4} className="loggedin-nav-button">
            <Link to="/auth/admin-florists">
                <i className="fa fa-star fa-lg nav-icon"></i>
                <div className="nav-icon-title">Dashboard</div>
            </Link>
            </Col>
          </Row>
        )
    
        return (
          <div className="loggedin-background">
            <Grid>
              <Row className="show-grid loggedin-margin-box">
                <Col className="loggedin-content">
                  {header}
                  {content}
                </Col>
              </Row>
            </Grid>
          </div>
        )
      }
}