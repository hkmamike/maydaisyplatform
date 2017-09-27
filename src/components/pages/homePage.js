import React, { Component } from 'react';
import { Grid, Row, Col, Glyphicon, DropdownButton, MenuItem } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Route, Link } from 'react-router-dom';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en:{
      signUp: 'Sign Up',
      homeImgTitle: 'Weekly Designer Choice Flowers by Local Florists',
      homeImgSubtitle: 'Where are the flowers going?',
      howItWorks1: 'How ',
      howItWorks2: 'MayDaisy',
      howItWorks3: ' Works',
      howItWorks4: 'AS SIMPLE AS 1,2,3',
      subscribe: 'Subscribe',
      subscribeText: 'Reward yourself or Send weekly flowers to your loved one. A local forist will pick the best seasonal flowers and design the gift for you. Surprise!',
      receiveUpdate: 'Update',
      receiveUpdateText: 'We will keep you updated about your subscription through email and your account page, and you can update your message card on this website.',
      delight: 'Delight',
      delightText: 'Your loved one receives flowers and your card (we hand write your message), prepared with heart by your local florist!',
      classic: 'Classic',
      classicText: 'designer picked seasonal flowers, 1-2 blooms, HKD53 per week. >>click<<',
      elegant: 'Elegant',
      elegantText: 'designer picked seasonal flowers, 2-4 blooms, HKD93 per week. >>click<<',
      bloom: 'Bloom',
      bloomText: 'designer picked seasonal flowers, 5-10 blooms, HKD223 per week. >>click<<',
      aboutUs1: 'About',
      aboutUs2: 'Us',
      aboutUsText: 'MayDaisy is a movment of lasting love and simply enjoying flower. Through a weekly unrestricted design and delivery service, we make the expression of love persisting, fun, affordable, and full of surprises. We can deliver the weekly flowers to you (so you can deliver them in person), or deliver them directly to the reciepient. To make the movement more affordable to flower lovers, we begin to invite customers to subscribe when 150 customers have shown interest in an area. Check out if we are delivering your location now!',
      joinNow: "Join the flower lovers' MayDaisy movement now ",
      HK_Admiralty: 'HK-Admiralty',
      HK_Central: 'HK-Central',
      HK_ChaiWan: 'HK-Chai Wan, Home/Office',
      HK_ChaiWan_BMCPC: 'HK-Chai Wan, BMCPC',
      HK_ChaiWan_CapeCollison: 'HK-Chai Wan, Cape Collison',
      other: 'Other areas'
    },
    ch: {
      signUp: '報名',
      homeImgTitle: '由本地花匠設計的時令花卉，每週一次。',
      homeImgSubtitle: '花卉該送往哪裏?',
      howItWorks1: ' ',
      howItWorks2: '五月菊',
      howItWorks3: '是什麼',
      howItWorks4: '簡單如 1,2,3',
      subscribe: '訂購',
      subscribeText: '驚喜！獎勵自己或給您愛的人每週送花，由本地花匠運用時令鮮花設計，品種隨機。',
      receiveUpdate: '訂單資訊',
      receiveUpdateText: '我們會用電郵和這網頁保持聯繫，您亦可以在這個網頁上更新您的問候卡。',
      delight: '收花',
      delightText: '收花人會於每週收到鲜花和您的問候卡並由您的花匠送出手寫字表達心意。',
      classic: '經典',
      classicText: '花匠用時令花材設計，1-2朵主花，每週 HKD53。 >>看圖<<',
      elegant: '優雅',
      elegantText: '花匠用時令花材設計，2-4朵主花，每週 HKD93。 >>看圖<<',
      bloom: '盛會',
      bloomText: '花匠用時令花材設計，5-10朵主花，每週 HKD223。 >>看圖<<',
      aboutUs1: '關於',
      aboutUs2: '我們',
      aboutUsText: '五月菊的理念是推動細水長流的愛及簡單地享受鮮花。以每週發送無限制形式設計的鮮花，我們令愛的表達變得更持久而有趣，更可以令愛花之人有更多驚喜。我們可以將鮮花配送給您(如果您想親自送花)，或直接配送給收花人。為了令五月菊價格更大眾化，每個地區的服務會在收集到150個報名之後開啟，屆時已報名的客人會收到電郵邀請。快來看看您的地區服務是否已開啟!',
      joinNow: '快來加入愛花之人的五月菊運動 ',
      HK_Admiralty: '香港-金鐘',
      HK_Central: '香港-中環',
      HK_ChaiWan: '香港-柴灣(住家/辦公室)',
      HK_ChaiWan_BMCPC: '香港-柴灣墓園(華人永遠)',
      HK_ChaiWan_CapeCollison: '香港-柴灣墓園(歌連臣角十字架)',
      other: '其他地區'
    }
  });

const ButtonToRegionList = ({ title, history }) => (
  <Button bsStyle="" className="button" onClick={() => history.push('/signups')}>{strings.signUp}</Button>
);

const ButtonToScrollUp = ({ title, history }) => (
  <Button bsStyle="" className="button" onClick={() => window.scrollTo(0, 0)}>{strings.signUp}</Button>
);

export default class Homepage extends Component {

  constructor() {
    super();
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect = (eventKey) => {
    this.props.onRegionSelection(eventKey);
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
    const selectRegion = this.props.selectRegion;

    return (
      <div className="no-padding">
        
        <div className="home-image-container">
          <div className="home-image">
            <Grid>
              <Row className="show-grid">
                <Col md={5} className="home-image-prompt">
                  <h3 className="home-image-title">{strings.homeImgTitle}</h3>
                  <div className="home-image-pink">{strings.homeImgSubtitle}</div>
                  <DropdownButton title={strings[selectRegion]} className="home-image-select" id="bg-nested-dropdown" onSelect={this.handleSelect}>
                    <MenuItem eventKey="HK_Admiralty">{strings.HK_Admiralty}</MenuItem>
                    <MenuItem eventKey="HK_Central">{strings.HK_Central}</MenuItem>
                    <MenuItem eventKey="HK_ChaiWan">{strings.HK_ChaiWan}</MenuItem>
                    <MenuItem eventKey="HK_ChaiWan_BMCPC">{strings.HK_ChaiWan_BMCPC}</MenuItem>
                    <MenuItem eventKey="HK_ChaiWan_CapeCollison">{strings.HK_ChaiWan_CapeCollison}</MenuItem>
                    <MenuItem eventKey="other">{strings.other}</MenuItem>
                  </DropdownButton>
                  <Route path="/" render={(props) => <ButtonToRegionList {...props}/>} />
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
              <Col sm={4}><Glyphicon glyph="list-alt" className="icons"/>
                <h3 className="icon-title">{strings.subscribe}</h3>
                <div className="icon-description">{strings.subscribeText}</div>
              </Col>
              <Col sm={4}><Glyphicon glyph="question-sign" className="icons"/>
                <h3 className="icon-title">{strings.receiveUpdate}</h3>
                <div className="icon-description">{strings.receiveUpdateText}</div>
              </Col>
              <Col sm={4}><Glyphicon glyph="heart" className="icons"/>
                <h3 className="icon-title">{strings.delight}</h3>
                <div className="icon-description">{strings.delightText}</div>
              </Col>
            </Row>
          </Grid>
        </div>

        <div className="home-pic-section">
          <Grid>
            <Row className="show-grid home-pic-container">
              <Link to="/gallery-classic">
                <Col sm={4} className="home-pic-1 home-pic">
                  <div className="home-pic-shade"></div>
                  <div className="home-pic-text">
                    <div className="home-pic-title">{strings.classic}</div>
                    <div>{strings.classicText}</div>
                  </div>
                </Col>
              </Link>
              <Link to="/gallery-elegant">
                <Col sm={4} className="home-pic-2 home-pic">
                  <div className="home-pic-shade"></div>
                  <div className="home-pic-text">
                    <div className="home-pic-title">{strings.elegant}</div>
                    <div>{strings.elegantText}</div>
                  </div>
                </Col>
              </Link>
              <Link to="/gallery-bloom">
                <Col sm={4} className="home-pic-3 home-pic">
                  <div className="home-pic-shade"></div>
                  <div className="home-pic-text">
                    <div className="home-pic-title">{strings.bloom}</div>
                    <div>{strings.bloomText}</div>
                  </div>
                </Col>
              </Link>
            </Row>
          </Grid>
        </div>

        <div className="home-about">
          <Grid>
            <Row>
              <h2>{strings.aboutUs1}<span className="home-company-name">{strings.aboutUs2}</span></h2>
              <Col sm={12}>
                <div className="home-about-text">{strings.aboutUsText}</div>
              </Col>
            </Row>
            <Route path="/" render={(props) => <ButtonToScrollUp {...props}/>} />
          </Grid>
        </div>

        <div className="bar-pink">
          {strings.joinNow}<i className="fa fa-users"></i>
        </div>

      </div>
    )
  }
}
