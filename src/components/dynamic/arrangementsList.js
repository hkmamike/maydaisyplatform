import React, { Component } from 'react';
import { Grid, Row, Col, Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import LocalizedStrings from 'react-localization';
import * as firebase from 'firebase';
import Slider from 'rc-slider';
import ReactDOM from 'react-dom';

import {InstantSearch, Hits, SearchBox, Highlight, RefinementList, Pagination, CurrentRefinements, ClearAll, Menu } from 'react-instantsearch/dom';

import {connectMenu} from 'react-instantsearch/connectors';

import 'rc-slider/assets/index.css';

const VirtualMenu = connectMenu(() => null);

let strings = new LocalizedStrings({
    en:{},
    ch: {}
});

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

export default class ArrangementsList extends Component {

    constructor() {
        super();
        this.state = { 
        };
    }

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

        var marketRegion = this.props.match.params.marketRegion;

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
                    <VirtualMenu attributeName="deliveryAreas" defaultRefinement={marketRegion} />
                    <RefinementList attributeName="flower" container= '#flowers'/>
                    <RefinementList attributeName="color" container= '#colors'/>
                    <Search/>
                    <Pagination/>
                </InstantSearch>
            </div>
        )
    }
}
