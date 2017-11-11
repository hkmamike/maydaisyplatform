import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
//auth
import Login from './components/pages/login';
import Register from './components/pages/register';
import { firebaseAuth } from './components/config/constants';
//content components
import Header from './components/headerComponents/header';
import Footer from './components/footerComponents/footer';
import Homepage from './components/pages/homePage';
import SignUps from './components/pages/signUps';
import Subscriptions from './components/protected/subscriptions';
import NewSubscription from './components/protected/newSubscription';
import AccountInfo from './components/protected/accountInfo';
//text pages
import PrivacyPolicy from './components/textPages/privacyPolicy'
import TermsOfServices from './components/textPages/terms'
import ContactUs from './components/textPages/contactUs'
import About from './components/textPages/about'
import FAQ from './components/textPages/faq'
import Career from './components/textPages/career'
//gallery
import GalleryClassic from './components/gallery/classic';
import GalleryElegant from './components/gallery/elegant';
import GalleryBloom from './components/gallery/bloom';

//dynamic - marketplace
import ArrangementsList from './components/dynamic/arrangementsList';
import Florist from './components/dynamic/florist';
import Arrangement from './components/dynamic/arrangement';
import Order from './components/dynamic/order';

//marketplace - user account
import OrderHistory from './components/protected/orderHistory';
import AddressBook from './components/protected/addressBook';

//compressed css
import './assets/css/default.min.css';
//airbnb date picker
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
//firebase
import * as firebase from 'firebase';

function PrivateRoute ({component: Component, authed, selectRegion, onRegionSelection, languageChanged, ...rest}) {
  return (
    <Route {...rest} render={(props) => authed === true? 
        <Component {...props} selectRegion={selectRegion} onRegionSelection={onRegionSelection} languageChanged={languageChanged}/>
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}
function PublicRoute ({component: Component, authed, selectRegion, onRegionSelection, languageChanged, ...rest}) {
  return (
    <Route {...rest} render={(props) => authed === false?
        <Component {...props} selectRegion={selectRegion} onRegionSelection={onRegionSelection} languageChanged={languageChanged}/>
        : <Redirect to='/orderhistory' />}
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
      loading: true,
      selectRegion: 'HK_Central',
      languageChanged: 'ch',
      marketRegion: 'HK_CentralWestern',
      // deliveryDate: 1
    }
  }

  handleRegionSelection(region) {
    this.setState({marketRegion : region});
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

  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
          UserID: firebase.auth().currentUser
        })
      } else {
        this.setState({
          authed: false,
          loading: false,
          UserID: null
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
          
            
            <PublicRoute authed={this.state.authed} path='/login' component={Login} languageChanged={this.state.languageChanged}/>
            <PublicRoute authed={this.state.authed} path='/register' component={Register} languageChanged={this.state.languageChanged}/>


            <Route path='/arrangements/:marketRegion?' exact render={(props) => (<ArrangementsList {...props} languageChanged={this.state.languageChanged}/>)}/>
            <Route path='/florist/:floristID' exact render={(props) => (<Florist {...props} languageChanged={this.state.languageChanged}/>)}/>
            <Route path='/florist/:floristID/:arrangement' exact render={(props) => (<Arrangement {...props} 
              languageChanged={this.state.languageChanged}
              onDeliveryDateSelect={this.handleDeliveryDateSelect}
              deliveryDate={this.state.deliveryDate}
              marketRegion={this.state.marketRegion} 
              onMarketRegionSelect={this.handleMarketRegionSelect}/>)}/>
            <Route path='/order/:floristID/:arrangement' exact render={(props) => (<Order {...props} 
              languageChanged={this.state.languageChanged}
              deliveryDate={this.state.deliveryDate}
              marketRegion={this.state.marketRegion}/>)}/>

            <Route path='/gallery-classic' exact render={(props) => (<GalleryClassic {...props} languageChanged={this.state.languageChanged}/>)}/>
            <Route path='/gallery-elegant' exact render={(props) => (<GalleryElegant {...props} languageChanged={this.state.languageChanged}/>)}/>
            <Route path='/gallery-bloom' exact render={(props) => (<GalleryBloom {...props} languageChanged={this.state.languageChanged}/>)}/>

            <Route path='/privacy-policy' exact render={(props) => (<PrivacyPolicy {...props} languageChanged={this.state.languageChanged}/>)}/>
            <Route path='/terms' exact render={(props) => (<TermsOfServices {...props} languageChanged={this.state.languageChanged}/>)}/>

            <Route path='/faq' exact render={(props) => (<FAQ {...props} languageChanged={this.state.languageChanged}/>)}/>
            <Route path='/contact' exact render={(props) => (<ContactUs {...props} languageChanged={this.state.languageChanged}/>)}/>
            <Route path='/career' exact render={(props) => (<Career {...props} languageChanged={this.state.languageChanged}/>)}/>
            <Route path='/about' exact render={(props) => (<About {...props} languageChanged={this.state.languageChanged}/>)}/>

            <Route path='/signups' exact render={(props) => (<SignUps {...props} selectRegion={selectRegion} onRegionSelection={this.handleRegionSelection} languageChanged={this.state.languageChanged}/>)}/>



            <PrivateRoute authed={this.state.authed} path='/orderhistory' component={OrderHistory} languageChanged={this.state.languageChanged}/>
            <PrivateRoute authed={this.state.authed} path='/addressbook' component={AddressBook} languageChanged={this.state.languageChanged}/>

            <PrivateRoute authed={this.state.authed} path='/subscriptions' component={Subscriptions} languageChanged={this.state.languageChanged}/>
            <PrivateRoute authed={this.state.authed} selectRegion={selectRegion} onRegionSelection={this.handleRegionSelection} path='/newsubscription' component={NewSubscription} languageChanged={this.state.languageChanged}/>
            <PrivateRoute authed={this.state.authed} path='/accountinfo' component={AccountInfo} languageChanged={this.state.languageChanged}/>
            <Route render={() => <h3>Uhoh...we couldn't find your page</h3>} />

          </Switch>

          <Footer languageChanged={this.state.languageChanged}/>
          
        </div>
      </BrowserRouter>
    )
  }
}