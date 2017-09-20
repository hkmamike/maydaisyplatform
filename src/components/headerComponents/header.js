import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { logout } from '../helpers/auth';
import { Button } from 'react-bootstrap';

const ButtonToLogin = ({ title, history }) => (
    <Button bsStyle="" className="button" onClick={() => history.push('/login')}>Login</Button>
);

const ButtonToAccount = ({ title, history }) => (
    <Button bsStyle="" className="button" onClick={() => history.push('/subscriptions')}>My Account</Button>
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
                    <li>
                        {this.props.authed?
                        <span>
                            <Route path="/" render={(props) => <ButtonToAccount {...props}/>} />
                            <Button bsStyle="" onClick={() => {logout()}} className="button">Logout</Button>
                        </span>
                        :
                        <span>
                            <Route path="/" render={(props) => <ButtonToLogin {...props}/>} />
                        </span>}
                    </li>
                </ul>
            </nav>

        </header>
        )
    }
}