import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { logout } from '../helpers/auth';
import { Button } from 'react-bootstrap';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en:{
      companyTitle: "MayDaisy",
      languageButton: '中文',
      accountButton: "My Account",
      login: "Login",
      logout: "Logout"
    },
    ch: {
      companyTitle: "五月菊",
      languageButton: 'Eng',
      accountButton: "我的帳戶",
      login: "登入",
      logout: "登出"
    }
  });

const ButtonToLogin = ({ title, history }) => (
    <Button bsStyle="" className="button" onClick={() => history.push('/login')}>{strings.login}</Button>
);

const ButtonToAccount = ({ title, history }) => (
    <Button bsStyle="" className="button" onClick={() => history.push('/subscriptions')}>{strings.accountButton}</Button>
);

export default class Header extends Component {

    constructor() {
        super();
        this.handleLanguageToggle = this.handleLanguageToggle.bind(this);
      }

    handleLanguageToggle () {
        this.props.onLanguageToggle();
    }

    componentDidMount () {
        strings.setLanguage(this.props.language);
    }

    componentDidUpdate () {
        strings.setLanguage(this.props.language);
    }

    render() {
        return (
        <header>
        
            <div className="logo">
                <Link to="/">{strings.companyTitle}</Link>
            </div>

            <nav>
                <ul>
                    <li>
                        <Button bsStyle="" onClick={() => {this.handleLanguageToggle()}} className="button">{strings.languageButton}</Button>
                    </li>
                    <li>
                        {this.props.authed?
                        <span>
                            <Route path="/" render={(props) => <ButtonToAccount {...props}/>} />
                            <Button bsStyle="" onClick={() => {logout()}} className="button">{strings.logout}</Button>
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