import React, { Component } from 'react';


class Footer extends Component {
 render() {
    return (
      <footer>

        <div className="bar-pink">
          <div className="row">
            <div className="large-12 columns">
                JOIN THE ONEBLOOM MOVEMENT <u><i className="fi fi-torsos-all"></i></u>
            </div>
          </div>
        </div>

        <div className="footer-contact">
          <div className="footer-contact-box">
            <div className="row">
              <div className="large-12 columns">
                <div className="display-table">
                  <div className="align">
                    <h4> Support Contact </h4>
                    email: mikebrianleung@gmail.com <br/>
                    tel: 852-9346-8427
                  </div>
                </div>
              </div>
            </div>
          </div>    
        </div>

        <div className="footer-end">
          <div className="row">
            <div className="large-12 columns">
                <div className="footer-social">
                    <i className="fi fi-social-facebook"></i>
                    <i className="fi fi-social-twitter"></i>
                    <i className="fi fi-social-instagram"></i>
                    <i className="fi fi-social-linkedin"></i>
                </div>
                &copy; <span className="footer-company-name">One Bloom Co.</span> 2017.
            </div>
          </div>
        </div>
          
      </footer>
    );
  }
}

export default Footer;
