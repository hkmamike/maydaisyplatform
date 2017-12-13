import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en:{
      returnHome: 'Back to Home',
      pageTitle: 'Contact Methods',
      lastUpdated: 'Last Updated: September 26, 2017',
      subtitle: "We'd love to hear from you! Contact us with your suggestions for how we can make your experience as amazing as possible. We're also happy to respond to any press inquires or love letters.",
      email: 'Email : ',
      hotline: 'Hotline : '
    },
    ch: {
      returnHome: '返回主頁',
      pageTitle: '聯絡方法',
      lastUpdated: '最後更新: 2017年9月27日',
      subtitle: "我們想聽到您的聲音! 告訴我們怎樣可以令您的體驗更完美，當然，我們也會答覆大家的查問和情信。",
      email: '電郵 : ',
      hotline: '熱線 : '
    }
});

const ButtonToRegionList = ({ title, history }) => (
    <Button bsStyle="" className="button" onClick={() => history.push('/')}>{strings.returnHome}</Button>
  );

export default class ContactUs extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
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

        return (
            <div className="no-padding text-page-container">
                <div className="text-page-about">
                    <Grid>
                        <Row>
                            <h2 className="text-page-title"><span>{strings.pageTitle}</span></h2>
                            <Col sm={1}></Col>
                            <Col sm={10}>
                            <div className="text-page-text">
                                <p>{strings.subtitle}</p>
                                <p>{strings.email}<a href="mailto:contact@maydaisy.com">contact@maydaisy.com</a></p>
                                <p>{strings.hotline}(852)9346-8427</p>
                                <div className="text-page-button-div">
                                    <Route path="/" render={(props) => <ButtonToRegionList {...props}/>} />
                                </div>
                            </div>
                            </Col>
                            <Col sm={1}></Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        )
    }
}
    