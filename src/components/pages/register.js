import React, { Component } from 'react'
import { auth } from '../helpers/auth'
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel, Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';

function setErrorMsg(error) {
  return {
    registerError: error.message
  }
}

export default class Register extends Component {

  constructor() {
    super();
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePWChange = this.handlePWChange.bind(this);
    this.state = {
      email: '',
      password: '',
      registerError: null
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
    auth(this.state.email, this.state.password).catch((e) => {
      this.setState(setErrorMsg(e));
    })
  }
  render () {
    return (
      <div className="login-image">
        <Grid>
          <Row className="show-grid login-margin-box">
            <Col md={5} className="login-image-prompt">
                <form className="login-form" onSubmit={this.handleSubmit}>
                  <h2 className="login-title"><strong>Register</strong></h2>
                  <div className="login-subtitle">Create an account to continue</div>
                  <div className="horizontal-line"></div>
                  { this.state.registerError &&
                    <div className="alert alert-danger login-error" role="alert">
                      <Glyphicon glyph="exclamation-sign" className="icons"/>&nbsp;{this.state.registerError} 
                    </div>
                  }
                  <FormGroup>
                    <FormControl className="login-form-field" type="text" value={this.state.email} placeholder="Email" onChange={this.handleEmailChange}/>
                    <FormControl className="login-form-field" type="password" value={this.state.password} placeholder="Password" onChange={this.handlePWChange}/>
                  </FormGroup>

                  <Button bsStyle="" type="submit" className="button">Create Account</Button>
                  <div className="link-group-register">
                    <Link to="/login" className="link-login">Have an account?</Link>
                  </div>
                </form>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}