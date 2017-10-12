import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import LocalizedStrings from 'react-localization';
import { Link } from 'react-router-dom';

let strings = new LocalizedStrings({
  en:{
    company: 'Company',
    careers: 'Careers',
    about: 'About Us',
    support: 'Support',
    faq: 'FAQ',
    contactUs: 'Contact Us',
    terms: 'Terms',
    termsOfStervices: 'Terms of Services',
    privacyPolicy: 'Privacy Policy',
    companyName: 'MayDaisy Co.'
  },
  ch: {
    company: '公司',
    careers: '職位空缺',
    about: '關於我們',
    support: '客戶服務',
    faq: '常見問題',
    contactUs: '聯絡方法',
    terms: '條款',
    termsOfStervices: '服務條款',
    privacyPolicy: '私隱條款',
    companyName: '五月菊'
  }
});
export default class Footer extends Component {

  componentWillMount() {
    strings.setLanguage(this.props.languageChanged);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.languageChanged==='ch') {
        strings.setLanguage('ch');
    } else if (nextProps.languageChanged==='en') {
        strings.setLanguage('en');
    }
  }

  render() {
    return (
      <footer>

        <div className="footer-contact">
          <Grid>
            <Row className="show-grid">
              <Col xsHidden sm={4}>
                <div className="footer-title">{strings.company}</div>
                <ul className="foote-list">
                  <li><Link to="/about">{strings.about}</Link></li>
                </ul>
              </Col>
              <Col xs={6} sm={4}>
                <div className="footer-title">{strings.support}</div>
                <ul className="foote-list">
                  <li><Link to="/faq">{strings.faq}</Link></li>
                  <li><Link to="/contact">{strings.contactUs}</Link></li>
                </ul>
              </Col>
              <Col xs={6} sm={4}>
                <div className="footer-title">{strings.terms}</div>
                <ul className="foote-list">
                  <li><Link to="/terms">{strings.termsOfStervices}</Link></li>
                  <li><Link to="/privacy-policy">{strings.privacyPolicy}</Link></li>
                </ul>
              </Col>
            </Row>
          </Grid>
        </div>

        <div className="footer-end">
          <div className="footer-social">
              <a href="https://fb.me/maydaisyco" target="_blank"><i className="fa fa-facebook-official"></i></a>
              {/* <i className="fa fa-twitter"></i> */}
              <a href="https://www.instagram.com/maydaisyco/" target="_blank"><i className="fa fa-instagram"></i></a>
          </div>
          &copy; <span className="footer-company-name">{strings.companyName}</span> 2017.
        </div>
          
      </footer>
    )
  }
}