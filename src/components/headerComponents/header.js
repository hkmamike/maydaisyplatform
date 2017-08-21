import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../helpers/auth'

export default class Header extends Component {
 render() {
    return (
      <header>
      
        <div className="logo">
            <Link to="/">One Bloom</Link>
        </div>

        <nav>
            <ul>
                <li className="last">
                    {this.props.authed?
                    <button onClick={() => {logout()}} className="button radius">Logout</button>
                    :
                    <span>
                        <button className="custom-button-class"> <Link to="/login">Login / Signup</Link></button>
                    </span>}
                </li>
            </ul>
        </nav>

      </header>
    );
  }
}