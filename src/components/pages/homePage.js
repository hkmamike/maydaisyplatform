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
      howItWorks1: 'How',
      howItWorks2: 'MayDaisy',
      howItWorks3: 'Works',
      howItWorks4: 'AS SIMPLE AS 1,2,3',
      subscribe: 'Subscribe',
      subscribeText: 'Reward yourself or Send weekly flowers to your loved one. A local forist will pick the best seasonal flowers and design the gift for you. Surprise!',
      receiveUpdate: 'Update',
      receiveUpdateText: 'We will keep you updated about your subscription through email and your account page, and you can update your message card on this website.',
      delight: 'Delight',
      delightText: 'Your loved one receives flowers and your card (we hand write your message), prepared with heart by your local florist!',
      simple: 'Simple',
      simpleText: 'designer picked seasonal flowers, 1-2 blooms, HKD53 per week.',
      elegant: 'Elegant',
      elegantText: 'designer picked seasonal flowers, 2-4 blooms, HKD93 per week.',
      bloom: 'Bloom',
      bloomText: 'designer picked seasonal flowers, 5-10 blooms, HKD223 per week.',
      aboutUs1: 'About',
      aboutUs2: 'Us',
      aboutUsText: 'MayDaisy is a movment of lasting love and simply enjoying flower. Through a weekly unrestricted design and delivery service, we make the expression of love persisting, fun, affordable, and full of surprises. We can deliver the weekly flowers to you (so you can deliver them in person), or deliver them directly to the reciepient. To make the movement more affordable to flower lovers, we begin to invite customers to subscribe when 150 customers have shown interest in an area. Check out if we are delivering your location now!',
      joinNow: "Join the flower lovers' MayDaisy movement now "
    },
    ch: {
      signUp: '報名',
      homeImgTitle: '本地花匠設計的鲜花，時令花材，每周一次。',
      homeImgSubtitle: '你想送花去邊個地區?',
      howItWorks1: ' ',
      howItWorks2: '五月菊',
      howItWorks3: '是什麼',
      howItWorks4: '1,2,3, 好簡單',
      subscribe: '訂購',
      subscribeText: '獎勵自己或給您愛的人每週送花，由本地花匠設計，時令花材，品種隨機。',
      receiveUpdate: '訂單資訊',
      receiveUpdateText: '我們會用電郵和這網頁保持聯繫，您亦可以在這個網頁上更新您的問候卡。',
      delight: '收花',
      delightText: '收花人會每週收到鲜花和您的問候卡，您的花匠會幫您手寫您的信息。',
      simple: '簡單',
      simpleText: '花匠用時令花材設計，1-2朵主花，每週 HKD53。',
      elegant: '優雅',
      elegantText: '花匠用時令花材設計，2-4朵主花，每週 HKD93。',
      bloom: '盛會',
      bloomText: '花匠用時令花材設計，5-10朵主花，每週 HKD223。',
      aboutUs1: '關於',
      aboutUs2: '我們',
      aboutUsText: '五月菊是一個關於簡單地享受花和細水長流的愛的運動。以每週無限制形式的訂購，我們令愛的表達變得更持久而有趣，更可以令愛花之人有更多驚喜。我們可以將鮮花配送給您(如果您想親自送花)，或直接配送給收花人。為了令五月菊更大眾化，每個地區的服務會在收集到150個報名之後開啟，屆時已報名的客人會收到電郵邀請。快來看看您的地區服務是否已開啟!',
      joinNow: '快來加入愛花之人的五月菊運動 '
    }
  });


const ButtonToRegionList = ({ title, history }) => (
  <Button bsStyle="" className="button" onClick={() => history.push('/signups')}>{strings.signUp}</Button>
);

export default class Homepage extends Component {

  constructor() {
    super();
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect = (eventKey) => {
    this.props.onRegionSelection(eventKey);
  }

  componentDidMount () {
    strings.setLanguage(this.props.language);
  }

  componentDidUpdate () {
    strings.setLanguage(this.props.language);
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
                  <DropdownButton title={selectRegion} className="home-image-select" id="bg-nested-dropdown" onSelect={this.handleSelect}>
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
              <Link to="/gallery-simple">
                <Col sm={4} className="home-pic-1 home-pic">
                  <div className="home-pic-shade"></div>
                  <div className="home-pic-text">
                    <div className="home-pic-title">{strings.simple}</div>
                    <div>{strings.simpleText}</div>
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
            <Route path="/" render={(props) => <ButtonToRegionList {...props}/>} />
          </Grid>
        </div>

        <div className="bar-pink">
          {strings.joinNow}<i className="fa fa-users"></i>
        </div>

      </div>
    )
  }
}
