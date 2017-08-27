import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { logout } from '../helpers/auth';
import { Button } from 'react-bootstrap';

const ButtonToNavigate = ({ title, history }) => (
    <Button bsStyle="" className="button" onClick={() => history.push('/login')}>Login</Button>
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
                        <Button bsStyle="" onClick={() => {logout()}} className="button">Logout</Button>
                        :
                        <span>
                            <Route path="/" render={(props) => <ButtonToNavigate {...props}/>} />
                        </span>}
                    </li>
                </ul>
            </nav>

        </header>
        )
    }
}