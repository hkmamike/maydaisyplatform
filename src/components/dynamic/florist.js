import React, { Component } from 'react';
import { Grid, Row, Col, Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import LocalizedStrings from 'react-localization';
import * as firebase from 'firebase';
import StarRatingComponent from 'react-star-rating-component';

let strings = new LocalizedStrings({
    en:{},
    ch: {}
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
                    floristProfilePic: snapshotVal.profilePic,
                    floristWebsite: snapshotVal.website,
                    floristAddress: snapshotVal.address
                });
            });
        })
        firebase.database().ref('arrangementsList')
        .orderByChild('florist')
        .equalTo(this.props.match.params.floristID)
        .once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                arrangementsList.push(childData);
            });
            thisRef.setState({arrangementsList: arrangementsList});
        });
        firebase.database().ref(`florists/${this.props.match.params.floristID}/reviews`)
        .once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                reviews.push(childData);
            });
            console.log('checking value of reviews', reviews);
            thisRef.setState({reviews: reviews});
        });
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

    var loadingState = this.state.loading;
    var onTab = this.state.onTab;
    let content = null;
    let header = null;

    var listOfArrangements = this.state.arrangementsList.map(arrangement => 
        <Col xs={6} sm={4} md={3} lg={2} key={arrangement.id}>
            <Link to={`/florist/${this.state.floristID}/${arrangement.id}`} className="list-box">
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

    var reviews = this.state.reviews.map(review => 
        <Col xs={6} sm={4} md={3} lg={2} key={review.referenceCode}>
            <div>{review.sender}</div>
            <StarRatingComponent 
                    name="reviews" 
                    editing={false}
                    starColor="#EC6BAA"
                    starCount={5}
                    value={review.rating}
            />
            <div>{review.reviewDate} verified purchase</div>
            <div>{review.reviewMessage}</div>
        </Col>
    );

    header = (
        <div className="florist-header">
            <div className="florist-info">
                <div className="florist-pic-container">
                    <img src={this.state.floristProfilePic}/>
                </div>
                <div className="florist-address">{this.state.floristName}</div>
                <div className="florist-address">{this.state.floristAddress}</div>
                <div className="florist-website"><a href={this.state.floristWebsite}>{this.state.floristWebsite}</a></div>
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
                            <Col xs={12} className="nav-margin">
                                <ul>
                                    <li className="selected"><div className="nav-text">Designs</div></li>
                                    <li onClick={() => this.setState({onTab: 1}, () => {window.scrollTo(0, 0);})}><div className="nav-text">About</div></li>
                                    <li onClick={() => this.setState({onTab: 2}, () => {window.scrollTo(0, 0);})}><div className="nav-text">Reviews</div></li>
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

                        <Col xs={12} className="nav-margin">
                            <ul>
                                <li onClick={() => this.setState({onTab: 0}, () => {window.scrollTo(0, 0);})}><div className="nav-text">Designs</div></li>
                                <li className="selected"><div className="nav-text">About</div></li>
                                <li onClick={() => this.setState({onTab: 2}, () => {window.scrollTo(0, 0);})}><div className="nav-text">Reviews</div></li>
                            </ul>
                        </Col>
                    </Row>
                </Grid>
            </div>
            <div className="sub-content">{this.state.floristDescription}</div>
        </div>
      )
    } else if (onTab===2) {
        content = (
          <div>
                {header}
                <div className="grid-bg">
                    <Grid>
                        <Row className="show-grid florist-nav">
        
                            <Col xs={12} className="nav-margin">
                                <ul>
                                    <li onClick={() => this.setState({onTab: 0}, () => {window.scrollTo(0, 0);})}><div className="nav-text">Designs</div></li>
                                    <li onClick={() => this.setState({onTab: 1}, () => {window.scrollTo(0, 0);})}><div className="nav-text">About</div></li>
                                    <li className="selected"><div className="nav-text">Reviews</div></li>
                                </ul>
                            </Col>
                        </Row>
                    </Grid>
                </div>
                <div className="sub-content">{reviews}</div>
          </div>
        )
      }

    return (
        <div>
            {content}
        </div>
    )
  }
}
