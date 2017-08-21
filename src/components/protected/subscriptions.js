import React, { Component } from 'react'
import * as firebase from 'firebase';

export default class Subscriptions extends Component {

  constructor() {
    super();
    this.state = {
      planName: null
    }
  }

  componentDidMount () {
    const planNameRef = firebase.database().ref().child('react/speed/');
    planNameRef.on('value', snap => {
      this.setState({
        planName: snap.val()
      });
    });
  } 

  render () {
    return (
      <div>
        Subscriptions. PlanName is {this.state.planName}
      </div>
    )
  }
}