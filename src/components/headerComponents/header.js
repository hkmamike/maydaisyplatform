import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { logout } from '../helpers/auth';
import { Button } from 'react-bootstrap';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    ch: {
        companyTitle: "五月菊",
        languageButton: 'Eng',
        accountButton: "我的帳戶",
        login: "登入",
        logout: "登出"
    },
    en:{
      companyTitle: "MayDaisy",
      languageButton: '中文',
      accountButton: "Account",
      login: "Login",
      logout: "Logout"
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
        if (strings.getLanguage()==='ch') {
            strings.setLanguage('en');
            this.props.onLanguageToggle('en');
            this.setState({language: 'en'});
          } else if (strings.getLanguage()==='en') {
            strings.setLanguage('ch');
            this.props.onLanguageToggle('ch');
            this.setState({language: 'ch'});
          }
        this.setState({});
    }

    componentWillMount() {
        strings.setLanguage('ch');
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