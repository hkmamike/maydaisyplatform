import React, { Component } from 'react'
import { firebaseAuth } from '../config/constants';
import { Link, Route } from 'react-router-dom';
import { FormGroup, FormControl, Grid, Row, Col, Button, Glyphicon, Modal } from 'react-bootstrap';
import { base } from '../config/constants';
import LocalizedStrings from 'react-localization';

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
    deleteText1: 'The Addres Book helps you speed up the checkout process.',
    deleteText2: "To Proceed deleting this record, click the 'delete' button below.",
    buttonToShop: 'My Shop',
    buttonToAccount: 'My Account',
    deleteAddress: 'Delete Address',
    deleteSuccess: 'Address has been removed from record',
  },
  ch: {
    orderHistory1: ' ',
    orderHistory2: '購買記錄',
    addressBook1: ' ',
    addressBook2: '地址記錄',
    accountInformation1: ' ',
    accountInformation2: '帳戶資料',
    allAddresses: '所有地址',
    detailsUpdate: '詳情+更新',
    company: '地點:',
    deliveryInstruction: '送花指示:',
    recipient: '收花人:',
    address: '地址:',
    recipientNum: "收花人電話:",
    backButton: '返回',
    updateButton: '更新',
    cancelButton: '取消',
    deleteButton: '刪除',
    noAddress: '您目前並沒有地址記錄。',
    errorOccured: '系統錯誤，請稍後再試。',
    addressUpdated: '地址已更新。',
    deleteText1: '地址記錄令您的下單更快捷。',
    deleteText2: "如要繼續刪取這個地址，請按下'刪除'鈕扣。",
    buttonToShop: '我的花店',
    buttonToAccount: '我的帳戶',
    deleteAddress: '刪除地址',
    deleteSuccess: '地址已刪除。',
  }
});

const ButtonToShop = ({ title, history }) => (
  <Button bsStyle="" className="head-button-white" onClick={() => history.push('/ordersdashboard')}>{strings.buttonToShop}</Button>
);

const ButtonToAccount = ({ title, history }) => (
  <Button bsStyle="" className="head-button-teal" onClick={() => history.push('/orderhistory')}>{strings.buttonToAccount}</Button>
);

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
      this.props.onDeleteAddress();
      this.close();
    }
    render() {
      return (
        <div>
          <Button bsStyle="" className="address-delete-button" onClick={this.open}>{strings.deleteButton}</Button>
          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title><strong>{strings.deleteAddress}</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{strings.deleteText1}</p>
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
                    this.setState({
                        addressDetails: data, 
                        loading: false, 
                        recipient: data.recipient,
                        company: data.company,
                        address: data.address,
                        deliveryInstruction: data.deliveryInstruction,
                        recipientNum: data.recipientNum,
                        uid: user.uid
                    });
                }
            });
        });
    }
    componentWillUnmount () {
        //returns the unsubscribe function
        this.fireBaseListenerForAddressDetails && this.fireBaseListenerForAddressDetails();
        this.fireBaseListenerForDeleteAddress && this.fireBaseListenerForDeleteAddress();
    }


    handleRecipientChange = (e) => {
        this.setState({ recipient: e.target.value });
    }
    handleRecipientNumChange = (e) => {
        this.setState({ recipientNum: e.target.value });
    }
    handleCompanyChange = (e) => {
        this.setState({ company: e.target.value });
    }
    handleAddressChange = (e) => {
        this.setState({ address: e.target.value });
    }
    handleDeliveryInstructionChange = (e) => {
        this.setState({ deliveryInstruction: e.target.value });
    }

    handleBack = () => {
        this.props.onHandleBack();
    }
    handleUpdate = () => {
        this.props.onHandleAddressUpdate(this.state.recipient, this.state.recipientNum, this.state.company, this.state.address, this.state.deliveryInstruction);
    }
    handleDelete = () => {
        this.fireBaseListenerForDeleteAddress = firebaseAuth().onAuthStateChanged((user) => {
            base.remove(`users/${user.uid}/address/${this.props.selectedAddress}`).then(() => {
                this.setState({ InfoMessage: strings.deleteSuccess}, () => this.props.onAddressDeleteSuccess())
            }).catch(error => {
                //handle error
            });
        });
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
            { this.state.InfoMessage &&
              <div className="alert alert-success update-message" role="alert">
                <Glyphicon glyph="exclamation-sign" className="icons"/>&nbsp;{this.state.InfoMessage} 
              </div>
            }
            { this.props.addressInfoMessage &&
              <div className="alert alert-success update-message" role="alert">
                <Glyphicon glyph="exclamation-sign" className="icons"/>&nbsp;{this.props.addressInfoMessage} 
              </div>
            }
            <div className="address-details">
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col xs={12} sm={3}>
                      <div><strong>{strings.recipient}</strong></div>
                  </Col>
                  <Col xs={8} sm={6} md={4}>
                    <FormControl className="data-field-update" type="text" value={this.state.recipient} onChange={this.handleRecipientChange}/>
                  </Col>
                  <Col xs={2} sm={2} md={3}>
                    <DeleteAddressModal
                        onDeleteAddress={this.handleDelete}
                    />
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col sm={3}>
                      <div><strong>{strings.recipientNum}</strong></div>
                  </Col>
                  <Col sm={6} md={4}>
                    <FormControl className="data-field-update" type="text" value={this.state.recipientNum} onChange={this.handleRecipientNumChange}/>
                  </Col>
                  <Col sm={2} md={3}></Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col sm={3}>
                      <div><strong>{strings.company}</strong></div>
                  </Col>
                  <Col sm={6} md={4}>
                  <FormControl className="data-field-update" type="text" value={this.state.company} onChange={this.handleCompanyChange}/>
                  </Col>
                  <Col sm={2} md={3}></Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col sm={3}>
                      <div><strong>{strings.address}</strong></div>
                  </Col>
                  <Col sm={6} md={4}>
                    <FormControl componentClass="textarea" className="data-field-update" value={this.state.address} onChange={this.handleAddressChange}/>
                  </Col>
                  <Col sm={2} md={3}></Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col sm={3}>
                      <div><strong>{strings.deliveryInstruction}</strong></div>
                  </Col>
                  <Col sm={6} md={4}>
                    <FormControl componentClass="textarea" className="data-field-update" type="text" value={this.state.deliveryInstruction} onChange={this.handleDeliveryInstructionChange}/>
                  </Col>
                  <Col sm={2} md={3}></Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col xs={1} sm={5}>
                  </Col>
                  <Col xs={10} sm={4}>
                    <Button bsStyle="" className="button button-back" onClick={() => this.handleBack()}>{strings.backButton}</Button>
                    <Button bsStyle="" className="button button-update" onClick={() => this.handleUpdate()}>{strings.updateButton}</Button>
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
    this.handleAddressUpdate = this.handleAddressUpdate.bind(this);
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
    this.setState({addressDetailsStatus: 1, selectedAddress: chosenKey}, () => window.scrollTo(0, 0));
  }
  handleBack() {
    this.setState({addressDetailsStatus: 0}, () => window.scrollTo(0, 0));
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
        this.setState({ addressInfoMessage: strings.addressUpdated}, () => setTimeout(() => { this.setState({addressDetailsStatus:0})}, 1000))
      ).catch(err => {
        console.log('An error occured when updating address.', err);
        this.setState({ addressInfoMessage: strings.errorOccured});
      });
  }
  addressDeleteSuccess() {
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
    var addressHeader;

    // console.log('data check: ', Object.keys(data).length);
    if (Object.keys(data).length===0) {
      addressHeader = null;
      addresses = (
        <div className="no-sub-section">            
          <div className="center-text">{strings.noAddress}</div>
        </div>
      )
    } else {
      addressHeader = (
        <Grid>
          <Row className="address-list-titles">
            <Col xs={6}>{strings.recipient}</Col>
            <Col xs={6}>{strings.address}</Col>
          </Row>
        </Grid>
      )
      addresses = Object.keys(data).map(function(key) {
        var chosenKey = data[key].referenceCode;
        return (
          <div key={key}>
            <Grid>
              <div className="address-list-item" onClick={() => this.handleChooseAddress(chosenKey)}>
                <Row className="show-grid">
                    <Col xs={6}>
                      <div>{data[key].recipient}</div>
                    </Col>
                    <Col xs={6}>
                    <div>{data[key].address}</div>
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
          {addressHeader}
          {addresses.reverse()}
        </div>
      )
    } else if (addressDetailsStatus===1) {
      content = (
        <div>
          <Grid>
            <Row className="show-grid loggedin-flow">
              <div className="horizontal-line"></div>
              <Col xs={12}>
                  <div className='flow-nav' onClick={() => this.setState({addressDetailsStatus: 0}, () => window.scrollTo(0, 0))}>{strings.allAddresses}</div>
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
          <Row className="head-button-inline">
            <div className="head-button-section">            
              <Route path="/" render={(props) => <ButtonToShop {...props}/>} />
            </div>
            <div className="head-button-section">            
              <Route path="/" render={(props) => <ButtonToAccount {...props}/>} />
            </div>
          </Row>
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
              <Link to="/userinfo">
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