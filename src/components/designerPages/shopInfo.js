import React, { Component } from 'react'
import { firebaseAuth } from '../config/constants';
import { Link, Route } from 'react-router-dom';
import { base } from '../config/constants';
import { Grid, Row, Col, FormGroup, FormControl, Button, Glyphicon, Modal, DropdownButton, MenuItem } from 'react-bootstrap';
import { resetPassword } from '../helpers/auth'
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
  en:{
    ordersDashboard1: 'Orders',
    ordersDashboard2: 'Dashboard',
    designs1: "Shop's",
    designs2: 'Designs',
    shopInformation1: 'Shop',
    shopInformation2: 'Information',


    address: 'Address:',
    description: 'Description:',
    leadTime: 'Lead Time (days):',
    deliveryRegions: 'Delivery Regions:',
    openDays: 'Open on:',

    open: 'open',
    close: 'close',

    openDaysSettingsTitle: 'Opening Days Settings',
    openDaysSettingsText1: 'MayDaisy is a hobbyist and independent artists friendly community. We understand that you have other responsibilities in life and may not want to open shop on everyday.',
    openDaysSettingsText2: 'Here, you can choose which days to allow customers to place orders on. ',
    
    backButton: 'Back',
    updateButton: 'Update',

    shopInfoUpdated: 'shop information has been updated',
    errorOccured: 'An error occured when updating shop information',

    n: 'not delivering',
    free: 'free delivery',
    fifty: '$50',
    hundred: '$100',
    hundredfifty: '$150'

  },
  ch: {}
});

const ButtonToPersonalAccount = ({ title, history }) => (
  <Button bsStyle="" className="no-sub-button" onClick={() => history.push('/orderhistory')}>Go to Personal Account</Button>
);

class OpenDays extends React.Component {
  constructor() {
    super();
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.state = {
      showModal: false,
      openDaysDetails: {},
      mondayFlag: 'open',
      tuesdayFlag: 'open',
      wednesdayFlag: 'open',
      thursdayFlag: 'open',
      fridayFlag: 'open',
      saturdayFlag: 'open',
      sundayFlag: 'open',
    }
  }

  fetchData = () => {
    base.fetch(`florists/${this.props.designerCode}/deliveryBlockedDays`, {
      context: this,
      then(data) {
          var mondayFlag = 'open';
          var tuesdayFlag = 'open';
          var wednesdayFlag = 'open';
          var thursdayFlag = 'open';
          var fridayFlag = 'open';
          var saturdayFlag = 'open';
          var sundayFlag = 'open';

          if (data.length > 0) {
            if (data.indexOf(1)> -1) {
              mondayFlag='close'
            }
            if (data.indexOf(2)> -1) {
              tuesdayFlag='close'
            }
            if (data.indexOf(3)> -1) {
              wednesdayFlag='close'
            }
            if (data.indexOf(4)> -1) {
              thursdayFlag='close'
            }
            if (data.indexOf(5)> -1) {
              fridayFlag='close'
            }
            if (data.indexOf(6)> -1) {
              saturdayFlag='close'
            }
            if (data.indexOf(7)> -1) {
              sundayFlag='close'
            }
          }

          this.setState({
            mondayFlag: mondayFlag, 
            tuesdayFlag: tuesdayFlag, 
            wednesdayFlag: wednesdayFlag, 
            thursdayFlag: thursdayFlag,
            fridayFlag: fridayFlag,
            saturdayFlag: saturdayFlag,
            sundayFlag: sundayFlag
          });
      }
    });
  }
  
  close() {
    this.setState({showModal: false});
    //force states to update since it does not dismount on close. It cases content to flash if placed on open()
    this.fetchData();
  }
  open() {
    this.setState({showModal: true});
  }
  handleSettingChange = (day, eventKey) => {
    switch (day) {
      case 1: 
        this.setState({mondayFlag: eventKey});
        break
      case 2: 
        this.setState({tuesdayFlag: eventKey});
        break
      case 3: 
        this.setState({wednesdayFlag: eventKey});
        break
      case 4: 
        this.setState({thursdayFlag: eventKey});
        break
      case 5: 
        this.setState({fridayFlag: eventKey});
        break
      case 6: 
        this.setState({saturdayFlag: eventKey});
        break
      case 7: 
        this.setState({sundayFlag: eventKey});
        break
    }
  }
  componentWillMount () {
    this.fetchData();
  }

  handleOpenDaysUpdate = () => {
    var blockedDaysArray = [];
    if (this.state.mondayFlag === 'close') {
      blockedDaysArray.push(1);
    }
    if (this.state.tuesdayFlag === 'close') {
      blockedDaysArray.push(2);
    }
    if (this.state.wednesdayFlag === 'close') {
      blockedDaysArray.push(3);
    }
    if (this.state.thursdayFlag === 'close') {
      blockedDaysArray.push(4);
    }
    if (this.state.fridayFlag === 'close') {
      blockedDaysArray.push(5);
    }
    if (this.state.saturdayFlag === 'close') {
      blockedDaysArray.push(6);
    }
    if (this.state.fridayFlag === 'close') {
      blockedDaysArray.push(7);
    }
    base.post(`florists/${this.props.designerCode}/deliveryBlockedDays`, {
      data: blockedDaysArray
    }).then(() => 
      this.close()
    ).catch(err => {
      console.log('An error occured when updating shop information.');
    });
  }

  render() {
      return (
          <div>
              <Button bsStyle="" className="sub-details-unsub"onClick={this.open}>Settings</Button>
              <Modal show={this.state.showModal} onHide={this.close}>

                  <div>
                      <Modal.Header closeButton>
                      <Modal.Title><strong>{strings.openDaysSettingsTitle}</strong></Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <h4>{strings.openDaysSettingsText1}</h4>
                          <p>{strings.openDaysSettingsText2}</p>
                          <Grid>
                            <div className="sub-list-item">
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={3}>
                                    Monday:
                                  </Col>
                                  <Col sm={3}>
                                    <DropdownButton title={strings[this.state.mondayFlag]} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={(eventKey)=>this.handleSettingChange(1,eventKey)}>
                                      <MenuItem eventKey="open">{strings.open}</MenuItem>
                                      <MenuItem eventKey="close">{strings.close}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={3}>
                                    Tuesday:
                                  </Col>
                                  <Col sm={3}>
                                    <DropdownButton title={strings[this.state.tuesdayFlag]} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={(eventKey)=>this.handleSettingChange(2,eventKey)}>
                                      <MenuItem eventKey="open">{strings.open}</MenuItem>
                                      <MenuItem eventKey="close">{strings.close}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={3}>
                                    Wednesday:
                                  </Col>
                                  <Col sm={3}>
                                    <DropdownButton title={strings[this.state.wednesdayFlag]} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={(eventKey)=>this.handleSettingChange(3,eventKey)}>
                                      <MenuItem eventKey="open">{strings.open}</MenuItem>
                                      <MenuItem eventKey="close">{strings.close}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={3}>
                                    Thursday:
                                  </Col>
                                  <Col sm={3}>
                                    <DropdownButton title={strings[this.state.thursdayFlag]} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={(eventKey)=>this.handleSettingChange(4,eventKey)}>
                                      <MenuItem eventKey="open">{strings.open}</MenuItem>
                                      <MenuItem eventKey="close">{strings.close}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={3}>
                                    Friday:
                                  </Col>
                                  <Col sm={3}>
                                    <DropdownButton title={strings[this.state.fridayFlag]} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={(eventKey)=>this.handleSettingChange(5,eventKey)}>
                                      <MenuItem eventKey="open">{strings.open}</MenuItem>
                                      <MenuItem eventKey="close">{strings.close}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={3}>
                                    Saturday:
                                  </Col>
                                  <Col sm={3}>
                                    <DropdownButton title={strings[this.state.saturdayFlag]} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={(eventKey)=>this.handleSettingChange(6,eventKey)}>
                                      <MenuItem eventKey="open">{strings.open}</MenuItem>
                                      <MenuItem eventKey="close">{strings.close}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={3}>
                                    Sunday:
                                  </Col>
                                  <Col sm={3}>
                                    <DropdownButton title={strings[this.state.sundayFlag]} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={(eventKey)=>this.handleSettingChange(7,eventKey)}>
                                      <MenuItem eventKey="open">{strings.open}</MenuItem>
                                      <MenuItem eventKey="close">{strings.close}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                            </div>
                          </Grid>
                      </Modal.Body>
                  </div>
                  <Modal.Footer>
                  <Button bsStyle="" className="button button-back" onClick={this.close}>{strings.backButton}</Button>
                  <Button bsStyle="" className="button button-back" onClick={this.handleOpenDaysUpdate}>{strings.updateButton}</Button>
                  </Modal.Footer>
              </Modal>
          </div>
      )
  }
}

class DeliverySettings extends React.Component {
  constructor() {
    super();
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.state = {
      showModal: false,
      deliveryDetails: {},
    }
  }
  
  close() {
    this.setState({showModal: false});

    //force states to update since it does not dismount on close. It cases content to flash if placed on open()
    base.fetch(`florists/${this.props.designerCode}/deliveryFee`, {
      context: this,
      then(data) {
          this.setState({deliveryDetails: data});
      }
    });
    
  }
  open() {
    this.setState({showModal: true});
  }
  handleSettingChange = (key, eventKey) => {
    var newSetting = this.state.deliveryDetails;
    var feeValue;
    if (eventKey === 'n')  {
      feeValue=-1;
    } else if (eventKey === 'free') {
      feeValue=0;
    } else if (eventKey === 'fifty') {
      feeValue=50;
    } else if (eventKey === 'hundred') {
      feeValue=100;
    } else if (eventKey === 'hundredfifty') {
      feeValue=150;
    }
    newSetting[key] = feeValue;
    this.setState({deliveryDetails: newSetting});
  }

  handleShopInfoUpdate = () => {
    var deliveryDetails = this.state.deliveryDetails;
    var availableRegions = [];
    for (var region in deliveryDetails) {
      if (deliveryDetails[region] !== -1) {
        availableRegions.push(region);
      }
    }
    base.update(`florists/${this.props.designerCode}/deliveryFee`, {
      data: deliveryDetails
    }).then(() =>base.post(`florists/${this.props.designerCode}/deliveryAreas`, {
      data: availableRegions
    })).then(() => {
      this.close();
    }).catch(err => {
      console.log('An error occured when updating account information.');
    });
  }

  componentWillMount () {
    base.fetch(`florists/${this.props.designerCode}/deliveryFee`, {
        context: this,
        then(data) {
            this.setState({deliveryDetails: data});
        }
    });
  }

  render() {

    var data = this.state.deliveryDetails;
    var deliverySettings;

    // console.log('data check: ', Object.keys(data).length);
    if (Object.keys(data).length===0) {
      deliverySettings = (
        <div></div>
      )
    } else {
      deliverySettings = Object.keys(data).map(function(key) {
        var fee = this.state.deliveryDetails[key];
        var refKey;
        if (fee === -1)  {
          refKey="n"
        } else if (fee === 0) {
          refKey="free"
        } else if (fee === 50) {
          refKey="fifty"
        } else if (fee === 100) {
          refKey="hundred"
        } else if (fee === 150) {
          refKey="hundredfifty"
        }

        return (
          <div key={key}>
            <Grid>
              <div className="sub-list-item">
                <Row className="show-grid">
                  <FormGroup>
                    <Col sm={1}></Col>
                    <Col sm={3}>
                      {key}
                    </Col>
                    <Col sm={3}>
                      <DropdownButton title={strings[refKey]} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={(eventKey)=>this.handleSettingChange(key,eventKey)}>
                        <MenuItem eventKey="n">{strings.n}</MenuItem>
                        <MenuItem eventKey="free">{strings.free}</MenuItem>
                        <MenuItem eventKey="fifty">{strings.fifty}</MenuItem>
                        <MenuItem eventKey="hundred">{strings.hundred}</MenuItem>
                        <MenuItem eventKey="hundredfifty">{strings.hundredfifty}</MenuItem>
                      </DropdownButton>
                    </Col>
                  </FormGroup>
                </Row>
              </div>
            </Grid>
          </div>
        )
      }, this)
    }

      return (
          <div>
              <Button bsStyle="" className="sub-details-unsub"onClick={this.open}>Settings</Button>
              <Modal show={this.state.showModal} onHide={this.close}>

                  <div>
                      <Modal.Header closeButton>
                      <Modal.Title><strong>{strings.deliveryRegionSettingsTitle}</strong></Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <h4>{strings.deliveryRegionSettingsText1}</h4>
                          {deliverySettings}
                      </Modal.Body>
                  </div>

                  <Modal.Footer>
                  <Button bsStyle="" className="button button-back" onClick={this.close}>{strings.backButton}</Button>
                  <Button bsStyle="" className="button button-back" onClick={this.handleShopInfoUpdate}>{strings.updateButton}</Button>
                  
                  </Modal.Footer>
              </Modal>
          </div>
      )
  }
}

export default class ShopInfo extends Component {

  constructor() {
    super();
    this.state = {
      userData: {},
      loading: true,
      accountName: '',
      accountPhone: '',
      accountInfoMessage: null
    }
  }

  componentWillMount() {
    strings.setLanguage(this.props.languageChanged);
  }

  componentWillReceiveProps (nextProps) {
      if (nextProps.languageChanged==='ch') {
          strings.setLanguage('ch');
      } else if (nextProps.languageChanged==='en') {
          strings.setLanguage('en');
      }
  }

  componentDidMount () {
    firebaseAuth().onAuthStateChanged((user) => {
      base.fetch(`florists/${this.props.designerCode}`, {
        context: this,
        then(data) {
          this.setState({
            designerData: data, 
            loading: false, 
            name: data.name,
            address: data.address,
            description: data.description,
            facebook: data.facebook,
            instagram: data.instagram,
            profilePic: data.profilePic,
            type: data.type,
            website: data.website,
            leadTime: data.deliveryLeadTime,
          });
        }
      });
    });
  }

  handleAddressChange = (e) => {
    this.setState({ address: e.target.value });
  }
  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  }
  handleLeadTimeChange = (e) => {
    this.setState({ leadTime: e.target.value });
  }

  handleAccountUpdate = (address, description, leadTime) => {
    base.update(`florists/${this.props.designerCode}`, {
      data: {
          address: address,
          description: description,
          deliveryLeadTime: leadTime
      }
    }).then(() => 
        this.setState({ InfoMessage: `${strings.accountUpdated}`})
      ).catch(err => {
        console.log('An error occured when updating shop information.');
        this.setState({ InfoMessage: `${strings.errorOccured}`});
      });
  };

  render () {

    var loadingState = this.state.loading;
    var designerData = this.state.designerData;
    var name= this.state.name;
    var address = this.state.address;
    var description = this.state.description;
    var leadTime = this.state.leadTime;

    let content = null;
    if (loadingState) {
      content = <div>
                  <div className="horizontal-line"></div>
                  <div className="loader"></div>
                </div>
    } else {
      content = (
        <div>
          <Grid>
            <Row className="show-grid">
              <div className="horizontal-line"></div>
              { this.state.InfoMessage &&
                <div className="alert alert-success update-message" role="alert">
                  <Glyphicon glyph="exclamation-sign" className="icons"/>&nbsp;{this.state.InfoMessage} 
                </div>
              }
            </Row>
            <div className="sub-list-item">
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                    <div><strong>Shop Name:</strong></div>
                  </Col>
                  <Col sm={8}>
                    <div>{this.state.name}</div>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                    <div><strong>Shop ID:</strong></div>
                  </Col>
                  <Col sm={8}>
                    <div>{this.props.designerCode}</div>
                  </Col>
                </FormGroup>
              </Row>

              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                    <div><strong>{strings.address}</strong></div>
                  </Col>
                  <Col sm={7}>
                    <FormControl className="data-field-update" type="text" value={address} onChange={this.handleAddressChange}/>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                    <div><strong>{strings.description}</strong></div>
                  </Col>
                  <Col sm={7}>
                    <FormControl className="data-field-update" type="text" value={description} onChange={this.handleDescriptionChange}/>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                    <div><strong>{strings.leadTime}</strong></div>
                  </Col>
                  <Col sm={7}>
                    <FormControl className="data-field-update" type="text" value={leadTime} onChange={this.handleLeadTimeChange}/>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                    <div><strong>{strings.deliveryRegions}</strong></div>
                  </Col>
                  <Col sm={7}>
                    <DeliverySettings
                      city={this.state.city}
                      designerCode={this.props.designerCode}
                    />
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                    <div><strong>{strings.openDays}</strong></div>
                  </Col>
                  <Col sm={7}>
                    <OpenDays
                      designerCode={this.props.designerCode}
                    />
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col xs={10} xsPush={2} smPush={5} mdPush={6}>
                    <Button bsStyle="" className="button" onClick={() => this.handleAccountUpdate(address, description, leadTime)}>{strings.updateButton}</Button>
                  </Col>
                </FormGroup>
              </Row>
            </div>
          </Grid>
        </div>
      )
    }

    return (
        <div className="loggedin-background">
           <Grid>
            <Row>
              <div className="no-sub-section">            
                <Route path="/" render={(props) => <ButtonToPersonalAccount {...props}/>} />
              </div>
            </Row>
            <Row className="show-grid loggedin-nav">
              <Col xs={4} className="loggedin-nav-button">
                <Link to="/ordersdashboard">
                  <i className="fa fa-book fa-lg nav-icon"></i>
                  <div className="nav-icon-title">{strings.ordersDashboard1}<br/>{strings.ordersDashboard2}</div>
                </Link>
              </Col>
              <Col xs={4} className="loggedin-nav-button">
                <Link to="/designs">
                  <i className="fa fa-star fa-lg nav-icon"></i>
                  <div className="nav-icon-title">{strings.designs1}<br/>{strings.designs2}</div>
                </Link>
              </Col>
              <Col xs={4} className="loggedin-nav-button">
                <Link to="/shopinfo" className="nav-selected">
                  <i className="fa fa-home fa-lg nav-icon"></i>
                  <div className="nav-icon-title">{strings.shopInformation1}<br/>{strings.shopInformation2}</div>
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