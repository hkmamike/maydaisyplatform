import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import LocalizedStrings from 'react-localization';
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
//gallery
import GallerySimple from './components/gallery/simple';
import GalleryElegant from './components/gallery/elegant';
import GalleryBloom from './components/gallery/bloom';
//includes
import './assets/css/default.min.css';
import * as firebase from 'firebase';

let strings = new LocalizedStrings({
  en:{
    companyTitle: "test"
  },
  ch: {
    companyTitle: "chinese"
  }
});

function PrivateRoute ({component: Component, authed, selectRegion, onRegionSelection, ...rest}) {
  return (
    <Route {...rest} render={(props) => authed === true? 
        <Component {...props} selectRegion={selectRegion} onRegionSelection={onRegionSelection} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}
function PublicRoute ({component: Component, authed, selectRegion, onRegionSelection, ...rest}) {
  return (
    <Route {...rest} render={(props) => authed === false?
        <Component {...props} selectRegion={selectRegion} onRegionSelection={onRegionSelection} />
        : <Redirect to='/subscriptions' />}
    />
  )
}

export default class App extends Component {
  constructor() {
    super();
    this.handleRegionSelection = this.handleRegionSelection.bind(this);
    this.handleLanguageToggle = this.handleLanguageToggle.bind(this);
    this.state = {
      authed: false,
      loading: true,
      selectRegion: 'HK - Central',
      language: 'ch'
    }
  }

  handleRegionSelection(region) {
    this.setState({selectRegion : region});
  }

  handleLanguageToggle() {
    if (this.state.language==='ch') {
      this.setState({language: 'en'});
    } else if (this.state.language==='en') {
      this.setState({language: 'ch'})
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
    strings.setLanguage('ch');
  }

  componentWillUnmount () {
    this.removeListener()
  }

  render() {
    const selectRegion = this.state.selectRegion;

    return (
      <BrowserRouter>
        <div className="App">

          <Header authed={this.state.authed} onLanguageToggle={this.handleLanguageToggle} language={this.state.language}/>

          <Switch>
            <Route path='/' exact render={(props) => (<Homepage {...props} language={this.state.language} selectRegion={selectRegion} onRegionSelection={this.handleRegionSelection}/>)}/>
          
            
            <PublicRoute authed={this.state.authed} path='/login' component={Login} />
            <PublicRoute authed={this.state.authed} path='/register' component={Register} />


            <Route path='/gallery-simple' exact render={(props) => (<GallerySimple {...props}/>)}/>
            <Route path='/gallery-elegant' exact render={(props) => (<GalleryElegant {...props}/>)}/>
            <Route path='/gallery-bloom' exact render={(props) => (<GalleryBloom {...props}/>)}/>

            <Route path='/signups' exact render={(props) => (<SignUps {...props} selectRegion={selectRegion} onRegionSelection={this.handleRegionSelection}/>)}/>

            <PrivateRoute authed={this.state.authed} path='/subscriptions' component={Subscriptions} />
            <PrivateRoute authed={this.state.authed} selectRegion={selectRegion} onRegionSelection={this.handleRegionSelection} path='/newsubscription' component={NewSubscription} />
            <PrivateRoute authed={this.state.authed} path='/accountinfo' component={AccountInfo} />
            <Route render={() => <h3>Uhoh...we couldn't find your page {strings.test}</h3>} />

          </Switch>

          <Footer/>
          
        </div>
      </BrowserRouter>
    )
  }
}