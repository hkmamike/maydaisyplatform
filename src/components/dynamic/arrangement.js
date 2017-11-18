import React, { Component } from 'react';
import { Grid, Row, Col, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import LocalizedStrings from 'react-localization';
import * as firebase from 'firebase';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

let strings = new LocalizedStrings({
    en:{},
    ch: {}
});

const ButtonToMarket = ({ history }) => (
    <Button bsStyle="" className="button-to-market" onClick={() => history.push('/arrangements')}>Back to Market</Button>
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
                    arrangementApproval: snapshot.val().approval,
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
                    arrangementApproval: snapshotVal.approval,
                    arrangementDescription: snapshotVal.description,
                    arrangementPrice: snapshotVal.price,
                    arrangementCurrency: snapshotVal.currency,
                    arrangementSeasonality: snapshotVal.seasonality,
                    arrangementID: snapshotVal.id,
                    arrangementImage: snapshotVal.image,
                    arrangementName: snapshotVal.name,
                    arrangementFlorist: snapshotVal.florist,
                    arrangementFloristName: snapshotVal.floristName,
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
            firebase.database().ref(`florists/${floristID}/deliveryFee`).once('value', function(snapshot) {
                var snapshotVal = snapshot.val()
                thisRef.setState({
                    arrangementDeliveryFee: snapshotVal[marketRegion],
                    arrangementDeliveryCurrency: snapshotVal.currency,
                });
            });
            firebase.database().ref(`florists/${floristID}/deliveryBlockedDays`).once('value', function(snapshot) {
                var snapshotVal = snapshot.val()
                thisRef.setState({
                    arrangementDeliveryBlockedDays: snapshotVal
                });
            });
            firebase.database().ref(`florists/${floristID}/deliveryLeadTime`).once('value', function(snapshot) {
                var snapshotVal = snapshot.val()
                thisRef.setState({
                    arrangementDeliveryLeadTime: snapshotVal
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

    var listOfArrangements = this.state.arrangementsList.map(arrangement => 
        <Col xs={6} sm={4} md={3} lg={2} key={arrangement.id}>
            <Link to={`/florist/${this.state.floristID}/${arrangement.id}`} className="list-box" onClick={() => this.toOtherArrangement(arrangement.id)}>
                <div className="list-pic" style={{ backgroundImage: 'url(' + arrangement.image + ')'}}></div>
                <div className="text-box">
                    <div className="text-line">
                        <div className="list-name">{arrangement.name}</div>
                        <div className="list-price">${arrangement.price}</div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="list-florist">by: {arrangement.florist}</div>
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
            <Row>
                <Col xs={12} sm={6}>
                    <div className="arrangement-pic" style={{ backgroundImage: 'url(' + this.state.arrangementImage + ')'}}></div>
                </Col>
                <Col xs={12} sm={6}>
                    <Route path="/" render={(props) => <ButtonToMarket {...props}/>} />
                    <div className="arrangement-name">{this.state.arrangementName}</div>
                    <div className="arrangement-florist-name">by <Link to={`/florist/${this.state.arrangementFlorist}`} >{this.state.arrangementFloristName}</Link></div>
                    <ul className="arrangement-details-toggle">
                        <li className={this.state.descriptionActive ? 'toggle-active': null} onClick={() => this.toggleContent(0)} >DESCRIPTION</li>
                        <li className={this.state.deliveryActive ? 'toggle-active': null} onClick={() => this.toggleContent(1)} >DELIVERY INFO</li>
                    </ul>
                    { this.state.descriptionActive &&
                        <div className="arrangement-description">{this.state.arrangementDescription}</div>
                    }
                    { this.state.deliveryActive &&
                        <div className="arrangement-delivery">{this.state.arrangementDeliveryInfo}</div>
                    }
                    <div className="arrangement-price">HK${this.state.arrangementPrice}</div>
                    { this.state.deliveryActive &&
                        <div className="arrangement-delivery">{this.state.arrangementDeliveryInfo}</div>
                    }
                    { this.state.deliveryActive &&
                        <div className="arrangement-delivery">{this.state.arrangementDeliveryInfo}</div>
                    }
                    <DropdownButton title={marketRegion} placeholder='Select Region' className="region-signup-select" id="bg-nested-dropdown" onSelect={this.handleSelectRegion}>
                        <MenuItem eventKey="HK_CentralWestern">HK Island - Central/Western District</MenuItem>
                        <MenuItem eventKey="HK_Eastern">HK Island - Eastern District</MenuItem>
                        <MenuItem eventKey="HK_Southern">HK Island - Southern District</MenuItem>
                        <MenuItem eventKey="HK_WanChai">HK Island - Wan Chai District</MenuItem>
                        <MenuItem eventKey="KL_ShamShuiPo">KL - Sam Shui Po District</MenuItem>
                        <MenuItem eventKey="KL_KowloonCity">KL - Kowloon City District</MenuItem>
                        <MenuItem eventKey="KL_KwunTong">KL - Kwun Tong District</MenuItem>
                        <MenuItem eventKey="KL_WongTaiSin">KL - Wong Tai Sin District</MenuItem>
                        <MenuItem eventKey="KL_YauTsimMong">KL - Yau Tsim Mong District</MenuItem>
                        <MenuItem eventKey="NT_Islands">NT - Outlying Islands</MenuItem>
                        <MenuItem eventKey="NT_KwaiTsing">NT - Kwai Tsing District</MenuItem>
                        <MenuItem eventKey="NT_North">NT - Northern District</MenuItem>
                        <MenuItem eventKey="NT_SaiKung">NT - Sai Kung District</MenuItem>
                        <MenuItem eventKey="NT_ShaTin">NT - Sha Tin District</MenuItem>
                        <MenuItem eventKey="NT_TaiPo">NT - Tai Po District</MenuItem>
                        <MenuItem eventKey="NT_TsuenWan">NT - Tsuen Wan District</MenuItem>
                        <MenuItem eventKey="NT_TuenMun">NT - Tuen Mun District</MenuItem>
                        <MenuItem eventKey="NT_YuenLong">NT - Yuen Long District</MenuItem>
                    </DropdownButton>
                    <SingleDatePicker
                        date={this.state.date} // momentPropTypes.momentObj or null
                        onDateChange={date => {
                            this.setState({date});
                            this.handleDeliveryDateSelect(date);
                        }} // PropTypes.func.isRequired
                        focused={this.state.focused} // PropTypes.bool
                        onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                        isDayBlocked={this.checkFloristCalendar}
                    />
                    { (!this.props.deliveryDate && this.state.orderButtonPressed) &&
                        <div>
                            <div>Please select a delivery date.</div>
                        </div>
                    }
                    { this.state.arrangementDeliveryFee!== -1 &&
                        <div>
                            <div className="arrangement-delivery-fee">Delivery Fee: {this.state.arrangementDeliveryCurrency}{this.state.arrangementDeliveryFee}</div>
                            <Route path="/" render={() => <Button bsStyle="" className="button-to-order" onClick={() => this.handleOrder(this.state.floristID, this.state.arrangement)}>Order Now</Button>}/>
                        </div>
                    }
                    { this.state.arrangementDeliveryFee=== -1 &&
                        <div>
                            <div className="arrangement-delivery-fee">Oh no! This florist does not deliver to {marketRegion}. Let's go back to the market to find one that does.</div>
                            <Route path="/" render={(props) => <ButtonToMarket {...props}/>} />
                        </div>
                    }
                </Col>
            </Row>
            <Row>
                <div className="horizontal-line"></div>
                <div className="arrangement-section-title">Other Designs by {this.state.arrangementFloristName}</div>
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
