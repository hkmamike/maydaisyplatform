import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import { firebaseAuth } from '../config/constants';
import { Link, Route } from 'react-router-dom';
import { base } from '../config/constants';
import { Grid, Row, Col, FormGroup, FormControl, Button, Glyphicon, Modal, DropdownButton, MenuItem, HelpBlock} from 'react-bootstrap';
import LocalizedStrings from 'react-localization';
import AvatarCropper from 'react-avatar-cropper';

let strings = new LocalizedStrings({
  en:{
    ordersDashboard1: 'Orders',
    ordersDashboard2: 'Dashboard',
    designs1: "Shop's",
    designs2: 'Designs',
    shopInformation1: 'Shop',
    shopInformation2: 'Information',


    shopName: 'ShopName:',
    shopID: 'shopID:',
    address: 'Address:',
    description: 'Description:',
    leadTime: 'Lead Time (days):',
    promoCodeA: 'Promo-Code A:',
    promoCodeATip: 'Best promo-codes are 4-10 alphanumeric characters, case insensitive. When customers enter this code, they will be offered PriceA for the designs according to your setting. Leave blank to disable to this feature.',
    promoCodeB: 'Promo-Code B:',
    promoCodeBTip: 'Best promo-codes are 4-10 alphanumeric characters, case insensitive. When customers enter this code, they will be offered PriceB for the designs according to your setting. Leave blank to disable this feature.',
    deliveryRegions: 'Delivery Regions:',
    openDays: 'Open on:',

    setting: 'Setting',
    shopPage: 'shop page',

    deliveryRegionSettingsTitle: 'Delivery Setting by Region',
    deliveryRegionSettingsText1: 'You can choose the regions to cover here and specify delivery fee.',

    HK_CentralWestern: 'Central & Western',
    HK_Eastern: 'Eastern',
    HK_Southern: 'Southern',
    HK_WanChai: 'Wan Chai',
    KL_KowloonCity: 'Kowloon City',
    KL_KwunTong: 'Kwun Tong',
    KL_ShamShuiPo: 'Sham Shui Po',
    KL_WongTaiSin: 'Wong Tai Sin',
    KL_YauTsimMong: 'Yau Tsim Mong',
    NT_Islands: 'Outlying Islands',
    NT_KwaiTsing: 'Kwai Tsing',
    NT_North: 'Northern Region',
    NT_SaiKung: 'Sai Kung',
    NT_ShaTin: 'Sha Tin',
    NT_TaiPo: 'Tai Po',
    NT_TsuenWan: 'Tsuen Wan',
    NT_TuenMun: 'Tuen Mun',
    NT_YuenLong: 'Yuen Long',
    specialPickUpLocation: 'Pick Up Spot',

    n: 'not delivering',
    free: 'free delivery',
    fifty: '$50',
    hundred: '$100',
    hundredfifty: '$150',

    backButton: 'Back',
    updateButton: 'Update',

    open: 'open',
    close: 'close',

    openDaysSettingsTitle: 'Opening Days Settings',
    openDaysSettingsText1: 'MayDaisy is a hobbyist and independent artists friendly community. We understand that you have other responsibilities in life and may not want to open shop on everyday.',
    openDaysSettingsText2: 'Here, you can choose which days to allow customers to place orders on.',

    shopInfoUpdated: 'shop information has been updated',
    errorOccured: 'An error occured when updating shop information',

    buttonToShop: 'My Shop',
    buttonToAccount: 'My Account',

    monday: 'Monday:',
    tuesday: 'Tuesday:',
    wednesday: 'Wednesday:',
    thursday: 'Thursday:',
    friday: 'Friday:',
    saturday: 'Saturday:',
    sunday: 'Sunday:',

    chooseButton: 'Choose',
    shopProfile: 'Image:',

    facebook: 'Facebook:',
    instagram: 'Instagram:',

    deliveryInfo: 'Delivery Policy:',
    deliveryInfoTip: 'A copy of this will be shown on the "Delivery Info" tab on each of your arrangement page. If you do not specify a delivery policy, the standard MayDaisy delivery policy will be displayed.',

    specialPickUp: 'Self-PickUp Policy:',
    specialPickUpTip: "If you offer free pickup at special locations, display location here and specify pickup policy. You would also need to enable 'Pick Up Spot' under 'Delivery Settings'.",

    leadTimeTip: '*Put ""1" if next day delivery is available, "0" if sameday delivery is available, so on. For sameday delivery, platform wise cutoff time is 1p.m. HKT.'
  },
  ch: {
    ordersDashboard1: ' ',
    ordersDashboard2: '定單列表',
    designs1: " ",
    designs2: '貨品列表',
    shopInformation1: ' ',
    shopInformation2: '店舖資料',

    shopName: '店舖名稱:',
    shopID: '店舖ID:',
    address: '地址:',
    description: '店舖簡介:',
    leadTime: '最快交貨(日):',
    promoCodeA: '折扣碼A:',
    promoCodeATip: '折扣碼建議為4-10個英文字母或數字，大小寫無分。客人可以用這個折扣碼解鎖貨品的價格A。如要關閉折扣碼功能請留空。',
    promoCodeB: '折扣碼B:',
    promoCodeBTip: '折扣碼建議為4-10個英文字母或數字，大小寫無分。客人可以用這個折扣碼解鎖貨品的價格B。如要關閉折扣碼功能請留空。',
    deliveryRegions: '送貨區域:',
    openDays: '辦公日:',

    setting: '設定',
    shopPage: '店舖主頁',

    deliveryRegionSettingsTitle: '區域送貨服務設定',
    deliveryRegionSettingsText1: '您可以在這裡選擇服務區域和設定送貨費用。',

    HK_CentralWestern: '中西區',
    HK_Eastern: '東區',
    HK_Southern: '南區',
    HK_WanChai: '灣仔區',
    KL_KowloonCity: '九龍城區',
    KL_KwunTong: '觀塘區',
    KL_ShamShuiPo: '深水埗區',
    KL_WongTaiSin: '黃大仙區',
    KL_YauTsimMong: '油尖旺區',
    NT_Islands: '離島區',
    NT_KwaiTsing: '葵青區',
    NT_North: '北區',
    NT_SaiKung: '西貢區',
    NT_ShaTin: '沙田區',
    NT_TaiPo: '大埔區',
    NT_TsuenWan: '荃灣區',
    NT_TuenMun: '屯門區',
    NT_YuenLong: '元朗區',
    specialPickUpLocation: '自取地點',

    n: '不覆蓋',
    free: '免費送貨',
    fifty: '$50',
    hundred: '$100',
    hundredfifty: '$150',

    backButton: '返回',
    updateButton: '更新',

    open: '營業',
    close: '休息',

    openDaysSettingsTitle: '營業日設定',
    openDaysSettingsText1: '五月菊是一個為花店和獨立藝術家以設的平台。',
    openDaysSettingsText2: '如果您不想每天開店，可以在這裡設定營業時間。',

    shopInfoUpdated: '店舖資料已更新。',
    errorOccured: '系統錯誤，請稍後再試。',

    buttonToShop: '我的花店',
    buttonToAccount: '我的帳戶',

    monday: '星期一:',
    tuesday: '星期二:',
    wednesday: '星期三:',
    thursday: '星期四:',
    friday: '星期五:',
    saturday: '星期六:',
    sunday: '星期日:',

    chooseButton: '選擇',
    shopProfile: '店舖標誌:',

    facebook: 'Facebook:',
    instagram: 'Instagram:',

    deliveryInfo: '送貨詳情:',
    deliveryInfoTip: '送貨詳情會在貨品頁中顯示給客人。如果您未有選寫送貨詳情，系統將會顯示五月菊的標準送貨政策。',

    specialPickUp: '自取條款:',
    specialPickUpTip: '如果您在特定地點給客人免費自取，請列出地點，並注明自取條款。不要忘記在區域送貨開啟自取地點噢。',

    leadTimeTip: '*如果最快交貨時間為下一天，請填"1"，如此類推。如您的店提供即日送貨，請填"0"。 所有五月菊的即日送貨的標準訂單截止時間為香港時間下午1時。'
  }
});

const ButtonToShop = ({ title, history }) => (
  <Button bsStyle="" className="head-button-teal" onClick={() => history.push('/ordersdashboard')}>{strings.buttonToShop}</Button>
);

const ButtonToAccount = ({ title, history }) => (
  <Button bsStyle="" className="head-button-white" onClick={() => history.push('/orderhistory')}>{strings.buttonToAccount}</Button>
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
        <div>
          <label>{strings.chooseButton}<input ref="in"type="file" accept="image/*" onChange={this.handleFile}/></label>
        </div>
      );
  }
}

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
      default: 
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
    if (this.state.sundayFlag === 'close') {
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
              <Button bsStyle="" className="shop-settings-button"onClick={this.open}>{strings.setting}</Button>
              <Modal show={this.state.showModal} onHide={this.close}>

                  <div>
                      <Modal.Header closeButton>
                      <Modal.Title><strong>{strings.openDaysSettingsTitle}</strong></Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <p>{strings.openDaysSettingsText1}</p>
                          <p>{strings.openDaysSettingsText2}</p>
                          <Grid>
                            <div>
                              <Row className="show-grid">
                                <FormGroup>
                                  <Col sm={1}></Col>
                                  <Col sm={3}>
                                    {strings.monday}
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
                                  {strings.tuesday}
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
                                  {strings.wednesday}
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
                                  {strings.thursday}
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
                                  {strings.friday}
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
                                  {strings.saturday}
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
                                  {strings.sunday}
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
                  <Button bsStyle="" className="button" onClick={this.handleOpenDaysUpdate}>{strings.updateButton}</Button>
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
    console.log('eventkey is ', eventKey);
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
      var updates = {};

      firebase.database().ref('arrangementsList')
      .orderByChild('florist')
      .equalTo(this.props.designerCode)
      .once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            updates[childSnapshot.val().id + '/deliveryAreas'] = availableRegions;
        });
        firebase.database().ref('arrangementsList').update(updates, function(error) {
          if (error) {
            console.log('Error on updating deliveryArea nodes of arrangements:', error);
          } else {
            console.log('Owner ID updated successfully!');
          }
        });
      });
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
              <div className="region-list-item">
                <Row className="show-grid">
                  <FormGroup>
                    <Col xs={6}>
                      {strings[key]}
                    </Col>
                    <Col xs={6}>
                      <DropdownButton title={strings[refKey]} id="subscriptioin-planTypeSelect-dropdown" onSelect={(eventKey)=>this.handleSettingChange(key,eventKey)}>
                        <MenuItem eventKey="n">{strings.n}</MenuItem>
                        <MenuItem eventKey="free">{strings.free}</MenuItem>
                        {key !== 'specialPickUpLocation' && <MenuItem eventKey="fifty">{strings.fifty}</MenuItem>}
                        {key !== 'specialPickUpLocation' && <MenuItem eventKey="hundred">{strings.hundred}</MenuItem>}
                        {key !== 'specialPickUpLocation' && <MenuItem eventKey="hundredfifty">{strings.hundredfifty}</MenuItem>}
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
              <Button bsStyle="" className="shop-settings-button"onClick={this.open}>{strings.setting}</Button>
              <Modal show={this.state.showModal} onHide={this.close}>

                  <div>
                      <Modal.Header closeButton>
                      <Modal.Title><strong>{strings.deliveryRegionSettingsTitle}</strong></Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <p>{strings.deliveryRegionSettingsText1}</p>
                          {deliverySettings}
                      </Modal.Body>
                  </div>

                  <Modal.Footer>
                  <Button bsStyle="" className="button button-back" onClick={this.close}>{strings.backButton}</Button>
                  <Button bsStyle="" className="button" onClick={this.handleShopInfoUpdate}>{strings.updateButton}</Button>
                  
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
      InfoMessage: null,
      img: null,
      croppedImg: null,
      cropperOpen: false,
    }
  }

  componentWillMount() {
    strings.setLanguage(this.props.languageChanged);

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
            deliveryInfo: data.deliveryInfo,
            facebook: data.facebook,
            instagram: data.instagram,
            profilePic: data.profilePic,
            type: data.type,
            website: data.website,
            leadTime: data.deliveryLeadTime,
            croppedImg: data.profilePic,
            promoCodeA: data.promoCodeA,
            promoCodeB: data.promoCodeB,
            specialPickUp: data.specialPickUp,
          });
        }
      });
    });
  }

  componentWillReceiveProps (nextProps) {
      if (nextProps.languageChanged==='ch') {
          strings.setLanguage('ch');
      } else if (nextProps.languageChanged==='en') {
          strings.setLanguage('en');
      }
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
          cropperOpen: false,
        });
  }
  handleAddressChange = (e) => {
    this.setState({ address: e.target.value });
  }
  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  }
  handleDeliveryInfoChange = (e) => {
    this.setState({ deliveryInfo: e.target.value });
  }
  handleSpecialPickUpChange = (e) => {
    this.setState({ specialPickUp: e.target.value });
  }
  handleLeadTimeChange = (e) => {
    this.setState({ leadTime: e.target.value });
  }
  handlePromoCodeAChange = (e) => {
    this.setState({ promoCodeA: e.target.value });
  }
  handlePromoCodeBChange = (e) => {
    this.setState({ promoCodeB: e.target.value });
  }
  handleFacebookChange = (e) => {
    this.setState({ facebook: e.target.value });
  }
  handleInstagramChange = (e) => {
    this.setState({ instagram: e.target.value });
  }
  handleAccountUpdate = (address, description, leadTime, croppedImg, facebook , instagram, promoCodeA, promoCodeB, deliveryInfo, specialPickUp) => {
    base.update(`florists/${this.props.designerCode}`, {
      data: {
          address: address,
          description: description,
          deliveryLeadTime: leadTime,
          profilePic: croppedImg,
          facebook: facebook,
          instagram: instagram,
          promoCodeA: promoCodeA,
          promoCodeB, promoCodeB,
          deliveryInfo: deliveryInfo,
          specialPickUp: specialPickUp,
      }
    }).then(() => {
        this.setState({ InfoMessage: `${strings.shopInfoUpdated}`});
        window.scrollTo(0, 0);
      }).catch(err => {
        console.log('An error occured when updating shop information.');
        this.setState({ InfoMessage: `${strings.errorOccured}`});
      });
  };

  render () {

    var loadingState = this.state.loading;
    var address = this.state.address;
    var description = this.state.description;
    var leadTime = this.state.leadTime;
    var croppedImg = this.state.croppedImg;
    var facebook = this.state.facebook;
    var instagram = this.state.instagram;
    var promoCodeA = this.state.promoCodeA;
    var promoCodeB = this.state.promoCodeB;
    var deliveryInfo = this.state.deliveryInfo;
    var specialPickUp = this.state.specialPickUp;

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
            <div className="shop-info-details">
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col sm={3} md={2}>
                    <div><strong>{strings.shopName}</strong></div>
                  </Col>
                  <Col sm={8}>
                    <div>{this.state.name} (<Link to={`/florist/${this.props.designerCode}`} id="shop-link" target='_blank'>{strings.shopPage}</Link>)</div>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col sm={3} md={2}>
                    <div><strong>{strings.shopID}</strong></div>
                  </Col>
                  <Col sm={8}>
                    <div>{this.props.designerCode}</div>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                  <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col sm={3} md={2}>
                      <div><strong>{strings.shopProfile}</strong></div>
                  </Col>
                  <Col sm={8}>
                    <div>
                        <div className="avatar-photo">
                            <FileUpload handleFileChange={this.handleFileChange} />
                            {(this.state.croppedImg !== null) && <img className="shop-detail-arrangement-pic" alt="" src={this.state.croppedImg} />}
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
                  <Col sm={1} md={2}></Col>
                  <Col sm={3} md={2}>
                    <div><strong>{strings.address}</strong></div>
                  </Col>
                  <Col sm={7}>
                    <FormControl componentClass='textarea' className="data-field-update" value={address} onChange={this.handleAddressChange}/>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col sm={3} md={2}>
                    <div><strong>{strings.description}</strong></div>
                  </Col>
                  <Col sm={7}>
                    <FormControl componentClass='textarea' className="data-field-update" type="text" value={description} onChange={this.handleDescriptionChange}/>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col sm={3} md={2}>
                    <div><strong>{strings.deliveryInfo}</strong></div>
                  </Col>
                  <Col sm={7}>
                    <FormControl componentClass='textarea' className="data-field-update" type="text" value={deliveryInfo} onChange={this.handleDeliveryInfoChange}/>
                    <HelpBlock>{strings.deliveryInfoTip}</HelpBlock>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col sm={3} md={2}>
                    <div><strong>{strings.specialPickUp}</strong></div>
                  </Col>
                  <Col sm={7}>
                    <FormControl componentClass='textarea' className="data-field-update" type="text" value={specialPickUp} onChange={this.handleSpecialPickUpChange}/>
                    <HelpBlock>{strings.specialPickUpTip}</HelpBlock>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col sm={3} md={2}>
                    <div><strong>{strings.leadTime}</strong></div>
                  </Col>
                  <Col sm={7}>
                    <FormControl className="data-field-update" type="text" value={leadTime} onChange={this.handleLeadTimeChange}/>
                    <HelpBlock>{strings.leadTimeTip}</HelpBlock>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col sm={3} md={2}>
                    <div><strong>{strings.promoCodeA}</strong></div>
                  </Col>
                  <Col sm={7}>
                    <FormControl className="data-field-update" type="text" value={promoCodeA} onChange={this.handlePromoCodeAChange}/>
                    <HelpBlock>{strings.promoCodeATip}</HelpBlock>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col sm={3} md={2}>
                    <div><strong>{strings.promoCodeB}</strong></div>
                  </Col>
                  <Col sm={7}>
                    <FormControl className="data-field-update" type="text" value={promoCodeB} onChange={this.handlePromoCodeBChange}/>
                    <HelpBlock>{strings.promoCodeBTip}</HelpBlock>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col sm={3} md={2}>
                    <div><strong>{strings.facebook}</strong></div>
                  </Col>
                  <Col sm={7}>
                    <FormControl className="data-field-update" type="text" value={facebook} onChange={this.handleFacebookChange}/>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col sm={3} md={2}>
                    <div><strong>{strings.instagram}</strong></div>
                  </Col>
                  <Col sm={7}>
                    <FormControl className="data-field-update" type="text" value={instagram} onChange={this.handleInstagramChange}/>
                  </Col>
                </FormGroup>
              </Row>
              <Row className="show-grid">
                <FormGroup>
                  <Col sm={1} md={2}></Col>
                  <Col sm={3} md={2}>
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
                  <Col sm={1} md={2}></Col>
                  <Col sm={3} md={2}>
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
                    <Button bsStyle="" className="button" onClick={() => this.handleAccountUpdate(address, description, leadTime, croppedImg, facebook, instagram, promoCodeA, promoCodeB, deliveryInfo, specialPickUp)}>{strings.updateButton}</Button>
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