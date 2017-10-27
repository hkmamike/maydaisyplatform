import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import LocalizedStrings from 'react-localization';
import * as firebase from 'firebase';
import Slider from 'rc-slider';
import ReactDOM from 'react-dom';
import 'rc-slider/assets/index.css';


const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const wrapperStyle = { width: 400, margin: 50 };

let strings = new LocalizedStrings({
    en:{},
    ch: {}
  });

const ButtonToRegionList = ({ title, history }) => (
    <Button bsStyle="" className="button" onClick={() => history.push('/')}>{strings.signUp}</Button>
  );

export default class ArrangementsList extends Component {

    constructor() {
        super();
        this.state = { arrangementsList: [] };
        this.handleSlider = this.handleSlider.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        var arrangementsList = [];
        var thisRef = this;
        firebase.database().ref('arrangementsList').once('value', function(snapshot) {

            snapshot.forEach(function(childSnapshot) {
              var childKey = childSnapshot.key;
              var childData = childSnapshot.val();
            arrangementsList.push(childData);
            });
            thisRef.setState({arrangementsList: arrangementsList});
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
    
    handleSlider(value) {
        var thisRef = this;
        var arrangementsList = [];
        firebase.database().ref('arrangementsList').orderByChild('price').startAt(value[0]).endAt(value[1]).once('value', function(snapshot) {
            
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
            arrangementsList.push(childData);
            });

            thisRef.setState({arrangementsList: arrangementsList});

        });
    }

  render() {

    var listOfArrangements = this.state.arrangementsList.map(arrangement => 
        <Col xs={6} sm={4} key={arrangement.id}>
            <div className="list-box">
                <div className="list-pic" style={{ backgroundImage: 'url(' + arrangement.image + ')'}}></div>
                <div className="text-box">
                    <div className="text-line">
                        <div className="list-name">{arrangement.name}</div>
                        <div className="list-price">${arrangement.price}</div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="list-florist">by: {arrangement.florist}</div>
                </div>
            </div>
        </Col>
    );

    return (
        <div>
            <div style={wrapperStyle}>
                <p>Price Range</p>
                <Range min={0} max={500} defaultValue={[0,500]} tipFormatter={value => `${value}`} pushable={false} onAfterChange={this.handleSlider} marks={{0:'0',500:'$500+'}}/>
            </div>
            <div className="no-padding list-container">
                <Grid>
                    {listOfArrangements}
                </Grid>
            </div>
        </div>
    )
  }
}
