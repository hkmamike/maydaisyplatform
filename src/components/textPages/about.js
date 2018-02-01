import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import LocalizedStrings from 'react-localization';
import { Helmet } from 'react-helmet';

let strings = new LocalizedStrings({
    en:{
      returnHome: 'Back to Home',
      pageTitle: 'About MayDaisy',
      lastUpdated: 'Last Updated: December 12, 2017',
      q1: 'What is MayDaisy? :',
      a1: "MayDaisy is a marketplace and community to connect customers with great florists in their city. By bringing the best florists together in one place, we can focus resources on your flowers and spend less on marketing. MayDaisy also provides a channel for established and emerging independent floral artists to reach a broader audience. Independent artists do not operate a flower shop full time, but they offer dinstinctive styles that cannot be found anywhere else!",
    },
    zh: {
      returnHome: '返回主頁',
      pageTitle: '關於五月菊',
      lastUpdated: '最後更新: 2017年12月12日',
      q1: '五月菊是什麼? :',
      a1: "五月菊是由花藝師們建立的一站式鮮花市集和花藝社群，我們的目標是為客人找到最好最適合他們的花卉設計。鮮花市集的模式令我們可以減低在市場推廣上花費的時間和資源，更集中的為您創造花藝。",
    }
});

const ButtonToRegionList = ({ title, history, languageChanged }) => (
    <Button bsStyle="" className="button" onClick={() => history.push(`/${languageChanged}/`)}>{strings.returnHome}</Button>
  );

export default class About extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    componentWillReceiveProps (nextProps) {
        console.log('will receive props - next language :', nextProps.languageChanged);
        if (nextProps.languageChanged==='zh') {
            strings.setLanguage('zh');
        } else if (nextProps.languageChanged==='en') {
            strings.setLanguage('en');
        }
    }

    componentWillMount() {
        console.log('about - language :', this.props.languageChanged);
        strings.setLanguage(this.props.languageChanged);
    }

    render() {

        return (
            <div className="no-padding text-page-container">
                <Helmet>
                    <title>About</title>
                    <meta name="robots" content="Noindex"/>
                </Helmet>

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
                                    <Route path="/" render={(props) => <ButtonToRegionList {...props} languageChanged={this.props.languageChanged}/>} />
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
    