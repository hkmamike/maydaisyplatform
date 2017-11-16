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
    designsUpdate: 'Details & Update',
    referenceCode: 'Reference Code:',

    to: 'To:',
    deliveryDay: 'Delivery Day:',
    detailsButton: 'Details',



    backButton: 'Back',
    updateButton: 'Update',
     
    
    progressUpdateTitle: 'Progress Update - Order Received',
    progressUpdateText1: 'Update customers on delivery progress keeps them happy.',
    progressUpdateText2: 'Florist who give timely update receive 50% more 5 stars reviews and are twice as likely to get customer referrals.',
    progressUpdateText3: 'When you click the red button below, we will send an email to the customer on your behalf to acknowledge that you have received this order.',

    orderUpdate: 'Your update has been sent.',


    progressUpdate2Title: 'Progress Update - Order Fulfilled',
    progressUpdate2Text1: 'Timely update keeps customers happy.',
    progressUpdate2Text2: 'According to our study, florists who give timely update receive 50% more 5 stars reviews and are twice as likely to get customer referrals.',
    progressUpdate2Text3: 'When you click the red button below, we will send an email to the customer on your behalf to let him/her know that this order has been fulfilled.',


    cancelButton: 'Close',


    noOrder: 'You do not have any design listed.',


    errorOccured: 'An error occured, please try again later.',
    reviewSubmitted: 'Your review has been submited.',
    browseMarket: 'Browse Market',

    order_submitted: 'Order Submitted',
    order_delivered: 'Order Delivered',
    order_received: 'Order Received'


  },
  ch: {}
});

const ButtonToMarket = ({ title, history }) => (
  <Button bsStyle="" className="no-sub-button" onClick={() => history.push('/arrangements')}>{strings.browseMarket}</Button>
);

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
            img: null
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

    handleDesignUpdate = (name, price, description, color, flower) => {
        this.props.onHandleDesignUpdate(this.props.selectedDesign, name, price, description, color, flower);
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
    handleFileChange = (dataURI) => {
        this.setState({
            img: dataURI,
            croppedImg: this.state.croppedImg,
            cropperOpen: true
          });
    }
    handleCrop = (dataURI) => {
        this.setState({
            cropperOpen: false,
            img: null,
            croppedImg: dataURI
          });
    }
    handleRequestHide = () => {
        this.setState({
            cropperOpen: false
          });
    }
    onDrop = (picture) => {
        this.setState({
            pictures: picture,
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
                  <div>{designDetails.color}</div>
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
                    <div>{designDetails.flower}</div>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={5}>
                  </Col>
                  <Col sm={4}>
                    <Button bsStyle="" className="button sub-details-back" onClick={() => this.handleBack()}>{strings.backButton}</Button>
                    <Button bsStyle="" className="button sub-details-update" onClick={() => this.handleDesignUpdate(name, price, description, color, flower)}>{strings.updateButton}</Button>
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
      infoMessage: null
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
  handleDesignUpdate = (selectedDesign, name, price, description, color, flower) => {
    base.update(`arrangementsList/${selectedDesign}`, {
        data: {
            name: name,
            price: price,
            description: description,
            color: color,
            flower: flower
        }
      }).then(() => 
            this.setState({ infoMessage: 'design has been updated'})
        ).catch(err => {
            console.log('An error occured when updating design.');
            this.setState({ infoMessage: 'An error occured when updating design'});
        });
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
              <Col xs={12}>
                  <div className="flow-selected">{strings.allDesigns}</div>
                    <i className="fa fa-chevron-right"></i>
                  <div>{strings.designsUpdate}</div>
              </Col>
              <div className="horizontal-line"></div>
            </Row>
          </Grid>
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
    }

    return (
      <div className="loggedin-background">
        <Grid>
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