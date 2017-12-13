import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { base } from './components/config/constants';
//auth
import Login from './components/pages/login';
import Register from './components/pages/register';
import { firebaseAuth } from './components/config/constants';

//content components
import Header from './components/headerComponents/header';
import Footer from './components/footerComponents/footer';
import Homepage from './components/pages/homePage';
import SignUps from './components/pages/signUps';

//text pages
import PrivacyPolicy from './components/textPages/privacyPolicy'
import TermsOfServices from './components/textPages/terms'
import ContactUs from './components/textPages/contactUs'
import About from './components/textPages/about'
import FAQ from './components/textPages/faq'
import Career from './components/textPages/career'

//dynamic - marketplace
import ArrangementsList from './components/dynamic/arrangementsList';
import Florist from './components/dynamic/florist';
import Arrangement from './components/dynamic/arrangement';
import Order from './components/dynamic/order';

//marketplace - user account
import OrderHistory from './components/protected/orderHistory';
import AddressBook from './components/protected/addressBook';
import MarketAccountInfo from './components/protected/marketAccountInfo';

//marketplace - florist account
import OrdersDashboard from './components/designerPages/ordersDashboard';
import Designs from './components/designerPages/designs';
import ShopInfo from './components/designerPages/shopInfo';

//compressed css
import './assets/css/default.min.css';

//airbnb date picker
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';


function PrivateRoute ({component: Component, authed, selectRegion, onRegionSelection, languageChanged, designerCode, ...rest}) {
  return (
    <Route {...rest} render={(props) => authed === true? 
        <Component {...props} selectRegion={selectRegion} onRegionSelection={onRegionSelection} designerCode={designerCode} languageChanged={languageChanged}/>
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}
function PublicRoute ({component: Component, isDesigner, authed, selectRegion, onRegionSelection, languageChanged, ...rest}) {
  return (
    <Route {...rest} render={(props) => authed === false?
        <Component {...props} selectRegion={selectRegion} onRegionSelection={onRegionSelection} languageChanged={languageChanged}/>
        : (isDesigner? <Redirect to='/ordersdashboard'/> : <Redirect to='/orderhistory'/>) }
    />
  )
}

export default class App extends Component {
  constructor() {
    super();
    this.handleRegionSelection = this.handleRegionSelection.bind(this);
    this.handleLanguageToggle = this.handleLanguageToggle.bind(this);
    this.handleMarketRegionSelect = this.handleMarketRegionSelect.bind(this);
    this.handleDeliveryDateSelect = this.handleDeliveryDateSelect.bind(this);
    this.state = {
      authed: false,
      isDesigner: false,
      loading: true,
      selectRegion: 'HK_Central',
      languageChanged: 'ch',
      marketRegion: 'HK_CentralWestern',
      // deliveryDate: 1
    }
  }

  handleRegionSelection(region) {
    this.setState({selectRegion : region});
  }

  handleMarketRegionSelect(region) {
    this.setState({marketRegion: region});
  }

  handleDeliveryDateSelect(date) {
    this.setState({deliveryDate: date});
  }

  handleLanguageToggle(language) {
    if (language==='ch') {
      this.setState({languageChanged: 'ch'});

    } else if (language==='en') {
      this.setState({languageChanged: 'en'});
    }
  }

  handleCreateShop = () => {
    this.removeListener();
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        base.fetch(`users/${user.uid}/info/`, {
          context: this,
          then(data) {
            if (data.shop) {
              this.setState({
                authed: true, 
                loading: false, 
                uid: user.uid,
                //login redirects to dashboard if user has a shop
                isDesigner: true, 
                designerCode: data.shop
              });
            } else {
              this.setState({
                authed: true, 
                loading: false, 
                uid: user.uid,
                //login redirects to order history if user does not have a shop
                isDesigner: false, 
              });
            }
          }
        });
      } else {
        this.setState({
          authed: false,
          loading: false,
          uid: null
        })
      }
    })
  }

  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        base.fetch(`users/${user.uid}/info/`, {
          context: this,
          then(data) {
            if (data.shop) {
              this.setState({
                authed: true, 
                loading: false, 
                uid: user.uid,
                //login redirects to dashboard if user has a shop
                isDesigner: true, 
                designerCode: data.shop
              });
            } else {
              this.setState({
                authed: true, 
                loading: false, 
                uid: user.uid,
                //login redirects to order history if user does not have a shop
                isDesigner: false, 
              });
            }
          }
        });
      } else {
        this.setState({
          authed: false,
          loading: false,
          uid: null
        })
      }
    })
  }

  componentWillUnmount () {
    this.removeListener();
  }

  render() {
    const marketRegion = this.state.marketRegion;
    const selectRegion = this.state.selectRegion;

    return (
      <BrowserRouter>
        <div className="App">

          <Header authed={this.state.authed} onLanguageToggle={this.handleLanguageToggle}/>

          <Switch>
            <Route path='/' exact render={(props) => (<Homepage {...props} marketRegion={marketRegion} onRegionSelection={this.handleRegionSelection} languageChanged={this.state.languageChanged}/>)}/>
          
            
            <PublicRoute authed={this.state.authed} isDesigner={this.state.isDesigner} path='/login' component={Login} languageChanged={this.state.languageChanged}/>
            <PublicRoute authed={this.state.authed} isDesigner={this.state.isDesigner} path='/register' component={Register} languageChanged={this.state.languageChanged}/>

            <Route path='/arrangements/:marketRegion?' exact render={(props) => (<ArrangementsList {...props} 
              languageChanged={this.state.languageChanged}
              onMarketRegionSelect={this.handleMarketRegionSelect}
              marketRegionProp={this.state.marketRegion}/>)}
            />

            <Route path='/florist/:floristID' exact render={(props) => (<Florist {...props} languageChanged={this.state.languageChanged}/>)}/>
            <Route path='/florist/:floristID/:arrangement' exact render={(props) => (<Arrangement {...props} 
              languageChanged={this.state.languageChanged}
              onDeliveryDateSelect={this.handleDeliveryDateSelect}
              deliveryDate={this.state.deliveryDate}
              marketRegion={this.state.marketRegion} 
              onMarketRegionSelect={this.handleMarketRegionSelect}/>)}
            />
            <Route path='/order/:floristID/:arrangement' exact render={(props) => (<Order {...props} 
              languageChanged={this.state.languageChanged}
              deliveryDate={this.state.deliveryDate}
              marketRegion={this.state.marketRegion}/>)}
            />

            <Route path='/privacy-policy' exact render={(props) => (<PrivacyPolicy {...props} languageChanged={this.state.languageChanged}/>)}/>
            <Route path='/terms' exact render={(props) => (<TermsOfServices {...props} languageChanged={this.state.languageChanged}/>)}/>
            <Route path='/faq' exact render={(props) => (<FAQ {...props} languageChanged={this.state.languageChanged}/>)}/>
            <Route path='/contact' exact render={(props) => (<ContactUs {...props} languageChanged={this.state.languageChanged}/>)}/>
            <Route path='/career' exact render={(props) => (<Career {...props} languageChanged={this.state.languageChanged}/>)}/>
            <Route path='/about' exact render={(props) => (<About {...props} languageChanged={this.state.languageChanged}/>)}/>


            <Route path='/signups' exact render={(props) => (<SignUps {...props} selectRegion={selectRegion} onRegionSelection={this.handleRegionSelection} languageChanged={this.state.languageChanged}/>)}/>


            <PrivateRoute authed={this.state.authed} path='/orderhistory' component={OrderHistory} languageChanged={this.state.languageChanged}/>
            <PrivateRoute authed={this.state.authed} path='/addressbook' component={AddressBook} languageChanged={this.state.languageChanged}/>
            <PrivateRoute authed={this.state.authed} path='/userinfo' component={MarketAccountInfo} languageChanged={this.state.languageChanged}/>

            <PrivateRoute authed={this.state.authed} path='/ordersdashboard' component={OrdersDashboard} designerCode={this.state.designerCode} onCreateShop={this.handleCreateShop} languageChanged={this.state.languageChanged}/>
            <PrivateRoute authed={this.state.authed} path='/designs' component={Designs} designerCode={this.state.designerCode} languageChanged={this.state.languageChanged}/>
            <PrivateRoute authed={this.state.authed} path='/shopinfo' component={ShopInfo} designerCode={this.state.designerCode} languageChanged={this.state.languageChanged}/>

            <Route render={() => <h3>Uhoh...we couldn't find your page</h3>} />

          </Switch>

          <Footer languageChanged={this.state.languageChanged}/>
          
        </div>
      </BrowserRouter>
    )
  }
}