import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel, Grid, Row, Col, DropdownButton, MenuItem, Button, Glyphicon } from 'react-bootstrap';
import { base } from '../config/constants';

const ButtonToLogin = ({ title, history }) => (
  <Button bsStyle="" className="button" onClick={() => history.push('/login')}>Login</Button>
);

const ButtonToGallery = ({ title, history }) => (
  <Button bsStyle="" className="button" onClick={() => history.push('/gallery')}>Gallery</Button>
);

class GreetingInBusinessHeader extends React.Component {
  render() {
    return (
      <div></div>
    )
  }
}
class GreetingInBusiness extends React.Component {
  render() {
    return (

        <Grid>
          <Row className="show-grid">
            <Col md={5} className="region-subscribe-shade">
              <h2 className="section-title"><strong>Subscribe</strong></h2>
              <div className="section-subtitle">One Bloom is delivering to <strong>{this.props.selectRegion}</strong> ! Please log in to subscribe. These are the available plans in the region:</div>
              <ul className="section-list">
                <li>Weekly Mystery Flower by designer (Monday) - HKD53 per week</li>
                <li>Weekly Mystery Rose by designer (Monday) - HKD53 per week</li>
              </ul>
              <div className="subscribe-buttons">
                <Route path="/" render={(props) => <ButtonToLogin {...props}/>} />
                <Route path="/" render={(props) => <ButtonToGallery {...props}/>} />
              </div>
            </Col>
          </Row>
        </Grid>

    )
  }
}
class GreetingSignUpHeader extends React.Component {
  render() {
    return (
      <div className="text-section">
        <div className="section-title">Sign Up</div>
        <div className="section-subtitle">Thank you for showing interest! Your receipient's area: <strong>{this.props.selectRegion}</strong> is still collecting sign ups. Service in this area will begin when 150 sign ups are collected. Rolling out One Bloom by region helps to keep the price affordable to all lovers. Fill out this form and we will send you an invitation when the time comes!</div>
      </div>
    )
  }
}
class GreetingDefault extends React.Component {
  render() {
    return (
      <div className="text-section">
        <div className="section-title">Sign Up</div>
        <div className="section-subtitle">Thank you for showing interest! Service in each area will begin when 150 sign ups are collected. Rolling out One Bloom by region helps to keep the price affordable to all lovers. Fill out this form and we will send you an invitation when the time comes!</div>;
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
      phone: '',
      loading: false,
      formSubmitted: false
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
    if (regionSelected !== "Select Region") return 'success';
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
    this.props.onRegionReselect(eventKey);
  }

  submitSignUp (selectRegion, name, email, phone) {
    var immediatelyAvailableReference = base.push(`signUp/hongKong/areas/${selectRegion}/records`, {
      data: {name: name, email: email, phone: phone, date: new Date()}
    });
    //available immediately, you don't have to wait for the callback to be called 
    // var generatedKey = immediatelyAvailableReference.key;
    this.setState({loading: false, formSubmitted: true});
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.submitSignUp(this.props.selectRegion, this.state.name, this.state.email, this.state.phone)
    this.setState({loading: true});
  }

  render() {

    var selectRegion = this.props.selectRegion;

    let submitButton = null;
    if (this.state.loading===false && this.state.formSubmitted===false) {
      submitButton = <SubmitButton/>;
    } else if (this.state.true===false && this.state.formSubmitted===false) {
      submitButton = <SubmitButtonLoading/>;
    } else {
      submitButton = <SubmitButtonSubmited/>;
    }

    return (
      <div className="region-signup-grid">
        <Grid>
          <Row className="show-grid">
            <Col md={5} className="region-select-shade">
              <form className="region-signup-form" onSubmit={this.handleSubmit}>
                <h2 className="form-title"><strong>Sign Up Form</strong></h2>
                <FormGroup controlId="region-signup-form-region" validationState={this.getSelectValidationState()}>
                  <ControlLabel>Receipient's Region : </ControlLabel>
                  <DropdownButton title={selectRegion} className="region-signup-select" id="bg-nested-dropdown" onSelect={this.handleSelect}>
                    <MenuItem eventKey="HK - Aberdeen">HK - Aberdeen</MenuItem>
                    <MenuItem eventKey="HK - Admiralty">HK - Admiralty</MenuItem>
                    <MenuItem eventKey="HK - Ap Lei Chau">HK - Ap Lei Chau</MenuItem>
                    <MenuItem eventKey="HK - Causeway Bay">HK - Causeway Bay</MenuItem>
                    <MenuItem eventKey="HK - Central">HK - Central</MenuItem>
                    <MenuItem eventKey="HK - Chai Wan">HK - Chai Wan</MenuItem>
                    <MenuItem eventKey="HK - Deep Water Bay">HK - Deep Water Bay</MenuItem>
                    <MenuItem eventKey="HK - Fortress Hill">HK - Fortress Hill</MenuItem>
                    <MenuItem eventKey="HK - Happy Valley">HK - Happy Valley</MenuItem>
                    <MenuItem eventKey="HK - Heng Fa Chuen">HK - Heng Fa Chuen</MenuItem>
                    <MenuItem eventKey="HK - Kennedy Town">HK - Kennedy Town</MenuItem>
                    <MenuItem eventKey="HK - Mid-Level">HK - Mid-Level</MenuItem>
                    <MenuItem eventKey="HK - North Point">HK - North Point</MenuItem>
                    <MenuItem eventKey="HK - Pok Fu Lam">HK - Pok Fu Lam</MenuItem>
                    <MenuItem eventKey="HK - Quarry Bay">HK - Quarry Bay</MenuItem>
                    <MenuItem eventKey="HK - Repulse Bay">HK - Repulse Bay</MenuItem>
                    <MenuItem eventKey="HK - Sai Wan Ho">HK - Sai Wan Ho</MenuItem>
                    <MenuItem eventKey="HK - Sai Ying Pun">HK - Sai Ying Pun</MenuItem>
                    <MenuItem eventKey="HK - Admiralty">HK - Admiralty</MenuItem>
                    <MenuItem eventKey="HK - Shau Kei Wan">HK - Shau Kei Wan</MenuItem>
                    <MenuItem eventKey="HK - Shek O">HK - Shek O</MenuItem>
                    <MenuItem eventKey="HK - Shek Tong Tsui">HK - Shek Tong Tsui</MenuItem>
                    <MenuItem eventKey="HK - Sheung Wan">HK - Sheung Wan</MenuItem>
                    <MenuItem eventKey="HK - Siu Sai Wan">HK - Siu Sai Wan</MenuItem>
                    <MenuItem eventKey="HK - Stanley">HK - Stanley</MenuItem>
                    <MenuItem eventKey="HK - Tai Hang">HK - Tai Hang</MenuItem>
                    <MenuItem eventKey="HK - Tai Koo">HK - Tai Koo</MenuItem>
                    <MenuItem eventKey="HK - Tin Hau">HK - Tin Hau</MenuItem>
                    <MenuItem eventKey="HK - Wan Chai">HK - Wan Chai</MenuItem>
                    <MenuItem eventKey="HK - Wong Chuk Hang">HK - Wong Chuk Hang</MenuItem>
                    <MenuItem eventKey="KL - Cheung Sha Wan">KL - Cheung Sha Wan</MenuItem>
                    <MenuItem eventKey="KL - Choi Hung">KL - Choi Hung</MenuItem>
                    <MenuItem eventKey="KL - Diamond Hill">KL - Diamond Hill</MenuItem>
                    <MenuItem eventKey="KL - Ho Man Tin">KL - Ho Man Tin</MenuItem>
                    <MenuItem eventKey="KL - Hung Hom">KL - Hung Hom</MenuItem>
                    <MenuItem eventKey="KL - Jordan">KL - Jordan</MenuItem>
                    <MenuItem eventKey="KL - Kai Tak">KL - Kai Tak</MenuItem>
                    <MenuItem eventKey="KL -  Kowloon Bay">KL -  Kowloon Bay</MenuItem>
                    <MenuItem eventKey="KL - Kowloon City">KL - Kowloon City</MenuItem>
                    <MenuItem eventKey="KL - Kowloon Tong">KL - Kowloon Tong</MenuItem>
                    <MenuItem eventKey="KL - Kwun Tong">KL - Kwun Tong</MenuItem>
                    <MenuItem eventKey="KL - Lai Chi Kok">KL - Lai Chi Kok</MenuItem>
                    <MenuItem eventKey="KL - Lam Tin">KL - Lam Tin</MenuItem>
                    <MenuItem eventKey="KL - Lei Yue Mun">KL - Lei Yue Mun</MenuItem>
                    <MenuItem eventKey="KL - Lok Fu">KL - Lok Fu</MenuItem>
                    <MenuItem eventKey="KL - Mei Foo">KL - Mei Foo</MenuItem>
                    <MenuItem eventKey="KL - Mong Kok">KL - Mong Kok</MenuItem>
                    <MenuItem eventKey="KL - Ngau Chi Wan">KL - Ngau Chi Wan</MenuItem>
                    <MenuItem eventKey="KL - Nagu Tau Kok">KL - Nagu Tau Kok</MenuItem>
                    <MenuItem eventKey="KL - Prince Edward">KL - Prince Edward</MenuItem>
                    <MenuItem eventKey="KL - San Po Kong">KL - San Po Kong</MenuItem>
                    <MenuItem eventKey="KL - Sham Shui Po">KL - Sham Shui Po</MenuItem>
                    <MenuItem eventKey="KL - Tai Kok Tsui">KL - Tai Kok Tsui</MenuItem>
                    <MenuItem eventKey="KL - To Kwa Wan">KL - To Kwa Wan</MenuItem>
                    <MenuItem eventKey="KL - Tsim Shui Tsui">KL - Tsim Shui Tsui</MenuItem>
                    <MenuItem eventKey="KL - Tsz Wan Shan">KL - Tsz Wan Shan</MenuItem>
                    <MenuItem eventKey="KL - Wong Tai Sin">KL - Wong Tai Sin</MenuItem>
                    <MenuItem eventKey="KL - Yau Ma Tei">KL - Yau Ma Tei</MenuItem>
                    <MenuItem eventKey="KL - Yau Tong">KL - Yau Tong</MenuItem>
                    <MenuItem eventKey="NT - Chek Lap Kok">NT - Chek Lap Kok</MenuItem>
                    <MenuItem eventKey="NT - Cheung Chau">NT - Cheung Chau</MenuItem>
                    <MenuItem eventKey="NT - Discovery Bay">NT - Discovery Bay</MenuItem>
                    <MenuItem eventKey="NT - Fanling">NT - Fanling</MenuItem>
                    <MenuItem eventKey="NT - Fo Tan">NT - Fo Tan</MenuItem>
                    <MenuItem eventKey="NT - Kwai Fong">NT - Kwai Fong</MenuItem>
                    <MenuItem eventKey="NT - Kwai Chung">NT - Kwai Chung</MenuItem>
                    <MenuItem eventKey="NT - Cheung Chau">NT - Cheung Chau</MenuItem>
                    <MenuItem eventKey="NT - Lai King">NT - Lai King</MenuItem>
                    <MenuItem eventKey="NT - Lamma Island">NT - Lamma Island</MenuItem>
                    <MenuItem eventKey="NT - Lantau Island">NT - Lantau Island</MenuItem>
                    <MenuItem eventKey="NT - Lau Fau Shan">NT - Lau Fau Shan</MenuItem>
                    <MenuItem eventKey="NT - Lo Wu">NT - Lo Wu</MenuItem>
                    <MenuItem eventKey="NT - Lok Ma Chau">NT - Lok Ma Chau</MenuItem>
                    <MenuItem eventKey="NT - Ma On Shan">NT - Ma On Shan</MenuItem>
                    <MenuItem eventKey="NT - Ma Wan">NT - Ma Wan</MenuItem>
                    <MenuItem eventKey="NT - Peng Chau">NT - Peng Chau</MenuItem>
                    <MenuItem eventKey="NT - Cheung Chau">NT - Cheung Chau</MenuItem>
                    <MenuItem eventKey="NT - Sai Kung">NT - Sai Kung</MenuItem>
                    <MenuItem eventKey="NT - Sha Tau Kok">NT - Sha Tau Kok</MenuItem>
                    <MenuItem eventKey="NT - Sha Tin">NT - Sha Tin</MenuItem>
                    <MenuItem eventKey="NT - Sham Tseng">NT - Sham Tseng</MenuItem>
                    <MenuItem eventKey="NT - Siu Lek Yuen">NT - Siu Lek Yuen</MenuItem>
                    <MenuItem eventKey="NT - Ta Kwu Ling">NT - Ta Kwu Ling</MenuItem>
                    <MenuItem eventKey="NT - Tai O">NT - Tai O</MenuItem>
                    <MenuItem eventKey="NT - Tai Po">NT - Tai Po</MenuItem>
                    <MenuItem eventKey="NT - Tai Wai">NT - Tai Wai</MenuItem>
                    <MenuItem eventKey="NT - Tai Wo">NT - Tai Wo</MenuItem>
                    <MenuItem eventKey="NT - Tai Wo Hau">NT - Tai Wo Hau</MenuItem>
                    <MenuItem eventKey="NT - Tin Shui Wai">NT - Tin Shui Wai</MenuItem>
                    <MenuItem eventKey="NT - Tiu Keng Leng">NT - Tiu Keng Leng</MenuItem>
                    <MenuItem eventKey="NT - Tseung Kwan O">NT - Tseung Kwan O</MenuItem>
                    <MenuItem eventKey="NT - Tsing Yi">NT - Tsing Yi</MenuItem>
                    <MenuItem eventKey="NT - Tsuen Wan">NT - Tsuen Wan</MenuItem>
                    <MenuItem eventKey="NT - Tuen Mun">NT - Tuen Mun</MenuItem>
                    <MenuItem eventKey="NT - Tung Chung">NT - Tung Chung</MenuItem>
                    <MenuItem eventKey="NT - Wu Kai Sha">NT - Wu Kai Sha</MenuItem>
                    <MenuItem eventKey="NT - Yueng Long">NT - Yueng Long</MenuItem>
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
                {submitButton}
              </form>
              <div className="helper-text"><sup><strong>*</strong></sup>We will notify you via email when your region opens.</div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
class SubmitButton extends React.Component {
  render() {
    return (
      <Button type="submit" className="region-select-submit-button">Submit</Button>
    )
  }
}
class SubmitButtonLoading extends React.Component {
  render() {
    return (
      <Button type="submit" className="region-select-submit-button" disabled>...</Button>
    )
  }
}
class SubmitButtonSubmited extends React.Component {
  render() {
    return (
      <Button type="submit" className="region-select-submit-button" disabled>Submitted <Glyphicon glyph="ok" className="icons"/></Button>
    )
  }
}

export default class SignUps extends Component {

  constructor() {
    super();
    this.handleRegionReselect = this.handleRegionReselect.bind(this);
    this.state = {
        signUpsData: {},
        regionStatus: '',
        regionUnlocked: false,
        regionReselect: false
    }
  }

  componentDidMount() {
    this.signUpsDataRef = base.bindToState('signUp/hongKong/areas', {
      context: this,
      state: 'signUpsData'
    });

    base.fetch(`signUp/hongKong/areas/${this.props.selectRegion}/status`, {
      context: this,
      then(data) {
        this.setState({regionStatus: data});
      }
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.signUpsDataRef);
  }

  handleRegionReselect(region) {
    base.fetch(`signUp/hongKong/areas/${region}/status`, {
      context: this,
      then(data) {
        this.setState({regionStatus: data});
      }
    });
  }

  render () {

    var data = this.state.signUpsData;
    var regionStatus = this.state.regionStatus;
    var selectRegion = this.props.selectRegion;
    var regionReselect = this.state.regionReselect;

    var content = Object.keys(data).map(function(key) {
        return (
          <div key={key}>
            <span>{key}: {data[key].signUpCount}/150 ({data[key].status})</span>
          </div>
        )
    })

    let greeting = null;
    let greetingHeader = null;
    if (regionStatus==="delivering" && regionReselect===false) {
      greetingHeader = <GreetingInBusinessHeader selectRegion={selectRegion} />;
      greeting = <GreetingInBusiness selectRegion={selectRegion} />;
    } else if (regionStatus==="collecting sign ups" && regionReselect===false) {
      greetingHeader = <GreetingSignUpHeader selectRegion={selectRegion} />;
      greeting = <GreetingSignUp selectRegion={selectRegion} onRegionSelection={this.props.onRegionSelection} onRegionReselect={this.handleRegionReselect}/>;
    } else {
      greetingHeader = <GreetingDefault/>;
      greeting = <GreetingSignUp selectRegion={selectRegion} onRegionSelection={this.props.onRegionSelection} onRegionReselect={this.handleRegionReselect}/>;
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