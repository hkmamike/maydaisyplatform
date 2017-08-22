import React, { Component } from 'react';

export default class Footer extends Component {
 render() {
    return (
      <footer>

        <div className="bar-pink">
          JOIN THE ONEBLOOM MOVEMENT NOW <u><i className="fi fi-torsos-all"></i></u>
        </div>

        <div className="footer-contact">
          <div className="footer-contact-box">
            <div className="display-table">
              <div className="align">
                <h4> Support Contact </h4>
                email<strong>:</strong> mikebrianleung@gmail.com <br/>
                whatsapp & tel<strong>:</strong> 852-9346-8427
              </div>
            </div>
          </div>    
        </div>

        <div className="footer-end">
          <div className="footer-social">
              <i className="fi fi-social-facebook"></i>
              <i className="fi fi-social-twitter"></i>
              <i className="fi fi-social-instagram"></i>
              <i className="fi fi-social-linkedin"></i>
          </div>
          &copy; <span className="footer-company-name">One Bloom Co.</span> 2017.
        </div>
          
      </footer>
    )
  }
}