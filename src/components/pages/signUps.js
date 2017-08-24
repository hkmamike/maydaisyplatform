import React, { Component } from 'react';
import { base } from '../config/constants';
import RegionCount from './regionCount'

export function signUpSubmit () {
  // return ref.child(`users/${user.uid}/info`).set({
  //     email: user.email,
  //     uid: user.uid
  //   }).then(() => user)
}

export default class SignUps extends Component {

  constructor() {
    super();
    this.state = {
        signUpsData: {},
        regionStatus: '',
        regionUnlocked: false
    }
  }

  // getData(key, defaultValue = '') {
  //   const data = this.getStats(this.props.selectRegion);
  //   return data[key] || defaultValue;
  // }

  componentDidMount() {
    this.signUpsDataRef = base.bindToState('signUp/hongKong/areas', {
      context: this,
      state: 'signUpsData'
    });
    this.selectRegionRef = base.bindToState(`signUp/hongKong/areas/${this.props.selectRegion}/status`, {
      context: this,
      state: 'regionStatus'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.signUpsDataRef);
  } 

  render () {

    var data = this.state.signUpsData;
    var regionStatus = this.state.regionStatus;
    var region = this.props.selectRegion;

    var content = Object.keys(data).map(function(key) {
        return (
          <div key={key}>
            <span>{key}: {data[key].signUpCount}</span>
          </div>
        )
    })

    return (
        <div>
            <div>{region} is {regionStatus}</div>
            {content}
        </div>
    )
  }


}