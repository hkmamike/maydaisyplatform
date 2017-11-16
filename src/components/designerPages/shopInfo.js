import React, { Component } from 'react'
import { firebaseAuth } from '../config/constants';
import { Link } from 'react-router-dom';
import { base } from '../config/constants';
import { Grid, Row, Col, FormGroup, FormControl, Button, Glyphicon } from 'react-bootstrap';
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

    backButton: 'Back',
    updateAccountButton: 'Update',

    accountUpdated: 'shop information has been updated',
    errorOccured: 'An error occured when updating shop information'

  },
  ch: {}
});

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

  handleAccountUpdate = (address, description) => {
    base.update(`florists/${this.props.designerCode}`, {
      data: {
          address: address,
          description: description
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
                  <Col xs={10} xsPush={2} smPush={5} mdPush={6}>
                    <Button bsStyle="" className="button" onClick={() => this.handleAccountUpdate(address, description)}>{strings.updateAccountButton}</Button>
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