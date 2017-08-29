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
import Packages from './components/pages/packages';
import Subscriptions from './components/protected/subscriptions';
//includes
import './assets/css/default.min.css';
import * as firebase from 'firebase';

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route {...rest} render={(props) => authed === true? 
        <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}
function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route {...rest} render={(props) => authed === false?
        <Component {...props} />
        : <Redirect to='/subscriptions' />}
    />
  )
}

export default class App extends Component {
  constructor() {
    super();
    this.handleRegionSelection = this.handleRegionSelection.bind(this);
    this.state = {
      authed: false,
      loading: true,
      selectRegion: 'HK - Central'
    }
  }

  handleRegionSelection(region) {
    this.setState({selectRegion : region});
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
    this.removeListener()
  }

  render() {
    const selectRegion = this.state.selectRegion;
    // const currentPath = window.location.pathname;
    console.log('this is a subscriptions page : ', window.location.href.includes('subscriptions'));
    console.log("window location href is : ", window.location.href);
    return (
      <BrowserRouter>
        <div className="App">

          <Header authed={this.state.authed} />

          <Switch>
            <Route path='/' exact render={(props) => (<Homepage {...props} selectRegion={selectRegion} onRegionSelection={this.handleRegionSelection}/>)}/>
          
            
            <PublicRoute authed={this.state.authed} path='/login' component={Login} />
            <PublicRoute authed={this.state.authed} path='/register' component={Register} />


            <Route path='/signups' exact render={(props) => (<SignUps {...props} selectRegion={selectRegion} onRegionSelection={this.handleRegionSelection}/>)}/>


            <Route authed={this.state.authed} path='/packages' component={Packages} />
            <PrivateRoute authed={this.state.authed} path='/subscriptions' component={Subscriptions} />
            <Route render={() => <h3>Uhoh...we couldn't find your page</h3>} />

          </Switch>

          <Footer/>

          {/* { !window.location.href.toString().includes('subscriptions') && <Footer/> } */}
        </div>
      </BrowserRouter>
    )
  }
}