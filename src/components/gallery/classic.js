import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en:{
      signUp: 'Sign Up',
      title: 'Gallery',
      classic: 'Classic',
      elegant: 'Elegant',
      bloom: 'Bloom',
      noteOn: 'Note on ',
      planName: 'Classic',
      li1: 'For HKD53 per week, this plan is a weekly unrestricted flower design and delivery service prepared by our florists.',
      li2: "While each week's design is different, Classic most often consists of 1-2 major blooms, sometimes supported by minor flowers.",

      li3: 'For office and home locations, flowers will be delivered with a simple wrapping for delivery purposes.',
      li4: 'For home locations, if your lobby reception does not take flowers, please place a vase in front of your door if no one is at home on the day of delivery.',
      
      li5: "For the Classic plan, the ideal vase height is 10-15cm and the ideal vase opening's diameter is 3-4cm.",
      li6: 'To make MayDaisy affordable to flower lovers, we begin to invite customers to subscribe when 150 customers have shown interest in an area. Check out if we are servicing your area now!'
    },
    ch: {
      signUp: '報名',
      title: '相簿',
      classic: '經典',
      elegant: '優雅',
      bloom: '盛會',
      noteOn: '計劃須知: ',
      planName: '經典',
      li1: '「經典」計劃由本地花匠籌劃，只需港幣53元就可享每週一次的花卉設計和配送服務。',
      li2: '我們的花匠會用時令花材設計您的花卉。「經典」計劃的設計雖然每週不同，但一般會有1-2朵主花及以適合的配花作襯托。',

      li3: '住家地點和辦公室的花卉會以簡單的花紙包成花束發送。',
      li4: '如果配送住家地點，但當天家中沒有人而您的大堂前台不收花，請將一個花瓶放在門前一個安全的位置收花。',

      li5: '建議花瓶尺寸:「經典」計劃的設計配以一個 10-15cm 高，開口直徑 3-4cm 大的花瓶效果會較好。',
      li6: '為了令五月菊價格更大眾化，每個地區的服務會在收集到150個報名之後開啟，屆時已報名的客人會收到電郵邀請。快來看看您的地區服務是否已開啟!'
    }
});
  
const ButtonToRegionList = ({ title, history }) => (
  <Button bsStyle="" className="button" onClick={() => history.push('/')}>{strings.signUp}</Button>
);

export default class GalleryClassic extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
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

    return (
      <div className="no-padding gallery-container">
        <Grid>
          <Row>
            <Col sm={12} className="small-screen-hide">
              <h2 className="gallery-title">{strings.title}</h2>
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row className="show-grid gallery-nav">
            <div className="horizontal-line small-screen-hide"></div>
              <Col xs={12} className="nav-margin">
                  <div className="flow-selected">{strings.classic}</div>
                  <i className="fa fa-circle gallery-nav-separator"></i>
                  <Link to="/gallery-elegant"><div> {strings.elegant}</div></Link>
                  <i className="fa fa-circle gallery-nav-separator"></i>
                  <Link to="/gallery-bloom"><div>{strings.bloom}</div></Link>
              </Col>
              <div className="horizontal-line small-screen-hide"></div>
          </Row>
        </Grid>
        <Grid>
          <Row className="show-grid gallery-pic-container">
              <Col sm={4} className="gallery-pic-s1 gallery-pic">
              </Col>
              <Col sm={4} className="gallery-pic-s2 gallery-pic">
              </Col>
              <Col sm={4} className="gallery-pic-s3 gallery-pic">
              </Col>
          </Row>
        </Grid>
        <Grid>
          <Row className="show-grid gallery-pic-container">
              <Col sm={4} className="gallery-pic-s4 gallery-pic">
              </Col>
              <Col sm={4} className="gallery-pic-s5 gallery-pic">
              </Col>
              <Col sm={4} className="gallery-pic-s6 gallery-pic">
              </Col>
          </Row>
        </Grid>
        <Grid>
          <Row className="show-grid gallery-pic-container">
              <Col sm={4} className="gallery-pic-s7 gallery-pic">
              </Col>
              <Col sm={4} className="gallery-pic-s8 gallery-pic">
              </Col>
              <Col sm={4} className="gallery-pic-s9 gallery-pic">
              </Col>
          </Row>
        </Grid>
        <div className="gallery-about">
          <Grid>
            <Row>
              <h2>{strings.noteOn}<span className="gallery-plan-name">{strings.planName}</span></h2>
              <Col sm={1}></Col>
              <Col sm={10}>
                <div className="gallery-plan-text">
                  <ul>
                    <li>{strings.li1}</li>
                    <li>{strings.li2}</li>
                    <li>{strings.li3}</li>
                    <li>{strings.li4}</li>
                    <li>{strings.li5}</li>
                    <li>{strings.li6}</li>
                  </ul>
                </div>
              </Col>
              <Col sm={1}></Col>
            </Row>
            <Route path="/" render={(props) => <ButtonToRegionList {...props}/>} />
          </Grid>
        </div>
      </div>
    )
  }
}
