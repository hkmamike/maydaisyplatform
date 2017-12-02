import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { Col } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import LocalizedStrings from 'react-localization';
import { Popover, Button, OverlayTrigger, Overlay, ButtonToolbar, DropdownButton, MenuItem, Modal } from 'react-bootstrap';

import Slider, { Range } from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';

import {
    InstantSearch, 
    Hits, 
    SearchBox, 
    RefinementList, 
    Pagination,
    Panel, 
    HierarchicalMenu, 
    RangeSlider,
    Configure,
    ClearAll
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

class FlowerFilterModal extends React.Component {
    constructor() {
      super();
      this.open = this.open.bind(this);
      this.close = this.close.bind(this);
      this.state = {
        showModal: false
      }
    }
    close() {
      this.setState({showModal: false});
    }
    open() {
      this.setState({showModal: true});
    }
    render() {
      return (
        <div>
            <Button 
                className={"large-screen-hide " + (
                    this.props.flowerFilterShow
                    || (typeof this.props.searchState.refinementList !== "undefined"
                            && (typeof this.props.searchState.refinementList.flower !== "undefined" && this.props.searchState.refinementList.flower !== "")
                        )
                    ? 'button-filter-active' : 'button-filter' )}
                onClick={this.open}>Flower</Button>
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title><strong>Flower Filter</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button className="button" onClick={this.close}>See Designs</Button>
                </Modal.Footer>
            </Modal>
        </div>
      )
    }
}

class ColorFilterModal extends React.Component {
    constructor() {
      super();
      this.open = this.open.bind(this);
      this.close = this.close.bind(this);
      this.state = {
        showModal: false
      }
    }
    close() {
      this.setState({showModal: false});
    }
    open() {
      this.setState({showModal: true});
    }
    render() {
      return (
        <div>
            <Button 
                className={"large-screen-hide " + (
                    this.props.colorFilterShow
                    || (typeof this.props.searchState.refinementList !== "undefined"
                            && (typeof this.props.searchState.refinementList.color !== "undefined" && this.props.searchState.refinementList.color !== "")
                        )
                    ? 'button-filter-active' : 'button-filter' )}
                onClick={this.open}>Color</Button>
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title><strong>Color Filter</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="" className="button" onClick={this.close}>See Designs</Button>
                </Modal.Footer>
            </Modal>
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
const CustomResult = (props) => {
    return (
        <div className={"no-padding list-container " + ((props.flowerFilterShow || props.colorFilterShow) ? 'de-focus' : '')}>
            <Hits hitComponent={Product}/>
        </div>
    );
}
///////////

///////////
const CustomSearchBox = ({currentRefinement, refine}) => (
    <div className="search-box small-screen-hide">
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

                    <ButtonToolbar className="filter-toolbar">
                        <ClearAll/>

                        <Button 
                            ref="flowerFilter" 
                            className={ 'small-screen-hide ' + (
                                props.flowerFilterShow
                                || (typeof props.searchState.refinementList !== "undefined"  
                                        && (typeof props.searchState.refinementList.flower !== "undefined" && props.searchState.refinementList.flower !== "")
                                    )
                                ? 'button-filter-active' : 'button-filter' )} 
                                onClick={props.onFlowerFilterToggle}
                        >
                            {typeof props.searchState.refinementList === "undefined" 
                                && 'Flower'}
                            {(typeof props.searchState.refinementList !== "undefined" && props.searchState.refinementList.flower === "")
                                && 'Flower'}
                            {typeof props.searchState.refinementList !== "undefined" 
                                && typeof props.searchState.refinementList.flower === "undefined"
                                && 'Flower'}
                            {(typeof props.searchState.refinementList !== "undefined" 
                                && typeof props.searchState.refinementList.flower !== "undefined"
                                && props.searchState.refinementList.flower.length === 1) && props.searchState.refinementList.flower[0]}
                            {(typeof props.searchState.refinementList !== "undefined"
                                && (typeof props.searchState.refinementList.flower !== "undefined" && props.searchState.refinementList.flower !== "")
                                && props.searchState.refinementList.flower.length !== 1) && 'Flowers: ' + props.searchState.refinementList.flower.length}
                        </Button>
                        <Overlay
                            show={props.flowerFilterShow}
                            onHide={props.onFlowerFilterClose}
                            placement='bottom'
                            container={this}
                            target={() => ReactDOM.findDOMNode(this.refs.flowerFilter)}
                            rootClose={true}
                        >
                            <PopoverFlower 
                                onSearchStateChange={props.onSearchStateChange}
                                searchState={props.searchState}
                            />
                        </Overlay>

                        <Button 
                            ref="colorFilter" 
                            className={ 'small-screen-hide ' + (
                                props.colorFilterShow
                                || (typeof props.searchState.refinementList !== "undefined"
                                        && (typeof props.searchState.refinementList.color !== "undefined" && props.searchState.refinementList.color !== "")
                                    )
                                ? 'button-filter-active' : 'button-filter' )}
                                onClick={props.onColorFilterToggle}
                        >
                            {typeof props.searchState.refinementList === "undefined"
                                && 'Color'}
                            {(typeof props.searchState.refinementList !== "undefined" && props.searchState.refinementList.color === "")
                                && 'Color'}
                            {typeof props.searchState.refinementList !== "undefined" 
                                && typeof props.searchState.refinementList.color === "undefined"
                                && 'Color'}
                            {(typeof props.searchState.refinementList !== "undefined"
                                && typeof props.searchState.refinementList.color !== "undefined"
                                && props.searchState.refinementList.color.length === 1) && props.searchState.refinementList.color[0]}
                            {(typeof props.searchState.refinementList !== "undefined"
                                && (typeof props.searchState.refinementList.color !== "undefined" && props.searchState.refinementList.color !== "")
                                && props.searchState.refinementList.color.length !== 1) && 'Colors: ' + props.searchState.refinementList.color.length}
                        </Button>
                        <Overlay
                            show={props.colorFilterShow}
                            onHide={props.onColorFilterClose}
                            placement='bottom'
                            container={this}
                            target={() => ReactDOM.findDOMNode(this.refs.colorFilter)}
                            rootClose={true}
                        >
                            <PopoverColor
                                onSearchStateChange={props.onSearchStateChange}
                                searchState={props.searchState}
                            />
                        </Overlay>

                        <ConnectedSearchBox/>

                        <FlowerFilterModal
                            onFlowerFilter={this.openFlowerFilter}
                            onSearchStateChange={props.onSearchStateChange}
                            searchState={props.searchState}
                            flowerFilterShow={props.flowerFilterShow}
                        />
                        <ColorFilterModal
                            onColorFilter={this.openColorFilter}
                            onSearchStateChange={props.onSearchStateChange}
                            searchState={props.searchState}
                            colorFilterShow={props.colorFilterShow}
                        />

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
            flowerFilterShow: false,
            colorFilterShow: false,
            deFocusContent: false,
            showRegionSelect: false,
            tempMarketRegion: 'Select Region'
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

    toggleFlowerFilter = () => {
        this.setState({
            flowerFilterShow: !this.state.flowerFilterShow,
        });
    }

    toggleColorFilter = () => {
        this.setState({
            colorFilterShow: !this.state.colorFilterShow,
        });
    }

    flowerFilterClose = () => {
        this.setState({
            flowerFilterShow: false,
        });
    }

    colorFilterClose = () => {
        this.setState({
            colorFilterShow: false
        });
    }

    handleSelectRegion = (eventKey) => {
        this.setState({tempMarketRegion: eventKey})
    }

    navToNewRegion = () => {
        var marketRegion = this.state.tempMarketRegion;
        this.props.history.push(`/arrangements/${marketRegion}`);
        this.setState({showRegionSelect: false});
        this.props.onMarketRegionSelect(marketRegion)
    }

    render() {
        var marketRegion = this.props.match.params.marketRegion;

        return (
            <div className="no-padding">
                <div className="list-banner">
                    {(!this.state.showRegionSelect && typeof marketRegion !== 'undefined') &&
                        <span>
                            <div className="white-text">Delivering To:</div>
                            <div className="market-region" onClick={() => this.setState({showRegionSelect: true})}>{marketRegion}</div>
                        </span>
                    }
                    { (this.state.showRegionSelect || typeof marketRegion === 'undefined') &&
                        <span>
                            <DropdownButton title={this.state.tempMarketRegion} id="list-region-select" onSelect={this.handleSelectRegion}>
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
                            <Route path="/" render={() => <Button bsStyle="" className="region-select-button" onClick={() => this.navToNewRegion()} disabled={this.state.tempMarketRegion === 'Select Region'}>Find Designs</Button>}/>
                        </span>
                    }
                </div>
                <InstantSearch
                    appId="IWC5275GW4"
                    apiKey="24a14549af086c57dc295ac4bc6f5cc5"
                    indexName="arrangementsList"
                    onSearchStateChange={this.onSearchStateChange}
                    searchState={this.state.searchState}
                >
                    <Configure hitsPerPage = {12}/>

                    <VirtualMenu 
                        attributeName="deliveryAreas" 
                        defaultRefinement={marketRegion}
                    />
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
                        <Facets 
                            searchState={this.state.searchState} 
                            onSearchStateChange={this.onSearchStateChange}
                            flowerFilterShow={this.state.flowerFilterShow}
                            onFlowerFilterToggle={this.toggleFlowerFilter}
                            colorFilterShow={this.state.colorFilterShow}
                            onColorFilterToggle={this.toggleColorFilter}
                            onFlowerFilterClose={this.flowerFilterClose}
                            onColorFilterClose={this.colorFilterClose}
                        />
                        <CustomResult
                            flowerFilterShow={this.state.flowerFilterShow}
                            colorFilterShow={this.state.colorFilterShow}
                        />
                        <div className="pagination-box">
                            <div className="pagination">
                                <Pagination/>
                            </div>
                        </div>
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