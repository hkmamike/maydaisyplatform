import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';

//components
import Header from './components/headerComponents/header';
import Footer from './components/footerComponents/footer';
import Homepage from './components/pages/homePage';
import Packages from './components/pages/packages';
import Login from './components/pages/login';

//includes
import './assets/css/default.min.css';
import * as firebase from 'firebase';

class App extends Component {
 
  constructor() {
    super();
    this.state = {
      speed: 10
    };
  }

  componentDidMount() {
    const rootRef = firebase.database().ref().child('react');
    const speedRef = rootRef.child('speed');
    speedRef.on('value', snap => {
      this.setState({
        speed: snap.val()
      });
    });
  }

  render() {
    return (
      <Router>

        <div className="App">
          <h1>{this.state.speed}</h1>
          <Header/>
            <Route exact path='/' component={Homepage} />
            <Route exact path='/packages' component={Packages} />
            <Route exact path='/login' component={Login} />
          <Footer/>
        </div>
      
      </Router>
    );
  }
}

export default App;
