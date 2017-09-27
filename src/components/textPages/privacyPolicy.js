import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en:{
      returnHome: 'Back to Home',
      pageTitle: 'Privacy Policy'
    },
    ch: {
      returnHome: '返回主頁',
      pageTitle: '私隱條款'
    }
});

const ButtonToRegionList = ({ title, history }) => (
    <Button bsStyle="" className="button" onClick={() => history.push('/')}>{strings.returnHome}</Button>
  );

export default class PrivacyPolicy extends Component {

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
                            <h2><span className="text-page-title">{strings.pageTitle}</span></h2>
                            <Col sm={1}></Col>
                            <Col sm={10}>
                            <div className="text-page-text">
                                <p className="font-italic bold">Last Updated: September 26, 2017</p>
                                <p className="font-italic bold">如果您需要中文的私隱條款，請聯絡客戶服務熱線或客戶服務電郵 (please contact support via email or hotline if you would like to request our privacy terms in another language)</p>
                                <p>This Privacy Policy describes how information about you is collected, used and disclosed by MayDaisy Co. and our subsidiaries and other affiliates (collectively, “MayDaisy,” “we,” “us” or “our”) when you access or use the websites, mobile applications or blogs provided by us (collectively, the “Sites”) or otherwise interact with us.</p>
                                <p>MayDaisy reserves the right to change or modify this Privacy Policy at any time and in our sole discretion. If we make changes to this Privacy Policy, we will provide notice of such changes, such as by sending an email notification, providing notice through the Sites or updating the “Last Updated” date at the beginning of this Privacy Policy. We encourage you to review this Privacy Policy whenever you use or access the Sites or otherwise interact with us to stay informed about our information practices and the ways you can help protect your privacy.</p>
                                <p><strong>Collection of Information</strong></p>
                                <p>Information You Provide to Us</p>
                                <p>We collect information you provide directly to us. For example, we collect information when you register for a MayDaisy account, sign up for a subscription, participate in any interactive features of the Sites, subscribe to a newsletter or email list, participate in a survey, contest, promotion or event, order or purchase (either for yourself or for another person) products made available through the Sites (collectively, the “Products”), apply for a job, communicate with us via third party social media sites, request customer support or otherwise communicate with us.</p>
                                <p>The types of information we may collect from you include:</p>
                                <ol>
                                    <li>Account Information, such as your name, email address, password, postal address, phone number, subscription, delivery and dietary preferences and any other information you choose to provide;</li>
                                    <li>Transaction Information, such as information about the Products you purchase, shipping and delivery information and information related to returns, refunds and cancellations. We may also collect and store limited payment information from you, such as payment card type and expiration date and the last four digits of your payment card number; however, we do not collect or store full payment card numbers and all transactions are processed by our third party payment processor.</li>
                                    <li>Information About Others, such as the names and email addresses of gift recipients when you purchase gifts through the Sites or invite friends or family to try the Sites or Products.</li>
                                    <li>Other Information You Choose to Provide, such as when you participate in a survey, contest, promotion or interactive area of the Sites or when you request technical or customer support.</li>
                                </ol>
                                <p>Information We Collect Automatically</p>
                                <p>When you access or use the Sites, the types of information we may automatically collect about you include:</p>
                                <ol>
                                    <li>Log Information: When you visit the Sites, our servers automatically record certain log file information, such as your Internet Protocol (“IP”) address, operating system, browser type and language, referring URLs, access times, pages viewed, links clicked and other information about your activities on the Sites.</li>
                                    <li>Mobile Device Information: We collect information about the mobile device you use to access or use the Sites, including the hardware model, operating system and version, unique device identifiers, mobile network information and information about your use of our mobile applications. With your consent, we may also collect information about the location of your device and access and collect information from certain native applications on your device (such as your device’s camera, photo album and phonebook applications) to facilitate your use of certain features of the Sites. For more information about how you can control the collection of location information and/or our access to other applications on your device, please see “Your Choices” below.</li>
                                    <li>Information Collected by Cookies and Other Tracking Technologies: We and our service providers use various tracking technologies, including cookies and web beacons, to collect information about you when you interact with our Sites, including information about your browsing and purchasing behavior. Cookies are small data files stored on your hard drive or in device memory that help us improve the Sites and your experience, see which areas and features of the Sites are popular, and count visits. Web beacons are electronic images that may be used in the Sites or emails and help deliver cookies, count visits and understand usage and campaign effectiveness. For more information about cookies, and how to disable them, please see “Your Choices” below.</li>
                                </ol>
                                <p>Information We Collect From Other Sources</p>
                                <p>We may also obtain information about you from other sources and combine that with information we collect directly. For example, we may collect information about you when you post content to our pages or feeds on third party social media sites, or if you use credentials (e.g., username and password) from a third party site to create or log into your MayDaisy account.</p>
                                <p><strong>Use of Information</strong></p>
                                <p>We may use information about you for various purposes, including to:</p>
                                <ol>
                                    <li>Provide, maintain and improve the Sites and Products;</li>
                                    <li>Manage your account and send you related information, including confirmations, updates, technical notices, security alerts and support and administrative messages;</li>
                                    <li>Respond to your comments, questions and requests and provide customer service;</li>
                                    <li>Communicate with you about the Sites, Products, recipes, services, offers, surveys, events and other news and information we think may be of interest to you;</li>
                                    <li>Monitor and analyze trends, usage and activities in connection with the Sites;</li>
                                    <li>Detect, investigate and prevent fraudulent transactions and other illegal activities and protect the rights and property of MayDaisy and others;</li>
                                    <li>Personalize and improve the Sites and provide advertisements, content and features that match your profile or interests;</li>
                                    <li>Facilitate contests, sweepstakes and promotions and process and deliver entries and rewards;</li>
                                    <li>Link or combine with information we get from others to help understand your needs and provide you with a better experience; and</li>
                                    <li>Carry out any other purpose for which the information was collected.</li>
                                </ol>
                                <p>MayDaisy is based in Hong Kong, and the information we collect is governed by Hong Kong law. By accessing or using the Sites or otherwise providing information to us, you consent to the processing and transfer of information in and to Hong Kong and other countries.</p>
                                <p><strong>Sharing of Information</strong></p>
                                <p>We may share information about you as follows or as otherwise described in this Privacy Policy:</p>
                                <ol>
                                    <li>With vendors, consultants and other service providers who need access to such information to carry out work or perform services on our behalf;</li>
                                    <li>We may make our postal address list available to certain third parties we believe may offer products or services of interest to you;</li>
                                    <li>When you participate in the interactive areas of the Sites or interact with us on third party social media sites, certain information that you provide may be displayed publicly, such as your name, photos and other information you choose to provide;</li>
                                    <li>In response to a request for information if we believe disclosure is in accordance with, or required by, any applicable law, rule, regulation or legal process;</li>
                                    <li>If we believe your actions are inconsistent with our Terms of Services or other policies, or to protect the rights, property or safety of MayDaisy or others;</li>
                                    <li>In connection with, or during negotiations of, any merger, acquisition, sale of assets or any business, other change of control transaction or financing;</li>
                                    <li>Between and among MayDaisy and any current or future parent, subsidiary and/or affiliated company; and</li>
                                    <li>With your consent or at your direction.</li>
                                </ol>
                                <p>We also may share aggregated or de-identified information, which cannot reasonably be used to identify you.</p>
                                <p>Social Sharing Features</p>
                                <p>The Sites may offer social sharing features and other integrated tools, such as the Facebook, Twitter and Pinterest buttons (e.g., “Like,” “Tweet” and “Pin It”), which let you share actions you take on the Sites with other media. Your use of such features enables the sharing of information with your friends or the public, depending on the settings you establish with the entity that provides the social sharing feature. For more information about the purpose and scope of data collection and processing in connection with social sharing features, please visit the privacy policies of the entities that provide these features.</p>
                                <p>Advertising and Analytics Services Provided by Others</p>
                                <p>Interest-Based Ads</p>
                                <p>We may allow others to serve advertisements on our behalf across the Internet and to provide analytics services. These entities may use cookies, web beacons and other technologies to collect information about your use of the Sites and other websites, including your IP address, web browser, pages viewed, time spent on pages, links clicked and conversion information. This information may be used by us and others to, among other things, analyze and track data, determine the popularity of certain content, deliver advertising and content targeted to your interests on the Sites and other websites and better understand your online activity.</p>
                                <p>Customized Ad Campaigns</p>
                                <p>We may also work with third party social media sites, such as Facebook, to serve ads to you as part of a customized campaign, unless you notify us that you prefer not to have information about you used in this way. For more information about how you can opt out of customized campaigns, please see “Your Choices” below.</p>
                                <p>Security</p>
                                <p>MayDaisy takes reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction. Please understand, however, that no security system is impenetrable. We cannot guarantee the security of our databases, nor can we guarantee that the information you supply will not be intercepted while being transmitted to or from us over the Internet. In particular, email sent to or from the Sites may not be secure, and you should therefore take special care in deciding what information you send to us via email.</p>
                                <p><strong>Your Choices</strong></p>
                                <p>Account Information</p>
                                <p>You may update, correct or modify information about you at any time by logging into your online account or by emailing us. If you wish to deactivate your account, please contact our support hotline or our support email, but note we may continue to store information about you as required by law or for legitimate business purposes. Updated details about our contact information is available under the “Support” section of our website at <a href="https://maydaisy.com">maydaisy.com</a>.</p>
                                <p>Location Information</p>
                                <p>With your consent, we may collect information about your actual location when you use our mobile applications. You may stop the collection of this information at any time by changing the settings on your mobile device, but note that some features of our mobile applications may no longer function if you do so.</p>
                                <p>Native Applications on Mobile Device</p>
                                <p>Some features of our mobile applications may require access to certain native applications on your mobile device, such as the camera and photo storage applications (e.g., to take and upload photos) and the phonebook application (e.g., to send invitations to your contacts to try the Sites or Products). If you decide to use these features, we will ask you for your consent prior to accessing the applications and collecting information. Note that you can revoke your consent at any time by changing the settings on your device.</p>
                                <p>Cookies</p>
                                <p>Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove or reject browser cookies. Please note that if you choose to remove or reject cookies, this could affect the availability and functionality of the Sites.</p>
                                <p>Customized Campaigns</p>
                                <p>You may opt out of receiving our ads as part of a customized campaign conducted on third party social media sites, such as Facebook, by emailing us. Updated details about our contact information is available under the “Support” section of our website at <a href="https://www.maydaisy.com">maydaisy.com</a>.</p>
                                <p>Promotional Communications</p>
                                <p>You may opt out of receiving promotional communications from us by following the instructions in those communications or by emailing us. If you opt out, we may still send you non-promotional communications, such as those about your account or our ongoing business relations. Updated details about our contact information is available under the “Support” section of our website at <a href="https://maydaisy.com">maydaisy.com</a>.</p>
                                <p>Push Notifications</p>
                                <p>With your consent, we may send promotional and non-promotional push notifications or alerts to your mobile device. You can deactivate these messages at any time by changing the notification settings on your mobile device or within our mobile applications.</p>
                                <p><strong>Contact Us</strong></p>
                                <p>If you have any questions about this Privacy Policy, please contact us at our support hotline or by emailing us. Updated details about our contact information is available under the “Support” section of our website at <a href="https://www.maydaisy.com">maydaisy.com</a>.</p>                       
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
    