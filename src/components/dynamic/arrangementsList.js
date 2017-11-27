import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LocalizedStrings from 'react-localization';

import Slider, { Range } from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';

import {
    InstantSearch, 
    Hits, 
    SearchBox, 
    RefinementList, 
    Pagination, ClearAll, 
    Panel, 
    HierarchicalMenu, 
    RangeSlider,
    Configure,
} from 'react-instantsearch/dom';
import {connectRefinementList, connectHits, connectMenu, connectRange} from 'react-instantsearch/connectors';

let strings = new LocalizedStrings({
    en:{},
    ch: {}
});

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
        console.log('min is ', value[0]);
        console.log('max is ', value[1]);
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

function CustomResult() {
    return (
        <div className="no-padding list-container">
            <Hits hitComponent={Product}/>
        </div>
    );
}

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

const Facets = () => (
    <aside>
        <ClearAll/>
        <section className="facet-wrapper">
            <HierarchicalMenu
                key="category"
                attributes={['category']}
            />
        </section>

        <section className="facet-wrapper">
            <Panel title="Flower">
                <RefinementList
                    attributeName="flower"
                    operator="or"
                    limitMin={5}
                />
            </Panel>
            <Panel title="Color">
                <RefinementList
                    attributeName="color"
                    operator="or"
                    limitMin={5}
                />
            </Panel>
            <Panel title="Price">
                <ConnectedRange
                    attributeName="price"
                    min={0}
                    max={1500}
                />
            </Panel>

        </section>
    </aside>
)

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
                    <Configure hitsPerPage = {12}/>

                    <div className="content-wrapper">
                        <Facets/>
                        <CustomResult/>
                    </div>
                </InstantSearch>
            </div>
        )
    }
}

//Algolia connectors
const VirtualMenu = connectMenu(() => null);
const ConnectedRange = connectRange(PriceRange);