import React, { Component } from 'react';
import { Grid, Row, Col, Glyphicon, DropdownButton, MenuItem } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Route } from 'react-router-dom';

const ButtonToRegionList = ({ title, history }) => (
  <Button bsStyle="" className="button" onClick={() => history.push('/signups')}>Sign Up</Button>
);

export default class Homepage extends Component {

  constructor() {
    super();
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect = (eventKey) => {
    this.props.onRegionSelection(eventKey);
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
                  <h3 className="home-image-title">Weekly Mystery Flowers Subscription</h3>
                  <div className="home-image-pink">Where are the flowers going?</div>
                  <DropdownButton title={selectRegion} className="home-image-select" id="bg-nested-dropdown" onSelect={this.handleSelect}>
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
                  <Route path="/" render={(props) => <ButtonToRegionList {...props}/>} />
                </Col>
              </Row>
            </Grid>
          </div>
        </div>

        <div className="how-it-works">
          <h2> How <span className="home-company-name">One Bloom</span> Works </h2>
          <h3 className="home-123"> AS SIMPLE AS 1,2,3 </h3>
          <Grid>
            <Row className="show-grid">
              <Col sm={4}><Glyphicon glyph="list-alt" className="icons"/>
                <h3 className="icon-title">Subscribe</h3>
                <div className="icon-description">Send weekly mystery flowers to your loved one. Let us know who the lucky one is.</div>
              </Col>
              <Col sm={4}><Glyphicon glyph="question-sign" className="icons"/>
                <h3 className="icon-title">Receive Update</h3>
                <div className="icon-description">2 days before delivery, we email you the details about the upcoming flowers, and you can update your card on our website.</div>
              </Col>
              <Col sm={4}><Glyphicon glyph="heart" className="icons"/>
                <h3 className="icon-title">Surprise</h3>
                <div className="icon-description">Your loved one receive weekly mystery flower, prepared with heart by our designers and fresh cut from the farm!</div>
              </Col>
            </Row>
          </Grid>
        </div>



        <div className="home-about">
          <h2> About <span className="home-company-name">Us</span></h2>
          <div className="home-about-text"> One Bloom is a movment of lasting love. Through a weekly mystery flower design and delivery service, we make the expression of love persisting, fun, affordable, and full of surprises. We can deliver the weekly flowers to you (so you can deliver them in person), or deliver them directly to your loved one. To lower the price, we begin to invite customers to subscribe when 100 customers have shown interest in an area. Check out which areas we are delivering to now!</div>
        </div>

      </div>
    )
  }
}
