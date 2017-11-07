import React, { Component } from 'react';
import { Grid, Row, Col, Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import LocalizedStrings from 'react-localization';
import * as firebase from 'firebase';
import Slider from 'rc-slider';
import ReactDOM from 'react-dom';

import {InstantSearch, Hits, SearchBox, Highlight, RefinementList,
    Pagination, CurrentRefinements, ClearAll} from 'react-instantsearch/dom';

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

function Search() {
    return (
        <div className="no-padding list-container">
            <Hits hitComponent={Product}/>
        </div>
    );
}

function Product({hit}) {
    return (

        <Col xs={6} sm={4}>
            <Link to={`/florist/${hit.florist}/${hit.id}`}  className="list-box">
                <div className="list-pic" style={{ backgroundImage: 'url(' + hit.image + ')'}}></div>
                <div className="text-box">
                    <div className="text-line">
                        <div className="list-name">{hit.name}</div>
                        <div className="list-price">{hit.price}</div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="list-florist">by: {hit.floristName}</div>
                </div>
            </Link>
        </Col>
    );
}

class ToggleColor extends React.Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        value: [1, 3],
      };
    }
  
    onChange = (value) => {
        this.props.onHandleColorSelect(value);
    };
  
    render() {
      return (
        <ToggleButtonGroup
          type="checkbox"
          value={this.props.colorFilter}
          onChange={this.onChange}
        >
          <ToggleButton value={'red'} style={{backgroundColor: 'red', backgroundImage: 'none'}}><i className="fa fa-check fa-white"/></ToggleButton>
          <ToggleButton value={'pink'} style={{backgroundColor: 'pink', backgroundImage: 'none'}}><i className="fa fa-check fa-white"/></ToggleButton>
          <ToggleButton value={'orange'} style={{backgroundColor: 'orange', backgroundImage: 'none'}}><i className="fa fa-check fa-white"/></ToggleButton>
          <ToggleButton value={'yellow'} style={{backgroundColor: 'yellow', backgroundImage: 'none'}}><i className="fa fa-check fa-black"/></ToggleButton>
          <ToggleButton value={'purple'} style={{backgroundColor: 'purple', backgroundImage: 'none'}}><i className="fa fa-check fa-white"/></ToggleButton>
          <ToggleButton value={'white'} style={{backgroundColor: 'white', backgroundImage: 'none'}}><i className="fa fa-check fa-black"/></ToggleButton>
        </ToggleButtonGroup>
      );
    }
}

class ToggleFlower extends React.Component {
    
        constructor(props, context) {
          super(props, context);
          this.state = {
            value: [1, 3],
          };
        }
      
        onChange = (value) => {
            this.props.onHandleFlowerSelect(value);

        };
      
        render() {
          return (
            <ToggleButtonGroup
              type="checkbox"
              value={this.props.flowerFilter}
              onChange={this.onChange}
            >
                <ToggleButton value={'roses'}>Roses</ToggleButton>
                <ToggleButton value={'hydrangea'}>Hydrangea</ToggleButton>
                <ToggleButton value={'daisies'}>Daisies</ToggleButton>
                <ToggleButton value={'lilies'}>Lilies</ToggleButton>
                <ToggleButton value={'tulips'}>Tulips</ToggleButton>
                <ToggleButton value={'peonie'}>Peonies</ToggleButton>
                <ToggleButton value={'sunflower'}>Sun Flower</ToggleButton>
            </ToggleButtonGroup>
          );
        }
    }

export default class ArrangementsList extends Component {

    constructor() {
        super();
        this.state = { 
            arrangementsList: [],
            sliderMax: 9999,
            sliderMin: 0,
            
        };
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

    render() {

        return (
            <div>
                <InstantSearch
                    appId="IWC5275GW4"
                    apiKey="24a14549af086c57dc295ac4bc6f5cc5"
                    indexName="arrangementsList"
                >
                    <CurrentRefinements/>
                    <ClearAll/>
                    <SearchBox/>
                    <RefinementList attributeName="flower" />
                    <RefinementList attributeName="color" />
                    <Search/>
                    <Pagination/>
                </InstantSearch>
            </div>
        )
    }
}
