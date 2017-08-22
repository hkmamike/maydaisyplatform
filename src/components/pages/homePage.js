import React, { Component } from 'react';
import { Grid, Row, Col, Glyphicon, DropdownButton, MenuItem } from 'react-bootstrap';

export default class Homepage extends Component {

  constructor() {
    super();
    this.state = {
      selectRegion: "Select Region"
    }
  }

  handleSelect = (eventKey) => {
    this.setState({selectRegion: eventKey});  
  }


  render() {
    return (
      <div className="no-padding">
        
        <div className="home-image-container">
          <div className="home-image">
            <Grid>
              <Row className="show-grid">
                <Col md={5} className="home-image-prompt">
                  <h3 className="home-image-title">Weekly Mystery Flowers Subscriptions</h3>
                  <div className="home-image-pink">Where are the flowers going?</div>
                  <DropdownButton placeholder="Select Region" title={this.state.selectRegion} className="home-image-select" id="bg-nested-dropdown" onSelect={this.handleSelect}>
                    <MenuItem eventKey="1">Hong Kong - Aberdeen</MenuItem>
                    <MenuItem eventKey="2">Hong Kong - Admiralty</MenuItem>
                    <MenuItem eventKey="3">Hong Kong - Ap Lei Chau</MenuItem>
                    <MenuItem eventKey="4">Hong Kong - Causeway Bay</MenuItem>
                    <MenuItem eventKey="5">Hong Kong - Central</MenuItem>
                    <MenuItem eventKey="6">Hong Kong - Chai Wan</MenuItem>
                    <MenuItem eventKey="7">Hong Kong - Deep Water Bay</MenuItem>
                    <MenuItem eventKey="8">Hong Kong - Fortress Hill</MenuItem>
                    <MenuItem eventKey="9">Hong Kong - Happy Valley</MenuItem>
                    <MenuItem eventKey="10">Hong Kong - Heng Fa Chuen</MenuItem>
                    <MenuItem eventKey="11">Hong Kong - Kennedy Town</MenuItem>
                    <MenuItem eventKey="12">Hong Kong - Mid-Level</MenuItem>
                    <MenuItem eventKey="13">Hong Kong - North Point</MenuItem>
                    <MenuItem eventKey="14">Hong Kong - Pok Fu Lam</MenuItem>
                    <MenuItem eventKey="15">Hong Kong - Quarry Bay</MenuItem>
                    <MenuItem eventKey="16">Hong Kong - Repulse Bay</MenuItem>
                    <MenuItem eventKey="17">Hong Kong - Sai Wan Ho</MenuItem>
                    <MenuItem eventKey="18">Hong Kong - Sai Ying Pun</MenuItem>
                    <MenuItem eventKey="19">Hong Kong - Admiralty</MenuItem>
                    <MenuItem eventKey="20">Hong Kong - Shau Kei Wan</MenuItem>
                    <MenuItem eventKey="21">Hong Kong - Shek O</MenuItem>
                    <MenuItem eventKey="22">Hong Kong - Shek Tong Tsui</MenuItem>
                    <MenuItem eventKey="23">Hong Kong - Sheung Wan</MenuItem>
                    <MenuItem eventKey="24">Hong Kong - Siu Sai Wan</MenuItem>
                    <MenuItem eventKey="25">Hong Kong - Stanley</MenuItem>
                    <MenuItem eventKey="26">Hong Kong - Tai Hang</MenuItem>
                    <MenuItem eventKey="27">Hong Kong - Tai Koo</MenuItem>
                    <MenuItem eventKey="28">Hong Kong - Tin Hau</MenuItem>
                    <MenuItem eventKey="29">Hong Kong - Wan Chai</MenuItem>
                    <MenuItem eventKey="30">Hong Kong - Wong Chuk Hang</MenuItem>
                    <MenuItem eventKey="31">Kowloon - Cheung Sha Wan</MenuItem>
                    <MenuItem eventKey="32">Kowloon - Choi Hung</MenuItem>
                    <MenuItem eventKey="33">Kowloon - Diamond Hill</MenuItem>
                    <MenuItem eventKey="34">Kowloon - Ho Man Tin</MenuItem>
                    <MenuItem eventKey="35">Kowloon - Hung Hom</MenuItem>
                    <MenuItem eventKey="36">Kowloon - Jordan</MenuItem>
                    <MenuItem eventKey="37">Kowloon - Kai Tak</MenuItem>
                    <MenuItem eventKey="38">Kowloon -  Kowloon Bay</MenuItem>
                    <MenuItem eventKey="39">Kowloon - Kowloon City</MenuItem>
                    <MenuItem eventKey="40">Kowloon - Kowloon Tong</MenuItem>
                    <MenuItem eventKey="41">Kowloon - Kwun Tong</MenuItem>
                    <MenuItem eventKey="42">Kowloon - Lai Chi Kok</MenuItem>
                    <MenuItem eventKey="43">Kowloon - Lam Tin</MenuItem>
                    <MenuItem eventKey="44">Kowloon - Lei Yue Mun</MenuItem>
                    <MenuItem eventKey="45">Kowloon - Lok Fu</MenuItem>
                    <MenuItem eventKey="46">Kowloon - Mei Foo</MenuItem>
                    <MenuItem eventKey="47">Kowloon - Mong Kok</MenuItem>
                    <MenuItem eventKey="48">Kowloon - Ngau Chi Wan</MenuItem>
                    <MenuItem eventKey="49">Kowloon - Nagu Tau Kok</MenuItem>
                    <MenuItem eventKey="50">Kowloon - Prince Edward</MenuItem>
                    <MenuItem eventKey="51">Kowloon - San Po Kong</MenuItem>
                    <MenuItem eventKey="52">Kowloon - Sham Shui Po</MenuItem>
                    <MenuItem eventKey="53">Kowloon - Tai Kok Tsui</MenuItem>
                    <MenuItem eventKey="54">Kowloon - To Kwa Wan</MenuItem>
                    <MenuItem eventKey="55">Kowloon - Tsim Shui Tsui</MenuItem>
                    <MenuItem eventKey="56">Kowloon - Tsz Wan Shan</MenuItem>
                    <MenuItem eventKey="57">Kowloon - Wong Tai Sin</MenuItem>
                    <MenuItem eventKey="58">Kowloon - Yau Ma Tei</MenuItem>
                    <MenuItem eventKey="59">Kowloon - Yau Tong</MenuItem>
                    <MenuItem eventKey="60">New Territories - Chek Lap Kok</MenuItem>
                    <MenuItem eventKey="61">New Territories - Cheung Chau</MenuItem>
                    <MenuItem eventKey="62">New Territories - Discovery Bay</MenuItem>
                    <MenuItem eventKey="63">New Territories - Fanling</MenuItem>
                    <MenuItem eventKey="64">New Territories - Fo Tan</MenuItem>
                    <MenuItem eventKey="65">New Territories - Kwai Fong</MenuItem>
                    <MenuItem eventKey="66">New Territories - Kwai Chung</MenuItem>
                    <MenuItem eventKey="67">New Territories - Cheung Chau</MenuItem>
                    <MenuItem eventKey="68">New Territories - Lai King</MenuItem>
                    <MenuItem eventKey="69">New Territories - Lamma Island</MenuItem>
                    <MenuItem eventKey="70">New Territories - Lantau Island</MenuItem>
                    <MenuItem eventKey="71">New Territories - Lau Fau Shan</MenuItem>
                    <MenuItem eventKey="72">New Territories - Lo Wu</MenuItem>
                    <MenuItem eventKey="73">New Territories - Lok Ma Chau</MenuItem>
                    <MenuItem eventKey="74">New Territories - Ma On Shan</MenuItem>
                    <MenuItem eventKey="75">New Territories - Ma Wan</MenuItem>
                    <MenuItem eventKey="76">New Territories - Peng Chau</MenuItem>
                    <MenuItem eventKey="77">New Territories - Cheung Chau</MenuItem>
                    <MenuItem eventKey="78">New Territories - Sai Kung</MenuItem>
                    <MenuItem eventKey="79">New Territories - Sha Tau Kok</MenuItem>
                    <MenuItem eventKey="80">New Territories - Sha Tin</MenuItem>
                    <MenuItem eventKey="81">New Territories - Sham Tseng</MenuItem>
                    <MenuItem eventKey="82">New Territories - Siu Lek Yuen</MenuItem>
                    <MenuItem eventKey="83">New Territories - Ta Kwu Ling</MenuItem>
                    <MenuItem eventKey="84">New Territories - Tai O</MenuItem>
                    <MenuItem eventKey="85">New Territories - Tai Po</MenuItem>
                    <MenuItem eventKey="86">New Territories - Tai Wai</MenuItem>
                    <MenuItem eventKey="87">New Territories - Tai Wo</MenuItem>
                    <MenuItem eventKey="88">New Territories - Tai Wo Hau</MenuItem>
                    <MenuItem eventKey="89">New Territories - Tin Shui Wai</MenuItem>
                    <MenuItem eventKey="90">New Territories - Tiu Keng Leng</MenuItem>
                    <MenuItem eventKey="91">New Territories - Tseung Kwan O</MenuItem>
                    <MenuItem eventKey="92">New Territories - Tsing Yi</MenuItem>
                    <MenuItem eventKey="93">New Territories - Tsuen Wan</MenuItem>
                    <MenuItem eventKey="94">New Territories - Tuen Mun</MenuItem>
                    <MenuItem eventKey="95">New Territories - Tung Chung</MenuItem>
                    <MenuItem eventKey="96">New Territories - Wu Kai Sha</MenuItem>
                    <MenuItem eventKey="97">New Territories - Yueng Long</MenuItem>
                  </DropdownButton>
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
