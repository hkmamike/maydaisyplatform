import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en:{
      returnHome: 'Back to Home',
      pageTitle: 'About MayDaisy',
      lastUpdated: 'Last Updated: September 26, 2017',
      q1: 'Our Mission:',
      a1: "Flowers are gifts from nature. MayDaisy strives to make enjoying flowers simple and affordable. We hope to bring flowers back to people's life to brighten their days and to help them express love.",
      q2: 'Our Style:',
      a2: "We focus on small arrangements. We believe a 6 stems bouquet can do just as much as 60. MayDaisy florists tend to use a minimal wrapping style that brings out the natural elegance of blooms.",
    },
    ch: {
      returnHome: '返回主頁',
      pageTitle: '關於五月菊',
      lastUpdated: '最後更新: 2017年9月27日',
      q1: '我們的使命:',
      a1: "花是大自然給我們的禮物。五月菊努力令享受花變成一件簡單及容易負擔的事。我們希望可以將花的快樂帶回大家的生活中，幫助大家表達愛。",
      q2: '我們的風格',
      a2: "我們主打小型花卉，我們相信一小束花帶來的滿足和表達的感情跟99支玫瑰一樣多。五月菊的花匠一般傾向用簡單的綁紮方式去特顯鮮花的自然美。",
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
                                <p className="font-italic bold">{strings.lastUpdated}</p>
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
    