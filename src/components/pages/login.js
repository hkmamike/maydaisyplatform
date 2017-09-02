import React, { Component } from 'react'
import { login, resetPassword } from '../helpers/auth'
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';

function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}

export default class Login extends Component {

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

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  handlePWChange(e) {
    this.setState({ password: e.target.value });
  }
  handleSubmit = (e) => {
    e.preventDefault()
    login(this.state.email, this.state.password).catch((error) => {
      this.setState(setErrorMsg('Invalid username/password.'))
    })
  }
  resetPassword = () => {
    resetPassword(this.state.email)
      .then(() => this.setState(setErrorMsg(`Password reset email has been sent to ${this.state.email}.`)))
      .catch((error) => this.setState(setErrorMsg(`No account is registered under this email.`)))
  }
  render () {
    return (
      <div className="login-image">
        <Grid>
          <Row className="show-grid login-margin-box">
            <Col className="login-image-prompt">
  
                <form className="login-form" onSubmit={this.handleSubmit}>
                  <h2 className="login-title"><strong>Welcome Back</strong></h2>
                  <div className="login-subtitle">Log in to continue</div>
                  <div className="horizontal-line"></div>
                  { this.state.loginMessage &&
                    <div className="alert alert-danger login-error" role="alert">
                      <Glyphicon glyph="exclamation-sign" className="icons"/>&nbsp;{this.state.loginMessage} 
                    </div>
                  }
                  <FormGroup>
                    <FormControl className="login-form-field" type="text" value={this.state.email} placeholder="Email" onChange={this.handleEmailChange}/>
                    <FormControl className="login-form-field" type="password" value={this.state.password} placeholder="Password" onChange={this.handlePWChange}/>
                  </FormGroup>

                  <Button bsStyle="" type="submit" className="button">Login</Button>
                  <div className="link-group">
                    <a onClick={this.resetPassword} className="alert-link link-forgot-pw">Forgot Password?</a>
                    <Link to="/register" className="link-create-account">Create Account</Link>
                  </div>
                </form>

            </Col>
          </Row>
        </Grid>

      </div>

    )
  }
}