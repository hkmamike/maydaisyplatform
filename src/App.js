import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom';

//auth
import Login from './components/pages/login';
import Register from './components/pages/register';

import { firebaseAuth } from './components/config/constants';

//content components
import Header from './components/headerComponents/header';
import Footer from './components/footerComponents/footer';
import Homepage from './components/pages/homePage';
import Packages from './components/pages/packages';
import Subscriptions from './components/protected/subscriptions';

//includes
import './assets/css/default.min.css';
import * as firebase from 'firebase';

import { Button } from 'react-bootstrap';


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
    this.state = {
      authed: false,
      loading: true,
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
    this.removeListener()
  }

  render() {
    return (
      <BrowserRouter>

        <div className="App">

          <Header authed={this.state.authed} />

          <Switch>
            <Route path='/' exact component={Homepage} />
            <PublicRoute authed={this.state.authed} path='/login' component={Login} />
            <Route authed={this.state.authed} path='/register' component={Register} />
            <Route authed={this.state.authed} path='/packages' component={Packages} />
            <PrivateRoute authed={this.state.authed} path='/subscriptions' component={Subscriptions} />
            <Route render={() => <h3>Uhoh...we couldn't find your page</h3>} />
          </Switch>

          <Footer/>
        </div>
      
      </BrowserRouter>
    )
  }
}