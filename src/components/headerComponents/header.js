import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { logout } from '../helpers/auth';
import { Button } from 'react-bootstrap';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    zh: {
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

const ButtonToLogin = ({ title, history, props }) => {
    var currentPath = props.location.pathname;
    var currentLang = currentPath.substring(0,3);
    return <Button bsStyle="" className="button" onClick={() => history.push(`${currentLang}/auth/login`)}>{strings.login}</Button>
}

const ButtonToAccount = ({ title, history, props }) => {
    var currentPath = props.location.pathname;
    var currentLang = currentPath.substring(0,3);
    return <Button bsStyle="" className="button" onClick={() => history.push(`${currentLang}/auth/orderhistory`)}>{strings.accountButton}</Button>
}

// const ButtonToEn = ({ title, history }) => (
//     <Button bsStyle="" className="button" onClick={() => history.push('/en/')}>Eng</Button>
// );

// const ButtonToCh = ({ title, history }) => (
//     <Button bsStyle="" className="button" onClick={() => history.push('/zh/')}>中文</Button>
// );

var ButtonToToggleLang = ({ title, history, props, handleLanguageToggle }) => {

    var currentPath = props.location.pathname;
    var currentLang = currentPath.substring(0,3);
    var cleanPath = currentPath.substring(3);

    if (currentLang === '/zh') {
        return <Button bsStyle="" className="button" onClick={() => {history.push('/en' + cleanPath); handleLanguageToggle();}}>{strings.languageButton}</Button>
    } else if (currentLang === '/en') {
        return <Button bsStyle="" className="button" onClick={() => {history.push('/zh' + cleanPath); handleLanguageToggle();}}>{strings.languageButton}</Button>
    } else {
        return <Button bsStyle="" className="button" onClick={() => {history.push('/zh' + currentPath); handleLanguageToggle();}}>{strings.languageButton}</Button>
    }
}

export default class Header extends Component {

    constructor() {
        super();
        this.handleLanguageToggle = this.handleLanguageToggle.bind(this);
      }

    componentWillReceiveProps (nextProps) {
        if (nextProps.languageChanged==='zh') {
            strings.setLanguage('zh');
        } else if (nextProps.languageChanged==='en') {
            strings.setLanguage('en');
        }
    }

    handleLanguageToggle () {
        if (strings.getLanguage()==='zh') {
            strings.setLanguage('en');
            this.props.onLanguageToggle('en');
          } else if (strings.getLanguage()==='en') {
            strings.setLanguage('zh');
            this.props.onLanguageToggle('zh');
          }
        this.setState({});
    }

    componentWillMount() {
        strings.setLanguage(this.props.languageChanged);
    }

    componentDidMount() {
        var currentPath = window.location.pathname;
        var currentLang = currentPath.substring(0,3);
        if (currentLang === '/zh') {
            this.props.onLanguageToggle('zh');
        } else if (currentLang === '/en') {
            this.props.onLanguageToggle('en');
        }
    }

    render() {

        var currentPath = window.location.pathname;

        return (
        <header>

            {currentPath.includes('/zh/') && <div className="logo">
                <Link to="/zh/">五月菊</Link>
            </div>}
            {currentPath.includes('/en/') && <div className="logo">
                <Link to="/en/">MayDaisy</Link>
            </div>}

            {/* {(!this.props.onHomePage && this.props.languageChanged === 'en') && <div className="logo">
                <Link to="/en/">{strings.companyTitle}</Link>
            </div>}
            {(!this.props.onHomePage && this.props.languageChanged === 'zh') && <div className="logo">
                <Link to="/zh/">{strings.companyTitle}</Link>
            </div>} */}

            <nav>
                <ul>
                    {/* {(this.props.onHomePage && currentPath.includes('/zh/')) && <li>
                        <Route path="/" render={(props) => <ButtonToEn {...props}/>} />
                    </li>}
                    {(this.props.onHomePage && currentPath.includes('/en/')) && <li>
                        <Route path="/" render={(props) => <ButtonToCh {...props}/>} />
                    </li>} */}
                    {/* {!this.props.onHomePage && <li>
                        <Route path="/" render={(props) => <ButtonToToggleLang {...props} props={props} handleLanguageToggle={this.handleLanguageToggle}/>} />
                    </li>} */}
                    {/* {!this.props.onHomePage && <li>
                        <Button bsStyle="" onClick={() => {this.handleLanguageToggle()}} className="button">{strings.languageButton}</Button>
                    </li>} */}

                    <li>
                        <Route path="/" render={(props) => <ButtonToToggleLang {...props} props={props} handleLanguageToggle={this.handleLanguageToggle}/>} />
                    </li>

                    <li>
                        {this.props.authed?
                        <span>
                            <Route path="/" render={(props) => <ButtonToAccount {...props} props={props}/>} />
                            <Button bsStyle="" onClick={() => {logout()}} className="button">{strings.logout}</Button>
                        </span>
                        :
                        <span>
                            <Route path="/" render={(props) => <ButtonToLogin {...props} props={props}/>} />
                        </span>}
                    </li>
                </ul>
            </nav>

        </header>
        )
    }
}