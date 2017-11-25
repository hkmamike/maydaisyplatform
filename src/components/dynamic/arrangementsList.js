import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LocalizedStrings from 'react-localization';

import {InstantSearch, Hits, SearchBox, RefinementList, Pagination, CurrentRefinements, ClearAll } from 'react-instantsearch/dom';

import {connectMenu} from 'react-instantsearch/connectors';

const VirtualMenu = connectMenu(() => null);

let strings = new LocalizedStrings({
    en:{},
    ch: {}
});


function CustomResult() {
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

const Facets = () => {
    <aside>
        <ClearAll/>

        <section className="facet-wrapper">
        <div className="facet-category-title facet">Show results for</div>
        <HierarchicalMenu
            key="categories"
            attributes={['category', 'sub_category', 'sub_sub_category']}
        />
        </section>

        <section className="facet-wrapper">
        <div className="facet-category-title facet">Refine By</div>
        <Panel title="Type">
            <RefinementList
            attributeName="type"
            operator="or"
            limitMin={5}
            withSearchBox
            />
        </Panel>
        <Panel title="Materials">
            <RefinementList
            attributeName="materials"
            operator="or"
            limitMin={5}
            withSearchBox
            />
        </Panel>
        <ConnectedColorRefinementList attributeName="colors" operator="or" />
        <Panel title="Rating">
            <StarRating attributeName="rating" max={5} />
        </Panel>
        <Panel title="Price">
            <RangeInput key="price_input" attributeName="price" />
        </Panel>
        </section>
        <div className="thank-you">
        Data courtesy of <a href="http://www.ikea.com/">ikea.com</a>
        </div>
    </aside>
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
                    <SearchBox/>
                    <VirtualMenu attributeName="deliveryAreas" defaultRefinement={marketRegion} />
                    <RefinementList attributeName="flower" container= '#flowers'/>
                    <RefinementList attributeName="color" container= '#colors'/>

                    <div>
                        <Facets/>
                        <CustomResult/>
                    </div>
                </InstantSearch>
            </div>
        )
    }
}
