import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en:{
        returnHome: 'Back to Home',
        pageTitle: 'Frequently Asked Questions',
        lastUpdated: 'Last Updated: Dec 12, 2017',
        subtitle: "These are some of the frequently asked questions about MayDaisy and our services.",
        q1: 'What is the difference between flower shops and independent artists?',
        a1: "The biggest difference is their business hours. Typically, flower shops are open for business everyday and some even offer sameday delivery. On the other hand, independent artists only take orders on restricted days and usually have longer delivery lead time.",
        q2: 'You only accept credit card, is it safe?',
        a2: "MayDaisy's payment processing partner is Stripe. Stripe is the world's top payment processing technology company that is trusted by thousands of public companies. We do not save your credit card details on our server.",
        q3: 'Where can my customers write reviews for me?',
        a3: "Only customers with verified purchases can write reviews. Once an order is placed, the customer can write a review for you in their 'Order History' tab after logging in.",
        q4: "Is same day delivery possible?",
        a4: "Some flower shops cater for same day delivery. Across the MayDaisy platform, the standard cut off time for sameday delivery is 1 p.m. HKT",
    },
    ch: {
        returnHome: '返回主頁',
        pageTitle: '常見問題和答案',
        lastUpdated: '最後更新: 2017年12月12日',
        subtitle: "這裡有一些常見的問題和答案，希望幫到您。",
        q1: '五月菊平台上的花店和獨立花藝師有什麼不同？',
        a1: '主要的區別在於辦公時間。五月菊平台上的花店一般是每天營運的，有一些更提供當天送貨服務。獨立花藝師一般只在特定的日子接單，以且需要提前預訂。',
        q2: '五月菊只接受信用卡支付，安全嗎？',
        a2: '五月菊的支付處理合作夥伴為STRIPE，STRIEP是全球領先的支付平台，深得上千上市公司的信賴。五月菊的伺服器不會儲存您的信用卡詳情。',
        q3: '我的客人怎樣為我的花店寫評論？',
        a3: "只有曾經從您的花店購買設計的客人可以選寫評論。當客人下單之後，他（她）可以在'購買記錄'一頁中選寫評論。",
        q4: '您們提供當天送貨服務嗎？',
        a4: '我們有部份花店提供當天送貨服務。這些花店的當天送貨最後接單時間為下午1時正。',
    }
});

const ButtonToRegionList = ({ title, history }) => (
    <Button bsStyle="" className="button" onClick={() => history.push('/')}>{strings.returnHome}</Button>
  );

export default class FAQ extends Component {

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