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
      noteOn: 'Note on',
      planName: 'Elegant',
      li1: 'For HKD93 per week, this plan is a weekly unrestricted flower design and delivery service prepared by our florists.',
      li2: "While each week's design is different, Elegant most often consists of 2-4 major blooms, sometimes supported by minor flowers.",
      li3: 'Office locations receive wrapped arrangement, while home and cemetery locations receive vase arrangement.',
      li4: 'For vase arrangement, please provide your vase in an area where our florist can access. For home locations, please put your vase in front of your door if no one is at home.',
      li5: "For the Elegant plan, the ideal vase height is 10-15cm and the ideal vase opening's diameter is 2-3cm.",
      li6: 'To make MayDaisy affordable to flower lovers, we begin to invite customers to subscribe when 150 customers have shown interest in an area. Check out if we are servicing your area now!'
    },
    ch: {
      signUp: '報名',
      title: '相簿',
      classic: '經典',
      elegant: '優雅',
      bloom: '盛會',
      noteOn: '計劃須知: ',
      planName: '優雅',
      li1: '「優雅」計劃由本地花匠籌劃，只需港幣53元就可享每週一次的花卉設計和配送服務。',
      li2: '我們的花匠會用時令花材設計您的花卉。「優雅」計劃的設計雖然每週不同，但一般會有2-4朵主花及以適合的配花作襯托。',
      li3: '辦公室地點會以花束配送，而住家和墓園地點會以到場插花的形式配送。',
      li4: '如果您訂購了到場插花的服務，請將花瓶放在一個花匠可以到達的地方。以住家地點為例，如果配送當天家中沒有人，請將花瓶放在門前一個安全的位置。',
      li5: '建議花瓶尺寸:「優雅」計劃的設計配以一個 10-15cm 高，開口直徑 2-3cm 大的花瓶效果會較好。',
      li6: '為了令五月菊價格更大眾化，每個地區的服務會在收集到150個報名之後開啟，屆時已報名的客人會收到電郵邀請。快來看看您的地區服務是否已開啟!'
    }
  });
  

const ButtonToRegionList = ({ title, history }) => (
    <Button bsStyle="" className="button" onClick={() => history.push('/')}>{strings.signUp}</Button>
  );

export default class GalleryElegant extends Component {

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
                    <Link to="/gallery-classic"><div>{strings.classic}</div></Link>
                    <i className="fa fa-circle gallery-nav-separator"></i>
                    <div className="flow-selected">{strings.elegant}</div>
                    <i className="fa fa-circle gallery-nav-separator"></i>
                    <Link to="/gallery-bloom"><div>{strings.bloom}</div></Link>
                </Col>
                <div className="horizontal-line small-screen-hide"></div>
            </Row>
        </Grid>
        <Grid>
          <Row className="show-grid gallery-pic-container">
              <Col sm={4} className="gallery-pic-m1 gallery-pic">
              </Col>
              <Col sm={4} className="gallery-pic-m2 gallery-pic">
              </Col>
              <Col sm={4} className="gallery-pic-m3 gallery-pic">
              </Col>
          </Row>
        </Grid>
        <Grid>
          <Row className="show-grid gallery-pic-container">
              <Col sm={4} className="gallery-pic-m4 gallery-pic">
              </Col>
              <Col sm={4} className="gallery-pic-m5 gallery-pic">
              </Col>
              <Col sm={4} className="gallery-pic-m6 gallery-pic">
              </Col>
          </Row>
        </Grid>
        <Grid>
          <Row className="show-grid gallery-pic-container">
              <Col sm={4} className="gallery-pic-m7 gallery-pic">
              </Col>
              <Col sm={4} className="gallery-pic-m8 gallery-pic">
              </Col>
              <Col sm={4} className="gallery-pic-m9 gallery-pic">
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
