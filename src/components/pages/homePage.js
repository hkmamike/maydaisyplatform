import React, { Component } from 'react';
import { Grid, Row, Col, DropdownButton, MenuItem } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en:{
      signUp: 'Sign Up',
      homeImgTitle: 'Shop directly from classy flower shops and independent floral artists.',
      homeImgSubtitle: 'Where are the flowers going?',
      go: 'Go',

      select_region: 'Select Region',
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

      howItWorks1: 'Why ',
      howItWorks2: 'MayDaisy?',
      howItWorks3: ' ',
      howItWorks4: 'FLOWER MARKETPLACE',

      flowerShop: 'Flower Shops',
      flowerShopText: "Find all the classiest flower shops in our marketplace, reference reviews to see how others' experience went.",

      artist: 'Independent Artists',
      artistText: "If you are not ordering last minute, consider buying from our independent floral artists for their distinctive styles.",
      
      trustAndConvenience: 'Trust and Convenience',
      trustAndConvenienceText: 'We hold our florists to a high artistic and customer service standard; Shopping with us is convient with our quick checkout features and our detailed purchase log.',
      
      
      aboutUs1: 'About',
      aboutUs2: 'MayDaisy',
      aboutUsText: "MayDaisy is a marketplace and community to connect customers with great florists in their city. By bringing the best florists together in one place, we can focus resources on your flowers and spend less on reaching you. MayDaisy also provides a channel for established and emerging independent floral artists to reach a broader audience. Independent artists do not operate a flower shop full time, but they offer dinstinctive styles that cannot be found anywhere else!", 
      joinNow: "Join the flower lovers' MayDaisy movement now",
      
    },
    ch: {
      signUp: '報名',
      homeImgTitle: '鮮花市集，一網搜盡最潮最優雅的花店和獨立花藝師。',
      homeImgSubtitle: '花卉送往哪裏?',
      go: '去市集',

      select_region: '選擇地區',
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

      howItWorks1: '為什麼用',
      howItWorks2: '五月菊',
      howItWorks3: ' ',
      howItWorks4: '一站式鮮花市集',

      flowerShop: '大小花店',
      flowerShopText: '一個市集看盡最潮最優雅的花店。看看評論令您對您的選擇更有信心。',

      artist: '獨立花藝師',
      artistText: '如果您是預早下單，可以考慮獨立花藝師們獨特風格的藝術花卉。',

      trustAndConvenience: '方便安心',
      trustAndConvenienceText: '我們對花店和花藝師們有極高的顧客服務和藝術上的要求; 詳盡購買記錄和快速下單功能令您的購物體驗更暢快。',


      aboutUs1: '關於',
      aboutUs2: '五月菊',
      aboutUsText: '五月菊是由花藝師們建立的一站式鮮花市集和花藝社群，我們的目標是為客人找到最好最適合他們的花卉設計。鮮花市集的模式令我們可以減低在市場推廣上花費的時間和資源，更集中的為您創造鮮花經驗。',
      joinNow: '快來加入愛花之人的五月菊運動 ',
    }
  });

const ButtonToMarket = ({ title, history, marketRegion }) => (
  <Button bsStyle="" className="button" onClick={() => history.push(`/arrangements/${marketRegion}`)}>{strings.go}</Button>
);

// const ButtonToScrollUp = ({ title, history }) => (
//   <Button bsStyle="" className="button" onClick={() => window.scrollTo(0, 0)}>{strings.signUp}</Button>
// );

export default class Homepage extends Component {

  constructor() {
    super();
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect = (eventKey) => {
    this.props.onMarketRegionSelect(eventKey);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.languageChanged==='ch') {
      strings.setLanguage('ch');
    } else if (nextProps.languageChanged==='en') {
      strings.setLanguage('en');
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillMount() {
    strings.setLanguage(this.props.languageChanged);
  }

  render() {
    const marketRegion = this.props.marketRegion;

    return (
      <div className="no-padding">
        
        <div className="home-image-container">
          <div className="home-image">
            <Grid>
              <Row className="show-grid">
                <Col md={5} className="home-image-prompt">
                  <h3 className="home-image-title">{strings.homeImgTitle}</h3>
                  <div className="home-image-pink">{strings.homeImgSubtitle}</div>
                  <DropdownButton title={strings[marketRegion]} className="home-image-select" id="bg-nested-dropdown" onSelect={this.handleSelect}>
                    <MenuItem eventKey="HK_CentralWestern">{strings.HK_CentralWestern}</MenuItem>
                    <MenuItem eventKey="HK_Eastern">{strings.HK_Eastern}</MenuItem>
                    <MenuItem eventKey="HK_Southern">{strings.HK_Southern}</MenuItem>
                    <MenuItem eventKey="HK_WanChai">{strings.HK_WanChai}</MenuItem>
                    <MenuItem eventKey="KL_ShamShuiPo">{strings.KL_ShamShuiPo}</MenuItem>
                    <MenuItem eventKey="KL_KowloonCity">{strings.KL_KowloonCity}</MenuItem>
                    <MenuItem eventKey="KL_KwunTong">{strings.KL_KwunTong}</MenuItem>
                    <MenuItem eventKey="KL_WongTaiSin">{strings.KL_WongTaiSin}</MenuItem>
                    <MenuItem eventKey="KL_YauTsimMong">{strings.KL_YauTsimMong}</MenuItem>
                    <MenuItem eventKey="NT_Islands">{strings.NT_Islands}</MenuItem>
                    <MenuItem eventKey="NT_KwaiTsing">{strings.NT_KwaiTsing}</MenuItem>
                    <MenuItem eventKey="NT_North">{strings.NT_North}</MenuItem>
                    <MenuItem eventKey="NT_SaiKung">{strings.NT_SaiKung}</MenuItem>
                    <MenuItem eventKey="NT_ShaTin">{strings.NT_ShaTin}</MenuItem>
                    <MenuItem eventKey="NT_TaiPo">{strings.NT_TaiPo}</MenuItem>
                    <MenuItem eventKey="NT_TsuenWan">{strings.NT_TsuenWan}</MenuItem>
                    <MenuItem eventKey="NT_TuenMun">{strings.NT_TuenMun}</MenuItem>
                    <MenuItem eventKey="NT_YuenLong">{strings.NT_YuenLong}</MenuItem>
                  </DropdownButton>
                  <Route path="/" render={(props) => <ButtonToMarket marketRegion={marketRegion} {...props}/>} />
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
      
        <div className="how-it-works">
          <h2> {strings.howItWorks1} <span className="home-company-name">{strings.howItWorks2}</span>{strings.howItWorks3}</h2>
          <h3 className="home-123">{strings.howItWorks4}</h3>
          <Grid>
            <Row className="show-grid">
              <Col sm={4}><i className="fa fa-list icons" aria-hidden="true"></i>
                <h3 className="icon-title">{strings.flowerShop}</h3>
                <div className="icon-description">{strings.flowerShopText}</div>
              </Col>
              <Col sm={4}><i className="fa fa-users icons" aria-hidden="true"></i>
                <h3 className="icon-title">{strings.artist}</h3>
                <div className="icon-description">{strings.artistText}</div>
              </Col>
              <Col sm={4}><i className="fa fa-heart icons" aria-hidden="true"></i>
                <h3 className="icon-title">{strings.trustAndConvenience}</h3>
                <div className="icon-description">{strings.trustAndConvenienceText}</div>
              </Col>
            </Row>
          </Grid>
        </div>

        <div className="home-pic-section">
        </div>


        <div className="bar-pink">
          {strings.joinNow}<i className="fa fa-users"></i>
        </div>

      </div>
    )
  }
}
