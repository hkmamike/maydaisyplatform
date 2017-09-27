import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en:{
      returnHome: 'Back to Home',
      pageTitle: 'Terms of Services'
    },
    ch: {
      returnHome: '返回主頁',
      pageTitle: '服務條款'
    }
});

const ButtonToRegionList = ({ title, history }) => (
    <Button bsStyle="" className="button" onClick={() => history.push('/')}>{strings.returnHome}</Button>
  );

export default class TermsOfServices extends Component {

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
                                <p className="font-italic bold">如果您需要中文的服務條款，請聯絡客戶服務熱線或客戶服務電郵 (please contact support via email or hotline if you would like to request our terms of services in another language)</p>
                       
                                <h3>1. DESCRIPTION AND USE OF THE PLATFORM</h3>
                                <p>MayDaisy is a new concept in the flower and gifting industry, and is built around free rein for designers and regular delivery.  Through our Platform, we offer our unique once-a-week subscription services, where we deliver flower arrangements (or any other products).  By letting us select, design, prepare, deliver flowers  for you, we can bring you fresher, more affordable, and higher-quality flowers than you can get on your own at the local flower store.</p>
                                <p>We provide Visitors and Subscribers with access to our Website and Platform as described in this Agreement.</p>
                                <p>Visitors.  Visitors, as the term implies, are people who do not register with us, but want to view all publicly-accessible Content (as defined in Section 7).</p>
                                <p>Subscribers.  Registration and login is required for all Subscribers.  In addition to viewing all publicly-accessible Content, Subscribers can use our Platform to: (i) select the type of plan you want, and begin receiving our flower arrangements; (ii) provide us feedback in our online forum and upload content, including text, videos, and photos (collectively,“ User Content”); (iii) sign up for alerts, other notifications, and our newsletter; and (iv) sign up for our contests, promotions, and sweepstakes. We are under no obligation to accept any individual as a Subscriber, and may accept or reject any registration in our sole and complete discretion.</p>
                                
                                <h3>2. COMMUNITY GUIDELINES</h3>
                                <p>MayDaisy’s community, like any community, functions best when its people follow a few simple rules. By accessing and/or using the Website or the Platform, you hereby agree to comply with these community rules and that:</p>
                                <ul>
                                    <li>You must be the age of majority in their jurisdiction and capable of entering into binding contracts;</li>
                                    <li>You will not use the Website or the Platform for any unlawful purpose;</li>
                                    <li>You may not use the Services to engage in any commercial activities, including, without limitation, raising money; advertising or promoting a product, service, or company; or engaging in any pyramid or other multi-tiered marketing scheme;</li>
                                    <li>You will not upload, post, e-mail, transmit, or otherwise make available any User Content that: is false, deceptive, misleading, deceitful, or misinformative; infringes any copyright, trademark, trade secret, right of publicity, or other proprietary rights of any person or entity;is threatening, tortious, defamatory, libelous, indecent, obscene, pornographic, invasive of another’s privacy, or promotes violence; or discloses any sensitive information about another person, including that person’s e-mail address, postal address, phone number, credit card information, or any similar information;</li>
                                    <li>You will not access or use the Website or the Platform to collect any market research for a competing business;</li>
                                    <li>You will not impersonate any person or entity or falsely state or otherwise misrepresent your affiliation with a person or entity; You must be the age of majority in their jurisdiction and capable of entering into binding contracts;</li>
                                    <li>You will not take any action that imposes or may impose (in our sole discretion) an unreasonable or disproportionately large load on our technical infrastructure;</li>
                                    <li>You will not use automated means, including spiders, robots, crawlers, data mining tools, or the like to download or scrape data from the Website or Platform, except for Internet search engines (e.g., Google) and non-commercial public archives (e.g., archive.org);</li>
                                    <li>You will not cover, obscure, block, or in any way interfere with any advertisements and/or safety features (e.g., report abuse button) on the Website or the Platform; and</li>
                                    <li>You will not interfere with or attempt to interrupt the proper operation of the Website or the Platform through the use of any virus, device, information collection or transmission mechanism, software or routine, or access or attempt to gain access to any data, files, or passwords through hacking, password or data mining, or any other means.</li>
                                    <li>Please let us know about inappropriate content. If you find something that violates our community guidelines, let us know, and we’ll review it. We reserve the right, in our sole and absolute discretion, to deny you access to the Platform, or any portion of the Services, without notice, and remove any User Content that does not adhere to these guidelines.</li>                               
                                </ul>
                                
                                <h3>3. REGISTRATION FOR SUBSCRIBERS</h3>
                                <p>During the registration process for Subscribers, we will ask you to create an account, which includes a sign-in email (“Sign-In Email”), a password (“Password”), and perhaps certain additional information that will assist in authenticating your identity when you log-in in the future (“Unique Identifiers”).  When creating your account, you must provide true, accurate, current, and complete information.  Each Sign-In Email and corresponding Password can be used by only one Subscriber.  You are solely responsible for the confidentiality and use of your Sign-In Email, Password, and Unique Identifiers, as well as for any use, misuse, or communications entered through the Platform using one or more of them.  You will promptly inform us of any need to deactivate a Password or Sign-In Email, or change any Unique Identifier.  We reserve the right to delete or change your Password, Sign-In Email, or Unique Identifier at any time and for any reason.  MayDaisy will not be liable for any loss or damage caused by any unauthorized use of your account.</p>
                                
                                <h3>4. PAYMENT</h3>
                                <p>You agree that MayDaisy may immediately authorize your credit card (or other approved facility) for payment for any charges incurred under your account. </p>
                                <p>You are fully responsible for all activities that occur under your account, and you agree to be personally liable for all charges incurred under your account.  Your liability for such charges shall continue after termination of this Agreement.</p>
                                <p>If you have a question about any MayDaisy charge on your credit card statement, please follow the instructions found on the Website to contact customer service.</p>
                                
                                <h3>5. ORDERING AND DELIVERY</h3>                                
                                <p>MayDaisy only delivers to some specific regions within Hong Kong. If we currently do not deliver to your area, but you would like us to, please let us know.  We are expanding the reach of our Services, so we recommend that you create an account,  we may notify you of any update.</p>
                                <p>When you sign up to become a Subscriber, your subscription will automatically renew until you cancel it.  You can cancel your subscriptions at any time.  Please visit the FAQ section of the Website on instructions on how to do so.  Please be aware, however, that because we plan, purchase, and prepare our flowers (and other products) in advance, cancellation request requires advanced notice to MayDaisy, as set forth more specifically on the Website.  If you miss these deadlines, you will be responsible for paying the applicable amount, and the cancellation will take effect the next week.</p>
                                <p>MayDaisy’s florists deliver your flowers (and other products), but we may uses reliable third-party delivery companies to assist delivery.</p>
                                <p>For home locations, customers receive vase arrangements and are responsible to provide a vase to our florists in an area where our florists can access. If you are not home during the day when the delivery arrives, please leave your vase at a safe location in front of your door, our florists will leave the arrangement in your vase and include any message card we were instructed to write. The ideal vase dimension varies by subscription plan and it can be found on our website. MayDaisy does not take any responsibility if a vase is damaged.</p>
                                <p>For office locations, customers receive wrapped arrangements and do not need to provide a vase to our florists. If the recipient is not available to receive the delivery when our florist arrives, we will leave the flowers at the office reception area and include any message card we were instructed to write.</p>
                                <p>For cemetery locations, we provide vase arrangements. Subscribers are responsible to provide a vase to our florists in an area where our florists can access. The ideal vase dimension varies by subscription plan and it can be found on our website. MayDaisy does not take any responsibility if a vase is damaged.</p>
                                <p>For home and office locations, if your recipient, your recipient’s doorman, your recipient’s neighbor, or your recipient’s alternate receiver is not present at the time of delivery, we will use commercially reasonable efforts to contact you and your recipient and reschedule the delivery on the same day. Even if a rescheduled delivery is unsuccessful, the order will be canceled and you will still be charged for the delivery. </p>
                                <p>Anyone at the delivery address who receives the delivery is conclusively presumed to be authorized to receive the delivery.  In cases in which you have designated an alternative receiver, such person shall accept the flowers under all of the same terms and conditions that would apply had you accepted the delivery yourself.</p>
                                <p>In the case of inclement weather, we will deliver your order as soon as reasonably possible when the conditions permit.  If your designated delivery location is inaccessible, rendering us unable to make the delivery, we will contact you to determine the best alternate location and/or date for the next delivery, but you will still be charged for the unsuccessful delivery.</p>
                                
                                <h3>6. LIMITED WARRANTY AND REFUND POLICY</h3>  
                                <p>All of our flowers are backed by a 100% customer satisfaction guarantee.  If you are dissatisfied with a flower arrangement for any reason, please contact us via the Services within seven (7) days after delivery, and we’ll either replace the flower arrangement at our expense or credit you the purchase price for that flower arrangement.</p>

                                <h3>7. INTELLECTUAL PROPERTY</h3>  
                                <p>The Platform contains material, such as software, text, graphics, images, sound recordings, audiovisual works, and other material provided by or on behalf of MayDaisy (collectively referred to as the “Content”).  The Content may be owned by us or other third parties.  The Content is protected under both Hong Kong and foreign laws.  Unauthorized use of the Content may violate copyright, trademark, and other laws.  You have no rights in or to the Content, other than your own User Content, and you will not use the Content except as permitted under this Agreement.  No other use is permitted without prior written consent from us.  You must retain all copyright and other proprietary notices contained in the original Content on any copy you make of the Content.  You may not sell, transfer, assign, license, sublicense, or modify the Content or reproduce, display, publicly perform, make a derivative version of, distribute, or otherwise use the Content in any way for any public or commercial purpose.</p>
                                <p>If you violate any part of this Agreement, your permission to access and/or use the Content, the Platform, and the Services automatically terminates, and you must immediately destroy any copies you have made of the Content.</p>
                                <p>The trademarks, service marks, and logos of MayDaisy (the “MayDaisy Trademarks”) used and displayed on the Platform are registered and unregistered trademarks or service marks of MayDaisy.  Other company, product, and service names located on the Platform may be trademarks or service marks owned by others (the “Third-Party Trademarks”, and, collectively with MayDaisy Trademarks, the “Trademarks”).  Nothing in this Agreement should be construed as granting, by implication, estoppel, or otherwise, any license or right to use the Trademarks, without our prior written permission specific for each such use.  Use of the Trademarks as part of a link to or from any site is prohibited unless establishment of such a link is approved in advance by us in writing.  All goodwill generated from the use of MayDaisy Trademarks inures to our benefit.</p>
                                <p>Elements of the Website and the Platform are protected by trade dress, trademark, unfair competition, and national laws and may not be copied or imitated, in whole or in part, by any means, including but not limited to the use of framing or mirrors.</p>
                              
                                <h3>8. COMMUNICATIONS TO US; USER CONTENT</h3> 
                                <p>Although we encourage you to e-mail us, we do not want you to e-mail us any content that contains confidential information. With respect to all e-mails you send to us, including but not limited to, feedback, questions, comments, suggestions, and the like, we shall be free to use any ideas, concepts, know-how, or techniques contained in your communications for any purpose whatsoever, including, but not limited to, the development, production and marketing of products and services that incorporate such information, without compensation to you.</p>
                                <p>As noted above, the Services provide Subscribers the ability to post and upload User Content to the Platform. You expressly acknowledge and agree that once you submit your User Content, unless you designate it as “private,” it will be accessible by others, and that there is no confidentiality or privacy with respect to such User Content, including, without limitation, any personally identifying information that you may make publicly available. YOU, AND NOT MayDaisy, ARE ENTIRELY RESPONSIBLE FOR ALL THE USER CONTENT THAT YOU UPLOAD, POST, E-MAIL, OR OTHERWISE TRANSMIT VIA THE PLATFORM.</p>
                                <p>You retain all copyrights and other intellectual property rights in and to your own User Content. You do, however, hereby irrevocably grant us and our sublicensees and assignees a non-exclusive, transferable, perpetual, royalty-free, freely sublicensable (through multiple tiers) license to modify, compile, combine with other content, copy, record, synchronize, transmit, translate, format, distribute, publicly display, publicly perform, and otherwise use or exploit (including for profit) any and all of your User Content that you have not designated as “private,” your username, the picture associated with your username, and all intellectual property and moral rights therein throughout the universe, in each case, by or in any means, methods, media, or technology now known or hereafter devised. Without limiting the foregoing, you acknowledge and agree that uses of your User Content, username, and associated picture permitted by the foregoing rights and licenses may include the display of such User Content, username, and associated picture adjacent to advertising and other material or content, including for profit.</p>
                                <p>Ownership of and licenses to User Content submitted in connection with a particular contest shall be governed by the contest rules applicable to that contest. In connection with any such contest, if there is a conflict between those contest rules and these Terms of Use, the contest rules shall govern.</p>
                                <p>If you submit User Content to us, each such submission constitutes a representation and warranty to MayDaisy that such User Content is your original creation (or that you otherwise have the right to provide the User Content), that you have the rights necessary to grant the license to the User Content under this Section, and that it and its use by MayDaisy and its content partners as permitted by this Agreement does not and will not infringe or misappropriate the intellectual property, privacy, publicity, or moral rights of any person or contain any libelous, defamatory, or obscene material or content that violates our community guidelines set forth above.</p>
                                
                                <h3>9. WARRANTY DISCLAIMER AND LIMITATION OF LIABILITY</h3> 
                                <p>Other than as expressly set forth in section 6: (i) we make no warranties or representations about the platform, the services, the flowers, the content, the trademarks, the products on the platform, and all of the foregoing are provided on an “as is” and “as available” basis without any warranties of any kind; (ii) we disclaim all warranties, including, but not limited to, warranties of merchantability, non-infringement of third parties’ rights, and fitness for particular purpose and any warranties arising from course of dealing, course of performance, or usage of trade; and (iii) you agree that you use the platform and the services at your own risk.</p>
                                <p>In no event shall we be liable for any incidental and consequential damages, lost profits, or damages resulting from lost data or business interruption) resulting from your purchase of the flowers (and other products) or your use or inability to use the platform or the services, whether based on warranty, contract, tort (including negligence), or any other legal theory, even if we have been advised of the possibility of such damages. Some states do not allow exclusion of implied warranties or limitation of liability for incidental or consequential damages, so the above limitations or exclusions may not apply to you. In such cases, our liability shall be limited to the greatest extent permitted by law. In all cases, our maximum liability to you (and anyone claiming rights through you) shall be capped at the monies paid by you to MayDaisy in the one (1) month period preceding the date on which your claim arose.</p>
                                <p>MayDaisy has made every effort to display the flowers, the products, colors, and other things you see on the platform as accurately as possible. However, the final flower arrangements and products delivered may vary from the images viewed on the platform due to a number of factors that are not within our control, including, without limitation, system capabilities and constraints of your computer, manufacturing process issues, and the availability and variability of product and raw materials. Although we will exercise commercially reasonable efforts to help ensure that the flowers and products conform to your expectations, variations sometimes occur. All flower and product pricing, specifications, and offerings are subject to change without notice. The platform may contain information on flowers, services, and products that are not available in every location. A reference to a flower arrangement, service, or product on the platform does not imply that it is or will be available in your location. The platform may contain technical inaccuracies or typographical errors or omissions. We are not responsible for any such typographical, technical, or pricing errors.</p>
                                
                                <h3>10. EXTERNAL SITES</h3> 
                                <p>The Platform may contain links to third-party websites (“External Sites”). These links are provided solely as a convenience to you and not as an endorsement by us of the content on such External Sites. The content of such External Sites is developed and provided by others. You should contact the site administrator or webmaster for those External Sites if you have any concerns regarding such links or any content located on such External Sites. We are not responsible for the content of any linked External Sites and do not make any representations regarding the content or accuracy of materials on such External Sites. You should take precautions when downloading files from all websites to protect your computer from viruses and other destructive programs. If you decide to access linked External Sites, you do so at your own risk.</p>
                                
                                <h3>11. INDEMNIFICATION</h3> 
                                <p>You agree to defend, indemnify, and hold us and our officers, directors, employees, successors, licensees, and assigns harmless from and against any claims, actions, or demands, including, without limitation, reasonable legal and accounting fees, arising or resulting from your breach of this Agreement or your access to, use, or misuse of the Platform or the Services. We shall provide notice to you of any such claim, suit, or proceeding and shall assist you, at your expense, in defending any such claim, suit, or proceeding. We reserve the right to assume the exclusive defense and control of any matter that is subject to indemnification under this section. In such case, you agree to cooperate with any reasonable requests assisting our defense of such matter.</p>

                                <h3>12. COMPLIANCE WITH APPLICABLE LAWS</h3> 
                                <p>The Platform and the Services (and their servers) are based and operated in Hong Kong. We make no claims concerning whether the Content may be downloaded, viewed, or be appropriate for use outside of Hong Kong. If you access the Platform, the Services, or the Content from outside of Hong Kong, you do so at your own risk. Whether inside or outside of Hong Kong, you are solely responsible for ensuring compliance with the laws of your specific jurisdiction.</p>
                                
                                <h3>13. TERMINATION OF THE AGREEMENT</h3> 
                                <p>We reserve the right, in our sole discretion, to restrict, suspend, or terminate this Agreement and your access to all or any part of the Platform or the Services, at any time and for any reason without prior notice or liability. We reserve the right to change, suspend, or discontinue all or any part of the Platform or the Services at any time without prior notice or liability.</p>

                                <h3>14. DIGITAL COPYRIGHT</h3> 
                                <p>MayDaisy respects the intellectual property rights of others and attempts to comply with all relevant laws. We will review all claims of copyright infringement received and remove any Content deemed to have been posted or distributed in violation of any such laws.</p>
                                <p>If you believe that your work has been copied on the Platform in a way that constitutes copyright infringement, please provide our agent with notice in accordance with the requirements of the Act, including (i) a description of the copyrighted work that has been infringed and the specific location on the Platform where such work is located; (ii) a description of the location of the original or an authorized copy of the copyrighted work; (iii) your address, telephone number and e-mail address; (iv) a statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent or the law; (v) a  statement by you, made under penalty of perjury, that the information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner’s behalf; and (vi) an electronicor physical signature of the owner of the copyright or the person authorized to act on behalf of the owner of the copyright interest.</p>
                                
                                <h3>15. MISCELLANEOUS</h3> 
                                <p>This Agreement is governed by the laws of Hong Kong, without respect to its conflict of laws provisions. You expressly and irrevocably agree: (i) to submit to the exclusive personal jurisdiction of Hong Kong; and (ii) that the Platform and the Services shall be deemed passive that do not give rise to personal jurisdiction over MayDaisy, either specific or general, in jurisdictions other than Hong Kong. YOU AGREE THAT ANY CAUSE OF ACTION ARISING OUT OF OR RELATED TO THE FLOWERS, THE PLATFORM, OR THE SERVICES MUST BE COMMENCED BY YOU WITHIN ONE (1) YEAR AFTER THE CAUSE OF ACTION ACCRUES, OTHERWISE SUCH CAUSE OF ACTION IS PERMANENTLY BARRED. If any provision of this Agreement is found to be invalid by any court having competent jurisdiction or terminated in accordance with the Termination provision above, the invalidity or termination of such provision shall not affect the validity of the following provisions of this Agreement, which shall remain in full force and effect: “Payment,” “Intellectual Property,” “Communications to Us; User Content,” “Warranty Disclaimer and Limitation of Liability,” “Indemnification,” “Termination of the Agreement,” and “Miscellaneous.”</p>
                                <p>Our failure to act on or enforce any provision of the Agreement shall not be construed as a waiver of that provision or any other provision in this Agreement. No waiver shall be effective against us unless made in writing, and no such waiver shall be construed as a waiver in any other or subsequent instance. Except as expressly agreed by us and you in writing, this Agreement constitutes the entire Agreement between you and us with respect to the subject matter, and supersedes all previous or contemporaneous agreements, whether written or oral, between the parties with respect to the subject matter. The section headings are provided merely for convenience and shall not be given any legal import. This Agreement will inure to the benefit of our successors, assigns, licensees, and sublicensees.</p>

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
    