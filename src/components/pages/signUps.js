import React, { Component } from 'react';
import { base } from '../config/constants';
import { FormGroup, FormControl, ControlLabel, Grid, Row, Col, DropdownButton, MenuItem } from 'react-bootstrap';

class GreetingInBusinessHeader extends React.Component {
  render() {
    return (
      <div className="text-section">
        <div className="section-title">Sign Up - One Bloom Movement</div>
        <div className="section-subtitle">Thank you for showing interest! Your receipient's area: <strong>{this.props.selectRegion}</strong> is still collecting sign ups. Service in this area will begin when 100-200 sign ups are collected. Rolling out One Bloom by region helps to keep the price affordable for all lovers. Fill out the form below and we will send you an invitation when the time comes!</div>
      </div>
    )
  }
}
class GreetingInBusiness extends React.Component {
  render() {
    return <div>{this.props.selectRegion} is open for subscription. Subscribe now!</div>;
  }
}
class GreetingSignUpHeader extends React.Component {
  render() {
    return (
      <div className="text-section">
        <div className="section-title">Sign Up - One Bloom Movement</div>
        <div className="section-subtitle">Thank you for showing interest! Your receipient's area: <strong>{this.props.selectRegion}</strong> is still collecting sign ups. Service in this area will begin when 150 sign ups are collected. Rolling out One Bloom by region helps to keep the price affordable to all lovers. Fill out this form and we will send you an invitation when the time comes!</div>
      </div>
    )
  }
}
class GreetingSignUp extends React.Component {

  constructor() {
    super();
    this.getNameValidationState = this.getNameValidationState.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.getEmailValidationState = this.getEmailValidationState.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.getPhoneValidationState = this.getPhoneValidationState.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      name: '',
      email: '',
      phone: ''
    }
  }

  getNameValidationState() {
    const nameLength = this.state.name.length;
    if (nameLength >= 2) return 'success';
    else if (nameLength > 0) return 'warning';
  }

  getEmailValidationState() {
    const emailLength = this.state.email.length;
    const email = this.state.email;
    if (email.indexOf("@") >= 0 && email.indexOf(".") >= 0) return 'success';
    else if (emailLength > 0) return 'warning';
  }

  getPhoneValidationState() {
    const phoneLength = this.state.phone.length;
    if (phoneLength >= 8) return 'success';
    else if (phoneLength > 0) return 'warning';
  }

  getSelectValidationState() {
    const regionSelected = this.props.selectRegion;
    if (regionSelected != "Select Region") return 'success';
  }


  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePhoneChange(e) {
    this.setState({ phone: e.target.value });
  }

  handleSelect = (eventKey) => {
    this.props.onRegionSelection(eventKey);
  }

  render() {

    var selectRegion = this.props.selectRegion;

    return (
      <div className="region-signup-grid">
        <Grid>
          <Row className="show-grid">
            <Col md={5} className="region-select-shade">
              <form className="region-signup-form">
                <h2 className="form-title"><strong>Sign Up Form</strong></h2>
                <FormGroup controlId="region-signup-form-region" validationState={this.getSelectValidationState()}>
                  <ControlLabel>Receipient's Region : </ControlLabel>
                  <DropdownButton title={selectRegion} className="region-signup-select" id="bg-nested-dropdown" onSelect={this.handleSelect}>
                    <MenuItem eventKey="Hong Kong - Aberdeen">Hong Kong - Aberdeen</MenuItem>
                    <MenuItem eventKey="Hong Kong - Admiralty">Hong Kong - Admiralty</MenuItem>
                    <MenuItem eventKey="Hong Kong - Ap Lei Chau">Hong Kong - Ap Lei Chau</MenuItem>
                    <MenuItem eventKey="Hong Kong - Causeway Bay">Hong Kong - Causeway Bay</MenuItem>
                    <MenuItem eventKey="Hong Kong - Central">Hong Kong - Central</MenuItem>
                    <MenuItem eventKey="Hong Kong - Chai Wan">Hong Kong - Chai Wan</MenuItem>
                    <MenuItem eventKey="Hong Kong - Deep Water Bay">Hong Kong - Deep Water Bay</MenuItem>
                    <MenuItem eventKey="Hong Kong - Fortress Hill">Hong Kong - Fortress Hill</MenuItem>
                    <MenuItem eventKey="Hong Kong - Happy Valley">Hong Kong - Happy Valley</MenuItem>
                    <MenuItem eventKey="Hong Kong - Heng Fa Chuen">Hong Kong - Heng Fa Chuen</MenuItem>
                    <MenuItem eventKey="Hong Kong - Kennedy Town">Hong Kong - Kennedy Town</MenuItem>
                    <MenuItem eventKey="Hong Kong - Mid-Level">Hong Kong - Mid-Level</MenuItem>
                    <MenuItem eventKey="Hong Kong - North Point">Hong Kong - North Point</MenuItem>
                    <MenuItem eventKey="Hong Kong - Pok Fu Lam">Hong Kong - Pok Fu Lam</MenuItem>
                    <MenuItem eventKey="Hong Kong - Quarry Bay">Hong Kong - Quarry Bay</MenuItem>
                    <MenuItem eventKey="Hong Kong - Repulse Bay">Hong Kong - Repulse Bay</MenuItem>
                    <MenuItem eventKey="Hong Kong - Sai Wan Ho">Hong Kong - Sai Wan Ho</MenuItem>
                    <MenuItem eventKey="Hong Kong - Sai Ying Pun">Hong Kong - Sai Ying Pun</MenuItem>
                    <MenuItem eventKey="Hong Kong - Admiralty">Hong Kong - Admiralty</MenuItem>
                    <MenuItem eventKey="Hong Kong - Shau Kei Wan">Hong Kong - Shau Kei Wan</MenuItem>
                    <MenuItem eventKey="Hong Kong - Shek O">Hong Kong - Shek O</MenuItem>
                    <MenuItem eventKey="Hong Kong - Shek Tong Tsui">Hong Kong - Shek Tong Tsui</MenuItem>
                    <MenuItem eventKey="Hong Kong - Sheung Wan">Hong Kong - Sheung Wan</MenuItem>
                    <MenuItem eventKey="Hong Kong - Siu Sai Wan">Hong Kong - Siu Sai Wan</MenuItem>
                    <MenuItem eventKey="Hong Kong - Stanley">Hong Kong - Stanley</MenuItem>
                    <MenuItem eventKey="Hong Kong - Tai Hang">Hong Kong - Tai Hang</MenuItem>
                    <MenuItem eventKey="Hong Kong - Tai Koo">Hong Kong - Tai Koo</MenuItem>
                    <MenuItem eventKey="Hong Kong - Tin Hau">Hong Kong - Tin Hau</MenuItem>
                    <MenuItem eventKey="Hong Kong - Wan Chai">Hong Kong - Wan Chai</MenuItem>
                    <MenuItem eventKey="Hong Kong - Wong Chuk Hang">Hong Kong - Wong Chuk Hang</MenuItem>
                    <MenuItem eventKey="Kowloon - Cheung Sha Wan">Kowloon - Cheung Sha Wan</MenuItem>
                    <MenuItem eventKey="Kowloon - Choi Hung">Kowloon - Choi Hung</MenuItem>
                    <MenuItem eventKey="Kowloon - Diamond Hill">Kowloon - Diamond Hill</MenuItem>
                    <MenuItem eventKey="Kowloon - Ho Man Tin">Kowloon - Ho Man Tin</MenuItem>
                    <MenuItem eventKey="Kowloon - Hung Hom">Kowloon - Hung Hom</MenuItem>
                    <MenuItem eventKey="Kowloon - Jordan">Kowloon - Jordan</MenuItem>
                    <MenuItem eventKey="Kowloon - Kai Tak">Kowloon - Kai Tak</MenuItem>
                    <MenuItem eventKey="Kowloon -  Kowloon Bay">Kowloon -  Kowloon Bay</MenuItem>
                    <MenuItem eventKey="Kowloon - Kowloon City">Kowloon - Kowloon City</MenuItem>
                    <MenuItem eventKey="Kowloon - Kowloon Tong">Kowloon - Kowloon Tong</MenuItem>
                    <MenuItem eventKey="Kowloon - Kwun Tong">Kowloon - Kwun Tong</MenuItem>
                    <MenuItem eventKey="Kowloon - Lai Chi Kok">Kowloon - Lai Chi Kok</MenuItem>
                    <MenuItem eventKey="Kowloon - Lam Tin">Kowloon - Lam Tin</MenuItem>
                    <MenuItem eventKey="Kowloon - Lei Yue Mun">Kowloon - Lei Yue Mun</MenuItem>
                    <MenuItem eventKey="Kowloon - Lok Fu">Kowloon - Lok Fu</MenuItem>
                    <MenuItem eventKey="Kowloon - Mei Foo">Kowloon - Mei Foo</MenuItem>
                    <MenuItem eventKey="Kowloon - Mong Kok">Kowloon - Mong Kok</MenuItem>
                    <MenuItem eventKey="Kowloon - Ngau Chi Wan">Kowloon - Ngau Chi Wan</MenuItem>
                    <MenuItem eventKey="Kowloon - Nagu Tau Kok">Kowloon - Nagu Tau Kok</MenuItem>
                    <MenuItem eventKey="Kowloon - Prince Edward">Kowloon - Prince Edward</MenuItem>
                    <MenuItem eventKey="Kowloon - San Po Kong">Kowloon - San Po Kong</MenuItem>
                    <MenuItem eventKey="Kowloon - Sham Shui Po">Kowloon - Sham Shui Po</MenuItem>
                    <MenuItem eventKey="Kowloon - Tai Kok Tsui">Kowloon - Tai Kok Tsui</MenuItem>
                    <MenuItem eventKey="Kowloon - To Kwa Wan">Kowloon - To Kwa Wan</MenuItem>
                    <MenuItem eventKey="Kowloon - Tsim Shui Tsui">Kowloon - Tsim Shui Tsui</MenuItem>
                    <MenuItem eventKey="Kowloon - Tsz Wan Shan">Kowloon - Tsz Wan Shan</MenuItem>
                    <MenuItem eventKey="Kowloon - Wong Tai Sin">Kowloon - Wong Tai Sin</MenuItem>
                    <MenuItem eventKey="Kowloon - Yau Ma Tei">Kowloon - Yau Ma Tei</MenuItem>
                    <MenuItem eventKey="Kowloon - Yau Tong">Kowloon - Yau Tong</MenuItem>
                    <MenuItem eventKey="New Territories - Chek Lap Kok">New Territories - Chek Lap Kok</MenuItem>
                    <MenuItem eventKey="New Territories - Cheung Chau">New Territories - Cheung Chau</MenuItem>
                    <MenuItem eventKey="New Territories - Discovery Bay">New Territories - Discovery Bay</MenuItem>
                    <MenuItem eventKey="New Territories - Fanling">New Territories - Fanling</MenuItem>
                    <MenuItem eventKey="New Territories - Fo Tan">New Territories - Fo Tan</MenuItem>
                    <MenuItem eventKey="New Territories - Kwai Fong">New Territories - Kwai Fong</MenuItem>
                    <MenuItem eventKey="New Territories - Kwai Chung">New Territories - Kwai Chung</MenuItem>
                    <MenuItem eventKey="New Territories - Cheung Chau">New Territories - Cheung Chau</MenuItem>
                    <MenuItem eventKey="New Territories - Lai King">New Territories - Lai King</MenuItem>
                    <MenuItem eventKey="New Territories - Lamma Island">New Territories - Lamma Island</MenuItem>
                    <MenuItem eventKey="New Territories - Lantau Island">New Territories - Lantau Island</MenuItem>
                    <MenuItem eventKey="New Territories - Lau Fau Shan">New Territories - Lau Fau Shan</MenuItem>
                    <MenuItem eventKey="New Territories - Lo Wu">New Territories - Lo Wu</MenuItem>
                    <MenuItem eventKey="New Territories - Lok Ma Chau">New Territories - Lok Ma Chau</MenuItem>
                    <MenuItem eventKey="New Territories - Ma On Shan">New Territories - Ma On Shan</MenuItem>
                    <MenuItem eventKey="New Territories - Ma Wan">New Territories - Ma Wan</MenuItem>
                    <MenuItem eventKey="New Territories - Peng Chau">New Territories - Peng Chau</MenuItem>
                    <MenuItem eventKey="New Territories - Cheung Chau">New Territories - Cheung Chau</MenuItem>
                    <MenuItem eventKey="New Territories - Sai Kung">New Territories - Sai Kung</MenuItem>
                    <MenuItem eventKey="New Territories - Sha Tau Kok">New Territories - Sha Tau Kok</MenuItem>
                    <MenuItem eventKey="New Territories - Sha Tin">New Territories - Sha Tin</MenuItem>
                    <MenuItem eventKey="New Territories - Sham Tseng">New Territories - Sham Tseng</MenuItem>
                    <MenuItem eventKey="New Territories - Siu Lek Yuen">New Territories - Siu Lek Yuen</MenuItem>
                    <MenuItem eventKey="New Territories - Ta Kwu Ling">New Territories - Ta Kwu Ling</MenuItem>
                    <MenuItem eventKey="New Territories - Tai O">New Territories - Tai O</MenuItem>
                    <MenuItem eventKey="New Territories - Tai Po">New Territories - Tai Po</MenuItem>
                    <MenuItem eventKey="New Territories - Tai Wai">New Territories - Tai Wai</MenuItem>
                    <MenuItem eventKey="New Territories - Tai Wo">New Territories - Tai Wo</MenuItem>
                    <MenuItem eventKey="New Territories - Tai Wo Hau">New Territories - Tai Wo Hau</MenuItem>
                    <MenuItem eventKey="New Territories - Tin Shui Wai">New Territories - Tin Shui Wai</MenuItem>
                    <MenuItem eventKey="New Territories - Tiu Keng Leng">New Territories - Tiu Keng Leng</MenuItem>
                    <MenuItem eventKey="New Territories - Tseung Kwan O">New Territories - Tseung Kwan O</MenuItem>
                    <MenuItem eventKey="New Territories - Tsing Yi">New Territories - Tsing Yi</MenuItem>
                    <MenuItem eventKey="New Territories - Tsuen Wan">New Territories - Tsuen Wan</MenuItem>
                    <MenuItem eventKey="New Territories - Tuen Mun">New Territories - Tuen Mun</MenuItem>
                    <MenuItem eventKey="New Territories - Tung Chung">New Territories - Tung Chung</MenuItem>
                    <MenuItem eventKey="New Territories - Wu Kai Sha">New Territories - Wu Kai Sha</MenuItem>
                    <MenuItem eventKey="New Territories - Yueng Long">New Territories - Yueng Long</MenuItem>
                  </DropdownButton>
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup controlId="region-signup-form-name" validationState={this.getNameValidationState()}>
                  <ControlLabel>Sender's Name :</ControlLabel>
                  <FormControl className="region-signup-form-field" type="text" value={this.state.name} placeholder="name" onChange={this.handleNameChange}/>
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup controlId="region-signup-form-email" validationState={this.getEmailValidationState()}>
                  <ControlLabel>Email :</ControlLabel>
                  <FormControl className="region-signup-form-field" type="text" value={this.state.email} placeholder="email" onChange={this.handleEmailChange}/>
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup controlId="region-signup-form-phone" validationState={this.getPhoneValidationState()}>
                  <ControlLabel>Phone :</ControlLabel>
                  <FormControl className="region-signup-form-field" type="text" value={this.state.phone} placeholder="phone" onChange={this.handlePhoneChange}/>
                  <FormControl.Feedback />
                </FormGroup>
              </form>
              <div className="helper-text"><sup><strong>*</strong></sup>We will notify you via email when your region opens.</div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
class GreetingOpps extends React.Component {
  render() {
    return <div>One bloom services will roll out one region at a time. We will begin to send out invitation when we collect 100 sign ups in an area.</div>;
  }
}

export default class SignUps extends Component {

  constructor() {
    super();
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
        signUpsData: {},
        regionStatus: '',
        regionUnlocked: false
    }
  }

  componentDidMount() {
    this.signUpsDataRef = base.bindToState('signUp/hongKong/areas', {
      context: this,
      state: 'signUpsData'
    });
    this.selectRegionRef = base.bindToState(`signUp/hongKong/areas/${this.props.selectRegion}/status`, {
      context: this,
      state: 'regionStatus'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.signUpsDataRef);
  } 

  handleSelect = (eventKey) => {
    this.props.onRegionSelection(eventKey);
  }

  render () {

    var data = this.state.signUpsData;
    var regionStatus = this.state.regionStatus;
    var selectRegion = this.props.selectRegion;


    var content = Object.keys(data).map(function(key) {
        return (
          <div key={key}>
            <span>{key}: {data[key].signUpCount}/150 ({data[key].status})</span>
          </div>
        )
    })

    let greeting = null;
    let greetingHeader = null;
    if (regionStatus==="in business") {
      greetingHeader = <GreetingInBusinessHeader selectRegion={selectRegion} />;
      greeting = <GreetingInBusiness selectRegion={selectRegion} />;
    } else if (regionStatus==="collecting sign ups") {
      greetingHeader = <GreetingSignUpHeader selectRegion={selectRegion} />;
      greeting = <GreetingSignUp selectRegion={selectRegion} onRegionSelection={this.props.onRegionSelection}/>;
    } else {
      greeting = <GreetingOpps/>;
    }

    return (
      <div>
        {greetingHeader}
        <div className="region-select-image">
          <div>
          {greeting}
          </div>
        </div>
        <div className="text-section">
          <div className="section-title"> Sign Ups Collected by Region</div>
          <div className="section-subtitle">This is the current status by region, we will begin to send out subscriptioin invitation for regions that have collected 150 sign ups. Rolling out One Bloom by region helps to keep the price affordable for all lovers. Join the movement and help to spread the word!</div>
          <div className="region-list">
            {content}
          </div>
        </div>
      </div>
    )
  }


}