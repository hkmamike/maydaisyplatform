import React, { Component } from 'react';
import { base } from '../config/constants';

export default class SignUps extends Component {

  constructor() {
    super();
    this.state = {
        signUpsData: {}
    }
  }

  componentDidMount() {
    this.signUpsDataRef = base.bindToState('signUp/hongKong/areas', {
      context: this,
      state: 'signUpsData'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.signUpsDataRef);
  } 

  render () {

    var data = this.state.signUpsData;

    var content = Object.keys(data).map(function(key) {
        return (
            <div key={key}>
                <span>{key}: {data[key].signUpCount}</span>
            </div>
        )
    })

    return (
        <div>
            {content}
        </div>
    )
  }


}