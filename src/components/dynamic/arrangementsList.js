import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LocalizedStrings from 'react-localization';
import { Popover, Button, OverlayTrigger, Overlay, ButtonToolbar } from 'react-bootstrap';

import Slider, { Range } from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';

import {
    InstantSearch, 
    Hits, 
    SearchBox, 
    RefinementList, 
    Pagination,
    ClearAll, 
    Panel, 
    HierarchicalMenu, 
    RangeSlider,
    Configure,
} from 'react-instantsearch/dom';
import {
    connectRefinementList,
    connectHits,
    connectMenu,
    connectRange,
    connectSearchBox
} from 'react-instantsearch/connectors';

let strings = new LocalizedStrings({
    en: {},
    ch: {}
});

class PopoverFlower extends Component {
    render() {
        return (
            <div
                className="filter-popup" 
                style={{...this.props.style}}
            >
              <InstantSearch
                    appId="IWC5275GW4"
                    apiKey="24a14549af086c57dc295ac4bc6f5cc5"
                    indexName="arrangementsList"
                    onSearchStateChange={this.props.onSearchStateChange}
                    searchState={this.props.searchState}
                >
                    <RefinementList
                        attributeName="flower"
                        operator="or"
                        limitMin={10}
                    />
                </InstantSearch>
            </div>
        )
    }
}

class PopoverColor extends Component {
    render() {
        return (
            <div 
                className="filter-popup" 
                style={{...this.props.style}}
            >
              <InstantSearch
                    appId="IWC5275GW4"
                    apiKey="24a14549af086c57dc295ac4bc6f5cc5"
                    indexName="arrangementsList"
                    onSearchStateChange={this.props.onSearchStateChange}
                    searchState={this.props.searchState}
                >
                    <RefinementList
                        attributeName="color"
                        operator="or"
                        limitMin={10}
                    />
                </InstantSearch>
            </div>
        )
    }
}

/////Range Slider/////
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const RangeWithToolTip = createSliderWithTooltip(Range);
const Handle = Slider.Handle;

const handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
      <Tooltip
        prefixCls="rc-slider-tooltip"
        overlay={value}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </Tooltip>
    );
  };

class PriceRange extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    handleChange = (value) => {
        console.log(this.props.currentRefinement);
        this.props.refine({min: value[0], max: value[1]});
    }

    componentWillMount () {
        var initialMin = this.props.currentRefinement.min;
        var initialMax = this.props.currentRefinement.max;
        this.setState({initialMin: initialMin, initialMax: initialMax})
    }

    render() {
        return (
            <RangeWithToolTip
                min={this.state.initialMin}
                max={this.state.initialMax}
                defaultValue={[this.state.initialMin, this.state.initialMax]}
                allowCross={false}
                pushable={50}
                onChange={this.handleChange}
                tipFormatter={value => `${value}`}
            />
        )
    }
}
///////////

///////////
function CustomResult() {
    return (
        <div className="no-padding list-container">
            <Hits hitComponent={Product}/>
        </div>
    );
}
///////////

///////////
const CustomSearchBox = ({currentRefinement, refine}) => (
    <div className="search-box">
        <input 
            className="search-field"
            placeholder="design, designer"
            type="text"
            value={currentRefinement}
            onChange={e => refine(e.target.value)}
        />
        <i className="fa fa-search" aria-hidden="true"></i>
    </div>
)
///////////

//////////
function Product({hit}) {
    return (

        <Col xs={6} sm={4} className="list-item">
            <Link to={`/florist/${hit.florist}/${hit.id}`}>
                <div className="list-pic" style={{ backgroundImage: 'url(' + hit.image + ')'}}></div>
                <div className="text-box">
                    <div className="text-line">
                        <div className="list-name">{hit.name}</div>
                        <div className="list-price">${hit.price}</div>
                    </div>
                    <div className="list-florist">by {hit.floristName}</div>
                </div>
            </Link>
        </Col>
    );
}
///////////

class Facets extends Component {

    constructor() {
        super();
        this.state = {
            flowerFilterShow: false,
            colorFilterShow: false,
        };
    }

    toggleFlowerFilter = () => {
        this.setState({flowerFilterShow: !this.state.flowerFilterShow});
    }

    toggleColorFilter = () => {
        this.setState({colorFilterShow: !this.state.colorFilterShow});
    }

    render() {
        var props = this.props;
        return (
            <div>
                <section className="facet-wrapper">
                    {/* <Panel title="Price">
                        <ConnectedRange
                            attributeName="price"
                            min={0}
                            max={1500}
                        />
                    </Panel> */}

                    <HierarchicalMenu
                        key="category"
                        attributes={['category']}
                    />

                    <ButtonToolbar className="filter-toolbar">
                        <ClearAll/>
                        <Button ref="flowerFilter" className="button-filter" onClick={this.toggleFlowerFilter}>
                            {typeof props.searchState.refinementList === "undefined" 
                                && 'Flower'}
                            {typeof props.searchState.refinementList !== "undefined" 
                                && typeof props.searchState.refinementList.flower === "undefined"
                                && 'Flower'}
                            {(typeof props.searchState.refinementList !== "undefined" 
                                && typeof props.searchState.refinementList.flower !== "undefined"
                                && props.searchState.refinementList.flower.length === 1) && props.searchState.refinementList.flower[0]}
                            {(typeof props.searchState.refinementList !== "undefined"
                                && typeof props.searchState.refinementList.flower !== "undefined"
                                && props.searchState.refinementList.flower.length !== 1) && 'Flowers: ' + props.searchState.refinementList.flower.length}
                        </Button>
                        <Overlay
                            show={this.state.flowerFilterShow}
                            onHide={() => this.setState({flowerFilterShow: false})}
                            placement='bottom'
                            container={this}
                            target={() => ReactDOM.findDOMNode(this.refs.flowerFilter)}
                            rootClose={true}
                        >
                            <PopoverFlower 
                                onSearchStateChange={this.props.onSearchStateChange}
                                searchState={this.props.searchState}
                            />
                        </Overlay>
                        <Button ref="colorFilter" className="button-filter" onClick={this.toggleColorFilter}>
                            {typeof props.searchState.refinementList === "undefined" 
                                && 'Color'}
                            {typeof props.searchState.refinementList !== "undefined" 
                                && typeof props.searchState.refinementList.color === "undefined"
                                && 'Color'}
                            {(typeof props.searchState.refinementList !== "undefined"
                                && typeof props.searchState.refinementList.color !== "undefined"
                                && props.searchState.refinementList.color.length === 1) && props.searchState.refinementList.color[0]}
                            {(typeof props.searchState.refinementList !== "undefined"
                                && typeof props.searchState.refinementList.color !== "undefined"
                                && props.searchState.refinementList.color.length !== 1) && 'Colors: ' + props.searchState.refinementList.color.length}
                        </Button>
                        <Overlay
                            show={this.state.colorFilterShow}
                            onHide={() => this.setState({colorFilterShow: false})}
                            placement='bottom'
                            container={this}
                            target={() => ReactDOM.findDOMNode(this.refs.colorFilter)}
                            rootClose={true}
                        >
                            <PopoverColor
                                onSearchStateChange={this.props.onSearchStateChange}
                                searchState={this.props.searchState}
                            />
                        </Overlay>
                        <ConnectedSearchBox/>
                    </ButtonToolbar>

                </section>
            </div>
        )
    }
}
////////

export default class ArrangementsList extends Component {

    constructor() {
        super();
        this.state = {
            searchState: {},
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

    onSearchStateChange = (searchState) => {
        this.setState({searchState: searchState});
        console.log(searchState)
    }

    render() {

        var marketRegion = this.props.match.params.marketRegion;

        return (
            <div>
                <InstantSearch
                    appId="IWC5275GW4"
                    apiKey="24a14549af086c57dc295ac4bc6f5cc5"
                    indexName="arrangementsList"
                    onSearchStateChange={this.onSearchStateChange}
                    searchState={this.state.searchState}
                >
                    <Configure hitsPerPage = {12}/>
                    <VirtualRefinementList 
                        attributeName="flower"
                        operator="or"
                        limitMin={10}
                    />
                    <VirtualRefinementList 
                        attributeName="color" 
                        operator="or"
                        limitMin={10}
                    />

                    <div className="content-wrapper">
                        <Facets searchState={this.state.searchState} onSearchStateChange={this.onSearchStateChange}/>
                        <CustomResult/>
                    </div>
                </InstantSearch>
            </div>
        )
    }
}

//Algolia connectors
const VirtualMenu = connectMenu(() => null);
const VirtualRefinementList = connectRefinementList(() => null);
const ConnectedRange = connectRange(PriceRange);
const ConnectedSearchBox = connectSearchBox(CustomSearchBox);