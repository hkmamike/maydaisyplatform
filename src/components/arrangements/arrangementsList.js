import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import LocalizedStrings from 'react-localization';
import * as firebase from 'firebase';

let strings = new LocalizedStrings({
    en:{
      signUp: 'Sign Up',
      title: 'Gallery',
      classic: 'Classic',
      elegant: 'Elegant',
      bloom: 'Bloom',
      noteOn: 'Note on ',
      planName: 'Bloom',
      li1: 'For HKD223 per week, this plan is a weekly unrestricted flower design and delivery service prepared by our florists.',
      li2: "While each week's design is different, Elegant most often consists of 5-10 major blooms, sometimes supported by minor flowers.",

      li3: 'For office and home locations, flowers will be delivered with a simple wrapping for delivery purposes.',
      li4: 'For home locations, if your lobby reception does not take flowers, please place a vase in front of your door if no one is at home on the day of delivery.',
      
      li5: "For the Elegant plan, the ideal vase height is 12-17cm and the ideal vase opening's diameter is 5-7cm.",
      li6: 'To make MayDaisy affordable to flower lovers, we begin to invite customers to subscribe when 150 customers have shown interest in an area. Check out if we are servicing your area now!'
    },
    ch: {
      signUp: '報名',
      title: '相簿',
      classic: '經典',
      elegant: '優雅',
      bloom: '盛會',
      noteOn: '計劃須知: ',
      planName: '盛會',
      li1: '「盛會」計劃由本地花匠籌劃，只需港幣223元就可享每週一次的花卉設計和配送服務。',
      li2: '我們的花匠會用時令花材設計您的花卉。「盛會」計劃的設計雖然每週不同，但一般會有5-10朵主花及以適合的配花作襯托。',

      li3: '住家地點和辦公室的花卉會以簡單的花紙包成花束發送。',
      li4: '如果配送住家地點，但當天家中沒有人而您的大堂前台不收花，請將一個花瓶放在門前一個安全的位置收花。',

      li5: '建議花瓶尺寸:「盛會」計劃的設計配以一個 12-17cm 高，開口直徑 5-7cm 大的花瓶效果會較好。',
      li6: '為了令五月菊價格更大眾化，每個地區的服務會在收集到150個報名之後開啟，屆時已報名的客人會收到電郵邀請。快來看看您的地區服務是否已開啟!'
    }
  });
  

const ButtonToRegionList = ({ title, history }) => (
    <Button bsStyle="" className="button" onClick={() => history.push('/')}>{strings.signUp}</Button>
  );

export default class ArrangementsList extends Component {

    constructor() {
        super();
        this.state = { arrangementsList: [] };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        var arrangementsList = this.state.arrangementsList;
        var thisRef = this;
        firebase.database().ref('arrangementsList').once('value', function(snapshot) {

            snapshot.forEach(function(childSnapshot) {
              var childKey = childSnapshot.key;
              var childData = childSnapshot.val();
            arrangementsList.push(childData);
            });
            thisRef.setState({arrangementsList: arrangementsList});
        });
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

    var listOfArrangements = this.state.arrangementsList.map(arrangement => 
        <Col sm={4} key={arrangement.id} className="gallery-pic" style={{ backgroundImage: 'url(' + arrangement.image + ')'}}>
            <div>{arrangement.name}</div>
            <div>{arrangement.price}</div>
        </Col>
    );

    return (
        <div className="no-padding gallery-container">
            <Grid>{listOfArrangements}</Grid>
        </div>
    )
  }
}
