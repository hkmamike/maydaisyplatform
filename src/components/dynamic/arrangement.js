import React, { Component } from 'react';
import { Grid, Row, Col, Button, DropdownButton, MenuItem, Glyphicon, Tooltip, OverlayTrigger, Panel, FormGroup, FormControl } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import LocalizedStrings from 'react-localization';
import * as firebase from 'firebase';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import Lightbox from 'react-images';

let strings = new LocalizedStrings({
    en:{
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

        buttonToMarket: 'Back to market',

        descriptionTab: 'DESCRIPTION',
        deliveryInfoTab: 'DELIVERY INFO',
        deliveryFeeTip: 'Florists specified delivery fee for this region.',
        deliverTo: 'Deliver to:',
        selectDate: 'Select date:',
        noCoverageTip1: 'Oh no! This florist does not deliver to ',
        noCoverageTip2: ". Let's go back to the market to find one that does.",
        excludingDelivery: 'Excluding delivery',
        originalPriceTip: 'Original Price',
        discountedPriceTip: 'Promo-code Applied',
        deliveryFee: 'Delivery fee',

        dateRequired: '*Please select a delivery date.',
        orderNow: 'Order Now',
        otherDesigns1: 'Other Designs by ',
        otherDesigns2: ':',

        promoCodeButton: 'Promo-code ',
        applyButton: 'Apply',
        promoCodeApplied: 'Success! promo code applied.',
        promoCodeFailed: 'UhOh, this is not a valid promo code.',
    },
    ch: {
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

        buttonToMarket: '返回市集',
        descriptionTab: '貨品描述',
        deliveryInfoTab: '送貨詳情',

        deliveryFeeTip: '花匠收取的送貨費用。',
        deliverTo: '送往:',
        selectDate: '送花日期:',
        noCoverageTip1: '這位花匠暫時不送貨到',
        noCoverageTip2: "。我們返回市集再選購吧！",
        excludingDelivery: '不包括送貨費',
        originalPriceTip: '原價',
        discountedPriceTip: '折扣後',
        deliveryFee: '送貨費',

        dateRequired: '*請選擇送貨日期。',
        orderNow: '現在下單',
        otherDesigns1: ' ',
        otherDesigns2: '的其他設計:',

        promoCodeButton: '折扣碼 ',
        applyButton: '使用',
        promoCodeApplied: '成功！已行使折扣碼。',
        promoCodeFailed: '哎喲，這個折扣碼不正確噢。',
    }
});

const ButtonToMarket = ({ history }) => (
    <Button bsStyle="" className="button-to-market" onClick={() => history.push('/arrangements')}>{strings.buttonToMarket}</Button>
);

const ButtonToSearch = ({ history }) => (
    <Button bsStyle="" className="button-to-search" onClick={() => history.push(`/arrangements/${this.props.marketRegion}`)}>{strings.buttonToMarket}</Button>
);

const deliveryTooltip = (
    <Tooltip id="deliveryTooltip">{strings.deliveryFeeTip}</Tooltip>
  );

export default class Arrangement extends Component {

    constructor() {
        super();
        this.toggleContent = this.toggleContent.bind(this);
        this.handleOrder = this.handleOrder.bind(this);
        this.checkFloristCalendar = this.checkFloristCalendar.bind(this);
        this.state = {
            loading: true,
            descriptionActive: true,
            deliveryActive: false,
            arrangementsList: [],
            lightboxIsOpen: false,
            promoCodeMessage: null,
            promoCodeError: null,
            promoCode: '',
        };
    }

    toggleContent(tab) {
        if (tab===0) {
            this.setState({descriptionActive: true, deliveryActive: false});
        } else if (tab===1) {
            this.setState({descriptionActive: false, deliveryActive: true});
        }
    }

    toOtherArrangement(id) {
        window.scrollTo(0, 0);
        var thisRef = this;
        var arrangementsList = [];
        this.setState ({arrangement: id, floristID: this.props.match.params.floristID}, () => {
            firebase.database().ref(`arrangementsList/${this.state.arrangement}`).once('value', function(snapshot) {
                thisRef.setState({
                    loading: false,
                    arrangementDescription: snapshot.val().description,
                    arrangementPrice: snapshot.val().price,
                    arrangementCurrency: snapshot.val().currency,
                    arrangementSeasonality: snapshot.val().seasonality,
                    arrangementID: snapshot.val().id,
                    arrangementImage: snapshot.val().image,
                    arrangementName: snapshot.val().name,
                    arrangementFlorist: snapshot.val().florist,
                    arrangementFloristName: snapshot.val().floristName,
                });
            });
            firebase.database().ref('arrangementsList')
            .orderByChild('florist')
            .equalTo(this.props.match.params.floristID)
            .once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    if (childKey !== thisRef.props.match.params.arrangement){
                        arrangementsList.push(childData);
                    }
                });
                thisRef.setState({arrangementsList: arrangementsList});
            });
        });
    }

    handlePromoCodeChange = (e) => {
        this.setState({ promoCode: e.target.value });
    }

    handleSelectRegion = (eventKey) => {
        this.props.onMarketRegionSelect(eventKey);
    }

    handleDeliveryDateSelect = (date) => {
        this.props.onDeliveryDateSelect(date);
    }

    handleOrder = (floristID, arrangement) => {
        if (this.props.deliveryDate) {
            this.props.history.push(`/order/${floristID}/${arrangement}`);
        }
        else {
            this.setState({orderButtonPressed: true});
        }
    }

    applyPromoCode = () => {
        if (this.state.promoCode === this.state.promoCodeA) {
            this.setState({
                arrangementPrice: this.state.arrangementPrice2,
                promoCodeMessage: strings.promoCodeApplied,
                promoCodeError: null,
                promoCodeApplied: true,
            });
        } else if (this.state.promoCode === this.state.promoCodeB) {
            this.setState({
                arrangementPrice: this.state.arrangementPrice3,
                promoCodeMessage: strings.promoCodeApplied,
                promoCodeError: null,
                promoCodeApplied: true,
            });
        } else {
            this.setState({
                promoCodeError: strings.promoCodeFailed,
                promoCodeMessage: null,
            });
        }
    }

    closeLightbox = () => {
        this.setState({lightboxIsOpen: false});
    }

    checkFloristCalendar(day) {
        var arrangementDeliveryBlockedDays = this.state.arrangementDeliveryBlockedDays;
        var arrangementDeliveryLeadTime = this.state.arrangementDeliveryLeadTime;
        var blockedDayFail = false;
        var leadTimeFail = false;
        var diff = day.diff(moment(), 'days');

        if (arrangementDeliveryBlockedDays!==null) {
            if (arrangementDeliveryBlockedDays.indexOf(day.day()) > -1) {
                blockedDayFail = true;
            }
        }
        if (diff - arrangementDeliveryLeadTime < 0 ) {
            leadTimeFail = true;
        }
        if (leadTimeFail || blockedDayFail) {
            return true
        } else {
            return false
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        var thisRef = this;
        var floristID = this.props.match.params.floristID;
        var marketRegion = this.props.marketRegion;
        var arrangementsList = [];
        this.setState ({arrangement: this.props.match.params.arrangement, floristID: this.props.match.params.floristID}, () => {
            firebase.database().ref(`arrangementsList/${this.state.arrangement}`).once('value', function(snapshot) {
                var snapshotVal = snapshot.val();
                thisRef.setState({
                    loading: false,
                    arrangementDescription: snapshotVal.description,
                    arrangementPrice: snapshotVal.price,
                    arrangementPrice2: snapshotVal.price2,
                    arrangementPrice3: snapshotVal.price3,
                    arrangementCurrency: snapshotVal.currency,
                    arrangementSeasonality: snapshotVal.seasonality,
                    arrangementID: snapshotVal.id,
                    arrangementImage: snapshotVal.image,
                    arrangementName: snapshotVal.name,
                    arrangementFlorist: snapshotVal.florist,
                    arrangementFloristName: snapshotVal.floristName,
                    arrangementOriginalPrice: snapshotVal.price,
                });
            });
            firebase.database().ref('arrangementsList')
            .orderByChild('florist')
            .equalTo(floristID)
            .once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    if (childKey !== thisRef.props.match.params.arrangement){
                        arrangementsList.push(childData);
                    }
                });
                thisRef.setState({arrangementsList: arrangementsList});
            });

            firebase.database().ref(`florists/${floristID}`).once('value', function(snapshot) {
                var snapshotVal = snapshot.val();
                thisRef.setState({
                    promoCodeA: snapshotVal.promoCodeA,
                    promoCodeB: snapshotVal.promoCodeB,
                    arrangementDeliveryInfo: snapshotVal.deliveryInfo,
                    arrangementDeliveryLeadTime: snapshotVal.arrangementDeliveryLeadTime,
                    arrangementDeliveryBlockedDays: snapshotVal.deliveryBlockedDays,
                    arrangementDeliveryFee: snapshotVal.deliveryFee[marketRegion],
                });
            });
        });
    }
    
    componentWillReceiveProps (nextProps) {
        if (nextProps.languageChanged==='ch') {
            strings.setLanguage('ch');
        } else if (nextProps.languageChanged==='en') {
            strings.setLanguage('en');
        }

        var thisRef = this;
        var floristID = this.props.match.params.floristID;
        firebase.database().ref(`florists/${floristID}/deliveryFee`).once('value', function(snapshot) {
            var snapshotVal = snapshot.val();
            thisRef.setState({
                arrangementDeliveryFee: snapshotVal[nextProps.marketRegion],
                arrangementDeliveryCurrency: snapshotVal.currency,
            });
        });
    }

    componentWillMount() {
        strings.setLanguage(this.props.languageChanged);
    }

  render() {

    var loadingState = this.state.loading;
    var marketRegion = this.props.marketRegion;
    let content = null;
    var arrangementImage = this.state.arrangementImage;

    var listOfArrangements = this.state.arrangementsList.map(arrangement => 
        <Col xs={6} sm={4} key={arrangement.id} className="list-item">
            <Link to={`/florist/${this.state.floristID}/${arrangement.id}`} onClick={() => this.toOtherArrangement(arrangement.id)}>
                <div className="list-pic" style={{ backgroundImage: 'url(' + arrangement.image + ')'}}></div>
                <div className="text-box">
                    <div className="text-line">
                        <div className="list-name">{arrangement.name}</div>
                        <div className="list-price">${arrangement.price}</div>
                    </div>
                </div>
            </Link>
        </Col>
    );

    if (loadingState) {
      content = (
        <div>
          <div className="loader"></div>
        </div>
      )
    } else {
      content = (
        <Grid className="arrangement-container">
            <Row className="main-row">
                <Col xs={12} sm={6}>
                    <div className="arrangement-img-box">
                        <div className="arrangement-pic" style={{ backgroundImage: 'url(' + this.state.arrangementImage + ')'}}></div>
                    </div>
                </Col>
                <Col xs={12} sm={6}>
                    <div className="arrangement-inline">
                        <div className="arrangement-name">{this.state.arrangementName}</div>
                        <Route path="/" render={(props) => <ButtonToMarket {...props}/>} />
                    </div>
                    <div className="arrangement-florist-name">by <Link to={`/florist/${this.state.arrangementFlorist}`} >{this.state.arrangementFloristName}</Link></div>
                    <ul className="arrangement-details-toggle">
                        <li className={this.state.descriptionActive ? 'toggle-active': null} onClick={() => this.toggleContent(0)} >{strings.descriptionTab}</li>
                        <li className={this.state.deliveryActive ? 'toggle-active': null} onClick={() => this.toggleContent(1)} >{strings.deliveryInfoTab}</li>
                    </ul>
                    { this.state.descriptionActive &&
                        <div className="arrangement-info">{this.state.arrangementDescription}</div>
                    }
                    { this.state.deliveryActive &&
                        <div className="arrangement-info">{this.state.arrangementDeliveryInfo}</div>
                    }

                    <div className="delivery-inline">
                        <div className="select-delivery-block">
                            <div className="region-select-tip">{strings.deliverTo}</div> 
                            <DropdownButton 
                                title={strings[marketRegion]}
                                className="region-select" 
                                id="bg-nested-dropdown" 
                                onSelect={this.handleSelectRegion}
                            >
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
                        </div>

                        <div className="select-date-block">
                            <div className="date-select-tip">{strings.selectDate}</div> 
                            <SingleDatePicker
                                numberOfMonths={1}
                                date={this.state.date} // momentPropTypes.momentObj or null
                                onDateChange={date => {
                                    this.setState({date});
                                    this.handleDeliveryDateSelect(date);
                                }} // PropTypes.func.isRequired
                                focused={this.state.focused} // PropTypes.bool
                                onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                                isDayBlocked={this.checkFloristCalendar}
                            />
                        </div>
                    </div>

                    { this.state.arrangementDeliveryFee=== -1 &&
                        <div>
                            <div className="error-message">{strings.noCoverageTip1}{strings[marketRegion]}{strings.noCoverageTip2}</div>
                        </div>
                    }

                    <div className="price-inline">
                        {!this.state.promoCodeApplied && <div className="price-block">
                            <div className="arrangement-price">${this.state.arrangementPrice}</div>
                            <div className="arrangement-price-tip">{strings.excludingDelivery}</div>
                        </div>}
                        {this.state.promoCodeApplied && <div className="price-block-original">
                            <div className="arrangement-price">${this.state.arrangementOriginalPrice}</div>
                            <div className="arrangement-price-tip">{strings.originalPriceTip}</div>
                        </div>}
                        {this.state.promoCodeApplied && <div className="price-block-discounted">
                            <div className="arrangement-price">${this.state.arrangementPrice}</div>
                            <div className="arrangement-price-tip">{strings.discountedPriceTip}</div>
                        </div>}

                        { this.state.arrangementDeliveryFee!== -1 &&
                            <div className="delivery-fee-block">
                                <div className="arrangement-delivery-fee">${this.state.arrangementDeliveryFee}</div>
                                <div className="arrangement-delivery-fee-tip">
                                    <OverlayTrigger placement="right" overlay={deliveryTooltip}>
                                        <i className="fa fa-question-circle" aria-hidden="true"></i>
                                    </OverlayTrigger>
                                    <span> {strings.deliveryFee}({strings[marketRegion]})</span>
                                </div>
                            </div>
                        }
                    </div>

                    <Button bsStyle="" onClick={() => this.setState({ promoCodeOpen: !this.state.promoCodeOpen })} className="promo-code-button">
                        {strings.promoCodeButton}
                        {!this.state.promoCodeOpen && <i className="fa fa-caret-down" aria-hidden="true"></i>}
                        {this.state.promoCodeOpen && <i className="fa fa-caret-up" aria-hidden="true"></i>}
                    </Button>
                    <Panel collapsible expanded={this.state.promoCodeOpen} className="promo-code-collaspsible">
                        <div className="promo-code-inline">
                            <FormGroup>
                                <FormControl className="data-field-update" type="text" value={this.state.promoCode} onChange={this.handlePromoCodeChange} />
                            </FormGroup>
                            <Button bsStyle="" onClick={this.applyPromoCode} className="promo-code-apply">{strings.applyButton}</Button>
                            { this.state.promoCodeMessage &&
                                <div className="alert alert-success promo-update-message" role="alert">
                                    <Glyphicon glyph="exclamation-sign" className="icons"/>&nbsp;{this.state.promoCodeMessage} 
                                </div>
                            }
                            { this.state.promoCodeError &&
                                <div className="alert alert-danger promo-update-message" role="alert">
                                    <Glyphicon glyph="exclamation-sign" className="icons"/>&nbsp;{this.state.promoCodeError} 
                                </div>
                            }
                        </div>
                    </Panel>

                    { (!this.props.deliveryDate && this.state.orderButtonPressed) &&
                        <div>
                            <div className="error-message">{strings.dateRequired}</div>
                        </div>
                    }

                    { this.state.arrangementDeliveryFee=== -1 &&
                        <div className="button-box">
                            <Route path="/" render={(props) => <ButtonToSearch {...props}/>} />
                        </div>
                    }

                    { this.state.arrangementDeliveryFee!== -1 &&
                        <div className="button-box">
                            <Route path="/" render={() => <Button bsStyle="" className="button-to-order" onClick={() => this.handleOrder(this.state.floristID, this.state.arrangement)}>{strings.orderNow}</Button>}/>
                        </div>
                    }

                </Col>
            </Row>
            <Row>
                <div className="horizontal-line"></div>
                <div className="arrangement-section-title">{strings.otherDesigns1}{this.state.arrangementFloristName}{strings.otherDesigns2}</div>
                <div className="sub-content list-container">{listOfArrangements}</div>
            </Row>
        </Grid>
      )
    }

    return (
        <div>
            {content}
        </div>
    )
  }
}
