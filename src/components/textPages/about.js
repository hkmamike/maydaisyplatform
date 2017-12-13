import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en:{
      returnHome: 'Back to Home',
      pageTitle: 'About MayDaisy',
      lastUpdated: 'Last Updated: December 12, 2017',
      q1: 'What is MayDaisy? :',
      a1: "MayDaisy is a marketplace and community to connect customers with great florists in their city. By bringing the best florists together in one place, we can focus resources on your flowers and spend less on reaching you. MayDaisy also provides a channel for established and emerging independent floral artists to reach a broader audience. Independent artists do not operate a flower shop full time, but they offer dinstinctive styles that cannot be found anywhere else!",
    },
    ch: {
      returnHome: '返回主頁',
      pageTitle: '關於五月菊',
      lastUpdated: '最後更新: 2017年12月12日',
      q1: '五月菊是什麼? :',
      a1: "五月菊是由花藝師們建立的一站式鮮花市集和花藝社群，我們的目標是為客人找到最好最適合他們的花卉設計。鮮花市集的模式令我們可以減低在市場推廣上花費的時間和資源，更集中的為您創造花藝。",
    }
});

const ButtonToRegionList = ({ title, history }) => (
    <Button bsStyle="" className="button" onClick={() => history.push('/')}>{strings.returnHome}</Button>
  );

export default class About extends Component {

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
                                <p className="font-italic bold">{strings.subtitle}</p>
                                <p className="faq-question">{strings.q1}</p>
                                <p className="faq-answer">{strings.a1}</p>
                                <p className="faq-question">{strings.q2}</p>
                                <p className="faq-answer">{strings.a2}</p>
                                <p className="faq-question">{strings.q3}</p>
                                <p className="faq-answer">{strings.a3}</p>
                                <p className="faq-question">{strings.q4}</p>
                                <p className="faq-answer">{strings.a4}</p>
                                <p className="faq-question">{strings.q5}</p>
                                <p className="faq-answer">{strings.a5}</p>                          
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
    