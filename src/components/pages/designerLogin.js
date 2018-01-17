import React, { Component } from 'react'
import { login, resetPassword } from '../helpers/auth'
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en:{
      loginTitle: 'Welcome Back',
      loginSubtitle: 'Log in to continue',
      loginButton: 'Login',
      forgotPW: 'Forgot Password?',
      createAccount: 'Create Account',
      email: 'Email',
      password: 'Password',
      invalidCredential: 'Invalid username/password.',
      resetSent1_1: 'Password reset email has been sent to ',
      resetSent1_2: '.',
      noAccountFound: 'No account is registered under this email.'
    },
    ch: {
      loginTitle: '歡迎回來',
      loginSubtitle: '如要繼續請登入',
      loginButton: '登入',
      forgotPW: '忘記密碼?',
      createAccount: '建立帳戶', 
      email: '電郵',
      password: '密碼',
      invalidCredential: '電郵或密碼錯誤。',
      resetSent1_1: '密碼重設方法已寄出:',
      resetSent1_2: ' ',
      noAccountFound: '並沒有以此電郵登記的帳戶。'
    }
  });

function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}

export default class DesignerLogin extends Component {

  constructor() {
    super();
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePWChange = this.handlePWChange.bind(this);
    this.state = {
      email: '',
      password: '',
      loginMesssage: null
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.languageChanged==='ch') {
      strings.setLanguage('ch');
    } else if (nextProps.languageChanged==='en') {
      strings.setLanguage('en');
    }
  }

  componentWillMount() {
    strings.setLanguage(this.props.languageChanged);
  }

  componentDidMount () {
    window.scrollTo(0, 0);
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  handlePWChange(e) {
    this.setState({ password: e.target.value });
  }
  handleSubmit = (e) => {
    e.preventDefault()
    login(this.state.email, this.state.password).catch((error) => {
      this.setState(setErrorMsg(strings.invalidCredential));
    })
  }
  resetPassword = () => {
    resetPassword(this.state.email)
      .then(() => this.setState(setErrorMsg(`${strings.resetSent1_1}${this.state.email}${strings.resetSent1_2}`)))
      .catch((error) => this.setState(setErrorMsg(strings.noAccountFound)))
  }
  render () {
    return (
      <div className="login-image">
        <Grid>
          <Row className="show-grid login-margin-box">
            <Col className="login-image-prompt">
  
                <form className="login-form" onSubmit={this.handleSubmit}>
                  <h2 className="login-title"><strong>{strings.loginTitle}</strong></h2>
                  <div className="login-subtitle">{strings.loginSubtitle}</div>
                  <div className="horizontal-line"></div>
                  { this.state.loginMessage &&
                    <div className="alert alert-danger login-error" role="alert">
                      <Glyphicon glyph="exclamation-sign" className="icons"/>&nbsp;{this.state.loginMessage} 
                    </div>
                  }
                  <FormGroup>
                    <FormControl className="login-form-field" type="text" value={this.state.email} placeholder={strings.email} onChange={this.handleEmailChange}/>
                    <FormControl className="login-form-field" type="password" value={this.state.password} placeholder={strings.password} onChange={this.handlePWChange}/>
                  </FormGroup>

                  <Button bsStyle="" type="submit" className="button">{strings.loginButton}</Button>
                  <div className="link-group">
                    <a onClick={this.resetPassword} className="alert-link link-forgot-pw">{strings.forgotPW}</a>
                    <Link to="/auth/register" className="link-create-account">{strings.createAccount}</Link>
                  </div>
                </form>

            </Col>
          </Row>
        </Grid>

      </div>

    )
  }
}