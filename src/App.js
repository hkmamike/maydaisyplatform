import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { base } from './components/config/constants';

//auth
import Login from './components/pages/login';
import Register from './components/pages/register';
import { firebaseAuth } from './components/config/constants';

//content components
import AdminMessage from './components/headerComponents/adminMessage';
import Header from './components/headerComponents/header';
import Footer from './components/footerComponents/footer';
import Homepage from './components/pages/homePage';

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

//admin pages
import FloristRegistration from './components/admin/floristRegistration';
import FloristsDashboard from './components/admin/floristsDashboard';

//compressed css
import './assets/css/default.min.css';

//airbnb date picker
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';

function AdminRoute ({component: Component, authed, languageChanged, ...rest}) {
  return (
    <Route {...rest} render={(props) => authed === false? 
        <Component {...props} languageChanged={languageChanged}/>
        : <Redirect to='/auth/admin-florists' />}
    />
  )
}

function AdminPage ({component: Component, authed, ...rest}) {
  return (
    <Route {...rest} render={(props) => authed === true? 
        <Component {...props}/>
        : <Redirect to='/auth/admin-login'/>}
    />
  )
}

function PrivateRoute ({component: Component, authed, languageChanged, designerCode, ...rest}) {
  return (
    <Route {...rest} render={(props) => authed === true? 
        <Component {...props} designerCode={designerCode} languageChanged={languageChanged}/>
        : <Redirect to={{pathname: '/auth/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, isDesigner, authed, languageChanged, ...rest}) {
  return (
    <Route {...rest} render={(props) => authed === false?
        <Component {...props} languageChanged={languageChanged}/>
        : (isDesigner? <Redirect to='/auth/ordersdashboard'/> : <Redirect to='/auth/orderhistory'/>) }
    />
  )
}

function FloristRegisterRoute ({component: Component, authed, languageChanged, ...rest}) {
  return (
    <Route {...rest} render={(props) => authed === false?
        <Component {...props} languageChanged={languageChanged}/>
        : <Redirect to='/auth/ordersdashboard'/>}
    />
  )
}

export default class App extends Component {
  constructor() {
    super();
    this.handleLanguageToggle = this.handleLanguageToggle.bind(this);
    this.handleMarketRegionSelect = this.handleMarketRegionSelect.bind(this);
    this.handleDeliveryDateSelect = this.handleDeliveryDateSelect.bind(this);
    this.state = {
      authed: false,
      isDesigner: false,
      loading: true,
      languageChanged: 'ch',
      marketRegion: 'select_region',
      onHomePage: false,
    }
  }

  goHomePage = () => {
    this.setState({onHomePage: true});
  }

  leaveHomePage = () => {
    this.setState({onHomePage: false});
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
    const onHomePage = this.state.onHomePage
    // var currentPath = window.location.pathname;

    // console.log('this props is : ', currentPath);
    
    //for Google to load sitemap, not sure if needed
    const reload = () => window.location.reload();

    return (
      <BrowserRouter>
        <div className="App">
          <AdminMessage languageChanged={this.state.languageChanged} onHomePage={onHomePage}/>
          <Header authed={this.state.authed} languageChanged={this.state.languageChanged} onLanguageToggle={this.handleLanguageToggle} onHomePage={onHomePage}/>

          <Switch>

            {/*for Google to load sitemap, not sure if needed */}
            <Route path="/sitemap-0.xml" onEnter={reload} />

            <Redirect exact from='/' to='/home-zh' />
            <Route path='/home-zh' exact render={(props) => (<Homepage {...props} marketRegion={marketRegion} onMarketRegionSelect={this.handleMarketRegionSelect} languageChanged={'ch'} onHomePage={onHomePage} goHomePage={this.goHomePage} leaveHomePage={this.leaveHomePage}/>)}/>
            <Route path='/home-en' exact render={(props) => (<Homepage {...props} marketRegion={marketRegion} onMarketRegionSelect={this.handleMarketRegionSelect} languageChanged={'en'} onHomePage={onHomePage} goHomePage={this.goHomePage} leaveHomePage={this.leaveHomePage}/>)}/>


            <PublicRoute authed={this.state.authed} isDesigner={this.state.isDesigner} path='/auth/login' component={Login} languageChanged={this.state.languageChanged}/>
            <PublicRoute authed={this.state.authed} isDesigner={this.state.isDesigner} path='/auth/register' component={Register} languageChanged={this.state.languageChanged}/>

            <FloristRegisterRoute authed={this.state.authed} path='/auth/artist-registration-login' component={Login} languageChanged={this.state.languageChanged}/>
            <FloristRegisterRoute authed={this.state.authed} path='/auth/artist-registration-register' component={Register} languageChanged={this.state.languageChanged}/>

            <AdminRoute authed={this.state.authed} path='/auth/admin-login' component={Login} languageChanged={this.state.languageChanged}/>
            <AdminPage authed={this.state.authed} path='/auth/admin-registration' component ={FloristRegistration}/>
            <AdminPage authed={this.state.authed} path='/auth/admin-florists' component ={FloristsDashboard}/>

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
              onMarketRegionSelect={this.handleMarketRegionSelect}
              />)}
            />

            <Route path='/auth/order/:floristID/:arrangement/:promoCode?' exact render={(props) => (<Order {...props} 
              languageChanged={this.state.languageChanged}
              deliveryDate={this.state.deliveryDate}
              marketRegion={this.state.marketRegion}
              />)}
            />

            <Route path='/privacy-policy' exact render={(props) => (<PrivacyPolicy {...props} languageChanged={this.state.languageChanged}/>)}/>
            <Route path='/terms' exact render={(props) => (<TermsOfServices {...props} languageChanged={this.state.languageChanged}/>)}/>
            <Route path='/faq' exact render={(props) => (<FAQ {...props} languageChanged={this.state.languageChanged}/>)}/>
            <Route path='/contact' exact render={(props) => (<ContactUs {...props} languageChanged={this.state.languageChanged}/>)}/>
            <Route path='/career' exact render={(props) => (<Career {...props} languageChanged={this.state.languageChanged}/>)}/>
            <Route path='/about' exact render={(props) => (<About {...props} languageChanged={this.state.languageChanged}/>)}/>

            <PrivateRoute authed={this.state.authed} path='/auth/orderhistory' component={OrderHistory} languageChanged={this.state.languageChanged}/>
            <PrivateRoute authed={this.state.authed} path='/auth/addressbook' component={AddressBook} languageChanged={this.state.languageChanged}/>
            <PrivateRoute authed={this.state.authed} path='/auth/userinfo' component={MarketAccountInfo} languageChanged={this.state.languageChanged}/>

            <PrivateRoute authed={this.state.authed} path='/auth/ordersdashboard' component={OrdersDashboard} designerCode={this.state.designerCode} onCreateShop={this.handleCreateShop} languageChanged={this.state.languageChanged}/>
            <PrivateRoute authed={this.state.authed} path='/auth/designs' component={Designs} designerCode={this.state.designerCode} languageChanged={this.state.languageChanged}/>
            <PrivateRoute authed={this.state.authed} path='/auth/shopinfo' component={ShopInfo} designerCode={this.state.designerCode} languageChanged={this.state.languageChanged}/>

            <Route render={() => <h3>Uhoh...we couldn't find your page</h3>} />

          </Switch>

          <Footer languageChanged={this.state.languageChanged}/>
          
        </div>
      </BrowserRouter>
    )
  }
}