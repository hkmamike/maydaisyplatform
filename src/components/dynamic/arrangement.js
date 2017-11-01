import React, { Component } from 'react';
import { Grid, Row, Col, Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import LocalizedStrings from 'react-localization';
import * as firebase from 'firebase';

let strings = new LocalizedStrings({
    en:{},
    ch: {}
  });

export default class Arrangement extends Component {

    constructor() {
        super();
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        var thisRef = this;
        this.setState ({arrangement: this.props.match.params.arrangement}, () => {
            firebase.database().ref(`arrangementsList/${this.state.arrangement}`).once('value', function(snapshot) {
                thisRef.setState({
                    loading: false,
                    arrangementApproval: snapshot.val().approval,
                    arrangementDescription: snapshot.val().description,
                    arrangementPrice: snapshot.val().price,
                    arrangementCurrency: snapshot.val().currency,
                    arrangementSeasonality: snapshot.val().seasonality,
                    arrangementID: snapshot.val().id,
                    arrangementImage: snapshot.val().image,
                    arrangementName: snapshot.val().name,
                    arrangementFlorist: snapshot.val().florist,
                    arrangementFloristName: snapshot.val().floristName,
                });
            });
        })
    }
    
    componentWillReceiveProps (nextProps) {
        if (nextProps.languageChanged==='ch') {
            strings.setLanguage('ch');
        } else if (nextProps.languageChanged==='en') {
            strings.setLanguage('en');
        }
    }

    componentWillMount() {
        strings.setLanguage(this.props.languageChanged);
    }

  render() {

    var loadingState = this.state.loading;
    var onTab = this.state.onTab;
    let content = null;
    let header = null;

    if (loadingState) {
      content = (
        <div>
          <div className="loader"></div>
        </div>
      )
    } else {
      content = (

        <Grid>
            <Col xs={12} sm={6} className="nav-margin">
                <div className="list-pic" style={{ backgroundImage: 'url(' + this.state.arrangementImage + ')'}}></div>
            </Col>
            <Col xs={12} sm={6} className="nav-margin">
                <div className="list-name">{this.state.arrangementName}</div>
                <div className="list-name">by <Link to >{this.state.arrangementFloristName}</Link></div>
            </Col>
        </Grid>
      )
    }

    return (
        <div>
            {content}
        </div>
    )
  }
}
