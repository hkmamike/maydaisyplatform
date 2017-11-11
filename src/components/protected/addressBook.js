import React, { Component } from 'react'
import { firebaseAuth } from '../config/constants';
import { Link, Route } from 'react-router-dom';
import { FormGroup, FormControl, Grid, Row, Col, Button, Glyphicon, Modal } from 'react-bootstrap';
import { base } from '../config/constants';
import LocalizedStrings from 'react-localization';
import StarRatingComponent from 'react-star-rating-component';
import moment from 'moment';

let strings = new LocalizedStrings({
  en:{
    orderHistory1: 'Order',
    orderHistory2: 'History',
    addressBook1: 'Address',
    addressBook2: 'Book',
    accountInformation1: 'Account',
    accountInformation2: 'Information',
    allAddresses: 'All Addresses',
    detailsUpdate: 'Details & Update',
    detailsButton: 'Details',
    company: 'Location Name:',
    deliveryInstruction: 'Delivery Instruction:',
    recipient: 'Recipient:',
    address: 'Address:',
    recipientNum: "Recipient's # :",
    backButton: 'Back',
    updateButton: 'Update',
    cancelButton: 'Close',
    deleteButton: 'Delete',
    noAddress: 'You do not have any address book record.',
    errorOccured: 'An error occured, please try again later.',
    addressUpdated: 'address has been updated.',
    deleteText1: 'The Addres Book helps you speed up the checkout process',
    deleteText2: "Proceed to delete this record by clicking the 'delete' button below"
  },
  ch: {}
});

class DeleteAddressModal extends React.Component {
    constructor() {
      super();
      this.open = this.open.bind(this);
      this.close = this.close.bind(this);
      this.deleteAddress = this.deleteAddress.bind(this);
      this.state = {
        showModal: false
      }
    }
  
    close() {
      this.setState({showModal: false});
    }
    open() {
      this.setState({showModal: true});
    }
    deleteAddress() {
      var uid = this.props.uid;
      this.props.onDeleteAddress();
      this.close();
    }
    render() {
      return (
        <div>
          <Button bsStyle="" className="sub-details-unsub" onClick={this.open}>{strings.deleteButton}</Button>
          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title><strong>Delete Address</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>{strings.deleteText1}</h4>
              <p>{strings.deleteText2}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="" className="button button-back" onClick={this.close}>{strings.cancelButton}</Button>
              <Button bsStyle="" className="button" onClick={this.deleteAddress}>{strings.deleteButton}</Button>
            </Modal.Footer>
          </Modal>
        </div>
      )
    }
  }

class AddressDetails extends React.Component {

    constructor() {
        super();
        this.handleBack = this.handleBack.bind(this);
        this.state = {
        loading: true,
        addressDetails: {}
        }
    }

    componentWillMount () {
        this.fireBaseListenerForAddressDetails = firebaseAuth().onAuthStateChanged((user) => {
            base.fetch(`users/${user.uid}/address/${this.props.selectedAddress}`, {
                context: this,
                then(data) {
                    console.log('data is :', data);
                    this.setState({addressDetails: data, loading: false, recipientNum: data.recipientNum, uid: user.uid});
                }
            });
        });
    }

    componentWillUnmount () {
        //returns the unsubscribe function
        this.fireBaseListenerForAddressDetails && this.fireBaseListenerForAddressDetails();
    }

    handleBack = () => {
        this.props.onHandleBack();
    }
    handleUpdate = (ecipient, recipientNum, company, address, deliveryInstruction) => {
        this.props.onHandleAddressUpdate(ecipient, recipientNum, company, address, deliveryInstruction);
    }
    handleDelete = () => {
        this.fireBaseListenerForDeleteAddress = firebaseAuth().onAuthStateChanged((user) => {
            base.remove(`users/${user.uid}/address/${this.props.selectedAddress}`).then(() => {
                this.setState({ InfoMessage: 'address has been removed from record'}, () => this.props.onAddressDeleteSuccess())
            }).catch(error => {
                //handle error
            });
        });
    }

  render() {
    var selectedAddress = this.props.selectedAddress;
    var addressDetails = this.state.addressDetails;
    var selectLocationType = this.state.addressDetails[selectLocationType];
    var loadingState = this.state.loading;
    var recipientNum = this.state.recipientNum;
    let content = null;

    if (loadingState) {
      content = <div className="loader"></div>
    } else {
      content = (
        <div>
          <Grid>
            { this.state.InfoMessage &&
              <div className="alert alert-success update-message" role="alert">
                <Glyphicon glyph="exclamation-sign" className="icons"/>&nbsp;{this.state.InfoMessage} 
              </div>
            }
            <div className="sub-list-item">
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>{strings.recipient}</strong></div>
                  </Col>
                  <Col sm={5}>
                    <div>{addressDetails.recipient}</div>
                  </Col>
                  <Col sm={3}>
                    <DeleteAddressModal
                        onDeleteAddress={this.handleDelete}
                        uid={this.state.uid}
                    />
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>{strings.recipientNum}</strong></div>
                  </Col>
                  <Col sm={8}>
                    <div>{addressDetails.recipientNum}</div>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>{strings.company}</strong></div>
                  </Col>
                  <Col sm={8}>
                    <div>{addressDetails.company}</div>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>{strings.address}</strong></div>
                  </Col>
                  <Col sm={8}>
                    <div>{addressDetails.address}</div>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1}></Col>
                  <Col sm={3}>
                      <div><strong>{strings.deliveryInstruction}</strong></div>
                  </Col>
                  <Col sm={8}>
                    <div>{addressDetails.deliveryInstruction}</div>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={5}>
                  </Col>
                  <Col sm={4}>
                    <Button bsStyle="" className="button sub-details-back" onClick={() => this.handleBack()}>{strings.backButton}</Button>
                    <Button bsStyle="" className="button sub-details-back" onClick={() => this.handleUpdate()}>{strings.updateButton}</Button>
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

export default class AddressBook extends Component {

  constructor() {
    super();
    this.handleChooseAddress = this.handleChooseAddress.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.addressDeleteSuccess = this.addressDeleteSuccess.bind(this);
    this.state = {
      addressData: {},
      loading: true,
      addressDetailsStatus: 0,
      addressInfoMessage: null
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
    strings.setLanguage(this.props.languageChanged);
  }
  componentDidMount () {
    window.scrollTo(0, 0);
    this.fireBaseListenerForAddress = firebaseAuth().onAuthStateChanged((user) => {
      base.fetch(`users/${user.uid}/address/`, {
        context: this,
        then(data) {
          this.setState({addressData: data, loading: false, userID: user.uid});
        }
      });
    });
  }
  componentWillUnmount () {
    //returns the unsubscribe function
    this.fireBaseListenerForAddress && this.fireBaseListenerForAddress();
  }
  handleChooseAddress(chosenKey) {
    this.setState({addressDetailsStatus: 1, selectedAddress: chosenKey});
  }
  handleBack() {
    this.setState({addressDetailsStatus: 0});
  }

  handleAddressUpdate(recipient, recipientNum, company, address, deliveryInstruction) {
    var uid = this.state.userID;
    var selectedAddress = this.state.selectedAddress;
    console.log('handleAddressUpdate checkpoint, uid is : ', uid, 'selectedAddress is : ', selectedAddress);
    base.update(`users/${uid}/address/${selectedAddress}`, {
      data: {
        address: address,
        company: company,
        deliveryInstruction: deliveryInstruction,
        recipient: recipient,
        recipientNum: recipientNum
      }
    }).then(() => 
        this.setState({ addressInfoMessage: strings.addressUpdated})
      ).catch(err => {
        console.log('An error occured when updating address.');
        this.setState({ addressInfoMessage: strings.errorOccured});
      });
  }
  addressDeleteSuccess() {
      console.log('hello world');
    this.setState({addressDetailsStatus: 0});
    base.fetch(`users/${this.state.userID}/address/`, {
      context: this,
      then(data) {
        this.setState({addressData: data});
      }
    });
  }

  render () {

    var data = this.state.addressData;
    var loadingState = this.state.loading;
    var addressDetailsStatus = this.state.addressDetailsStatus;
    var addresses;

    // console.log('data check: ', Object.keys(data).length);
    if (Object.keys(data).length===0) {
      addresses = (
        <div className="no-sub-section">            
          <div className="center-text">{strings.noAddress}</div>
        </div>
      )
    } else {
      addresses = Object.keys(data).map(function(key) {
        var chosenKey = data[key].referenceCode;
        return (
          <div key={key}>
            <Grid>
              <div className="sub-list-item">
                <Row className="show-grid">
                  <FormGroup>
                    <Col sm={1}></Col>
                    <Col sm={3}>
                        <div><strong>{strings.recipient}</strong></div>
                    </Col>
                    <Col sm={3}>
                      <div>{data[key].recipient}</div>
                    </Col>
                  </FormGroup>
                </Row>
                <Row className="show-grid">
                  <FormGroup>
                    <Col sm={1}></Col>
                    <Col sm={3}>
                        <div><strong>Address: </strong></div>
                    </Col>
                    <Col sm={3}>
                    <div>{data[key].address}</div>
                    </Col>
                  </FormGroup>
                </Row>
                <Row className="show-grid">
                  <FormGroup>
                    {/* <Col xs={} sm={5}></Col> */}
                    <Col xs={1} xsOffset={6} smOffset={9} mdOffset={10}>
                      <Button bsStyle="" className="button sub-details-button" onClick={() => this.handleChooseAddress(chosenKey)}>{strings.detailsButton}</Button>
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
    } else if (addressDetailsStatus===0){
      content = (
        <div>
          <Grid>
            <Row className="show-grid loggedin-flow">
              <div className="horizontal-line"></div>
              <Col xs={12}>
                  <div className="flow-selected">{strings.allAddresses}</div>
                    <i className="fa fa-chevron-right"></i>
                  <div>{strings.detailsUpdate}</div>
              </Col>
              <div className="horizontal-line"></div>
            </Row>
          </Grid>
          {addresses}
        </div>
      )
    } else if (addressDetailsStatus===1) {
      content = (
        <div>
          <Grid>
            <Row className="show-grid loggedin-flow">
              <div className="horizontal-line"></div>
              <Col xs={12}>
                  <div>{strings.allAddresses}</div>
                    <i className="fa fa-chevron-right"></i>
                  <div className="flow-selected">{strings.detailsUpdate}</div>
              </Col>
              <div className="horizontal-line"></div>
            </Row>
          </Grid>
          <AddressDetails
            selectedAddress={this.state.selectedAddress} 
            addressInfoMessage={this.state.addressInfoMessage} 
            onHandleBack={this.handleBack}
            onHandleAddressUpdate={this.handleAddressUpdate}
            onAddressDeleteSuccess={this.addressDeleteSuccess}
          />
        </div>
      )
    }

    return (
      <div className="loggedin-background">
        <Grid>
          <Row className="show-grid loggedin-nav">
            <Col xs={4} className="loggedin-nav-button">
              <Link to="/orderhistory">
                <i className="fa fa-tags fa-lg nav-icon"></i>
                <div className="nav-icon-title">{strings.orderHistory1}<br/>{strings.orderHistory2}</div>
              </Link>
            </Col>
            <Col xs={4} className="loggedin-nav-button">
              <Link to="/addressbook" className="nav-selected">
                <i className="fa fa-plus fa-lg nav-icon"></i>
                <div className="nav-icon-title">{strings.addressBook1}<br/>{strings.addressBook2}</div>
              </Link>
            </Col>
            <Col xs={4} className="loggedin-nav-button">
              <Link to="/accountinfo">
                <i className="fa fa-user-circle fa-lg nav-icon"></i>
                <div className="nav-icon-title">{strings.accountInformation1}<br/>{strings.accountInformation2}</div>
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