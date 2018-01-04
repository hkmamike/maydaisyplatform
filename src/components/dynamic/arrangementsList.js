import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { Col } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import LocalizedStrings from 'react-localization';
import { Button, Overlay, ButtonToolbar, DropdownButton, MenuItem, Modal } from 'react-bootstrap';

import Slider, { Range } from 'rc-slider';
// import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';

import {
    InstantSearch, 
    Hits,
    Pagination,
    Configure,
    ClearAll,
} from 'react-instantsearch/dom';
import {
    connectRefinementList,
    connectMenu,
    connectRange,
    connectSearchBox
} from 'react-instantsearch/connectors';

let strings = new LocalizedStrings({
    en: {
        seeDesignsButton: 'See Designs',

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
        findDesignsButton: 'Find Designs',

        deliveringTo: 'Delivering To:',
        clearAllButton: 'Clear Filters',

        flower: 'Flower',
        flowerFilter: 'Flower Filter',
        color: 'Color',
        colorFilter: 'Color Filter',
        
        searchPlaceholder: 'design, designer',

        priceFilter: 'Price Filter:',
        priceButton: 'Price',

        dahlias: ' Dahlias',
        delphinium: ' Delphinium',
        daisies: ' Daisies',
        hydrangeas: ' Hydrangeas',
        iris: ' Iris',
        orchids: ' Orchids',
        peonies: ' Peonies',
        roses: ' Roses',
        sunflowers: ' Sun Flowers',
        tulips: ' Tulips',
        carnations: ' Carnations',

        red: 'Red',
        pink: 'Pink',
        green: 'Green',
        orange: 'Orange',
        purple: 'Purple',
        white: 'White',
        yellow: 'Yellow',
        lavender: 'Lavender',
        blue: 'Blue',
    },
    ch: {
        seeDesignsButton: '確定',

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
        findDesignsButton: '搵設計',

        deliveringTo: '送往:',
        clearAllButton: '重設篩選',

        flower: '花種',
        flowerFilter: '花種篩選',
        color: '顏色',
        colorFilter: '顏色篩選',

        searchPlaceholder: '設計 / 花藝師',

        priceFilter: '價格篩選:',
        priceButton: '價格',

        dahlias: ' 大麗花',
        delphinium: ' 翠雀',
        daisies: ' 菊花',
        hydrangeas: ' 繡球',
        iris: ' 鳶尾花',
        orchids: ' 蘭花',
        peonies: ' 牡丹',
        roses: ' 玫瑰',
        sunflowers: ' 太陽花',
        tulips: ' 鬱金香',
        carnations: ' 康乃馨',

        red: '紅色',
        pink: '粉紅色',
        green: '綠色',
        orange: '橙色',
        purple: '紫色',
        white: '白色',
        yellow: '黃色',
        lavender: '薰衣草色',
        blue: '藍色',

    }
});

const FlowerItem = ({ item, createURL, refine }) => {
    const active = item.isRefined ? 'checked' : '';
    const flower = item.label;
    const count = item.count;
    return (
      <a
        className={`${active} facet-flower`}
        href={createURL(item.value)}
        onClick={e => {
          e.preventDefault();
          refine(item.value);
        }}
        data-facet-value={item.label}
      >
        <i className="fa fa-check-square-o" aria-hidden="true"></i>
        <i className="fa fa-square-o" aria-hidden="true"></i>
        { strings[flower]} ({count})
      </a>
    );
  };
  
  const CustomFlowerRefinementList = ({ items, refine, createURL }) =>
    items.length > 0 ? (
      <div>
        {items.map(item => (
          <FlowerItem
            key={item.label}
            item={item}
            refine={refine}
            createURL={createURL}
          />
        ))}
      </div>
    ) : null;

const ColorItem = ({ item, createURL, refine }) => {
    const active = item.isRefined ? 'checked' : '';
    return (
      <a
        className={`${active} facet-color`}
        href={createURL(item.value)}
        onClick={e => {
          e.preventDefault();
          refine(item.value);
        }}
        data-facet-value={item.label}
      >
        <i className="fa fa-check" aria-hidden="true"></i>
      </a>
    );
  };
  
  const CustomColorRefinementList = ({ items, refine, createURL }) =>
    items.length > 0 ? (
      <div>
        {items.map(item => (
          <ColorItem
            key={item.label}
            item={item}
            refine={refine}
            createURL={createURL}
          />
        ))}
      </div>
    ) : null;

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
                    <ConnectedFlowerRefinementList attributeName="flower" operator="or" />
                </InstantSearch>
            </div>
        )
    }
}

/////Range Slider/////
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const RangeWithToolTip = createSliderWithTooltip(Range);

class PriceRange extends Component {

    handleChange = (value) => {
        this.props.onHandleChange(value[0],value[1]);
    }

    componentWillMount () {
        var initialMin = this.props.currentRefinement.min;
        var initialMax = this.props.currentRefinement.max;
        this.setState({initialMin: initialMin, initialMax: initialMax});
    }

    render() {
        return (
            <div>
                <RangeWithToolTip
                    min={this.props.min}
                    max={this.props.max}
                    defaultValue={[this.state.initialMin, this.state.initialMax]}
                    allowCross={false}
                    pushable={200}
                    onChange={this.handleChange}
                    tipFormatter={value => `$${value}`}
                />
                <Button 
                    bsStyle="" 
                    className="button modal-range-button" 
                    onClick={() => {
                        this.props.refine({min: this.props.tempMin, max: this.props.tempMax});
                        this.props.onHide();
                    }}
                >
                    {strings.seeDesignsButton}
                </Button>
            </div>
        )
    }
}
///////////

class PopoverPrice extends Component {

    constructor() {
        super();
        this.state = {
          tempMin: 0,
          tempMax: 3000
        }
      }

    handleChange = (value1, value2) => {
        this.setState({
            tempMin: value1,
            tempMax: value2,
        });
    }

    onHide = () => {
        this.props.onHide();
    }

    render() {
        return (
            <div
                className="filter-popup-slider"
                style={{...this.props.style}}
            >
              <InstantSearch
                    appId="IWC5275GW4"
                    apiKey="24a14549af086c57dc295ac4bc6f5cc5"
                    indexName="arrangementsList"
                    onSearchStateChange={this.props.onSearchStateChange}
                    searchState={this.props.searchState}
                >
                    <p>{strings.priceFilter}</p>
                    <ConnectedRange
                        attributeName="price"
                        min={0}
                        max={3000}
                        onHandleChange = {this.handleChange}
                        onHide={this.onHide} 
                        tempMin={this.state.tempMin}
                        tempMax={this.state.tempMax}
                    />
                    <div>${this.state.tempMin} - ${this.state.tempMax}</div>
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
                    <ConnectedColorRefinementList attributeName="color" operator="or" />
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
                onClick={this.open}>{strings.flower}</Button>
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title><strong>{strings.flowerFilter}</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InstantSearch
                        appId="IWC5275GW4"
                        apiKey="24a14549af086c57dc295ac4bc6f5cc5"
                        indexName="arrangementsList"
                        onSearchStateChange={this.props.onSearchStateChange}
                        searchState={this.props.searchState}
                    >
                        <ConnectedFlowerRefinementList attributeName="flower" operator="or" />
                    </InstantSearch>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="button" onClick={this.close}>{strings.seeDesignsButton}</Button>
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
                onClick={this.open}>{strings.color}</Button>
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title><strong>{strings.colorFilter}</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InstantSearch
                        appId="IWC5275GW4"
                        apiKey="24a14549af086c57dc295ac4bc6f5cc5"
                        indexName="arrangementsList"
                        onSearchStateChange={this.props.onSearchStateChange}
                        searchState={this.props.searchState}
                    >
                        <ConnectedColorRefinementList attributeName="color" operator="or" />
                    </InstantSearch>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="" className="button" onClick={this.close}>{strings.seeDesignsButton}</Button>
                </Modal.Footer>
            </Modal>
        </div>
      )
    }
}

class PriceFilterModal extends React.Component {
    constructor() {
      super();
      this.open = this.open.bind(this);
      this.close = this.close.bind(this);
      this.state = {
        showModal: false,
        tempMin: 0,
        tempMax: 3000,
      }
    }
    close() {
      this.setState({showModal: false});
    }
    open() {
      this.setState({showModal: true});
    }
    handleChange = (value1, value2) => {
        this.setState({
            tempMin: value1,
            tempMax: value2,
        });
    }

    render() {
      return (
        <div>
            <Button
                className={ 'large-screen-hide ' + (
                    this.props.priceFilterShow
                    || (typeof this.props.searchState.range !== "undefined"  
                            && (typeof this.props.searchState.range.price['min'] !== "undefined" && this.props.searchState.range.price['max'] !== "undefined")
                        )
                    ? 'button-filter-active' : 'button-filter' )} 
                onClick={this.open}
            >
                {strings.priceButton}
            </Button>

            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title><strong>{strings.priceFilter}</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InstantSearch
                        appId="IWC5275GW4"
                        apiKey="24a14549af086c57dc295ac4bc6f5cc5"
                        indexName="arrangementsList"
                        onSearchStateChange={this.props.onSearchStateChange}
                        searchState={this.props.searchState}
                    >
                        <ConnectedRange
                            attributeName="price"
                            min={0}
                            max={3000}
                            onHandleChange = {this.handleChange}
                            onHide={this.close}
                            tempMin={this.state.tempMin}
                            tempMax={this.state.tempMax}
                        />
                        <div className='modal-range-num'>${this.state.tempMin} - ${this.state.tempMax}</div>
                    </InstantSearch>
                </Modal.Body>
            </Modal>
        </div>
      )
    }
}

///////////
const CustomResult = (props) => {
    return (
        <div className={"no-padding list-container " + ((props.flowerFilterShow || props.colorFilterShow || props.priceFilterShow) ? 'de-focus' : '')}>
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
            placeholder='e.g. Gigiflorist'
            type="text"
            value={currentRefinement}
            onChange={e => refine(e.target.value)}
        />
        <i className="fa fa-search" aria-hidden="true"></i>
    </div>
)
///////////

///////////
const CustomSearchBoxSmall = ({currentRefinement, refine}) => (
    <div className="search-box-small large-screen-hide">
        <input 
            className="search-field"
            placeholder='e.g. Floritale'
            type="text"
            value={currentRefinement}
            onChange={e => refine(e.target.value)}
        />
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
                    <ButtonToolbar className="filter-toolbar">
                        <ClearAll
                            translations={{
                                reset: `${strings.clearAllButton}`
                            }}
                        />

                        <Button 
                            ref="priceFilter" 
                            className={ 'small-screen-hide ' + (
                                props.priceFilterShow
                                || (typeof props.searchState.range !== "undefined"  
                                        && (typeof props.searchState.range.price['min'] !== "undefined" && props.searchState.range.price['max'] !== "undefined")
                                    )
                                ? 'button-filter-active' : 'button-filter' )} 
                            onClick={props.onPriceFilterToggle}
                        >
                            {strings.priceButton}
                        </Button>
                        <Overlay
                            show={props.priceFilterShow}
                            onHide={props.onPriceFilterClose}
                            placement='bottom'
                            container={this}
                            target={() => ReactDOM.findDOMNode(this.refs.priceFilter)}
                            rootClose={true}
                        >
                            <PopoverPrice
                                onSearchStateChange={props.onSearchStateChange}
                                searchState={props.searchState}
                                onHide={props.onPriceFilterClose}
                            />
                        </Overlay>

                        <Button 
                            ref="flowerFilter" 
                            className={ 
                                'small-screen-hide ' + (
                                props.flowerFilterShow
                                || (typeof props.searchState.refinementList !== "undefined"  
                                        && (typeof props.searchState.refinementList.flower !== "undefined" && props.searchState.refinementList.flower !== "")
                                    )
                                ? 'button-filter-active' : 'button-filter' )
                            } 
                            onClick={props.onFlowerFilterToggle}
                        >
                            {typeof props.searchState.refinementList === "undefined" 
                                && (strings.flower)}
                            {(typeof props.searchState.refinementList !== "undefined" && props.searchState.refinementList.flower === "")
                                && (strings.flower)}
                            {typeof props.searchState.refinementList !== "undefined" 
                                && typeof props.searchState.refinementList.flower === "undefined"
                                && (strings.flower)}
                            {(typeof props.searchState.refinementList !== "undefined" 
                                && typeof props.searchState.refinementList.flower !== "undefined"
                                && props.searchState.refinementList.flower.length === 1) && strings[props.searchState.refinementList.flower[0]]}
                            {(typeof props.searchState.refinementList !== "undefined"
                                && (typeof props.searchState.refinementList.flower !== "undefined" && props.searchState.refinementList.flower !== "")
                                && props.searchState.refinementList.flower.length !== 1) && (strings.flower) + ': ' + props.searchState.refinementList.flower.length}
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
                            className=
                            { 'small-screen-hide ' + (
                                props.colorFilterShow
                                || (typeof props.searchState.refinementList !== "undefined"
                                        && (typeof props.searchState.refinementList.color !== "undefined" && props.searchState.refinementList.color !== "")
                                    )
                                ? 'button-filter-active' : 'button-filter' )
                            }
                            onClick={props.onColorFilterToggle}
                        >
                            {typeof props.searchState.refinementList === "undefined"
                                && (strings.color)}
                            {(typeof props.searchState.refinementList !== "undefined" && props.searchState.refinementList.color === "")
                                && (strings.color)}
                            {typeof props.searchState.refinementList !== "undefined" 
                                && typeof props.searchState.refinementList.color === "undefined"
                                && (strings.color)}
                            {(typeof props.searchState.refinementList !== "undefined"
                                && typeof props.searchState.refinementList.color !== "undefined"
                                && props.searchState.refinementList.color.length === 1) && strings[props.searchState.refinementList.color[0]]}
                            {(typeof props.searchState.refinementList !== "undefined"
                                && (typeof props.searchState.refinementList.color !== "undefined" && props.searchState.refinementList.color !== "")
                                && props.searchState.refinementList.color.length !== 1) && (strings.color) + ': ' + props.searchState.refinementList.color.length}
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
                        <Button 
                            className={
                                "large-screen-hide " + (
                                this.props.smallScreenSearchShow ? 'button-filter-active' : 'button-filter' )
                            }
                            onClick={() => this.props.onToggleSmallScreenSearch()}
                        >
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </Button>
                        {this.props.smallScreenSearchShow && 
                            <ConnectedSearchBoxSmall/>
                        }
                        {!this.props.smallScreenSearchShow && 
                            <PriceFilterModal
                                onSearchStateChange={props.onSearchStateChange}
                                searchState={props.searchState}
                                priceFilterShow={props.priceFilterShow}
                            />
                        }
                        {!this.props.smallScreenSearchShow && 
                            <FlowerFilterModal
                                onSearchStateChange={props.onSearchStateChange}
                                searchState={props.searchState}
                                flowerFilterShow={props.flowerFilterShow}
                            />
                        }
                        {!this.props.smallScreenSearchShow && 
                            <ColorFilterModal
                                onSearchStateChange={props.onSearchStateChange}
                                searchState={props.searchState}
                                colorFilterShow={props.colorFilterShow}
                            />
                        }
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
            priceFilterShow: false,
            deFocusContent: false,
            showRegionSelect: false,
            tempMarketRegion: 'select_region',
            smallScreenSearchShow: false,
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

    togglePriceFilter = () => {
        this.setState({
            priceFilterShow: !this.state.priceFilterShow,
        });
    }

    toggleSmallScreenSearch = () => {
        this.setState({
            smallScreenSearchShow: !this.state.smallScreenSearchShow,
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

    priceFilterClose = () => {
        this.setState({
            priceFilterShow: false
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
        var marketRegionMod;

        if (marketRegion ==='select_region') {
            marketRegionMod = '';
        } else {
            marketRegionMod = marketRegion;
        }

        return (
            <div className="no-padding">
                <div className="list-banner">
                    {(!this.state.showRegionSelect && typeof marketRegion !== 'undefined') &&
                        <span>
                            <div className="white-text">{strings.deliveringTo}</div>
                            <div className="market-region" onClick={() => this.setState({showRegionSelect: true})}>{strings[marketRegion]}</div>
                        </span>
                    }
                    { (this.state.showRegionSelect || typeof marketRegion === 'undefined') &&
                        <span>
                            <DropdownButton title={strings[this.state.tempMarketRegion]} id="list-region-select" onSelect={this.handleSelectRegion}>
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
                            <Route path="/" render={() => <Button bsStyle="" className="region-select-button" onClick={() => this.navToNewRegion()} disabled={this.state.tempMarketRegion === 'select_region'}>{strings.findDesignsButton}</Button>}/>
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
                        defaultRefinement={marketRegionMod}
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

                    <VirtualRange
                        attributeName="price"
                    />
{/* 
                    <Menu
                        attributeName="category"
                    /> */}

                    <div className="content-wrapper">
                        <Facets 
                            searchState={this.state.searchState} 
                            onSearchStateChange={this.onSearchStateChange}
                            flowerFilterShow={this.state.flowerFilterShow}
                            onFlowerFilterToggle={this.toggleFlowerFilter}
                            priceFilterShow={this.state.priceFilterShow}
                            onPriceFilterToggle={this.togglePriceFilter}
                            colorFilterShow={this.state.colorFilterShow}
                            onColorFilterToggle={this.toggleColorFilter}
                            onFlowerFilterClose={this.flowerFilterClose}
                            onColorFilterClose={this.colorFilterClose}
                            onPriceFilterClose={this.priceFilterClose}
                            onToggleSmallScreenSearch={this.toggleSmallScreenSearch}
                            smallScreenSearchShow={this.state.smallScreenSearchShow}
                        />
                        <CustomResult
                            flowerFilterShow={this.state.flowerFilterShow}
                            colorFilterShow={this.state.colorFilterShow}
                            priceFilterShow={this.state.priceFilterShow}
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
const VirtualRange = connectRange(() => null);
const ConnectedRange = connectRange(PriceRange);
const ConnectedSearchBox = connectSearchBox(CustomSearchBox);
const ConnectedSearchBoxSmall = connectSearchBox(CustomSearchBoxSmall);
const ConnectedColorRefinementList = connectRefinementList(CustomColorRefinementList);
const ConnectedFlowerRefinementList = connectRefinementList(CustomFlowerRefinementList);