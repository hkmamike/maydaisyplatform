import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en:{
        returnHome: 'Back to Home',
        pageTitle: 'Frequently Asked Questions',
        lastUpdated: 'Last Updated: September 26, 2017',
        subtitle: "These are some of the frequently asked questions about MayDaisy and our services.",
        q1: 'What if I (or the recipient) am not home at the time of delivery?',
        a1: "For home locations, customers provide us a vase to hold the flower arrangement. If you (or the recipient) will not be home during delivery, please leave your vase at a safe location in front of your door (please don't use your favorite vase as accidents can happen in public space).",
        q2: 'Can I choose what flowers to send?',
        a2: "MayDaisy weekly arrangements are designed with seasonal flowers by our florists' choice. By giving florists the creative free rein, we unleash their potential and get a nice surprise in return. We do, however, provide an option for customers to request arrangements made with only rose.",
        q3: 'I just signed up! When and how frequently do I pay?',
        a3: "We charge our subscribers on Wednesday everyweek at 11:59 p.m. HKT for the following week's delivery. This continues until you unsubscribe from the plan.",
        q4: "Why can't I specify which day to receive flowers?",
        a4: "Eventually, we aim to provide more delivery day options when we achieve a bigger scale. For now, restricting the delivery day helps us keep the delivering cost low so more people can afford the joy of flowers.",
        q5: "How do I unsubscribe?",
        a5: "To unsubscribe, you need to be logged into your account. Under 'My Subscriptions' > 'Details & Update', there is a 'Unsubscribe' button in red colour. Please note that if your cancelation request is received after 11:59 pm HKT on Wednesday, your card has already been charged this week and one more delivery will be made in the following week.",
    },
    ch: {
        returnHome: '返回主頁',
        pageTitle: '常見問題和答案',
        lastUpdated: '最後更新: 2017年9月27日',
        subtitle: "這裡有一些常見的問題和答案，希望幫到您。",
        q1: '如果我（或收花人）在配送日不在家怎麼辦?',
        a1: "住家的配送是以到場插花的形式服務的，收花人需要準備一個花瓶。如果您（或收花人）配送當天不在家的話，把花瓶放在門前一個安全的地方就可以了。為了避免意外發生，請不要用您最愛的花瓶接收配送噢!",
        q2: '我可以選擇花的種類嗎？',
        a2: "五月菊每週的花卉由花匠選用時令花材設計。我們給與花匠創意空間，釋放他們的創意潛能，也同時達到製造驚喜的效果。然而，五月菊提供一個特別選擇給客人: 客人可以選擇只用玫瑰花為主花以做的花卉。",
        q3: '我訂購了！付款的時間和頻率是怎樣?',
        a3: "我們會在每個星期三晚上 11:59 p.m. HKT 向客人收取下一配送週的費用，直到您取消訂單。",
        q4: "為什麼我不能選擇配送日?",
        a4: "當我們的服務規模成長起來的時候，將會為客人提供更多的配送日選擇。現在的配送日限制有助我們控制成本降低價格，令更多的客人可以欣賞到鮮花的美。",
        q5: "怎樣取消訂單?",
        a5: "在登入之後，'所有訂購' 內的 '詳情＆訂購' 中有一個紅色的 '取消訂購' 按鍵。請注意，五月菊服務的付款時間為配送前一週的星期三晚上 11:59 p.m. 。如果您本週已經付款，我們下一週會為您提供最後一次服務。",
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