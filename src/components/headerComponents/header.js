import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { logout } from '../helpers/auth';
// import Foundation from 'react-foundation';

const ButtonToNavigate = ({ title, history }) => (
    <button className="button" onClick={() => history.push('/login')}>Login</button>
  );

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
                        <Route path="/" render={(props) => <ButtonToNavigate {...props}/>} />
                    </span>}
                </li>
            </ul>
        </nav>

      </header>
    );
  }
}