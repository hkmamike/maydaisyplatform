import React, { Component } from 'react'
import * as firebase from 'firebase';

export default class SignUps extends Component {

  constructor() {
    super();
    this.state = {
        signUpsData: null
    }
  }

  componentDidMount () {
    const signUpsRef = firebase.database().ref().child('signUp/hongKong/areas');
    signUpsRef.on('value', snap => {
      this.setState({
        signUpsData : snap.val()
      });
    });
  } 

  render () {

    return (
      <div>
        Subscriptions. PlanName is
      </div>
    )
  }


}