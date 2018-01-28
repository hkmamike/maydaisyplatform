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
        : <Redirect to={`/${languageChanged}/auth/admin-florists`} />}
    />
  )
}

function AdminPage ({component: Component, authed, languageChanged, ...rest}) {
  return (
    <Route {...rest} render={(props) => authed === true? 
        <Component {...props} languageChanged={languageChanged}/>
        : <Redirect to={`/${languageChanged}/auth/admin-login`}/>}
    />
  )
}

function PrivateRoute ({component: Component, authed, languageChanged, designerCode, ...rest}) {
  return (
    <Route {...rest} render={(props) => authed === true? 
        <Component {...props} designerCode={designerCode} languageChanged={languageChanged}/>
        : <Redirect to={{pathname: `/${languageChanged}/auth/login`, state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, isDesigner, authed, languageChanged, ...rest}) {
  return (
    <Route {...rest} render={(props) => authed === false?
        <Component {...props} languageChanged={languageChanged}/>
        : (isDesigner? <Redirect to={`/${languageChanged}/auth/ordersdashboard`}/> : <Redirect to={`/${languageChanged}/auth/orderhistory`}/>) }
    />
  )
}

function FloristRegisterRoute ({component: Component, authed, languageChanged, ...rest}) {
  return (
    <Route {...rest} render={(props) => authed === false?
        <Component {...props} languageChanged={languageChanged}/>
        : <Redirect to={`${languageChanged}/auth/ordersdashboard`}/>}
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
      languageChanged: 'zh',
      marketRegion: 'select_region',
      onHomePage: false,
    }
  }

  handleMarketRegionSelect(region) {
    this.setState({marketRegion: region});
  }

  handleDeliveryDateSelect(date) {
    this.setState({deliveryDate: date});
  }

  handleLanguageToggle(language) {
    if (language==='zh') {
      this.setState({languageChanged: 'zh'});

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
    
    //for Google to load sitemap, not sure if needed
    const reload = () => window.location.reload();

    return (
      <BrowserRouter>
        <div className="App">
          <AdminMessage languageChanged={this.state.languageChanged}/>
          <Header authed={this.state.authed} languageChanged={this.state.languageChanged} onLanguageToggle={this.handleLanguageToggle}/>

          <Switch>

            {/*for Google to load sitemap, not sure if needed */}
            <Route path="/sitemap-0.xml" onEnter={reload} />

            {/*Auth pages */}
            <Redirect exact from='/auth/login' to='/zh/auth/login' />
            <PublicRoute authed={this.state.authed} isDesigner={this.state.isDesigner} path='/en/auth/login' component={Login} languageChanged='en'/>
            <PublicRoute authed={this.state.authed} isDesigner={this.state.isDesigner} path='/zh/auth/login' component={Login} languageChanged='zh'/>
            <Redirect exact from='/auth/register' to='/zh/auth/register' />
            <PublicRoute authed={this.state.authed} isDesigner={this.state.isDesigner} path='/en/auth/register' component={Register} languageChanged='en'/>
            <PublicRoute authed={this.state.authed} isDesigner={this.state.isDesigner} path='/zh/auth/register' component={Register} languageChanged='zh'/>
            <Redirect exact from='/auth/artist-registration-login' to='/zh/auth/artist-registration-login' />            
            <FloristRegisterRoute authed={this.state.authed} path='/en/auth/artist-registration-login' component={Login} languageChanged='en'/>
            <FloristRegisterRoute authed={this.state.authed} path='/zh/auth/artist-registration-login' component={Login} languageChanged='zh'/>
            <Redirect exact from='/auth/artist-registration-register' to='/zh/auth/artist-registration-register' />       
            <FloristRegisterRoute authed={this.state.authed} path='/en/auth/artist-registration-register' component={Register} languageChanged='en'/>
            <FloristRegisterRoute authed={this.state.authed} path='/zh/auth/artist-registration-register' component={Register} languageChanged='zh'/>
            <Redirect exact from='/auth/admin-login' to='/zh/auth/admin-login' />    
            <AdminRoute authed={this.state.authed} path='/en/auth/admin-login' component={Login} languageChanged='en'/>
            <AdminRoute authed={this.state.authed} path='/zh/auth/admin-login' component={Login} languageChanged='zh'/>
            <Redirect exact from='/auth/admin-registration' to='/zh/auth/admin-registration' />  
            <AdminPage authed={this.state.authed} path='/en/auth/admin-registration' component={FloristRegistration} languageChanged='en'/>
            <AdminPage authed={this.state.authed} path='/zh/auth/admin-registration' component={FloristRegistration} languageChanged='zh'/>
            <Redirect exact from='/auth/admin-florists' to='/zh/auth/admin-florists' /> 
            <AdminPage authed={this.state.authed} path='/en/auth/admin-florists' component ={FloristsDashboard} languageChanged='en'/>
            <AdminPage authed={this.state.authed} path='/zh/auth/admin-florists' component ={FloristsDashboard} languageChanged='zh'/>

            {/*Designer Pages */}
            <Redirect exact from='/auth/ordersdashboard' to='/zh/auth/ordersdashboard' /> 
            <PrivateRoute authed={this.state.authed} path='/en/auth/ordersdashboard' component={OrdersDashboard} designerCode={this.state.designerCode} onCreateShop={this.handleCreateShop} languageChanged='en'/>
            <PrivateRoute authed={this.state.authed} path='/zh/auth/ordersdashboard' component={OrdersDashboard} designerCode={this.state.designerCode} onCreateShop={this.handleCreateShop} languageChanged='zh'/>      
            <Redirect exact from='/auth/designs' to='/zh/auth/designs' />     
            <PrivateRoute authed={this.state.authed} path='/en/auth/designs' component={Designs} designerCode={this.state.designerCode} languageChanged='en'/>
            <PrivateRoute authed={this.state.authed} path='/zh/auth/designs' component={Designs} designerCode={this.state.designerCode} languageChanged='zh'/>           
            <Redirect exact from='/auth/shopinfo' to='/zh/auth/shopinfo' />  
            <PrivateRoute authed={this.state.authed} path='/en/auth/shopinfo' component={ShopInfo} designerCode={this.state.designerCode} languageChanged='en'/>
            <PrivateRoute authed={this.state.authed} path='/zh/auth/shopinfo' component={ShopInfo} designerCode={this.state.designerCode} languageChanged='zh'/>

            {/*Customer Pages */}
            <Redirect exact from='/auth/orderhistory' to='/zh/auth/orderhistory' /> 
            <PrivateRoute authed={this.state.authed} path='/en/auth/orderhistory' component={OrderHistory} languageChanged='en'/>
            <PrivateRoute authed={this.state.authed} path='/zh/auth/orderhistory' component={OrderHistory} languageChanged='zh'/>
            <Redirect exact from='/auth/addressbook' to='/zh/auth/addressbook' /> 
            <PrivateRoute authed={this.state.authed} path='/en/auth/addressbook' component={AddressBook} languageChanged='en'/>
            <PrivateRoute authed={this.state.authed} path='/zh/auth/addressbook' component={AddressBook} languageChanged='zh'/>
            <Redirect exact from='/auth/userinfo' to='/zh/auth/userinfo' />
            <PrivateRoute authed={this.state.authed} path='/en/auth/userinfo' component={MarketAccountInfo} languageChanged='en'/>
            <PrivateRoute authed={this.state.authed} path='/zh/auth/userinfo' component={MarketAccountInfo} languageChanged='zh'/>

            {/*Plain text pages */}
            <Redirect exact from='/privacy-policy' to='/zh/privacy-policy' />
            <Route path='/en/privacy-policy' exact render={(props) => (<PrivacyPolicy {...props} languageChanged='en'/>)}/>
            <Route path='/zh/privacy-policy' exact render={(props) => (<PrivacyPolicy {...props} languageChanged='zh'/>)}/>
            <Redirect exact from='/terms' to='/zh/terms' />
            <Route path='/en/terms' exact render={(props) => (<TermsOfServices {...props} languageChanged='en'/>)}/>
            <Route path='/zh/terms' exact render={(props) => (<TermsOfServices {...props} languageChanged='zh'/>)}/>
            <Redirect exact from='/faq' to='/zh/faq' />
            <Route path='/en/faq' exact render={(props) => (<FAQ {...props} languageChanged='en'/>)}/>
            <Route path='/zh/faq' exact render={(props) => (<FAQ {...props} languageChanged='zh'/>)}/>
            <Redirect exact from='/contact' to='/zh/contact' />
            <Route path='/en/contact' exact render={(props) => (<ContactUs {...props} languageChanged='en'/>)}/>
            <Route path='/zh/contact' exact render={(props) => (<ContactUs {...props} languageChanged='zh'/>)}/>
            <Redirect exact from='/about' to='/zh/about' />
            <Route path='/en/about' exact render={(props) => (<About {...props} languageChanged='en'/>)}/>
            <Route path='/zh/about' exact render={(props) => (<About {...props} languageChanged='zh'/>)}/>

            {/*Home page */}
            <Redirect exact from='/' to='/zh/' />
            <Route path='/zh/' exact render={(props) => (<Homepage {...props} marketRegion={marketRegion} onMarketRegionSelect={this.handleMarketRegionSelect} languageChanged={'zh'}/>)}/>
            <Route path='/en/' exact render={(props) => (<Homepage {...props} marketRegion={marketRegion} onMarketRegionSelect={this.handleMarketRegionSelect} languageChanged={'en'}/>)}/>

            {/*Design list */}
            <Route exact path="/arrangements/category/:chosenCategory?/region/:marketRegion?" render={({ match }) => {
              var paramCategory = match.params.chosenCategory;
              var paramMarketRegion = match.params.marketRegion;
              if (typeof paramCategory !== 'undefined' && typeof paramMarketRegion !== 'undefined') {
                return (<Redirect to={`/zh/arrangements/category/${paramCategory}/region/${paramMarketRegion}`} />)
              } else if (typeof paramCategory !== 'undefined' && typeof paramMarketRegion === 'undefined') {
                return (<Redirect to={`/zh/arrangements/category/${paramCategory}/region/`} />)
              } else if (typeof paramCategory === 'undefined' && typeof match.params.marketRegion !== 'undefined') {
                return (<Redirect to={`/zh/arrangements/category/region/${paramMarketRegion}`} />)
              } else {
                return (<Redirect to={`/zh/arrangements/category/region/`} />)
              }
            }} />
            <Route path='/en/arrangements/category/:chosenCategory?/region/:marketRegion?' exact render={(props) => (<ArrangementsList {...props} 
              languageChanged='en'
              onMarketRegionSelect={this.handleMarketRegionSelect}
              marketRegionProp={this.state.marketRegion}/>)}
            />
            <Route path='/zh/arrangements/category/:chosenCategory?/region/:marketRegion?' exact render={(props) => (<ArrangementsList {...props} 
              languageChanged='zh'
              onMarketRegionSelect={this.handleMarketRegionSelect}
              marketRegionProp={this.state.marketRegion}/>)}
            />

            {/*Storefront */}
            <Route exact path="/florist/:floristID" render={({ match }) => {
              var paramFloristID = match.params.floristID;
              return (<Redirect to={`/zh/florist/${paramFloristID}/`} />)
            }} />
            <Route path='/en/florist/:floristID' exact render={(props) => (<Florist {...props} languageChanged='en'/>)}/>
            <Route path='/zh/florist/:floristID' exact render={(props) => (<Florist {...props} languageChanged='zh'/>)}/>

            {/*Design */}
            <Route exact path="/florist/:floristID/:arrangement" render={({ match }) => {
              var paramFloristID = match.params.floristID;
              var paramArrangement = match.params.arrangement;
              return (<Redirect to={`/zh/florist/${paramFloristID}/${paramArrangement}`} />)
            }} />
            <Route path='/en/florist/:floristID/:arrangement' exact render={(props) => (<Arrangement {...props} 
              languageChanged='en'
              onDeliveryDateSelect={this.handleDeliveryDateSelect}
              deliveryDate={this.state.deliveryDate}
              marketRegion={this.state.marketRegion}
              onMarketRegionSelect={this.handleMarketRegionSelect}
              />)}
            />
            <Route path='/zh/florist/:floristID/:arrangement' exact render={(props) => (<Arrangement {...props} 
              languageChanged='zh'
              onDeliveryDateSelect={this.handleDeliveryDateSelect}
              deliveryDate={this.state.deliveryDate}
              marketRegion={this.state.marketRegion}
              onMarketRegionSelect={this.handleMarketRegionSelect}
              />)}
            />

            {/*Order */}
            <Route exact path="/auth/order/:floristID/:arrangement/:promoCode?" render={({ match }) => {
              var paramFloristID = match.params.floristID;
              var paramArrangement = match.params.arrangement;
              var paramPromoCode = match.params.promoCode;

              if (typeof paramPromoCode !== 'undefined') {
                return (<Redirect to={`/zh/auth/order/${paramFloristID}/${paramArrangement}/${paramPromoCode}`} />)
              } else {
                return (<Redirect to={`/zh/auth/order/${paramFloristID}/${paramArrangement}/`} />)
              }
            }} />
            <Route path='/en/auth/order/:floristID/:arrangement/:promoCode?' exact render={(props) => (
              <Order 
                {...props} 
                languageChanged='en'
                deliveryDate={this.state.deliveryDate}
                marketRegion={this.state.marketRegion}
              />)}
            />
            <Route path='/zh/auth/order/:floristID/:arrangement/:promoCode?' exact render={(props) => (
              <Order 
                {...props} 
                languageChanged='zh'
                deliveryDate={this.state.deliveryDate}
                marketRegion={this.state.marketRegion}
              />)}
            />

            <Route render={() =>
                <h3 className='site-error'>Uhoh... we couldn't find your page </h3>
            }/>

          </Switch>

          <Footer languageChanged={this.state.languageChanged}/>
          
        </div>
      </BrowserRouter>
    )
  }
}