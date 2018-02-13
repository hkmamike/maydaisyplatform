import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LocalizedStrings from 'react-localization';
import * as firebase from 'firebase';
import StarRatingComponent from 'react-star-rating-component';
import { Helmet } from 'react-helmet';

let strings = new LocalizedStrings({
    en:{
        designs: 'designs',
        about: 'about',
        reviews: 'reviews',
        verifiedPurchase: 'verified purchase',
        artist: 'Independent Artist',
        shop: 'Boutique Shop',
        rating: 'Ave. Rating:',
        floristTitle: ', MayDaisy Florist Partner',
    },
    zh: {
        designs: '設計',
        about: '關於花店',
        reviews: '評論',
        verifiedPurchase: '已驗證',
        artist: '獨立花藝師',
        shop: '精品花店',
        rating: '平均評分:',
        floristTitle: ' - 五月菊夥伴花藝師',
    }
  });

export default class Florist extends Component {

    constructor() {
        super();
        this.state = {
            arrangementsList: [],
            reviews: [],
            onTab: 0,
            loading: true
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        var thisRef = this;
        var arrangementsList = [];
        var reviews = [];
        this.setState ({floristID: this.props.match.params.floristID}, () => {
            firebase.database().ref(`florists/${this.state.floristID}`).once('value', function(snapshot) {
                var snapshotVal = snapshot.val();
                thisRef.setState({
                    loading: false,
                    floristDescription: snapshotVal.description,
                    floristFB: snapshotVal.facebook,
                    floristID: snapshotVal.id,
                    floristInstagram: snapshotVal.instagram,
                    floristName: snapshotVal.name,
                    floristType: snapshotVal.floristType,
                    floristProfilePic: snapshotVal.profilePic,
                    floristWebsite: snapshotVal.website,
                    floristAddress: snapshotVal.address,
                    floristFacebook: snapshotVal.facebook,
                });
            });
        })
        firebase.database().ref('arrangementsList')
        .orderByChild('florist')
        .equalTo(this.props.match.params.floristID)
        .once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                arrangementsList.push(childData);
            });
            thisRef.setState({arrangementsList: arrangementsList});
        });
        firebase.database().ref(`florists/${this.props.match.params.floristID}/reviews`)
        .once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                reviews.unshift(childData);
            });
            thisRef.setState({reviews: reviews});
        });
        firebase.database().ref(`florists/${this.props.match.params.floristID}/reviewsStats`)
        .once('value', function(snapshot) {
            var snapshotVal = snapshot.val();
            if (snapshotVal) {
                thisRef.setState({
                    averageRating: snapshotVal.averageRating,
                    ratingCount: snapshotVal.ratingCount,
                });
            }
        });
    }
    
    componentWillReceiveProps (nextProps) {
        if (nextProps.languageChanged==='zh') {
            strings.setLanguage('zh');
        } else if (nextProps.languageChanged==='en') {
            strings.setLanguage('en');
        }
    }

    componentWillMount() {
        strings.setLanguage(this.props.languageChanged);
    }

  render() {

    var loadingState = this.state.loading;
    var onTab = this.state.onTab;
    var floristID = this.props.match.params.floristID;
    let content = null;
    let header = null;
    var languageChanged = this.props.languageChanged;

    var listOfArrangements = this.state.arrangementsList.map(arrangement => 
        <Col xs={6} sm={4} key={arrangement.id} className="list-item">
            <Link to={`/${languageChanged}/florist/${floristID}/${arrangement.id}`}>
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

    var reviews = this.state.reviews.map(review => {
        var spaceIndex = review.sender.indexOf(' ');
        var senderFirstName;
        if (spaceIndex !== -1) {
            senderFirstName = review.sender.substring(0,spaceIndex);
            var senderInitial = review.sender.substring(spaceIndex+1, spaceIndex+2) + '. ';
        } else {
            senderFirstName = review.sender
        }

        return (
            <Col xs={12} sm={4} key={review.referenceCode} className='list-item'>
                <div className='review-inline'>
                    <div className='reviewer'>{senderFirstName} {senderInitial}</div>
                    <StarRatingComponent 
                            name="reviews" 
                            className='review-stars'
                            editing={false}
                            starColor="#EC6BAA"
                            starCount={5}
                            value={review.rating}
                    />
                </div>
                <div className='review-date'>{review.reviewDate}{' '}{strings.verifiedPurchase}</div>
                <div className='review-message'>{review.reviewMessage}</div>
            </Col>
        )
    });

    header = (
        <div className="florist-header">
            <div className="florist-info">

                <div className="justify-container">

                    <div className="inline-container">
                        <div className="florist-pic-container">
                            <img src={this.state.floristProfilePic} alt=""/>
                        </div>
                        <div className="florist-info-container">
                            <div className="florist-name">{this.state.floristName}</div>
                            <div className="florist-type">{strings[this.state.floristType]}</div>
                            {this.state.averageRating && 
                                <div className="florist-type">{strings.rating}{' '}{this.state.averageRating} / 5</div>
                            }
                            {/* <div className="florist-address">{this.state.floristAddress}</div> */}
                            <div className="florist-website"><a href={this.state.floristWebsite}>{this.state.floristWebsite}</a></div>
                            <div className="florist-info-small-screen-social-container large-screen-hide">
                                {this.state.floristFacebook && <a href={this.state.floristFacebook} target="_blank"><i className="fa fa-facebook-official"></i></a>}
                                {this.state.floristInstagram && <a href={this.state.floristInstagram} target="_blank"><i className="fa fa-instagram"></i></a>}
                            </div>
                        </div>
                    </div>

                    <div className="florist-info-social-container small-screen-hide">
                        {this.state.floristFacebook && <a href={this.state.floristFacebook} target="_blank"><i className="fa fa-facebook-official"></i></a>}
                        {this.state.floristInstagram && <a href={this.state.floristInstagram} target="_blank"><i className="fa fa-instagram"></i></a>}
                    </div>

                </div>
            </div>
        </div>
    )

    if (loadingState) {
      content = (
        <div>
          <div className="loader"></div>
        </div>
      )
    } else if (onTab===0){
        content = (
            <div>
                {header}
                <div className="grid-bg">
                    <Grid>
                        <Row className="show-grid florist-nav">
                            <Col xs={1} sm={2} className="nav-margin"></Col>
                            <Col xs={11} sm={10} className="nav-margin">
                                <ul>
                                    <li className="selected"><div className="nav-text">{strings.designs}</div></li>
                                    <li onClick={() => this.setState({onTab: 1}, () => {window.scrollTo(0, 350);})}><div className="nav-text">{strings.about}</div></li>
                                    <li onClick={() => this.setState({onTab: 2}, () => {window.scrollTo(0, 350);})}><div className="nav-text">{strings.reviews}{this.state.ratingCount && <span>{' '}({this.state.ratingCount})</span>}</div></li>
                                </ul>
                            </Col>
                        </Row>
                    </Grid>
                </div>
                <div className="sub-content list-container">{listOfArrangements}</div>
            </div>
        )
    } else if (onTab===1) {
      content = (
        <div>
            {header}
            <div className="grid-bg">
                <Grid>
                    <Row className="show-grid florist-nav">

                        <Col xs={1} sm={2} className="nav-margin"></Col>
                        <Col xs={11} sm={10} className="nav-margin">
                            <ul>
                                <li onClick={() => this.setState({onTab: 0}, () => {window.scrollTo(0, 350);})}><div className="nav-text">{strings.designs}</div></li>
                                <li className="selected"><div className="nav-text">{strings.about}</div></li>
                                <li onClick={() => this.setState({onTab: 2}, () => {window.scrollTo(0, 350);})}><div className="nav-text">{strings.reviews}{this.state.ratingCount && <span>{' '}({this.state.ratingCount})</span>}</div></li>
                            </ul>
                        </Col>
                    </Row>
                </Grid>
            </div>
            <Grid>
                <Row>
                    <Col xsHidden md={2}></Col>
                    <Col xs={12} md={10}>
                        <div className="sub-content">{this.state.floristDescription}</div>
                    </Col>
                </Row>
            </Grid>
        </div>
      )
    } else if (onTab===2) {
        content = (
          <div>
                {header}
                <div className="grid-bg">
                    <Grid>
                        <Row className="show-grid florist-nav">
                            <Col xs={1} sm={2} className="nav-margin"></Col>
                            <Col xs={11} sm={10} className="nav-margin">
                                <ul>
                                    <li onClick={() => this.setState({onTab: 0}, () => {window.scrollTo(0, 350);})}><div className="nav-text">{strings.designs}</div></li>
                                    <li onClick={() => this.setState({onTab: 1}, () => {window.scrollTo(0, 350);})}><div className="nav-text">{strings.about}</div></li>
                                    <li className="selected"><div className="nav-text">{strings.reviews}{this.state.ratingCount && <span>{' '}({this.state.ratingCount})</span>}</div></li>
                                </ul>
                            </Col>
                        </Row>
                    </Grid>
                </div>
                <div className="sub-content list-container list-container-padding">{reviews}</div>
          </div>
        )
    }

    return (
        <div>
            <Helmet>
                <title>{this.state.floristName + strings.floristTitle}</title>
                <html lang={this.props.languageChanged} />
                <link rel="alternate" hrefLang="en" href={`https://maydaisy.com/en/florist/${floristID}`}/>
                <link rel="alternate" hrefLang="zh-Hant" href={`https://maydaisy.com/zh/florist/${floristID}`}/>
                <link rel="alternate" hrefLang="x-default" href={`https://maydaisy.com/florist/${floristID}`}/>
            </Helmet>
            <div>{content}</div>
        </div>
    )
  }
}
