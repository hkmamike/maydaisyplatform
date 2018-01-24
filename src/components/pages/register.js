import React, { Component } from 'react'
import { auth } from '../helpers/auth'
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en:{
      registerTitle: 'Register',
      registerSubtitle: 'Fill out the form to continue',
      email: 'Email',
      password: 'Password',
      passwordConfirm: 'Confirm Password',
      passwordNotMatch: '*The passwords do not match. Please try again.',
      createAccountButton: 'Create Account',
      haveAccount: 'Have an account?',
      emailInUse: 'there already exists an account with the given email address.',
      invalidEmail: 'the email address is not valid.',
      operationNotAllowed: 'an error occured, please try again later.',
      weakPW: 'password strength does not meet the minimum standard.',

    },
    ch: {
      registerTitle: '登記',
      registerSubtitle: '請填寫帳戶登記表',
      email: '電郵',
      password: '密碼',
      passwordConfirm: '確認密碼',
      passwordNotMatch: '*密碼不一致，請再嘗試。',
      createAccountButton: '建立帳戶',
      haveAccount: '已有帳戶?',
      emailInUse: '電郵已被另一個帳戶使用。',
      invalidEmail: '電郵地址格式錯誤。',
      operationNotAllowed: '系統錯誤，請稍後再試。',
      weakPW: '密碼強度不達最低標準。',

    }
  });

function setErrorMsg(error) {
  return {
    registerError: error
  }
}

export default class Register extends Component {

  constructor() {
    super();
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePWChange = this.handlePWChange.bind(this);
    this.handlePWConfirmChange = this.handlePWConfirmChange.bind(this);
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      passwordNotMatch: false,
      registerError: null
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
  handlePWConfirmChange(e) {
    this.setState({ passwordConfirm: e.target.value });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({passwordNotMatch: false});
    if (this.state.password === this.state.passwordConfirm) {
      auth(this.state.email, this.state.password, this.props.languageChanged).catch((e) => {
        if (e.code==="auth/email-already-in-use") {
          this.setState(setErrorMsg(strings.emailInUse));
        } else if (e.code==="auth/invalid-email") {
          this.setState(setErrorMsg(strings.invalidEmail));
        } else if (e.code==="auth/operation-not-allowed") {
          this.setState(setErrorMsg(strings.operationNotAllowed));
        } else if (e.code==="auth/weak-password") {
          this.setState(setErrorMsg(strings.weakPW));
        }
      })
    } else {
      this.setState({passwordNotMatch: true});
    }
  }
  render () {
    return (
      <div className="login-image">
        <Grid>
          <Row className="show-grid login-margin-box">
            <Col md={5} className="login-image-prompt">
                <form className="login-form" onSubmit={this.handleSubmit}>
                  <h2 className="login-title"><strong>{strings.registerTitle}</strong></h2>
                  <div className="login-subtitle">{strings.registerSubtitle}</div>
                  <div className="horizontal-line"></div>
                  { this.state.registerError &&
                    <div className="alert alert-danger login-error" role="alert">
                      <Glyphicon glyph="exclamation-sign" className="icons"/>&nbsp;{this.state.registerError} 
                    </div>
                  }
                  <FormGroup>
                    <FormControl className="login-form-field" type="text" value={this.state.email} placeholder={strings.email} onChange={this.handleEmailChange}/>
                    <FormControl className="login-form-field" type="password" value={this.state.password} placeholder={strings.password} onChange={this.handlePWChange}/>
                    <FormControl className="login-form-field" type="password" value={this.state.passwordConfirm} placeholder={strings.passwordConfirm} onChange={this.handlePWConfirmChange}/>
                  </FormGroup>

                  { this.state.passwordNotMatch &&
                    <div>
                        <div className="error-message">{strings.passwordNotMatch}</div>
                    </div>
                  }

                  <Button bsStyle="" type="submit" className="button">{strings.createAccountButton}</Button>
                  <div className="link-group-register">
                    <Link to="/auth/login" className="link-login">{strings.haveAccount}</Link>
                  </div>
                </form>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}