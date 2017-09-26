import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel, Grid, Row, Col, DropdownButton, MenuItem, Button, Glyphicon } from 'react-bootstrap';
import { base } from '../config/constants';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en:{
      HK_Admiralty: 'HK-Admiralty',
      HK_Central: 'HK-Central',
      HK_ChaiWan: 'HK-Chai Wan, Home/Office',
      HK_ChaiWan_BMCPC: 'HK-Chai Wan Cemetery, BMCPC',
      HK_ChaiWan_CapeCollison: 'HK-Chai Wan Cemetery, Cape Collison',
      other: 'Other areas',
      subscribeButton: 'Subscribe',
      galleryButton: 'Gallery',
      subscriptionTitle: "Subscription",
      subscriptionSubtitle1_1: "MayDaisy is delivering to ",
      subscriptionSubtitle1_2: " Please log in to subscribe. These are the available plans in the region. Check out our gallery to see sample arrangements.",
      simple1_1: 'Simple ',
      simple1_2: 'HKD53',
      simple1_3: ' per week, delivery included',
      elegant1_1: 'Elegant ',
      elegant1_2: 'HKD93',
      elegant1_3: ' per week, delivery included',
      bloom1_1: 'Bloom ',
      bloom1_2: 'HKD223',
      bloom1_3: ' per week, delivery included',
      signUpTitle: 'Sign Up',
      signUpSubtitle: 'Service in each area will begin when 150 sign ups are collected. Rolling out One Bloom by region helps to keep the price affordable to all lovers. Fill out this form and we will send you an invitation when the time comes! For those who are not in Hong Kong, we will come to you soon ^.^',
      signUpFormTitle: 'Sign Up Form',
      signUpFormrecipientRegion: "Recipient's Region:",
      signUpSender: "Sender's Name:",
      signUpEmail: "Email:",
      signUpPhone: "Phone:",
      signUpTip: '*We will notify you via email when your region opens.',
      submitButton: 'Submit',
      submitButtonLoading: '...',
      submitButtonSubmitted: 'Submitted '

    },
    ch: {
      HK_Admiralty: '香港-金鐘',
      HK_Central: '香港-中環',
      HK_ChaiWan: '香港-柴灣(住家/辦公室)',
      HK_ChaiWan_BMCPC: '香港-柴灣墓園(歌連臣角十字架)',
      HK_ChaiWan_CapeCollison: '香港-柴灣墓園(華人永遠)',
      other: '其他地區',
      subscribeButton: '訂購',
      galleryButton: '相簿',
      subscriptionTitle: "鮮花訂購",
      subscriptionSubtitle1_1: "五月菊的服務已在 ",
      subscriptionSubtitle1_2: " 開啟! 如要訂購，請登入您的帳戶。以下是我們提供的計劃，相簿裏有花卉樣本以供參考。請注意，花匠會用時令花材設計每週的花卉，品種隨機。",
      simple1_1: '簡單 ',
      simple1_2: '每週 HKD53',
      simple1_3: '，包配送',
      elegant1_1: '優雅 ',
      elegant1_2: '每週 HKD93',
      elegant1_3: '，包配送',
      bloom1_1: '盛會 ',
      bloom1_2: '每週 HKD223',
      bloom1_3: '，包配送',
      signUpTitle: '報名',
      signUpSubtitle: '為了令五月菊價格更大眾化，每個地區的服務會在收集到150個報名之後開啟，屆時已報名的客人會收到電郵邀請。請填寫以下的報名表。如果您的送花地點不在香港，我們很快會來到您的城市 ^.^',
      signUpFormTitle: '報名表',
      signUpFormrecipientRegion: "收花地區:",
      signUpSender: "送花人名稱:",
      signUpEmail: "電郵:",
      signUpPhone: "電話:",
      signUpTip: '當您的地區開啟的時候我們會用電郵聯繫您',
      submitButton: '遞交',
      submitButtonLoading: '...',
      submitButtonSubmitted: '已遞交 '
    }
  });

const ButtonToLogin = ({ title, history }) => (
  <Button bsStyle="" className="button" onClick={() => history.push('/login')}>{strings.subscribeButton}</Button>
);

const ButtonToGallery = ({ title, history }) => (
  <Button bsStyle="" className="button" onClick={() => history.push('/gallery-simple')}>{strings.galleryButton}</Button>
);

class GreetingInBusinessHeader extends React.Component {
  render() {
    return (
      <div></div>
    )
  }
}
class GreetingInBusiness extends React.Component {

  componentWillReceiveProps (nextProps) {
    if (nextProps.languageChanged==='ch') {
      console.log('get language show ch - homepage');
      strings.setLanguage('ch');
    } else if (nextProps.languageChanged==='en') {
      console.log('get language show en - homepage');
      strings.setLanguage('en');
    }
  }

  componentWillMount() {
    strings.setLanguage(this.props.languageChanged);
  }

  render() {
    return (

        <Grid>
          <Row className="show-grid">
            <Col md={5} className="region-subscribe-shade">
              <h2 className="section-title"><strong>{strings.subscriptionTitle}</strong></h2>
              <div className="section-subtitle">{strings.subscriptionSubtitle1_1}<strong>{strings[this.props.selectRegion]}</strong>{strings.subscriptionSubtitle1_2}</div>
              <ul className="section-list">
                <li><strong>{strings.simple1_1}</strong>{strings.simple1_2}{strings.simple1_3}</li>
                <li><strong>{strings.elegant1_1}</strong>{strings.elegant1_2}{strings.elegant1_3}</li>
                <li><strong>{strings.bloom1_1}</strong>{strings.bloom1_2}{strings.bloom1_3}</li>
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

class GreetingDefault extends React.Component {

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

  render() {
    return (
      <div className="text-section">
        <div className="section-title">{strings.signUpTitle}</div>
        <div className="section-subtitle">{strings.signUpSubtitle}</div>
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
    base.push(`signUp/hongKong/areas/${selectRegion}/records`, {
      data: {name: name, email: email, phone: phone, date: new Date()}
    });
    this.setState({loading: false, formSubmitted: true});
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.submitSignUp(this.props.selectRegion, this.state.name, this.state.email, this.state.phone)
    this.setState({loading: true});
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.languageChanged==='ch') {
      console.log('get language show ch - homepage');
      strings.setLanguage('ch');
    } else if (nextProps.languageChanged==='en') {
      console.log('get language show en - homepage');
      strings.setLanguage('en');
    }
  }

  componentWillMount() {
    strings.setLanguage(this.props.languageChanged);
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
                <h2 className="form-title"><strong>{strings.signUpFormTitle}</strong></h2>
                <FormGroup controlId="region-signup-form-region" validationState={this.getSelectValidationState()}>
                  <ControlLabel>{strings.signUpSender}</ControlLabel>
                  <DropdownButton title={selectRegion} placeholder='Select Region' className="region-signup-select" id="bg-nested-dropdown" onSelect={this.handleSelect}>
                    <MenuItem eventKey="HK_Aberdeen">HK_Aberdeen</MenuItem>
                    <MenuItem eventKey="HK_Admiralty">HK_Admiralty</MenuItem>
                    <MenuItem eventKey="HK_ApLeiChau">HK_Ap Lei Chau</MenuItem>
                    <MenuItem eventKey="HK_Causeway Bay">HK_Causeway Bay</MenuItem>
                    <MenuItem eventKey="HK_Central">HK_Central</MenuItem>
                    <MenuItem eventKey="HK_ChaiWan">HK_Chai Wan</MenuItem>
                    <MenuItem eventKey="HK_DeepWaterBay">HK_Deep Water Bay</MenuItem>
                    <MenuItem eventKey="HK_FortressHill">HK_Fortress Hill</MenuItem>
                    <MenuItem eventKey="HK_HappyValley">HK_Happy Valley</MenuItem>
                    <MenuItem eventKey="HK_HengFaChuen">HK_Heng Fa Chuen</MenuItem>
                    <MenuItem eventKey="HK_KennedyTown">HK_Kennedy Town</MenuItem>
                    <MenuItem eventKey="HK_MidLevel">HK_Mid-Level</MenuItem>
                    <MenuItem eventKey="HK_NorthPoint">HK_North Point</MenuItem>
                    <MenuItem eventKey="HK_PokFuLam">HK_Pok Fu Lam</MenuItem>
                    <MenuItem eventKey="HK_QuarryBay">HK_Quarry Bay</MenuItem>
                    <MenuItem eventKey="HK_RepulseBay">HK_Repulse Bay</MenuItem>
                    <MenuItem eventKey="HK_SaiWanHo">HK_Sai Wan Ho</MenuItem>
                    <MenuItem eventKey="HK_SaiYingPun">HK_Sai Ying Pun</MenuItem>
                    <MenuItem eventKey="HK_Admiralty">HK_Admiralty</MenuItem>
                    <MenuItem eventKey="HK_ShauKeiWan">HK_Shau Kei Wan</MenuItem>
                    <MenuItem eventKey="HK_ShekO">HK_Shek O</MenuItem>
                    <MenuItem eventKey="HK_ShekTongTsui">HK_Shek Tong Tsui</MenuItem>
                    <MenuItem eventKey="HK_SheungWan">HK_Sheung Wan</MenuItem>
                    <MenuItem eventKey="HK_SiuSaiWan">HK_Siu Sai Wan</MenuItem>
                    <MenuItem eventKey="HK_Stanley">HK_Stanley</MenuItem>
                    <MenuItem eventKey="HK_TaiHang">HK_Tai Hang</MenuItem>
                    <MenuItem eventKey="HK_TaiKoo">HK_Tai Koo</MenuItem>
                    <MenuItem eventKey="HK_TinHau">HK_Tin Hau</MenuItem>
                    <MenuItem eventKey="HK_WanChai">HK_Wan Chai</MenuItem>
                    <MenuItem eventKey="HK_WongChukHang">HK_Wong Chuk Hang</MenuItem>
                    <MenuItem eventKey="KL_CheungShaWan">KL_Cheung Sha Wan</MenuItem>
                    <MenuItem eventKey="KL_ChoiHung">KL_Choi Hung</MenuItem>
                    <MenuItem eventKey="KL_DiamondHill">KL_Diamond Hill</MenuItem>
                    <MenuItem eventKey="KL_Ho ManTin">KL_Ho Man Tin</MenuItem>
                    <MenuItem eventKey="KL_HungHom">KL_Hung Hom</MenuItem>
                    <MenuItem eventKey="KL_Jordan">KL_Jordan</MenuItem>
                    <MenuItem eventKey="KL_KaiTak">KL_Kai Tak</MenuItem>
                    <MenuItem eventKey="KL_ KowloonBay">KL_ Kowloon Bay</MenuItem>
                    <MenuItem eventKey="KL_KowloonCity">KL_Kowloon City</MenuItem>
                    <MenuItem eventKey="KL_KowloonTong">KL_Kowloon Tong</MenuItem>
                    <MenuItem eventKey="KL_KwunTong">KL_Kwun Tong</MenuItem>
                    <MenuItem eventKey="KL_LaiChiKok">KL_Lai Chi Kok</MenuItem>
                    <MenuItem eventKey="KL_LamTin">KL_Lam Tin</MenuItem>
                    <MenuItem eventKey="KL_LeiYueMun">KL_Lei Yue Mun</MenuItem>
                    <MenuItem eventKey="KL_LokFu">KL_Lok Fu</MenuItem>
                    <MenuItem eventKey="KL_MeiFoo">KL_Mei Foo</MenuItem>
                    <MenuItem eventKey="KL_MongKok">KL_Mong Kok</MenuItem>
                    <MenuItem eventKey="KL_NgauChiWan">KL_Ngau Chi Wan</MenuItem>
                    <MenuItem eventKey="KL_NaguTauKok">KL_Nagu Tau Kok</MenuItem>
                    <MenuItem eventKey="KL_PrinceEdward">KL_Prince Edward</MenuItem>
                    <MenuItem eventKey="KL_SanPoKong">KL_San Po Kong</MenuItem>
                    <MenuItem eventKey="KL_ShamShuiPo">KL_Sham Shui Po</MenuItem>
                    <MenuItem eventKey="KL_TaiKokTsui">KL_Tai Kok Tsui</MenuItem>
                    <MenuItem eventKey="KL_ToKwaWan">KL_To Kwa Wan</MenuItem>
                    <MenuItem eventKey="KL_TsimShuiTsui">KL_Tsim Shui Tsui</MenuItem>
                    <MenuItem eventKey="KL_TszWanShan">KL_Tsz Wan Shan</MenuItem>
                    <MenuItem eventKey="KL_WongTaiSin">KL_Wong Tai Sin</MenuItem>
                    <MenuItem eventKey="KL_YauMaTei">KL_Yau Ma Tei</MenuItem>
                    <MenuItem eventKey="KL_YauTong">KL_Yau Tong</MenuItem>
                    <MenuItem eventKey="NT_ChekLapKok">NT_Chek Lap Kok</MenuItem>
                    <MenuItem eventKey="NT_CheungChau">NT_Cheung Chau</MenuItem>
                    <MenuItem eventKey="NT_DiscoveryBay">NT_Discovery Bay</MenuItem>
                    <MenuItem eventKey="NT_Fanling">NT_Fanling</MenuItem>
                    <MenuItem eventKey="NT_FoTan">NT_Fo Tan</MenuItem>
                    <MenuItem eventKey="NT_KwaiFong">NT_Kwai Fong</MenuItem>
                    <MenuItem eventKey="NT_KwaiChung">NT_Kwai Chung</MenuItem>
                    <MenuItem eventKey="NT_CheungChau">NT_Cheung Chau</MenuItem>
                    <MenuItem eventKey="NT_LaiKing">NT_Lai King</MenuItem>
                    <MenuItem eventKey="NT_LammaIsland">NT_Lamma Island</MenuItem>
                    <MenuItem eventKey="NT_LantauIsland">NT_Lantau Island</MenuItem>
                    <MenuItem eventKey="NT_LauFauShan">NT_Lau Fau Shan</MenuItem>
                    <MenuItem eventKey="NT_LoWu">NT_Lo Wu</MenuItem>
                    <MenuItem eventKey="NT_LokMaChau">NT_Lok Ma Chau</MenuItem>
                    <MenuItem eventKey="NT_MaOnShan">NT_Ma On Shan</MenuItem>
                    <MenuItem eventKey="NT_MaWan">NT_Ma Wan</MenuItem>
                    <MenuItem eventKey="NT_PengChau">NT_Peng Chau</MenuItem>
                    <MenuItem eventKey="NT_CheungChau">NT_Cheung Chau</MenuItem>
                    <MenuItem eventKey="NT_SaiKung">NT_Sai Kung</MenuItem>
                    <MenuItem eventKey="NT_ShaTauKok">NT_Sha Tau Kok</MenuItem>
                    <MenuItem eventKey="NT_ShaTin">NT_Sha Tin</MenuItem>
                    <MenuItem eventKey="NT_ShamTseng">NT_Sham Tseng</MenuItem>
                    <MenuItem eventKey="NT_SiuLekYuen">NT_Siu Lek Yuen</MenuItem>
                    <MenuItem eventKey="NT_TaKwuLing">NT_Ta Kwu Ling</MenuItem>
                    <MenuItem eventKey="NT_TaiO">NT_Tai O</MenuItem>
                    <MenuItem eventKey="NT_TaiPo">NT_Tai Po</MenuItem>
                    <MenuItem eventKey="NT_TaiWai">NT_Tai Wai</MenuItem>
                    <MenuItem eventKey="NT_TaiWo">NT_Tai Wo</MenuItem>
                    <MenuItem eventKey="NT_TaiWoHau">NT_Tai Wo Hau</MenuItem>
                    <MenuItem eventKey="NT_TinShuiWai">NT_Tin Shui Wai</MenuItem>
                    <MenuItem eventKey="NT_TiuKengLeng">NT_Tiu Keng Leng</MenuItem>
                    <MenuItem eventKey="NT_TseungKwanO">NT_Tseung Kwan O</MenuItem>
                    <MenuItem eventKey="NT_TsingYi">NT_Tsing Yi</MenuItem>
                    <MenuItem eventKey="NT_TsuenWan">NT_Tsuen Wan</MenuItem>
                    <MenuItem eventKey="NT_TuenMun">NT_Tuen Mun</MenuItem>
                    <MenuItem eventKey="NT_TungChung">NT_Tung Chung</MenuItem>
                    <MenuItem eventKey="NT_WuKaiSha">NT_Wu Kai Sha</MenuItem>
                    <MenuItem eventKey="NT_YuengLong">NT_Yueng Long</MenuItem>
                  </DropdownButton>
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup controlId="region-signup-form-name" validationState={this.getNameValidationState()}>
                  <ControlLabel>{strings.signUpSender}</ControlLabel>
                  <FormControl className="region-signup-form-field" type="text" value={this.state.name} placeholder="name" onChange={this.handleNameChange}/>
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup controlId="region-signup-form-email" validationState={this.getEmailValidationState()}>
                  <ControlLabel>{strings.signUpEmail}</ControlLabel>
                  <FormControl className="region-signup-form-field" type="text" value={this.state.email} placeholder="email" onChange={this.handleEmailChange}/>
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup controlId="region-signup-form-phone" validationState={this.getPhoneValidationState()}>
                  <ControlLabel>{strings.signUpPhone}</ControlLabel>
                  <FormControl className="region-signup-form-field" type="text" value={this.state.phone} placeholder="phone" onChange={this.handlePhoneChange}/>
                  <FormControl.Feedback />
                </FormGroup>
                {submitButton}
              </form>
              <div className="helper-text"><sup><strong>*</strong></sup>{strings.signUpTip}</div>
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
      <Button type="submit" className="region-select-submit-button">{strings.submitButton}</Button>
    )
  }
}
class SubmitButtonLoading extends React.Component {
  render() {
    return (
      <Button type="submit" className="region-select-submit-button" disabled>{strings.submitButtonLoading}</Button>
    )
  }
}
class SubmitButtonSubmited extends React.Component {
  render() {
    return (
      <Button type="submit" className="region-select-submit-button" disabled>{strings.submitButtonSubmitted}<Glyphicon glyph="ok" className="icons"/></Button>
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
        regionReselect: false,
        loading: true
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
        this.setState({regionStatus: data, loading: false});
      }
    });
    
    window.scrollTo(0, 0);
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

  componentWillReceiveProps (nextProps) {
    if (nextProps.languageChanged==='ch') {
      console.log('get language show ch - homepage');
      strings.setLanguage('ch');
    } else if (nextProps.languageChanged==='en') {
      console.log('get language show en - homepage');
      strings.setLanguage('en');
    }
  }

  componentWillMount() {
    strings.setLanguage(this.props.languageChanged);
  }

  render () {

    // var data = this.state.signUpsData;
    var regionStatus = this.state.regionStatus;
    var selectRegion = this.props.selectRegion;
    var regionReselect = this.state.regionReselect;
    var loadingState = this.state.loading;

    // var content = Object.keys(data).map(function(key) {
    //     return (
    //       <div key={key}>
    //         <span>{key}: {data[key].signUpCount}/150 ({data[key].status})</span>
    //       </div>
    //     )
    // })

    let greeting = null;
    let greetingHeader = null;
    if (loadingState) {
      greeting = <div className="loader-absolute"></div>
    }
    else if (regionStatus==="delivering" && regionReselect===false) {
      greetingHeader = <GreetingInBusinessHeader selectRegion={selectRegion} languageChanged={this.props.languageChanged}/>;
      greeting = <GreetingInBusiness selectRegion={selectRegion} languageChanged={this.props.languageChanged}/>;
    } else {
      greetingHeader = <GreetingDefault languageChanged={this.props.languageChanged}/>;
      greeting = <GreetingSignUp selectRegion={selectRegion} onRegionSelection={this.props.onRegionSelection} onRegionReselect={this.handleRegionReselect} languageChanged={this.props.languageChanged}/>;
    }

    return (
      <div>
        {greetingHeader}
        <div className="region-select-image">
          <div>
          {greeting}
          </div>
        </div>
        {/* For Showing Sign up status
        <div className="text-section">
          <div className="section-title"> Sign Ups Collected by Region</div>
          <div className="section-subtitle">This is the current status by region, we will begin to send out subscriptioin invitation for regions that have collected 150 sign ups. Rolling out One Bloom by region helps to keep the price affordable for all lovers. Join the movement and help to spread the word!</div>
          <div className="region-list">
            {content}
          </div>
        </div> */}
      </div>
    )
  }
}