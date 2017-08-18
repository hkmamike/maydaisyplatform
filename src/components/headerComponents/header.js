import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
 render() {
    return (
      <header>
      
        <div className="logo">
            LOGO
        </div>

        <nav>
            <ul>
                <li className="first">
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/packages">Packages</Link>
                </li>
                <li>
                    <Link to="/">Contact</Link>
                </li>
                <li className="last">
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </nav>

      </header>
    );
  }
}

export default Header;
