import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { firebaseAuth } from '../config/constants';
import { Link, Route } from 'react-router-dom';
import { FormGroup, FormControl, Grid, Row, Col, Button, Glyphicon, Modal, DropdownButton, MenuItem } from 'react-bootstrap';
import { base } from '../config/constants';
import * as firebase from 'firebase';
import LocalizedStrings from 'react-localization';
import StarRatingComponent from 'react-star-rating-component';
import moment from 'moment';
import AvatarCropper from 'react-avatar-cropper';

let strings = new LocalizedStrings({
  en:{
    ordersDashboard1: 'Orders',
    ordersDashboard2: 'Dashboard',
    designs1: "Shop's",
    designs2: 'Designs',
    shopInformation1: 'Shop',
    shopInformation2: 'Information',

    allDesigns: 'All Designs',
    newDesign: 'New Design',
    designsUpdate: 'Details & Update',
    referenceCode: 'Reference Code:',

    to: 'To:',
    deliveryDay: 'Delivery Day:',
    detailsButton: 'Details',

    backButton: 'Back',
    updateButton: 'Update',
    saveButton: 'Save',
    createButton: 'Create',
         
    colorSettingsTitle: 'Color Type',
    colorSettingsText1: 'This helps customers search for designs.',
    colorSettingsText2: 'Which of these frequently searched for colors does your design contain?',


    orderUpdate: 'Your update has been sent.',

    cancelButton: 'Close',

    noOrder: 'You do not have any design listed.',


    errorOccured: 'An error occured, please try again later.',
    reviewSubmitted: 'Your review has been submited.',
    browseMarket: 'Browse Market',

    order_submitted: 'Order Submitted',
    order_delivered: 'Order Delivered',
    order_received: 'Order Received',

    n: 'no',
    y: 'yes'

  },
  ch: {}
});

const ButtonToPersonalAccount = ({ title, history }) => (
  <Button bsStyle="" className="no-sub-button" onClick={() => history.push('/orderhistory')}>Go to Personal Account</Button>
);

class ColorType extends React.Component {
  constructor() {
    super();
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.state = {
      showModal: false,
      blue: 'n',
      green: 'n',
      lavender: 'n',
      orange: 'n',
      pink: 'n',
      purple: 'n',
      red: 'n',
      white: 'n',
      yellow: 'n'
    }
  }

  fetchData = () => {
    if (this.props.selectedDesign === null) {
      this.setState({
        blue: 'n',
        green: 'n',
        lavender: 'n',
        orange: 'n',
        pink: 'n',
        purple: 'n',
        red: 'n',
        white: 'n',
        yellow: 'n'
      });
    } else {
      base.fetch(`arrangementsList/${this.props.selectedDesign}/color`, {
        context: this,
        then(data) {
            var blue = 'n';
            var green = 'n';
            var lavender = 'n';
            var orange = 'n';
            var pink = 'n';
            var purple= 'n';
            var red = 'n';
            var white = 'n';
            var yellow = 'n';

            if (data.length > 0) {
              if (data.indexOf('blue')> -1) {
                blue='y'
              }
              if (data.indexOf('green')> -1) {
                green='y'
              }
              if (data.indexOf('lavender')> -1) {
                lavender='y'
              }
              if (data.indexOf('orange')> -1) {
                orange='y'
              }
              if (data.indexOf('pink')> -1) {
                pink='y'
              }
              if (data.indexOf('purple')> -1) {
                purple='y'
              }
              if (data.indexOf('red')> -1) {
                red='y'
              }
              if (data.indexOf('white')> -1) {
                white='y'
              }
              if (data.indexOf('yellow')> -1) {
                yellow='y'
              }
            }
            this.setState({
                blue: blue,
                green: green,
                lavender: lavender,
                orange: orange,
                pink: pink,
                purple: purple,
                red: red,
                white: white,
                yellow: yellow
            });
          }
        }); 
    }
  }
  
  close() {
    this.setState({showModal: false});
    //force states to update since it does not dismount on close. It cases content to flash if placed on open()
    this.fetchData();
  }
  open() {
    this.setState({showModal: true});
  }
  handleSettingChange = (color, eventKey) => {
    switch (color) {
      case 'blue': 
        this.setState({blue: eventKey});
        break
      case 'green': 
        this.setState({green: eventKey});
        break
      case 'lavender': 
        this.setState({lavender: eventKey});
        break
      case 'orange': 
        this.setState({orange: eventKey});
        break
      case 'pink': 
        this.setState({pink: eventKey});
        break
      case 'purple': 
        this.setState({purple: eventKey});
        break
      case 'red': 
        this.setState({red: eventKey});
        break
      case 'white': 
        this.setState({white: eventKey});
        break
      case 'yellow': 
        this.setState({yellow: eventKey});
        break
    }
  }
  componentWillMount () {
    this.fetchData();
  }

  handleColorUpdate = () => {
    var colorsArray = [];

    if (this.state.blue === 'y') {
      colorsArray.push('blue');
    }
    if (this.state.green === 'y') {
      colorsArray.push('green');
    }
    if (this.state.lavender === 'y') {
      colorsArray.push('lavender');
    }
    if (this.state.orange === 'y') {
      colorsArray.push('orange');
    }
    if (this.state.pink === 'y') {
      colorsArray.push('pink');
    }
    if (this.state.purple === 'y') {
      colorsArray.push('purple');
    }
    if (this.state.red === 'y') {
      colorsArray.push('red');
    }
    if (this.state.white === 'y') {
      colorsArray.push('white');
    }
    if (this.state.yellow === 'y') {
      colorsArray.push('yellow');
    }

    if (this.props.selectedDesign === null) {
      this.props.onCreateDesignColorUpdate(colorsArray);
      this.close();
    } else {
      base.post(`arrangementsList/${this.props.selectedDesign}/color`, {
        data: colorsArray
      }).then(() => 
        this.close()
      ).catch(err => {
        console.log("An error occured when updating design's color.");
      });
    }
  }

  render() {
      return (
          <div>
              <Button bsStyle="" className="sub-details-unsub"onClick={this.open}>Settings</Button>
              <Modal show={this.state.showModal} onHide={this.close}>

                  <div>
                      <Modal.Header closeButton>
                      <Modal.Title><strong>{strings.colorSettingsTitle}</strong></Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <h4>{strings.colorSettingsText1}</h4>
                          <p>{strings.colorSettingsText2}</p>
                          <Grid>
                            <div className="sub-list-item">
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={3}>
                                    Blue:
                                  </Col>
                                  <Col sm={3}>
                                    <DropdownButton title={strings[this.state.blue]} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={(eventKey)=>this.handleSettingChange('blue',eventKey)}>
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={3}>
                                    Green:
                                  </Col>
                                  <Col sm={3}>
                                    <DropdownButton title={strings[this.state.green]} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={(eventKey)=>this.handleSettingChange('green',eventKey)}>
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={3}>
                                    Lavender:
                                  </Col>
                                  <Col sm={3}>
                                    <DropdownButton title={strings[this.state.lavender]} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={(eventKey)=>this.handleSettingChange('lavender',eventKey)}>
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={3}>
                                    Orange:
                                  </Col>
                                  <Col sm={3}>
                                    <DropdownButton title={strings[this.state.orange]} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={(eventKey)=>this.handleSettingChange('orange',eventKey)}>
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={3}>
                                    Pink:
                                  </Col>
                                  <Col sm={3}>
                                    <DropdownButton title={strings[this.state.pink]} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={(eventKey)=>this.handleSettingChange('pink',eventKey)}>
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={3}>
                                    Purple:
                                  </Col>
                                  <Col sm={3}>
                                    <DropdownButton title={strings[this.state.purple]} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={(eventKey)=>this.handleSettingChange('purple',eventKey)}>
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={3}>
                                    Red:
                                  </Col>
                                  <Col sm={3}>
                                    <DropdownButton title={strings[this.state.red]} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={(eventKey)=>this.handleSettingChange('red',eventKey)}>
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={3}>
                                    White:
                                  </Col>
                                  <Col sm={3}>
                                    <DropdownButton title={strings[this.state.white]} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={(eventKey)=>this.handleSettingChange('white',eventKey)}>
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={3}>
                                    Yellow:
                                  </Col>
                                  <Col sm={3}>
                                    <DropdownButton title={strings[this.state.yellow]} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={(eventKey)=>this.handleSettingChange('yellow',eventKey)}>
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
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
                  <Button bsStyle="" className="button button-back" onClick={this.handleColorUpdate}>{strings.saveButton}</Button>
                  </Modal.Footer>
              </Modal>
          </div>
      )
  }
}

class FlowerType extends React.Component {
  constructor() {
    super();
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.state = {
      showModal: false,
      dahlias: 'n',
      delphinium: 'n',
      daisies: 'n',
      hydrangeas: 'n',
      iris: 'n',
      orchids: 'n',
      peonies: 'n',
      roses: 'n',
      sunflowers: 'n',
      tulips: 'n',
      carnations: 'n'
    }
  }

  fetchData = () => {

    if (this.props.selectedDesign === null) {
      this.setState({
        dahlias: 'n',
        delphinium: 'n',
        daisies: 'n',
        hydrangeas: 'n',
        iris: 'n',
        orchids: 'n',
        peonies: 'n',
        roses: 'n',
        sunflowers: 'n',
        tulips: 'n',
        carnations: 'n'
      });
    } else {
      base.fetch(`arrangementsList/${this.props.selectedDesign}/flower`, {
        context: this,
        then(data) {
            var dahlias = 'n';
            var delphinium = 'n';
            var daisies = 'n';
            var hydrangeas = 'n';
            var iris = 'n';
            var orchids= 'n';
            var peonies = 'n';
            var roses = 'n';
            var sunflowers = 'n';
            var tulips = 'n';
            var carnations = 'n';

            if (data.length > 0) {
              if (data.indexOf('dahlias')> -1) {
                dahlias='y'
              }
              if (data.indexOf('delphinium')> -1) {
                delphinium='y'
              }
              if (data.indexOf('daisies')> -1) {
                daisies='y'
              }
              if (data.indexOf('hydrangeas')> -1) {
                hydrangeas='y'
              }
              if (data.indexOf('iris')> -1) {
                iris='y'
              }
              if (data.indexOf('orchids')> -1) {
                orchids='y'
              }
              if (data.indexOf('peonies')> -1) {
                peonies='y'
              }
              if (data.indexOf('roses')> -1) {
                roses='y'
              }
              if (data.indexOf('sunflowers')> -1) {
                sunflowers='y'
              }
              if (data.indexOf('tulips')> -1) {
                tulips='y'
              }
              if (data.indexOf('carnations')> -1) {
                carnations='y'
              }
            }

            this.setState({
                dahlias: dahlias,
                delphinium: delphinium,
                daisies: daisies,
                hydrangeas: hydrangeas,
                iris: iris,
                orchids: orchids,
                peonies: peonies,
                roses: roses,
                sunflowers: sunflowers,
                tulips: tulips,
                carnations: carnations
            });
        }
      });
    }
  }
  
  close() {
    this.setState({showModal: false});
    //force states to update since it does not dismount on close. It cases content to flash if placed on open()
    this.fetchData();
  }
  open() {
    this.setState({showModal: true});
  }
  handleSettingChange = (flower, eventKey) => {
    switch (flower) {
      case 'dahlias': 
        this.setState({dahlias: eventKey});
        break
      case 'delphinium': 
        this.setState({delphinium: eventKey});
        break
      case 'daisies': 
        this.setState({daisies: eventKey});
        break
      case 'hydrangeas': 
        this.setState({hydrangeas: eventKey});
        break
      case 'iris': 
        this.setState({iris: eventKey});
        break
      case 'orchids': 
        this.setState({orchids: eventKey});
        break
      case 'peonies': 
        this.setState({peonies: eventKey});
        break
      case 'roses': 
        this.setState({roses: eventKey});
        break
      case 'sunflowers': 
        this.setState({sunflowers: eventKey});
        break
      case 'tulips': 
        this.setState({tulips: eventKey});
        break
      case 'carnations': 
        this.setState({carnations: eventKey});
        break
    }
  }
  componentWillMount () {
    this.fetchData();
  }

  handleFlowerUpdate = () => {
    var flowersArray = [];
    if (this.state.dahlias === 'y') {
      flowersArray.push('dahlias');
    }
    if (this.state.delphinium === 'y') {
      flowersArray.push('delphinium');
    }
    if (this.state.daisies === 'y') {
      flowersArray.push('daisies');
    }
    if (this.state.hydrangeas === 'y') {
      flowersArray.push('hydrangeas');
    }
    if (this.state.iris === 'y') {
      flowersArray.push('iris');
    }
    if (this.state.orchids === 'y') {
      flowersArray.push('orchids');
    }
    if (this.state.peonies === 'y') {
      flowersArray.push('peonies');
    }
    if (this.state.roses === 'y') {
      flowersArray.push('roses');
    }
    if (this.state.sunflowers === 'y') {
      flowersArray.push('sunflowers');
    }
    if (this.state.tulips === 'y') {
      flowersArray.push('tulips');
    }
    if (this.state.carnations === 'y') {
      flowersArray.push('carnations');
    }

    if (this.props.selectedDesign === null) {
      this.props.onCreateDesignFlowerUpdate(flowersArray);
      this.close();
    } else {
      base.post(`arrangementsList/${this.props.selectedDesign}/flower`, {
        data: flowersArray
      }).then(() => 
        this.close()
      ).catch(err => {
        console.log("An error occured when updating design's flower type.");
      });
    }
  }

  render() {
      return (
          <div>
              <Button bsStyle="" className="sub-details-unsub"onClick={this.open}>Settings</Button>
              <Modal show={this.state.showModal} onHide={this.close}>

                  <div>
                      <Modal.Header closeButton>
                      <Modal.Title><strong>{strings.colorSettingsTitle}</strong></Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <h4>{strings.flowerSettingsText1}</h4>
                          <p>{strings.flowerSettingsText2}</p>
                          <Grid>
                            <div className="sub-list-item">
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={3}>
                                    Dahlias:
                                  </Col>
                                  <Col sm={3}>
                                    <DropdownButton 
                                      title={strings[this.state.dahlias]} 
                                      className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" 
                                      onSelect={(eventKey)=>this.handleSettingChange('dahlias',eventKey)}
                                    >
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={3}>
                                    Delphinium:
                                  </Col>
                                  <Col sm={3}>
                                    <DropdownButton 
                                      title={strings[this.state.delphinium]} 
                                      className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" 
                                      onSelect={(eventKey)=>this.handleSettingChange('delphinium',eventKey)}
                                    >
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={3}>
                                    Daisies:
                                  </Col>
                                  <Col sm={3}>
                                    <DropdownButton 
                                      title={strings[this.state.daisies]} 
                                      className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" 
                                      onSelect={(eventKey)=>this.handleSettingChange('daisies',eventKey)}
                                    >
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={3}>
                                    Hydrangeas:
                                  </Col>
                                  <Col sm={3}>
                                    <DropdownButton 
                                      title={strings[this.state.hydrangeas]} 
                                      className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" 
                                      onSelect={(eventKey)=>this.handleSettingChange('hydrangeas',eventKey)}
                                    >
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={3}>
                                    Iris:
                                  </Col>
                                  <Col sm={3}>
                                    <DropdownButton 
                                      title={strings[this.state.iris]} 
                                      className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" 
                                      onSelect={(eventKey)=>this.handleSettingChange('iris',eventKey)}
                                    >
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={3}>
                                    Orchids:
                                  </Col>
                                  <Col sm={3}>
                                    <DropdownButton 
                                      title={strings[this.state.orchids]} 
                                      className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" 
                                      onSelect={(eventKey)=>this.handleSettingChange('orchids',eventKey)}
                                    >
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={3}>
                                    Peonies:
                                  </Col>
                                  <Col sm={3}>
                                    <DropdownButton 
                                      title={strings[this.state.peonies]} 
                                      className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" 
                                      onSelect={(eventKey)=>this.handleSettingChange('peonies',eventKey)}
                                    >
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={3}>
                                    Roses:
                                  </Col>
                                  <Col sm={3}>
                                    <DropdownButton 
                                      title={strings[this.state.roses]} 
                                      className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" 
                                      onSelect={(eventKey)=>this.handleSettingChange('roses',eventKey)}
                                    >
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={3}>
                                    Sun Flowers:
                                  </Col>
                                  <Col sm={3}>
                                    <DropdownButton 
                                      title={strings[this.state.sunflowers]} 
                                      className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" 
                                      onSelect={(eventKey)=>this.handleSettingChange('sunflowers',eventKey)}
                                    >
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={3}>
                                    Tulips:
                                  </Col>
                                  <Col sm={3}>
                                    <DropdownButton 
                                      title={strings[this.state.tulips]} 
                                      className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" 
                                      onSelect={(eventKey)=>this.handleSettingChange('tulips',eventKey)}
                                    >
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
                                    </DropdownButton>
                                  </Col>
                                </FormGroup>
                              </Row>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={3}>
                                    Carnations:
                                  </Col>
                                  <Col sm={3}>
                                    <DropdownButton 
                                      title={strings[this.state.carnations]} 
                                      className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" 
                                      onSelect={(eventKey)=>this.handleSettingChange('carnations',eventKey)}
                                    >
                                      <MenuItem eventKey="y">{strings.y}</MenuItem>
                                      <MenuItem eventKey="n">{strings.n}</MenuItem>
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
                  <Button bsStyle="" className="button button-back" onClick={this.handleFlowerUpdate}>{strings.updateButton}</Button>
                  </Modal.Footer>
              </Modal>
          </div>
      )
  }
}

class FileUpload extends React.Component {
    handleFile = (e) => {
        var reader = new FileReader();
        var file = e.target.files[0];
    
        if (!file) return;
    
        reader.onload = function(img) {
          ReactDOM.findDOMNode(this.refs.in).value = '';
          this.props.handleFileChange(img.target.result);
        }.bind(this);
        reader.readAsDataURL(file);
    }
    
    render() {
        return (
            <input ref="in" type="file" accept="image/*" onChange={this.handleFile} />
        );
    }
}

class DesignDetails extends React.Component {
  constructor() {
      super();
      this.state = {
          loading: true,
          designDetails: {},
          cropperOpen: false,
          img: null,
          newImageFlag: false
      }
  }

  componentWillMount () {
      this.fireBaseListenerForDesignDetails = firebaseAuth().onAuthStateChanged((user) => {
          base.fetch(`arrangementsList/${this.props.selectedDesign}`, {
              context: this,
              then(data) {
                  this.setState({
                      designDetails: data, 
                      loading: false, 
                      name: data.name, 
                      price: data.price, 
                      description: data.description, 
                      color: data.color, 
                      flower: data.flower,
                      croppedImg: data.image
                  });
              }
          });
      });
  }

  componentWillUnmount () {
      //returns the unsubscribe function
      this.fireBaseListenerForDesignDetails && this.fireBaseListenerForDesignDetails();
  }

  handleBack = () => {
      this.props.onHandleBack();
  }

  handleDesignUpdate = (name, price, description, color, flower, croppedImg, newImageFlag) => {
      this.props.onHandleDesignUpdate(this.props.selectedDesign, name, price, description, color, flower, croppedImg, newImageFlag);
  }

  handleNameChange = (e) => {
      this.setState({ name: e.target.value });
  }
  handlePriceChange = (e) => {
      this.setState({ price: e.target.value });
  }
  handleDescriptionChange = (e) => {
      this.setState({ description: e.target.value });
  }
  handleFileChange = (dataURL) => {
      this.setState({
          img: dataURL,
          croppedImg: this.state.croppedImg,
          cropperOpen: true
        });
  }
  handleCrop = (dataURL) => {
      this.setState({
          cropperOpen: false,
          img: null,
          croppedImg: dataURL,
          newImageFlag: true
        });
  }
  handleRequestHide = () => {
      this.setState({
          cropperOpen: false
        });
  }

  render() {
    var designDetails = this.state.designDetails;
    var loadingState = this.state.loading;
    var name = this.state.name;
    var price = this.state.price;
    var color = this.state.color;
    var flower = this.state.flower;
    var description = this.state.description;
    var croppedImg = this.state.croppedImg;
    var newImageFlag = this.state.newImageFlag;
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
            <div className="sub-list-item">
                <Row className="show-grid">
                    <FormGroup>
                    <Col sm={1}></Col>
                    <Col sm={3}>
                        <div><strong>Design Image:</strong></div>
                    </Col>
                    <Col sm={8}>
                    <div>
                        <div className="avatar-photo">
                            <FileUpload handleFileChange={this.handleFileChange} />
                            <div className="avatar-edit">
                                <i className="fa fa-camera"></i>
                            </div>
                            <img className="design-detail-arrangement-pic" src={this.state.croppedImg} />
                        </div>
                        {this.state.cropperOpen &&
                        <AvatarCropper
                            onRequestHide={this.handleRequestHide}
                            cropperOpen={this.state.cropperOpen}
                            onCrop={this.handleCrop}
                            image={this.state.img}
                            width={400}
                            height={400}
                        />
                        }
                    </div>
                    </Col>
                  </FormGroup>
                </Row>
                <Row className="show-grid">
                    <FormGroup>
                    <Col sm={1}></Col>
                    <Col sm={3}>
                        <div><strong>Design name:</strong></div>
                    </Col>
                    <Col sm={5}>
                        <FormControl className="data-field-update" type="text" value={name} onChange={this.handleNameChange}/>
                    </Col>
                    <Col sm={3}>
                    </Col>
                    </FormGroup>
                </Row>
                <Row className="show-grid">
                    <FormGroup>
                    <Col sm={1}></Col>
                    <Col sm={3}>
                        <div><strong>Item ID:</strong></div>
                    </Col>
                    <Col sm={5}>
                        <div>{designDetails.id}</div>
                    </Col>
                    <Col sm={3}>
                    </Col>
                    </FormGroup>
                </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>Price ({designDetails.currency}):</strong></div>
                  </Col>
                  <Col sm={5}>
                    <FormControl className="data-field-update" type="text" value={price} onChange={this.handlePriceChange}/>
                  </Col>
                  <Col sm={3}>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>Description:</strong></div>
                  </Col>
                  <Col sm={8}>
                    <FormControl className="card-text-area data-field-update" componentClass="textarea" value={description} onChange={this.handleDescriptionChange}/>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>Color:</strong></div>
                  </Col>
                  <Col sm={8}>
                    <ColorType
                        selectedDesign={this.props.selectedDesign}
                        designerCode={this.props.designerCode}
                    />
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>Flower:</strong></div>
                  </Col>
                  <Col sm={8}>
                    <FlowerType
                        selectedDesign={this.props.selectedDesign}
                        designerCode={this.props.designerCode}
                    />
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={5}>
                  </Col>
                  <Col sm={4}>
                    <Button bsStyle="" className="button sub-details-back" onClick={() => this.handleBack()}>{strings.backButton}</Button>
                    <Button bsStyle="" className="button sub-details-update" onClick={() => this.handleDesignUpdate(name, price, description, color, flower, croppedImg, newImageFlag)}>{strings.updateButton}</Button>
                  </Col>
                </FormGroup>
              </Row>
            </div>
          </Grid>
        </div>
      )
    }
    return (
      <div>
        {content}
      </div>
    )
  }
}

class NewDesign extends React.Component {
  constructor() {
      super();
      this.state = {
          loading: true,
          designDetails: {},
          cropperOpen: false,
          img: null,
          name: '',
          price: '',
          description: '',
          croppedImg: null,
          colorsArray: [],
          flowersArray: []
      }
  }

  componentWillMount () {
    this.setState({
        loading: false
    });
  }

  componentWillUnmount () {
    console.log('unmounting tasks');
  }

  handleBack = () => {
      this.props.onHandleBack();
  }

  handleNewDesign = (name, price, description, colorsArray, flowersArray, croppedImg) => {
      this.props.onHandleNewDesign(name, price, description, colorsArray, flowersArray, croppedImg);
  }

  handleNameChange = (e) => {
      this.setState({ name: e.target.value });
  }
  handlePriceChange = (e) => {
      this.setState({ price: e.target.value });
  }
  handleDescriptionChange = (e) => {
      this.setState({ description: e.target.value });
  }
  handleFileChange = (dataURL) => {
      this.setState({
          img: dataURL,
          croppedImg: this.state.croppedImg,
          cropperOpen: true
        });
  }
  handleCrop = (dataURL) => {
      this.setState({
          cropperOpen: false,
          img: null,
          croppedImg: dataURL
        });
  }
  handleRequestHide = () => {
      this.setState({
          cropperOpen: false
        });
  }
  handleCreateDesignColorUpdate = (colorsArray) => {
    this.setState({colorsArray: colorsArray});
  }

  handleCreateDesignFlowerUpdate = (flowersArray) => {
    this.setState({flowersArray: flowersArray});
  }

  render() {
    var loadingState = this.state.loading;
    var name = this.state.name;
    var price = this.state.price;
    var description = this.state.description;
    var croppedImg = this.state.croppedImg;
    var colorsArray = this.state.colorsArray;
    var flowersArray = this.state.flowersArray;
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
            <div className="sub-list-item">
                <Row className="show-grid">
                    <FormGroup>
                    <Col sm={1}></Col>
                    <Col sm={3}>
                        <div><strong>Design Image:</strong></div>
                    </Col>
                    <Col sm={8}>
                    <div>
                        <div className="avatar-photo">
                            <FileUpload handleFileChange={this.handleFileChange} />
                            <div className="avatar-edit">
                                <i className="fa fa-camera"></i>
                            </div>
                            <img className="design-detail-arrangement-pic" src={this.state.croppedImg} />
                        </div>
                        {this.state.cropperOpen &&
                        <AvatarCropper
                            onRequestHide={this.handleRequestHide}
                            cropperOpen={this.state.cropperOpen}
                            onCrop={this.handleCrop}
                            image={this.state.img}
                            width={400}
                            height={400}
                        />
                        }
                    </div>
                    </Col>
                  </FormGroup>
                </Row>
                <Row className="show-grid">
                    <FormGroup>
                    <Col sm={1}></Col>
                    <Col sm={3}>
                        <div><strong>Design name:</strong></div>
                    </Col>
                    <Col sm={5}>
                        <FormControl className="data-field-update" type="text" value={name} onChange={this.handleNameChange}/>
                    </Col>
                    <Col sm={3}>
                    </Col>
                    </FormGroup>
                </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>Description:</strong></div>
                  </Col>
                  <Col sm={8}>
                    <FormControl className="card-text-area data-field-update" componentClass="textarea" value={description} onChange={this.handleDescriptionChange}/>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>Price:</strong></div>
                  </Col>
                  <Col sm={8}>
                    <FormControl className="data-field-update" componentClass="textarea" value={price} onChange={this.handlePriceChange}/>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>Color:</strong></div>
                  </Col>
                  <Col sm={8}>
                    <ColorType
                        onCreateDesignColorUpdate = {this.handleCreateDesignColorUpdate}
                        selectedDesign={null}
                        designerCode={this.props.designerCode}
                    />
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>Flower:</strong></div>
                  </Col>
                  <Col sm={8}>
                    <FlowerType
                        onCreateDesignFlowerUpdate = {this.handleCreateDesignFlowerUpdate}
                        selectedDesign={null}
                        designerCode={this.props.designerCode}
                    />
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={5}>
                  </Col>
                  <Col sm={4}>
                    <Button bsStyle="" className="button sub-details-back" onClick={() => this.handleBack()}>{strings.backButton}</Button>
                    <Button bsStyle="" className="button sub-details-update" onClick={() => this.handleNewDesign(name, price, description, colorsArray, flowersArray, croppedImg)}>{strings.createButton}</Button>
                  </Col>
                </FormGroup>
              </Row>
            </div>
          </Grid>
        </div>
      )
    }
    return (
      <div>
        {content}
      </div>
    )
  }
}

export default class Designs extends Component {
  constructor() {
    super();
    this.handleChooseDesign = this.handleChooseDesign.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.state = {
      designsData: {},
      loading: true,
      designsDetailsStatus: 0,
      selectedDesign: '',
      infoMessage: null,
      newImage: false
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.languageChanged==='ch') {
      strings.setLanguage('ch');
    } else if (nextProps.languageChanged==='en') {
      strings.setLanguage('en');
    }
  }
  componentWillMount() {
    var designer = this.props.designerCode;
    console.log('designer is', designer);
    var thisRef = this;
    strings.setLanguage(this.props.languageChanged);
    if (designer) {
      this.fireBaseListenerForDesigns = firebaseAuth().onAuthStateChanged((user) => {
          firebase.database().ref(`arrangementsList`).orderByChild('florist').equalTo(designer).once('value', function(snapshot) {
              var snapshotVal = snapshot.val();
              if (snapshotVal) {
                  thisRef.setState({
                      designsData: snapshotVal, 
                      loading: false, 
                      userID: user.uid
                  });
              }
          });
        });
    } else {
      console.log('user does not have a shop');
    }
  }
  componentDidMount () {
    window.scrollTo(0, 0);
  }
  componentWillUnmount () {
    //returns the unsubscribe function
    this.fireBaseListenerForDesigns && this.fireBaseListenerForDesigns();
  }
  handleChooseDesign(chosenKey) {
    this.setState({designsDetailsStatus: 1, selectedDesign: chosenKey});
  }
  handleBack() {
    this.setState({designsDetailsStatus: 0});
    var designer = this.props.designerCode;

    // reloading data since a review might have been posted
    base.fetch(`florists/${designer}`, {
        context: this,
        queries: {
            orderByChild: 'florist',
            equalTo: designer
        },
    });
  }

  handleNewDesign = (name, price, description, colorsArray, flowersArray, croppedImg) => {
    var designerCode = this.props.designerCode;
    var storageRef = firebase.storage().ref();

    base.fetch(`florists/${designerCode}/`, {
      context: this,
      then(data) {
        if (data.uid === this.state.userID) {

          var immediatelyAvailableReference = base.push(`arrangementsList`, {
            data: {
                approval: 'approved',
                color: colorsArray,
                currency: data.currency,
                deliveryAreas: data.deliveryAreas,
                description: description,
                florist: designerCode,
                floristName: data.name,
                floristUserID: data.uid,
                flower: flowersArray,
                name: name,
                price: price,
                seasonality: 'all',
                city: data.city
            }
          }).then((newLocation) => {
              var newLocationKey = newLocation.key;
              var newRef = storageRef.child(`${newLocationKey}`+'.jpg');
              var downloadURL;

              //first upload the image
              newRef.putString(croppedImg, 'data_url').then((snapshot) => {

                downloadURL = snapshot.downloadURL;
                //then update the design record with the new url
                base.update(`arrangementsList/${newLocationKey}`, {
                  data: {
                      image: downloadURL,
                      id: newLocationKey,
                  }              
                });
                this.setState({ infoMessage: 'new design has been created'});

            }).catch(err => {
              console.log('An error occured when creating design.');
              this.setState({ infoMessage: 'An error occured when creating design'});
            });

          })
         } else {
          console.log('user id does not match shop record');
        }
      }
    })
  }

  handleDesignUpdate = (selectedDesign, name, price, description, color, flower, croppedImg, newImageFlag) => {

    if (newImageFlag) {
      var storageRef = firebase.storage().ref();
      var newRef = storageRef.child(`${selectedDesign}`+'.jpg');
      var downloadURL;

      //first upload the image and ge tthe url path
      newRef.putString(croppedImg, 'data_url').then((snapshot) => {
        downloadURL = snapshot.downloadURL;

        //then update the design record with the new url
        base.update(`arrangementsList/${selectedDesign}`, {
          data: {
              name: name,
              price: price,
              description: description,
              color: color,
              flower: flower,
              image: downloadURL
          }
        }).then(() => 
              this.setState({ infoMessage: 'design has been updated'})
          ).catch(err => {
              console.log('An error occured when updating design.');
              this.setState({ infoMessage: 'An error occured when updating design'});
          });
      })
    } else {
      base.update(`arrangementsList/${selectedDesign}`, {
        data: {
            name: name,
            price: price,
            description: description,
            color: color,
            flower: flower,
        }
      }).then(() => 
            this.setState({ infoMessage: 'design has been updated'})
        ).catch(err => {
            console.log('An error occured when updating design.');
            this.setState({ infoMessage: 'An error occured when updating design'});
        });
    }
  }

  render () {

    var data = this.state.designsData;
    var loadingState = this.state.loading;
    var designsDetailsStatus = this.state.designsDetailsStatus;
    var designs;

    // console.log('data check: ', Object.keys(data).length);
    if (Object.keys(data).length===0) {
      designs = (
        <div className="no-sub-section">            
          <div className="center-text">{strings.noDesign}</div>
        </div>
      )
    } else {
      designs = Object.keys(data).map(function(key) {
        var chosenKey = data[key].id;
        return (
          <div key={key}>
            <Grid>
              <div className="sub-list-item">
                <Row className="show-grid">
                  <FormGroup>
                    <Col sm={1}></Col>
                    <Col sm={3}>
                        <div><strong>Arrangement:</strong></div>
                    </Col>
                    <Col sm={3}>
                      <div>{data[key].name}</div>
                    </Col>
                  </FormGroup>
                </Row>
                <Row className="show-grid">
                  <FormGroup>
                    {/* <Col xs={} sm={5}></Col> */}
                    <Col xs={1} xsOffset={6} smOffset={9} mdOffset={10}>
                      <Button bsStyle="" className="button sub-details-button" onClick={() => this.handleChooseDesign(chosenKey)}>{strings.detailsButton}</Button>
                    </Col>
                  </FormGroup>
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
    } else if (designsDetailsStatus===0){
      content = (
        <div>
          <Grid>
            <Row className="show-grid loggedin-flow">
              <div className="horizontal-line"></div>
            </Row>
          </Grid>

          <Button bsStyle="" onClick={() => this.setState({designsDetailsStatus: 2}, () => {window.scrollTo(0, 0);})}>{strings.createButton}</Button>

          {designs}
        </div>
      )
    } else if (designsDetailsStatus===1) {
      content = (
        <div>
          <Grid>
            <Row className="show-grid loggedin-flow">
              <div className="horizontal-line"></div>
              <Col xs={12}>
                  <div>{strings.allDesigns}</div>
                    <i className="fa fa-chevron-right"></i>
                  <div className="flow-selected">{strings.designsUpdate}</div>
              </Col>
              <div className="horizontal-line"></div>
            </Row>
          </Grid>
          <DesignDetails
            selectedDesign={this.state.selectedDesign}
            infoMessage={this.state.infoMessage}
            onHandleBack={this.handleBack}
            designerCode={this.props.designerCode}
            onHandleDesignUpdate={this.handleDesignUpdate}
          />
        </div>
      )
    } else if (designsDetailsStatus===2) {
      content = (
        <div>
          <Grid>
            <Row className="show-grid loggedin-flow">
              <div className="horizontal-line"></div>
              <Col xs={12}>
                  <div onClick={() => this.setState({designsDetailsStatus: 0}, () => {window.scrollTo(0, 0);})}>{strings.allDesigns}</div>
                    <i className="fa fa-chevron-right"></i>
                  <div className="flow-selected">{strings.newDesign}</div>
              </Col>
              <div className="horizontal-line"></div>
            </Row>
          </Grid>
          <NewDesign
            infoMessage={this.state.infoMessage}
            onHandleBack={this.handleBack}
            designerCode={this.props.designerCode}
            onHandleNewDesign={this.handleNewDesign}
          />
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
              <Link to="/designs" className="nav-selected">
                <i className="fa fa-star fa-lg nav-icon"></i>
                <div className="nav-icon-title">{strings.designs1}<br/>{strings.designs2}</div>
              </Link>
            </Col>
            <Col xs={4} className="loggedin-nav-button">
              <Link to="/shopinfo">
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