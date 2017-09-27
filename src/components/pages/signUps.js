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
      classic1_1: 'Classic ',
      classic1_2: 'HKD53',
      classic1_3: ' per week, delivery included',
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
      submitButtonSubmitted: 'Submitted ',
      HK_Aberdeen: 'HK-Aberdeen',
      HK_ApLeiChau: 'HK_Ap Lei Chau',
      HK_CausewayBay: 'HK-Causeway Bay',
      HK_DeepWaterBay: 'HK-Deep Water Bay',
      HK_FortressHill: 'HK-Fortress Hill',
      HK_HappyValley: 'HK-Happy Valley',
      HK_HengFaChuen: 'HK-Heng Fa Chuen',
      HK_KennedyTown: 'HK_Kennedy Town',
      HK_MidLevel: 'HK-Mid Level',
      HK_NorthPoint: 'HK-North Point',
      HK_PokFuLam: 'HK-Pok Fu Lam',
      HK_QuarryBay: 'HK-Quarry Bay',
      HK_RepulseBay: 'HK-Repulse Bay',
      HK_SaiWanHo: 'HK-Sai Wan Ho',
      HK_SaiYingPun: 'HK-Sai Ying Pun',
      HK_ShauKeiWan: 'HK-Shau Kei Wan',
      HK_ShekO: 'HK-Shek O',
      HK_ShekTongTsui: 'HK-Shek Tong Tsui',
      HK_SheungWan: 'HK-Sheung Wan',
      HK_SiuSaiWan: 'HK-Siu Sai Wan',
      HK_Stanley: 'HK-Stanley',
      HK_TaiHang: 'HK-Tai Hang',
      HK_TaiKoo: 'HK-Tai Koo',
      HK_TinHau: 'HK-Tin Hau',
      HK_WanChai: 'HK-Wan Chai',
      HK_WongChukHang: 'HK-Wong Chuk Hang',
      KL_CheungShaWan: 'KL-Cheung ShaWan',
      KL_ChoiHung: 'KL-Choi Hung',
      KL_DiamondHill: 'KL-Diamond Hill',
      KL_HoManTin: 'KL-Ho Man Tin', 
      KL_HungHom: 'KL-Hung Hom',
      KL_Jordan: 'KL-Jordan',
      KL_KaiTak: 'KL-Kai Tak',
      KL_KowloonBay: 'KL-Kowloon Bay',
      KL_KowloonCity: 'KL-Kowloon City',
      KL_KowloonTong: 'KL-Kowloon Tong',
      KL_KwunTong: 'KL-Kwun Tong',
      KL_LaiChiKok: 'KL-Lai Chi Kok',
      KL_LamTin: 'KL-Lam Tin',
      KL_LeiYueMun: 'KL-Lei Yue Mun',
      KL_LokFu: 'KL-Lok Fu',
      KL_MeiFoo: 'KL-Mei Foo',
      KL_MongKok: 'KL-Mong Kok',
      KL_NgauChiWan: 'KL-Ngau Chi Wan',
      KL_NaguTauKok: 'KL-Nagu Tau Kok',
      KL_PrinceEdward: 'KL-Prince Edward',
      KL_SanPoKong: 'KL-San Po Kong',
      KL_ShamShuiPo: 'KL-Sham Shui Po',
      KL_TaiKokTsui: 'KL-Tai Kok Tsui',
      KL_ToKwaWan: 'KL-To Kwa Wan',
      KL_TsimShuiTsui: 'KL-Tsim Shui Tsui',
      KL_TszWanShan: 'KL-Tsz Wan Shan',
      KL_WongTaiSin: 'KL-Wong Tai Sin',
      KL_YauMaTei: 'KL-Yau Ma Tei',
      KL_YauTong: 'KL-Yau Tong',
      NT_ChekLapKok: 'NT-Chek Lap Kok',
      NT_CheungChau: 'NT-Cheung Chau',
      NT_DiscoveryBay: 'NT-Discovery Bay',
      NT_Fanling: 'NT-Fanling',
      NT_FoTan: 'NT-Fo Tan',
      NT_KwaiFong: 'NT-Kwai Fong',
      NT_KwaiChung: 'NT-Kwai Chung',
      NT_LaiKing: 'NT-Lai King',
      NT_LammaIsland: 'NT-Lamma Island',
      NT_LantauIsland: 'NT-Lantau Island',
      NT_LauFauShan: 'NT-Lau Fau Shan',
      NT_LoWu: 'NT-Lo Wu',
      NT_LokMaChau: 'NT-Lok Ma Chau',
      NT_MaOnShan: 'NT-Ma On Shan',
      NT_MaWan: 'NT-Ma Wan',
      NT_PengChau: 'NT-Peng Chau',
      NT_SaiKung: 'NT-Sai Kung',
      NT_ShaTauKok: 'NT-Sha Tau Kok',
      NT_ShaTin: 'NT-Sha Tin',
      NT_ShamTseng: 'NT-Sham Tseng',
      NT_SiuLekYuen: 'NT-Siu Lek Yuen',
      NT_TaKwuLing: 'NT-Ta Kwu Ling',
      NT_TaiO: 'NT-Tai O',
      NT_TaiPo: 'NT-Tai Po',
      NT_TaiWai: 'NT-Tai Wai',
      NT_TaiWo: 'NT-Tai Wo',
      NT_TaiWoHau: 'NT-Tai Wo Hau',
      NT_TinShuiWai: 'NT-Tin Shui Wai',
      NT_TiuKengLeng: 'NT-Tiu Keng Leng',
      NT_TseungKwanO: 'NT-Tseung Kwan O',
      NT_TsingYi: 'NT-Tsing Yi',
      NT_TsuenWan: 'NT-Tsuen Wan',
      NT_TuenMun: 'NT-Tuen Mun',
      NT_TungChung: 'NT-Tung Chung',
      NT_WuKaiSha: 'NT-Wu Kai Sha',
      NT_YuengLong: 'NT-Yueng Long'
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
      classic1_1: '經典 ',
      classic1_2: '每週 HKD53',
      classic1_3: '，免費配送',
      elegant1_1: '優雅 ',
      elegant1_2: '每週 HKD93',
      elegant1_3: '，免費配送',
      bloom1_1: '盛會 ',
      bloom1_2: '每週 HKD223',
      bloom1_3: '，免費配送',
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
      submitButtonSubmitted: '已遞交 ',
      HK_Aberdeen: '香港-香港仔',
      HK_ApLeiChau: '香港-鴨脷洲',
      HK_CausewayBay: '香港-銅鑼灣',
      HK_DeepWaterBay: '香港-深水灣',
      HK_FortressHill: '香港-炮台山',
      HK_HappyValley: '香港-跑馬地',
      HK_HengFaChuen: '香港-杏花邨',
      HK_KennedyTown: '香港-堅尼地城',
      HK_MidLevel: '香港-中環半山',
      HK_NorthPoint: '香港-北角',
      HK_PokFuLam: '香港-薄扶林',
      HK_QuarryBay: '香港-鰂魚涌',
      HK_RepulseBay: '香港-淺水灣',
      HK_SaiWanHo: '香港-西灣河',
      HK_SaiYingPun: '香港-西營盤',
      HK_ShauKeiWan: '香港-筲箕灣',
      HK_ShekO: '香港-石澳',
      HK_ShekTongTsui: '香港-石塘咀',
      HK_SheungWan: '香港-上環',
      HK_SiuSaiWan: '香港-小西灣',
      HK_Stanley: '香港-赤柱',
      HK_TaiHang: '香港-大坑',
      HK_TaiKoo: '香港-太古',
      HK_TinHau: '香港-天后',
      HK_WanChai: '香港-灣仔',
      HK_WongChukHang: '香港-黃竹坑',
      KL_CheungShaWan: '九龍-長沙灣',
      KL_ChoiHung: '九龍-彩虹',
      KL_DiamondHill: '九龍-鑽石山',
      KL_HoManTin: '九龍-何文田', 
      KL_HungHom: '九龍-紅磡',
      KL_Jordan: '九龍-佐敦',
      KL_KaiTak: '九龍-啟德',
      KL_KowloonBay: '九龍-九龍灣',
      KL_KowloonCity: '九龍-九龍城',
      KL_KowloonTong: '九龍-九龍塘',
      KL_KwunTong: '九龍-觀塘',
      KL_LaiChiKok: '九龍-荔枝角',
      KL_LamTin: '九龍-藍田',
      KL_LeiYueMun: '九龍-鯉魚門',
      KL_LokFu: '九龍-樂富',
      KL_MeiFoo: '九龍-美孚',
      KL_MongKok: '九龍-旺角',
      KL_NgauChiWan: '九龍-牛池灣',
      KL_NaguTauKok: '九龍-牛頭角',
      KL_PrinceEdward: '九龍-太子',
      KL_SanPoKong: '九龍-新蒲崗',
      KL_ShamShuiPo: '九龍-深水埗',
      KL_TaiKokTsui: '九龍-大角咀',
      KL_ToKwaWan: '九龍-土瓜灣',
      KL_TsimShuiTsui: '九龍-尖沙咀',
      KL_TszWanShan: '九龍-慈雲山',
      KL_WongTaiSin: '九龍-黃大仙',
      KL_YauMaTei: '九龍-油麻地',
      KL_YauTong: '九龍-油塘',
      NT_ChekLapKok: '新界-赤鱲角',
      NT_CheungChau: '新界-長洲',
      NT_DiscoveryBay: '新界-愉景灣',
      NT_Fanling: '新界-粉嶺',
      NT_FoTan: '新界-火炭',
      NT_KwaiFong: '新界-葵芳',
      NT_KwaiChung: '新界-葵涌',
      NT_LaiKing: '新界-荔景',
      NT_LammaIsland: '新界-南丫島',
      NT_LantauIsland: '新界-大嶼山',
      NT_LauFauShan: '新界-流浮山',
      NT_LoWu: '新界-羅湖',
      NT_LokMaChau: '新界-落馬洲',
      NT_MaOnShan: '新界-馬鞍山',
      NT_MaWan: '新界-馬灣',
      NT_PengChau: '新界-坪洲',
      NT_SaiKung: '新界-西貢市',
      NT_ShaTauKok: '新界-沙頭角',
      NT_ShaTin: '新界-沙田',
      NT_ShamTseng: '新界-深井',
      NT_SiuLekYuen: '新界-小瀝源',
      NT_TaKwuLing: '新界-打鼓嶺',
      NT_TaiO: '新界-大澳',
      NT_TaiPo: '新界-大埔',
      NT_TaiWai: '新界-大圍',
      NT_TaiWo: '新界-太和',
      NT_TaiWoHau: '新界-大窩口',
      NT_TinShuiWai: '新界-天水圍',
      NT_TiuKengLeng: '新界-調景嶺',
      NT_TseungKwanO: '新界-將軍澳',
      NT_TsingYi: '新界-青衣',
      NT_TsuenWan: '新界-荃灣',
      NT_TuenMun: '新界-屯門',
      NT_TungChung: '新界-東涌',
      NT_WuKaiSha: '新界-烏溪沙',
      NT_YuengLong: '新界-元朗'
    }
  });

const ButtonToLogin = ({ title, history }) => (
  <Button bsStyle="" className="button" onClick={() => history.push('/newsubscription')}>{strings.subscribeButton}</Button>
);

const ButtonToGallery = ({ title, history }) => (
  <Button bsStyle="" className="button" onClick={() => history.push('/gallery-classic')}>{strings.galleryButton}</Button>
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
                <li><strong>{strings.classic1_1}</strong>{strings.classic1_2}{strings.classic1_3}</li>
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
      formSubmitted: false,
      signUpRegion: 'HK_CausewayBay'
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
    const regionSelected = this.state.signUpRegion;
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
    this.setState({signUpRegion: eventKey});
  }

  submitSignUp (signUpRegion, name, email, phone) {
    base.push(`signUp/hongKong/areas/${signUpRegion}/records`, {
      data: {name: name, email: email, phone: phone, date: new Date()}
    });
    this.setState({loading: false, formSubmitted: true});
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.submitSignUp(this.state.signUpRegion, this.state.name, this.state.email, this.state.phone)
    this.setState({loading: true});
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

  render() {

    var signUpRegion = this.state.signUpRegion;

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
                  <DropdownButton title={strings[signUpRegion]} placeholder='Select Region' className="region-signup-select" id="bg-nested-dropdown" onSelect={this.handleSelect}>
                    <MenuItem eventKey="HK_Aberdeen">{strings.HK_Aberdeen}</MenuItem>
                    <MenuItem eventKey="HK_ApLeiChau">{strings.HK_ApLeiChau}</MenuItem>
                    <MenuItem eventKey="HK_CausewayBay">{strings.HK_Causeway_Bay}</MenuItem>
                    <MenuItem eventKey="HK_DeepWaterBay">{strings.HK_DeepWaterBay}</MenuItem>
                    <MenuItem eventKey="HK_FortressHill">{strings.HK_FortressHill}</MenuItem>
                    <MenuItem eventKey="HK_HappyValley">{strings.HK_HappyValley}</MenuItem>
                    <MenuItem eventKey="HK_HengFaChuen">{strings.HK_HengFaChuen}</MenuItem>
                    <MenuItem eventKey="HK_KennedyTown">{strings.HK_KennedyTown}</MenuItem>
                    <MenuItem eventKey="HK_MidLevel">{strings.HK_MidLevel}</MenuItem>
                    <MenuItem eventKey="HK_NorthPoint">{strings.HK_NorthPoint}</MenuItem>
                    <MenuItem eventKey="HK_PokFuLam">{strings.HK_PokFuLam}</MenuItem>
                    <MenuItem eventKey="HK_QuarryBay">{strings.HK_QuarryBay}</MenuItem>
                    <MenuItem eventKey="HK_RepulseBay">{strings.HK_RepulseBay}</MenuItem>
                    <MenuItem eventKey="HK_SaiWanHo">{strings.HK_SaiWanHo}</MenuItem>
                    <MenuItem eventKey="HK_SaiYingPun">{strings.HK_SaiYingPun}</MenuItem>
                    <MenuItem eventKey="HK_ShauKeiWan">{strings.HK_ShauKeiWan}</MenuItem>
                    <MenuItem eventKey="HK_ShekO">{strings.HK_ShekO}</MenuItem>
                    <MenuItem eventKey="HK_ShekTongTsui">{strings.HK_ShekTongTsui}</MenuItem>
                    <MenuItem eventKey="HK_SheungWan">{strings.HK_SheungWan}</MenuItem>
                    <MenuItem eventKey="HK_SiuSaiWan">{strings.HK_SiuSaiWan}</MenuItem>
                    <MenuItem eventKey="HK_Stanley">{strings.HK_Stanley}</MenuItem>
                    <MenuItem eventKey="HK_TaiHang">{strings.HK_TaiHang}</MenuItem>
                    <MenuItem eventKey="HK_TaiKoo">{strings.HK_TaiKoo}</MenuItem>
                    <MenuItem eventKey="HK_TinHau">{strings.HK_TinHau}</MenuItem>
                    <MenuItem eventKey="HK_WanChai">{strings.HK_WanChai}</MenuItem>
                    <MenuItem eventKey="HK_WongChukHang">{strings.HK_WongChukHang}</MenuItem>
                    <MenuItem eventKey="KL_CheungShaWan">{strings.KL_CheungShaWan}</MenuItem>
                    <MenuItem eventKey="KL_ChoiHung">{strings.KL_ChoiHung}</MenuItem>
                    <MenuItem eventKey="KL_DiamondHill">{strings.KL_DiamondHill}</MenuItem>
                    <MenuItem eventKey="KL_HoManTin">{strings.KL_HoManTin}</MenuItem>
                    <MenuItem eventKey="KL_HungHom">{strings.KL_HungHom}</MenuItem>
                    <MenuItem eventKey="KL_Jordan">{strings.KL_Jordan}</MenuItem>
                    <MenuItem eventKey="KL_KaiTak">{strings.KL_KaiTak}</MenuItem>
                    <MenuItem eventKey="KL_KowloonBay">{strings.KL_KowloonBay}</MenuItem>
                    <MenuItem eventKey="KL_KowloonCity">{strings.KL_KowloonCity}</MenuItem>
                    <MenuItem eventKey="KL_KowloonTong">{strings.KL_KowloonTong}</MenuItem>
                    <MenuItem eventKey="KL_KwunTong">{strings.KL_KwunTong}</MenuItem>
                    <MenuItem eventKey="KL_LaiChiKok">{strings.KL_LaiChiKok}</MenuItem>
                    <MenuItem eventKey="KL_LamTin">{strings.KL_LamTin}</MenuItem>
                    <MenuItem eventKey="KL_LeiYueMun">{strings.KL_LeiYueMun}</MenuItem>
                    <MenuItem eventKey="KL_LokFu">{strings.KL_LokFu}</MenuItem>
                    <MenuItem eventKey="KL_MeiFoo">{strings.KL_MeiFoo}</MenuItem>
                    <MenuItem eventKey="KL_MongKok">{strings.KL_MongKok}</MenuItem>
                    <MenuItem eventKey="KL_NgauChiWan">{strings.KL_NgauChiWan}</MenuItem>
                    <MenuItem eventKey="KL_NaguTauKok">{strings.KL_NaguTauKok}</MenuItem>
                    <MenuItem eventKey="KL_PrinceEdward">{strings.KL_PrinceEdward}</MenuItem>
                    <MenuItem eventKey="KL_SanPoKong">{strings.KL_SanPoKong}</MenuItem>
                    <MenuItem eventKey="KL_ShamShuiPo">{strings.KL_ShamShuiPo}</MenuItem>
                    <MenuItem eventKey="KL_TaiKokTsui">{strings.KL_TaiKokTsui}</MenuItem>
                    <MenuItem eventKey="KL_ToKwaWan">{strings.KL_ToKwaWan}</MenuItem>
                    <MenuItem eventKey="KL_TsimShuiTsui">{strings.KL_TsimShuiTsui}</MenuItem>
                    <MenuItem eventKey="KL_TszWanShan">{strings.KL_TszWanShan}</MenuItem>
                    <MenuItem eventKey="KL_WongTaiSin">{strings.KL_WongTaiSin}</MenuItem>
                    <MenuItem eventKey="KL_YauMaTei">{strings.KL_YauMaTei}</MenuItem>
                    <MenuItem eventKey="KL_YauTong">{strings.KL_YauTong}</MenuItem>
                    <MenuItem eventKey="NT_ChekLapKok">{strings.NT_ChekLapKok}</MenuItem>
                    <MenuItem eventKey="NT_CheungChau">{strings.NT_CheungChau}</MenuItem>
                    <MenuItem eventKey="NT_DiscoveryBay">{strings.NT_DiscoveryBay}</MenuItem>
                    <MenuItem eventKey="NT_Fanling">{strings.NT_Fanling}</MenuItem>
                    <MenuItem eventKey="NT_FoTan">{strings.NT_FoTan}</MenuItem>
                    <MenuItem eventKey="NT_KwaiFong">{strings.NT_KwaiFong}</MenuItem>
                    <MenuItem eventKey="NT_KwaiChung">{strings.NT_KwaiChung}</MenuItem>
                    <MenuItem eventKey="NT_CheungChau">{strings.NT_CheungChau}</MenuItem>
                    <MenuItem eventKey="NT_LaiKing">{strings.NT_LaiKing}</MenuItem>
                    <MenuItem eventKey="NT_LammaIsland">{strings.NT_LammaIsland}</MenuItem>
                    <MenuItem eventKey="NT_LantauIsland">{strings.NT_LantauIsland}</MenuItem>
                    <MenuItem eventKey="NT_LauFauShan">{strings.NT_LauFauShan}</MenuItem>
                    <MenuItem eventKey="NT_LoWu">{strings.NT_LoWu}</MenuItem>
                    <MenuItem eventKey="NT_LokMaChau">{strings.NT_LokMaChau}</MenuItem>
                    <MenuItem eventKey="NT_MaOnShan">{strings.NT_MaOnShan}</MenuItem>
                    <MenuItem eventKey="NT_MaWan">{strings.NT_MaWan}</MenuItem>
                    <MenuItem eventKey="NT_PengChau">{strings.NT_PengChau}</MenuItem>
                    <MenuItem eventKey="NT_CheungChau">{strings.NT_CheungChau}</MenuItem>
                    <MenuItem eventKey="NT_SaiKung">{strings.NT_SaiKung}</MenuItem>
                    <MenuItem eventKey="NT_ShaTauKok">{strings.NT_ShaTauKok}</MenuItem>
                    <MenuItem eventKey="NT_ShaTin">{strings.NT_ShaTin}</MenuItem>
                    <MenuItem eventKey="NT_ShamTseng">{strings.NT_ShamTseng}</MenuItem>
                    <MenuItem eventKey="NT_SiuLekYuen">{strings.NT_SiuLekYuen}</MenuItem>
                    <MenuItem eventKey="NT_TaKwuLing">{strings.NT_TaKwuLing}</MenuItem>
                    <MenuItem eventKey="NT_TaiO">{strings.NT_TaiO}</MenuItem>
                    <MenuItem eventKey="NT_TaiPo">{strings.NT_TaiPo}</MenuItem>
                    <MenuItem eventKey="NT_TaiWai">{strings.NT_TaiWai}</MenuItem>
                    <MenuItem eventKey="NT_TaiWo">{strings.NT_TaiWo}</MenuItem>
                    <MenuItem eventKey="NT_TaiWoHau">{strings.NT_TaiWoHau}</MenuItem>
                    <MenuItem eventKey="NT_TinShuiWai">{strings.NT_TinShuiWai}</MenuItem>
                    <MenuItem eventKey="NT_TiuKengLeng">{strings.NT_TiuKengLeng}</MenuItem>
                    <MenuItem eventKey="NT_TseungKwanO">{strings.NT_TseungKwanO}</MenuItem>
                    <MenuItem eventKey="NT_TsingYi">{strings.NT_TsingYi}</MenuItem>
                    <MenuItem eventKey="NT_TsuenWan">{strings.NT_TsuenWan}</MenuItem>
                    <MenuItem eventKey="NT_TuenMun">{strings.NT_TuenMun}</MenuItem>
                    <MenuItem eventKey="NT_TungChung">{strings.NT_TungChung}</MenuItem>
                    <MenuItem eventKey="NT_WuKaiSha">{strings.NT_WuKaiSha}</MenuItem>
                    <MenuItem eventKey="NT_YuengLong">{strings.NT_YuengLong}</MenuItem>
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