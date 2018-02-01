import React, { Component } from 'react';
import { Grid, Row, Col, Button, DropdownButton, MenuItem, Glyphicon, Tooltip, OverlayTrigger, Panel, FormGroup, FormControl } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import LocalizedStrings from 'react-localization';
import * as firebase from 'firebase';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import 'moment-timezone';
import { Helmet } from 'react-helmet';

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
        specialPickUpLocation: 'Self Pick Up',
        buttonToMarket: 'Back to market',
        descriptionTab: 'Details',
        deliveryInfoTab: 'Delivery',
        substitutionTab: 'Substitution',
        deliveryFeeTip: 'Florists specified delivery fee for this region.',
        deliverTo: 'Deliver to:',
        selectDate: 'Select date:',
        noCoverageTip1: 'Oh no! This florist does not deliver to ',
        noCoverageTip2: ". Let's go back to the market to find one that does.",
        noPickUpTip1: 'Oh no! This florist does not provide ',
        noPickUpTip2: ". Let's go back to the market to find one that does.", 
        excludingDelivery: 'Excluding delivery',
        originalPriceTip: 'Original Price',
        discountedPriceTip: 'Promo-code Applied',
        deliveryFee: 'Delivery fee',
        specialPickUpTitle: "Florist's policy on self-pickup:",
        dateRequired: '*Please select a delivery date.',
        marketRegionRequired: '*Please select a delivery region.',
        orderNow: 'Order Now',
        otherDesigns1: 'Other Designs by ',
        otherDesigns2: ':',
        promoCodeButton: 'Promo-code ',
        applyButton: 'Apply',
        promoCodeApplied: 'Success! promo code applied.',
        promoCodeFailed: 'UhOh, this is not a valid promo code.',
        promoCodeNotApplicable: 'This florist did not specify a discount price for this promo code.',
        substitutionPolicy: "Sometimes, florists' photo represent an overall theme or look and include a one-of-a-kind vase which cannot be exactly replicated. Although the delivered bouquet may not precisely match the photo, its temperament will. Occasionally, substitutions of flowers or containers happen due to weather, seasonality and market conditions which may affect availability. If this is the case with the gift you've selected, the local florist will ensure that the style, theme and color scheme of your arrangement is preserved and will only substitute items of equal or higher value.",
        standardDeliveryPolicy: "Every gift ordered through MayDaisy is personally hand-delivered by the local florist. Each local florist sets their own delivery area, and fee.\n\n Some florists offer same-day hand delivery, and the platform wide cut-off time for same-day delivery is 1 p.m local time at the destination city. Orders received after that time may be delivered the following day.\n\n To request a specific delivery time, please type it into the Delivery Instructions field during checkout. We will do our best to accommodate your preferences. Before major holidays and festive seasons, we recommend that you place your orders at least five days in advance.\n\n",
        standardDeliveryPolicyPlus: "The following is your florist's own delivery policy:\n\n",

        artist: 'Independent Artist',
        shop: 'Boutique Shop',
        rating: 'Ave. Rating:',
        ratingCount: ' reviews',
        buttonToFlorist: 'Visit Shop',
    },
    zh: {
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
        specialPickUpLocation: '免運費自取',
        buttonToMarket: '返回市集',
        descriptionTab: '貨品描述',
        deliveryInfoTab: '送貨詳情',
        deliveryFeeTip: '花匠收取的送貨費用。',
        deliverTo: '送往:',
        selectDate: '送花日期:',
        noCoverageTip1: '這位花匠暫時不送貨到',
        noCoverageTip2: "。我們返回市集再選購吧！",
        noPickUpTip1: '這位花匠暫時不提供',
        noPickUpTip2: "。我們返回市集再選購吧！",
        excludingDelivery: '不包括送貨費',
        originalPriceTip: '原價',
        discountedPriceTip: '折扣後',
        deliveryFee: '送貨費',
        specialPickUpTitle: "花匠設定的免費自取地點和條款:",
        dateRequired: '*請選擇送貨日期。',
        marketRegionRequired: '*請選擇送貨地區',
        orderNow: '現在下單',
        otherDesigns1: ' ',
        otherDesigns2: ' 的其他設計:',
        promoCodeButton: '折扣碼 ',
        applyButton: '使用',
        promoCodeApplied: '成功！已行使折扣碼。',
        promoCodeFailed: '哎喲，這個折扣碼不正確噢。',
        promoCodeNotApplicable: '花匠沒有為這個設計定立折扣價噢。',
        substitutionTab: '替代品',
        substitutionPolicy: "花藝師的照片代表整體的主題或外觀。在某些情況下，花卉或花瓶不能被完全複製。雖然真正的花卉可能不完全符合照片，但它們的主題和外觀會。由於天氣，季節和市場條件可能會影響鮮花的供應，有時花匠會選用替代品。如果您選擇的定購遇到這種情況，花店將確保設計的風格，主題和配色方案得以保留，並且只會選用相同或更高價值的替代品。",
        standardDeliveryPolicy: "每一件設計貨品都是由您所選的當地花店或花藝師創作和親自送貨的。每一個花店和花藝師都有各自的服務區域和送貨收費。\n\n 有一些花店和花藝師提供當天送貨服務，五月菊的當天送貨截止時間為下午一時。下午一時以後收到的訂單有可能會在下一天送貨。\n\n 如果您想指定送貨時間，請在送貨指示中要求，花匠會在可行情況下盡量配合。在主要節日和假期前，我們建議客人在最少五天前下單。\n\n",
        standardDeliveryPolicyPlus: "以下為所選花店的送貨條款:\n\n",

        artist: '獨立花藝師',
        rating: '平均評分:',
        shop: '精品花店',
        ratingCount: ' 評價',
        buttonToFlorist: '參觀花店',
    }
});

class ButtonToMarket extends React.Component {
    render() {
       return( 
            <Button bsStyle="" className="button-to-market" 
                onClick={() => {
                    if (this.props.marketRegion === 'specialPickUpLocation') {
                        this.props.handleMarketRegionSelect('select_region');
                    }
                    this.props.history.push(`/${this.props.languageChanged}/arrangements/category/region/`);
                }}
            >
                {strings.buttonToMarket}
            </Button>
        )
    }
}

class ButtonToSearch extends React.Component {
    render() {
        return( 
             <Button bsStyle="" className="button-to-search" 
                onClick={() => {
                    if (this.props.marketRegion === 'specialPickUpLocation') {
                        this.props.handleMarketRegionSelect('select_region');
                        this.props.history.push(`/${this.props.languageChanged}/arrangements/category/region/`);
                    } else {
                        this.props.history.push(`/${this.props.languageChanged}/arrangements/category/region/${this.props.marketRegion}`);
                    }
                 }}
             >
                 {strings.buttonToMarket}
             </Button>
         )
     }
}

class ButtonToFlorist extends React.Component {
    render() {
       return( 
            <Button bsStyle="" className="button-to-florist" 
                onClick={() => {
                    this.props.history.push(`/${this.props.languageChanged}/florist/${this.props.floristID}/`);
                }}
            >
                {strings.buttonToFlorist}
            </Button>
        )
    }
}

const deliveryTooltip = (
    <Tooltip id="deliveryTooltip">{strings.deliveryFeeTip}</Tooltip>
  );

export default class Arrangement extends Component {

    constructor() {
        super();
        this.toggleContent = this.toggleContent.bind(this);
        this.checkFloristCalendar = this.checkFloristCalendar.bind(this);
        this.state = {
            loading: true,
            descriptionActive: true,
            deliveryActive: false,
            substitutionActive: false,
            arrangementsList: [],
            lightboxIsOpen: false,
            promoCodeMessage: null,
            promoCodeError: null,
            promoCode: '',
            promoCodeList: [],
        };
    }

    toggleContent(tab) {
        if (tab===0) {
            this.setState({descriptionActive: true, deliveryActive: false, substitutionActive: false});
        } else if (tab===1) {
            this.setState({descriptionActive: false, deliveryActive: true, substitutionActive: false});
        } else if (tab===2) {
            this.setState({descriptionActive: false, deliveryActive: false, substitutionActive: true});
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
                    arrangementPrice2: snapshot.val().price2,
                    arrangementPrice3: snapshot.val().price3,
                    arrangementPrice5Off: snapshot.val().price5Off,
                    arrangementPrice7Off: snapshot.val().price7Off,
                    arrangementPrice10Off: snapshot.val().price10Off,
                    arrangementPrice15Off: snapshot.val().price15Off,
                    arrangementOriginalPrice: snapshot.val().price,
                    arrangementCurrency: snapshot.val().currency,
                    arrangementSeasonality: snapshot.val().seasonality,
                    arrangementID: snapshot.val().id,
                    arrangementImage: snapshot.val().image,
                    arrangementName: snapshot.val().name,
                    arrangementFlorist: snapshot.val().florist,
                    arrangementFloristName: snapshot.val().floristName,
                    promoCode: '',
                    promoCodeApplied: false,
                    promoCodeMessage: null,
                    promoCodeError: null,
                });
            });
            firebase.database().ref('arrangementsList')
            .orderByChild('florist')
            .equalTo(this.props.match.params.floristID).limitToFirst(7)
            .once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    if (childKey !== thisRef.props.match.params.arrangement && (arrangementsList.length < 6)){
                        arrangementsList.push(childData);
                        console.log(childData);
                    }
                });
                thisRef.setState({arrangementsList: arrangementsList});
            });
        });
    }

    handlePromoCodeChange = (e) => {
        var code = e.target.value;
        code = code.toLowerCase();
        this.setState({ promoCode: code });
    }

    handleSelectRegion = (eventKey) => {
        this.props.onMarketRegionSelect(eventKey);
    }

    handleDeliveryDateSelect = (date) => {
        this.props.onDeliveryDateSelect(date);
    }

    handleOrder = (floristID, arrangement, promoCode) => {
        if (this.props.deliveryDate && this.props.marketRegion !== 'select_region') {
            if (promoCode.length>0) {
                this.props.history.push(`/${this.props.languageChanged}/auth/order/${floristID}/${arrangement}/${promoCode}`);
            } else {
                this.props.history.push(`/${this.props.languageChanged}/auth/order/${floristID}/${arrangement}`);
            }
        }
        else {
            this.setState({orderButtonPressed: true});
        }
    }

    applyPromoCode = () => {
        var promoCode = this.state.promoCode;

        if (promoCode === this.state.promoCodeA && promoCode !== '') {
            if (this.state.arrangementPrice2 >= 40) {
                this.setState({
                    arrangementPrice: this.state.arrangementPrice2,
                    promoCodeMessage: strings.promoCodeApplied,
                    promoCodeError: null,
                    promoCodeApplied: true,
                });
            } else {
                this.setState({
                    promoCodeMessage: null,
                    promoCodeError: strings.promoCodeNotApplicable,
                });
            }
        } else if (promoCode === this.state.promoCodeB && promoCode !== '') {
            if (this.state.arrangementPrice2 >= 40) {
                this.setState({
                    arrangementPrice: this.state.arrangementPrice3,
                    promoCodeMessage: strings.promoCodeApplied,
                    promoCodeError: null,
                    promoCodeApplied: true,
                });
            } else {
                this.setState({
                    promoCodeMessage: null,
                    promoCodeError: strings.promoCodeNotApplicable,
                });
            }
        } else {
            var promoCodeFailed = true;

            this.state.promoCodeList.forEach((element) => {
                if (promoCode === this.state[element+'code'] && promoCode !== '') {
                    var rate = this.state[element+'rate'];
                    this.setState({
                        arrangementPrice: this.state['arrangementPrice'+rate+'Off'],
                        promoCodeMessage: strings.promoCodeApplied,
                        promoCodeError: null,
                        promoCodeApplied: true,
                    });
                    promoCodeFailed = false;
                }
            });

            if (promoCodeFailed) {
                this.setState({
                    promoCodeError: strings.promoCodeFailed,
                    promoCodeMessage: null,
                });
            }
        }
    }

    closeLightbox = () => {
        this.setState({lightboxIsOpen: false});
    }

    checkFloristCalendar(day) {
        var arrangementDeliveryBlockedDays = this.state.arrangementDeliveryBlockedDays;
        var arrangementDeliveryLeadTime = this.state.arrangementDeliveryLeadTime;
        var arrangementDeliveryClosedDays = this.state.arrangementDeliveryClosedDays;
        var blockedDayFail = false;
        var leadTimeFail = false;
        var closeDaysFail = false;

        //check again shop's open days
        if (typeof arrangementDeliveryBlockedDays!== 'undefined') {
            if (arrangementDeliveryBlockedDays.indexOf(day.day()) > -1) {
                blockedDayFail = true;
            }
        }

        //check if day has past and check for same day cutoff
        if (day.isBefore(moment())) {
            leadTimeFail = true;
        } else if (day.isSame(moment())) {
            if (arrangementDeliveryLeadTime === '0') {
                var hour = moment().tz('Asia/Hong_Kong').get('hour');
                if (hour > 12) {
                    leadTimeFail = true;
                }
            }
        } else {
            if (day.diff(moment(), 'hours') < (arrangementDeliveryLeadTime*24-23)) {
                leadTimeFail = true;
            }
        }

        if (arrangementDeliveryClosedDays) {
            var closedDaysCount = arrangementDeliveryClosedDays.length;
            for (var i=0; i<closedDaysCount; i++) {
                var checkDay = moment(arrangementDeliveryClosedDays[i]);
                var diff = day.diff(checkDay, 'hours');
                if ( 0 <= diff && diff < 23) {
                closeDaysFail = true;
                }
            }
        }

        if (leadTimeFail || blockedDayFail || closeDaysFail) {
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
                    arrangementPrice5Off: snapshotVal.price5Off,
                    arrangementPrice7Off: snapshotVal.price7Off,
                    arrangementPrice10Off: snapshotVal.price10Off,
                    arrangementPrice15Off: snapshotVal.price15Off,
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
            .equalTo(floristID).limitToFirst(7)
            .once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    if (childKey !== thisRef.props.match.params.arrangement && (arrangementsList.length < 6)){
                        arrangementsList.push(childData);
                        console.log(childData);
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
                    arrangementDeliveryLeadTime: snapshotVal.deliveryLeadTime,
                    arrangementDeliveryBlockedDays: snapshotVal.deliveryBlockedDays,
                    arrangementDeliveryClosedDays: snapshotVal.closedDays,
                    floristProfilePic: snapshotVal.profilePic,
                    floristType: snapshotVal.floristType,
                    arrangementDeliveryFee: snapshotVal.deliveryFee[marketRegion],
                    specialPickUp: snapshotVal.specialPickUp,
                    specialPickUpFlag: snapshotVal.deliveryFee['specialPickUpLocation'],
                });
            });

            firebase.database().ref('promoCode').once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    thisRef.state.promoCodeList.push(childKey);
                    thisRef.setState({
                        [childKey+'name']: childKey,
                        [childKey+'code']: childData.code,
                        [childKey+'rate']: childData.rate,              
                    });
                });
            });

            firebase.database().ref(`florists/${floristID}/reviewsStats`)
            .once('value', function(snapshot) {
                var snapshotVal = snapshot.val();
                if (snapshotVal) {
                    thisRef.setState({
                        averageRating: snapshotVal.averageRating,
                        ratingCount: snapshotVal.ratingCount,
                    });
                }
            });
        });
    }
    
    componentWillReceiveProps (nextProps) {
        if (nextProps.languageChanged==='zh') {
            strings.setLanguage('zh');
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
    var floristID = this.state.floristID;
    var arrangementID = this.state.arrangementID;
    let content = null;

    var listOfArrangements = this.state.arrangementsList.map(arrangement => 
        <Col xs={6} sm={4} key={arrangement.id} className="list-item">
            <Link to={`/${this.props.languageChanged}/florist/${this.state.floristID}/${arrangement.id}`} onClick={() => this.toOtherArrangement(arrangement.id)}>
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
        <div>
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
                        <Route path="/" render={(props) => <ButtonToMarket {...props} marketRegion={this.props.marketRegion} handleMarketRegionSelect={this.props.onMarketRegionSelect} languageChanged={this.props.languageChanged}/>} />
                    </div>
                    <div className="arrangement-florist-name">by <Link to={`/${this.props.languageChanged}/florist/${this.state.arrangementFlorist}`} >{this.state.arrangementFloristName}</Link></div>
                    <ul className="arrangement-details-toggle">
                        <li className={this.state.descriptionActive ? 'toggle-active': null} onClick={() => this.toggleContent(0)} >{strings.descriptionTab}</li>
                        <li className={this.state.deliveryActive ? 'toggle-active': null} onClick={() => this.toggleContent(1)} >{strings.deliveryInfoTab}</li>
                        <li className={this.state.substitutionActive ? 'toggle-active': null} onClick={() => this.toggleContent(2)} >{strings.substitutionTab}</li>
                    </ul>
                    { this.state.descriptionActive &&
                        <div className="arrangement-info">{this.state.arrangementDescription}</div>
                    }
                    { this.state.deliveryActive &&
                        <div className="arrangement-info">
                            <div>{strings.standardDeliveryPolicy}</div>
                            {this.state.arrangementDeliveryInfo && 
                                <div className="green">
                                    <div>{strings.standardDeliveryPolicyPlus}</div>
                                    <div>{this.state.arrangementDeliveryInfo}</div>
                                </div>
                            }
                        </div>
                    }
                    { this.state.substitutionActive &&
                        <div className="arrangement-info">{strings.substitutionPolicy}</div>
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
                            {this.state.specialPickUpFlag !== -1 && <MenuItem eventKey="specialPickUpLocation">{strings.specialPickUpLocation}</MenuItem>}
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

                    { (this.state.arrangementDeliveryFee=== -1 && marketRegion !== 'specialPickUpLocation') &&
                        <div>
                            <div className="error-message">{strings.noCoverageTip1}{strings[marketRegion]}{strings.noCoverageTip2}</div>
                        </div>
                    }

                    { (this.state.arrangementDeliveryFee=== -1 && marketRegion === 'specialPickUpLocation') &&
                        <div>
                            <div className="error-message">{strings.noPickUpTip1}{strings[marketRegion]}{strings.noPickUpTip2}</div>
                        </div>
                    }

                    {(marketRegion === 'specialPickUpLocation' && this.state.specialPickUpFlag !== -1) &&
                        <div>
                            <div className="special-pickup-info-title"><strong>{strings.specialPickUpTitle}</strong></div>
                            <div className="special-pickup-info">{this.state.specialPickUp}</div>
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

                        { this.state.arrangementDeliveryFee!== -1 && this.props.marketRegion!=='select_region' &&
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

                    { (typeof this.props.deliveryDate === 'undefined' && this.state.orderButtonPressed) &&
                        <div>
                            <div className="error-message">{strings.dateRequired}</div>
                        </div>
                    }
                    { (typeof this.props.deliveryDate !== 'undefined' && this.state.orderButtonPressed && this.props.marketRegion==='select_region') &&
                        <div>
                            <div className="error-message">{strings.marketRegionRequired}</div>
                        </div>
                    }

                    { this.state.arrangementDeliveryFee=== -1 &&
                        <div className="button-box">
                            <Route path="/" render={(props) => <ButtonToSearch marketRegion={this.props.marketRegion} handleMarketRegionSelect={this.props.onMarketRegionSelect} languageChanged={this.props.languageChanged} {...props} />} />
                        </div>
                    }
                    { this.state.arrangementDeliveryFee!== -1 &&
                        <div className="button-box">
                            <Route path="/" render={() => <Button bsStyle="" className="button-to-order" onClick={() => this.handleOrder(this.state.floristID, this.state.arrangement, this.state.promoCode)}>{strings.orderNow}</Button>}/>
                        </div>
                    }
                </Col>
            </Row>
        </Grid>
        <Grid className="florist-banner-container">
            <Row className="main-row">
                <div className="florist-banner">
                    <div className="florist-info">
                        <div className="justify-container">
                            <div className="inline-container">
                                <div className="florist-pic-container">
                                    <img src={this.state.floristProfilePic} alt=""/>
                                </div>
                                <div className="florist-info-container">
                                    <div className="florist-name">{this.state.arrangementFloristName}</div>
                                    <div className="florist-type">{strings[this.state.floristType]}</div>
                                    {this.state.averageRating && 
                                        <div className="florist-type">{strings.rating}{' '}{this.state.averageRating} ({this.state.ratingCount}{strings.ratingCount})</div>
                                    }
                                    <Route path="/" render={(props) => <ButtonToFlorist floristID={this.state.arrangementFlorist} languageChanged={this.props.languageChanged} {...props} />} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Row>
        </Grid>
        <Grid className="arrangement-section-container">
            <Row>
                <div className="arrangement-section-title">{strings.otherDesigns1}{this.state.arrangementFloristName}{strings.otherDesigns2}</div>
                <div className="sub-content list-container">{listOfArrangements}</div>
            </Row>
        </Grid>
        </div>
      )
    }

    return (
        <div>
            <Helmet>
                <title>{this.state.arrangementName}</title>
                {/* <html lang={this.props.languageChanged} /> */}
                <link rel="alternate" hrefLang="en" href={`https://maydaisy.com/en/florist/${floristID}/${arrangementID}`}/>
                <link rel="alternate" hrefLang="zh-Hant" href={`https://maydaisy.com/zh/florist/${floristID}/${arrangementID}`}/>
                <link rel="alternate" hrefLang="x-default" href={`https://maydaisy.com/florist/${floristID}/${arrangementID}`}/>
            </Helmet>
            <div>
                {content}
            </div>
        </div>
    )
  }
}
