import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel, Grid, Row, Col, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import ChargeMoney from '../helpers/payment'

export default class NewSubscription extends Component {

  constructor() {
    super();
    this.handleSubscriptionStep = this.handleSubscriptionStep.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
    this.state = {
      loading: true,
      subscriptionStep: 1,
      cardMessage: '',
      sender: '',
      address: '',
      deliveryDay: 'Every Monday',
      selectPlanType: 'Florist Choice (seasonal flower)',
      selectPlanSize: 'Simple (single bloom, 53HKD/week)',
      price: 5300,
      deliveryFee: 0,
      grandTotal: 5300,
      currencyType: 'HKD',
      planID: 'HKSimple53',
      recipient: '',
      recipientNum: '',
      company: '',
      senderNum: '',
      stripeSubID: '',
      firstPayment: ''
    }
  }

  calculateFirstDelivery() {
    var deliveryDay = this.state.deliveryDay;
    //Calculate First Delivery Date
    var d = new Date();
    var firstDelivery = new Date();
    if (d.getDay()!==3) {
        d.setDate(d.getDate() + (3 + 7 - d.getDay()) % 7);
        d.setHours(15);
        d.setMinutes(59);
        d.setSeconds(59);
    } else {
        d.setHours(15);
        d.setMinutes(59);
        d.setSeconds(59);
      }
    //Redundant math is used to simulate calculation on webtask and stripe
    var firstPayment = new Date(Math.floor(d.getTime()/1000)*1000);
    if (deliveryDay==="Every Monday") {
        firstDelivery.setDate(firstPayment.getDate() + (1 + 7 - firstPayment.getDay()) % 7);
        this.setState({firstDelivery: firstDelivery, firstPayment: firstPayment});
        console.log('first Monday delivery will happen on: ', firstDelivery);
    } else if (deliveryDay==="Every Wednesday") {
        firstDelivery.setDate(firstPayment.getDate() + 7);
        console.log('first Wednesday delivery will happen on: ', firstDelivery);
        this.setState({firstDelivery: firstDelivery, firstPayment: firstPayment});
    }
  }

  handleSubscriptionStep(stripeSubID, firstPayment, firstDelivery) {
    this.setState({subscriptionStep : 6, stripeSubID: stripeSubID, firstPayment: firstPayment, firstDelivery: firstDelivery, loading: false});
  }
  handleLoading() {
    this.setState({loading: true});
  }
  handleRegionSelect = (eventKey) => {
    this.props.onRegionSelection(eventKey);
    if (eventKey === "HK - Admiralty" || eventKey === "HK - Central") {
        this.setState({deliveryDay: 'Every Monday'}, this.calculateFirstDelivery);
    } else if (eventKey ==="HK - Chai Wan") {
        this.setState({deliveryDay: 'Every Wednesday'}, this.calculateFirstDelivery);
    }
  }
  handlePlanTypeSelect = (eventKey) => {
    this.setState({selectPlanType: eventKey});
  }
  handlePlanSizeSelect = (eventKey) => {
    this.setState({selectPlanSize: eventKey});
    if (eventKey === "Simple (single bloom, HKD53/week)") {
        this.setState({price: 5300, currencyType: 'HKD', grandTotal: 5300+this.state.deliveryFee, planID: 'HKSimple53'});
    } else if (eventKey === "Boquet (6 blooms, HKD233/week)") {
        this.setState({price: 23300, currencyType: 'HKD', grandTotal: 23300+this.state.deliveryFee, planID: 'HKBoquet223'});
    }
  }
  handleCardMessage = (e) => {
    this.setState({cardMessage: e.target.value});
  }
  handleSender = (e) => {
    this.setState({sender: e.target.value});
  }
  handleRecipient = (e) => {
    this.setState({recipient: e.target.value});
  }
  handleRecipientNum = (e) => {
    this.setState({recipientNum: e.target.value});
  }
  handleCompany = (e) => {
    this.setState({company: e.target.value});
  }
  handleAddress = (e) => {
    this.setState({address: e.target.value});
  }
  handleSenderNum = (e) => {
    this.setState({senderNum: e.target.value});
  }

  componentWillMount() {
    this.calculateFirstDelivery();
  }

  componentDidMount() {
    this.setState({loading: false});
    }

  render() {

    var loadingState = this.state.loading;
    var subscriptionStep = this.state.subscriptionStep;
    var selectRegion = this.props.selectRegion;
    var selectPlanType = this.state.selectPlanType;
    var selectPlanSize = this.state.selectPlanSize;

    let content = null;
    if (subscriptionStep===1){
        content = (
            <div>
                <Grid>
                    <Row className="show-grid loggedin-flow">
                        <div className="horizontal-line"></div>
                        <Col xs={12}>
                            <div className="flow-selected">Choose</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Card</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Delivery</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Review</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Payment</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Confirm</div>
                        </Col>
                        <div className="horizontal-line"></div>
                    </Row>
                </Grid>
                <Grid>
                    <Row className="show-grid">
                        <Col sm={2}></Col>
                        <Col sm={3}><div><strong>Delivery Area:</strong></div></Col>
                        <Col sm={6}>
                            <DropdownButton title={selectRegion} className="subscription-select" id="subscriptioin-regionSelect-dropdown" onSelect={this.handleRegionSelect}>
                                <MenuItem eventKey="HK - Admiralty">HK - Admiralty</MenuItem>
                                <MenuItem eventKey="HK - Central">HK - Central</MenuItem>
                                <MenuItem eventKey="HK - Chai Wan">HK - Chai Wan</MenuItem>
                            </DropdownButton>
                            <div className="subscription-tips">*Only one delivery day option is avaiable for this region at the moment.</div>
                            <div className="subscription-tips">**Weekly Delivery for {selectRegion} is on <strong>{this.state.deliveryDay}</strong>. If the delivery day is a holiday, delivery will take place on the next weekday or according to special arrangements.</div>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col sm={2}></Col>
                        <Col sm={3}><div><strong>Flowers:</strong></div></Col>
                        <Col sm={6}>
                            <DropdownButton title={selectPlanType} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={this.handlePlanTypeSelect}>
                                <MenuItem eventKey="Florist Choice (seasonal flower)">Florist Choice (seasonal flower)</MenuItem>
                                <MenuItem eventKey="Florist Choice (seasonal rose only)">Florist Choice (seasonal rose only)</MenuItem>
                            </DropdownButton>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col sm={2}></Col>
                        <Col sm={3}><div><strong>How many blooms?</strong></div></Col>
                        <Col sm={6}>
                            <DropdownButton title={selectPlanSize} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={this.handlePlanSizeSelect}>
                                <MenuItem eventKey="Simple (single bloom, HKD53/week)">Simple (single bloom, HKD53/week)</MenuItem>
                                <MenuItem eventKey="Boquet (6 blooms, HKD233/week)">Boquet (6 blooms, HKD233/week)</MenuItem>
                            </DropdownButton>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col sm={2}></Col>
                        <Col sm={3}><div><strong>First Delivery:</strong></div></Col>
                        <Col sm={6}>
                            <div>{this.state.firstDelivery.toLocaleDateString()}</div>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col sm={2}></Col>
                        <Col sm={3}><div><strong>First Payment:</strong></div></Col>
                        <Col sm={6}>
                            <div>{this.state.firstPayment.toLocaleDateString()}</div>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col sm={5}></Col>
                        <Col sm={4}>
                            <Button bsStyle="" className="button" onClick={() => this.setState({subscriptionStep: 2})}>Next</Button>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    } else if (subscriptionStep===2){
        content = (
            <div>
                <Grid>
                    <Row className="show-grid loggedin-flow">
                        <div className="horizontal-line"></div>
                        <Col md={12}>
                            <div>Choose</div>
                            <i className="fa fa-chevron-right"></i>
                            <div className="flow-selected">Card</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Delivery</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Review</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Payment</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Confirm</div>
                        </Col>
                        <div className="horizontal-line"></div>
                    </Row>
                </Grid>
                <Grid>
                    <Row className="show-grid">
                        <Col sm={2}></Col>
                        <Col sm={3}>
                            <div><strong>Card Message:</strong></div>
                        </Col>
                        <Col sm={6}>
                            <FormGroup>
                                <FormControl value={this.state.cardMessage} componentClass="textarea" className="cardMessage" placeholder="Card Message - optional, the card can fit up to 100 words nicely" onChange={this.handleCardMessage}/>
                                <div className="subscription-tips">*Please include the desired recipient name and sender name on the card. The cut off time to change card message for <strong>{selectRegion}</strong> is at <strong>11:59 pm on Wednesday</strong> prior to the next week's delivery. </div>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col sm={2}></Col>
                        <Col sm={3}>
                            <div><strong>From:</strong></div>
                        </Col>
                        <Col sm={6}>
                            <FormGroup>
                                <FormControl value={this.state.sender} type="text" placeholder="Sender's Name" onChange={this.handleSender}/>
                                <div className="subscription-tips">*We will use this information to update your account information only. Please sign your name on the card message.</div>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col sm={5}></Col>
                        <Col sm={4}>
                            <Button bsStyle="" className="button button-back" onClick={() => this.setState({subscriptionStep: 1})}>Back</Button>
                            <Button bsStyle="" className="button" onClick={() => this.setState({subscriptionStep: 3})}>Next</Button>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    } else if (subscriptionStep===3){
        content = (
            <div>
                <Grid>
                    <Row className="show-grid loggedin-flow">
                        <div className="horizontal-line"></div>
                        <Col md={12}>
                            <div>Choose</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Card</div>
                            <i className="fa fa-chevron-right"></i>
                            <div className="flow-selected">Delivery</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Review</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Payment</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Confirm</div>
                        </Col>
                        <div className="horizontal-line"></div>
                    </Row>
                </Grid>
                <Grid>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <ControlLabel>Name:</ControlLabel>
                            </Col>
                            <Col sm={6}>
                                <FormControl value={this.state.recipient} type="text" placeholder="Recipient's name" onChange={this.handleRecipient}/>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <ControlLabel>Recipient's Number:</ControlLabel>
                            </Col>
                            <Col sm={6}>
                                <FormControl value={this.state.recipientNum} type="text" placeholder="Recipient's phone - for delivery" onChange={this.handleRecipientNum}/>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <ControlLabel>Company:</ControlLabel>
                            </Col>
                            <Col sm={6}>
                                <FormControl value={this.state.company} type="text" placeholder="Recipient's company or location name" onChange={this.handleCompany}/>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <ControlLabel>Address:</ControlLabel>
                            </Col>
                            <Col sm={6}>
                                <FormControl value={this.state.address} componentClass="textarea" className="recipientAddress" placeholder="Recipient's name - for delivery" onChange={this.handleAddress}/>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <ControlLabel>Sender's Number:</ControlLabel>
                            </Col>
                            <Col sm={6}>
                                <FormControl value={this.state.senderNum} type="text" placeholder="Your phone number" onChange={this.handleSenderNum}/>
                                <div className="subscription-tips">*We will use this to update your account information and we might contact you at this number for delivery if needed. </div>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <Col sm={5}></Col>
                        <Col sm={4}>
                            <Button bsStyle="" className="button button-back" onClick={() => this.setState({subscriptionStep: 2})}>Back</Button>
                            <Button bsStyle="" className="button" onClick={() => this.setState({subscriptionStep: 4})}>Next</Button>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    } else if (subscriptionStep===4){
        content = (
            <div>
                <Grid>
                    <Row className="show-grid loggedin-flow">
                        <div className="horizontal-line"></div>
                        <Col md={12}>
                            <div>Choose</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Card</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Delivery</div>
                            <i className="fa fa-chevron-right"></i>
                            <div className="flow-selected">Review</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Payment</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Confirm</div>
                        </Col>
                        <div className="horizontal-line"></div>
                    </Row>
                </Grid>
                <Grid>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <div><strong>Recipient:</strong></div>
                            </Col>
                            <Col sm={6}>
                                <div>{this.state.recipient}</div>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <div><strong>Recipient's Phone:</strong></div>
                            </Col>
                            <Col sm={6}>
                                <div>{this.state.recipientNum}</div>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <div><strong>Recipient's Company:</strong></div>
                            </Col>
                            <Col sm={6}>
                                <div>{this.state.company}</div>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <div><strong>Address:</strong></div>
                            </Col>
                            <Col sm={6}>
                                <div>{this.state.address}</div>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <div><strong>Delivery on:</strong></div>
                            </Col>
                            <Col sm={6}>
                                <div>{this.state.deliveryDay}</div>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <div><strong>Card Message:</strong></div>
                            </Col>
                            <Col sm={6}>
                                <div>{this.state.cardMessage}</div>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <div><strong>From:</strong></div>
                            </Col>
                            <Col sm={6}>
                            <div>{this.state.sender}</div>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <div><strong>Sender's Phone:</strong></div>
                            </Col>
                            <Col sm={6}>
                                <div>{this.state.senderNum}</div>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <div><strong>Subscription Type:</strong></div>
                            </Col>
                            <Col sm={6}>
                            <div>{this.state.selectPlanType}</div>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <div><strong>Subscription Size:</strong></div>
                            </Col>
                            <Col sm={6}>
                            <div>{this.state.selectPlanSize}</div>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <Col sm={5}></Col>
                        <Col sm={4}>
                            <Button bsStyle="" className="button button-back" onClick={() => this.setState({subscriptionStep: 3})}>Back</Button>
                            <Button bsStyle="" className="button" onClick={() => this.setState({subscriptionStep: 5})}>Next</Button>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    } else if (subscriptionStep===5){
        if (loadingState) {
            content = (
                <div>
                    <Grid>
                        <Row className="show-grid loggedin-flow">
                            <div className="horizontal-line"></div>
                            <Col md={12}>
                                <div>Choose</div>
                                <i className="fa fa-chevron-right"></i>
                                <div>Card</div>
                                <i className="fa fa-chevron-right"></i>
                                <div>Delivery</div>
                                <i className="fa fa-chevron-right"></i>
                                <div>Review</div>
                                <i className="fa fa-chevron-right"></i>
                                <div className="flow-selected">Payment</div>
                                <i className="fa fa-chevron-right"></i>
                                <div>Confirm</div>
                            </Col>
                            <div className="horizontal-line"></div>
                        </Row>
                    </Grid>
                    <div className="loader"></div>
                </div>
            )
        } else {
            content = (
                <div>
                    <Grid>
                        <Row className="show-grid loggedin-flow">
                            <div className="horizontal-line"></div>
                            <Col md={12}>
                                <div>Choose</div>
                                <i className="fa fa-chevron-right"></i>
                                <div>Card</div>
                                <i className="fa fa-chevron-right"></i>
                                <div>Delivery</div>
                                <i className="fa fa-chevron-right"></i>
                                <div>Review</div>
                                <i className="fa fa-chevron-right"></i>
                                <div className="flow-selected">Payment</div>
                                <i className="fa fa-chevron-right"></i>
                                <div>Confirm</div>
                            </Col>
                            <div className="horizontal-line"></div>
                        </Row>
                    </Grid>
                    <Grid>
                        <Row className="show-grid">
                            <FormGroup>
                                <Col sm={2}></Col>
                                <Col sm={3}>
                                    <div><strong>Chosen Plan:</strong></div>
                                </Col>
                                <Col sm={6}>
                                    <div>{this.state.selectPlanSize}</div>
                                </Col>
                            </FormGroup>
                        </Row>
                        <Row className="show-grid">
                            <FormGroup>
                                <Col sm={2}></Col>
                                <Col sm={3}>
                                    <div><strong>Delivery Fee:</strong></div>
                                </Col>
                                <Col sm={6}>
                                    <div>{this.state.deliveryFee}</div>
                                </Col>
                            </FormGroup>
                        </Row>
                        <Row className="show-grid">
                            <FormGroup>
                                <Col sm={2}></Col>
                                <Col sm={3}>
                                    <div><strong>Total:</strong></div>
                                </Col>
                                <Col sm={6}>
                                    <div>{this.state.currencyType}{this.state.grandTotal/100}</div>
                                </Col>
                            </FormGroup>
                        </Row>
                        <Row className="show-grid">
                            <Col sm={2}></Col>
                            <Col sm={3}><div><strong>First Delivery:</strong></div></Col>
                            <Col sm={6}>
                                <div>{this.state.firstDelivery.toLocaleDateString()}</div>
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <Col sm={2}></Col>
                            <Col sm={3}><div><strong>First Payment:</strong></div></Col>
                            <Col sm={6}>
                                <div>{this.state.firstPayment.toLocaleDateString()}</div>
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <Col sm={2}></Col>
                            <Col sm={9}>
                                <div className="subscription-tips">*You are signing up for a weekly subscription service. Your card will be charged at the weekly cut off time at 11:59pm HKT on Wednesday, and delivery will made in the following week. If you would like to cancel the subscription, please go to My Subscriptions > Subscription Details.</div>
                            </Col>
                        </Row>

                        <Row className="show-grid">
                            <Col sm={5}></Col>
                            <Col sm={4}>
                                <Button bsStyle="" className="button button-back" onClick={() => this.setState({subscriptionStep: 4})}>Back</Button>
                                <ChargeMoney
                                    price={this.state.price} 
                                    planID={this.state.planID}
                                    selectRegion={selectRegion}
                                    selectPlanType={this.state.selectPlanType}
                                    selectPlanSize={this.state.selectPlanSize}
                                    grandTotal ={this.state.grandTotal}
                                    sender={this.state.sender}
                                    senderNum={this.state.senderNum}
                                    recipient={this.state.recipient}
                                    recipientNum={this.state.recipientNum}
                                    company={this.state.company}
                                    address={this.state.address}
                                    cardMessage={this.state.cardMessage}
                                    deliveryDay = {this.state.deliveryDay}
                                    onSubscriptionStep={this.handleSubscriptionStep}
                                    onLoading={this.handleLoading}
                                />
                            </Col>
                        </Row>
                    </Grid>
                </div>
            )
        }
    }   else if (subscriptionStep===6){
        content = (
            <div>
                <Grid>
                    <Row className="show-grid loggedin-flow">
                        <div className="horizontal-line"></div>
                        <Col md={12}>
                            <div>Choose</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Card</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Delivery</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Review</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Payment</div>
                            <i className="fa fa-chevron-right"></i>
                            <div className="flow-selected">Confirm</div>
                        </Col>
                        <div className="horizontal-line"></div>
                    </Row>
                </Grid>
                <Grid>
                    <Row className="show-grid">
                        <Col sm={2}></Col>
                        <Col sm={3}>
                            <div><strong>Subscriptioin ID:</strong></div>
                        </Col>
                        <Col sm={6}>
                            <div>{this.state.stripeSubID}</div>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                   
                        <Col sm={2}></Col>
                        <Col sm={3}>
                            <div><strong>First Payment:</strong></div>
                        </Col>
                        <Col sm={6}>
                            <div>{this.state.firstPayment.toLocaleDateString()}</div>
                        </Col>
                      
                    </Row>
                    <Row className="show-grid">
                 
                        <Col sm={2}></Col>
                        <Col sm={3}>
                            <div><strong>First Delivery:</strong></div>
                        </Col>
                        <Col sm={6}>
                            <div>{this.state.firstDelivery.toLocaleDateString()}</div>
                        </Col>
                     
                    </Row>
                    <Row className="show-grid">
                        <Col sm={5}></Col>
                        <Col sm={4}>
                            <Button bsStyle="" className="button button-back"><Link to="/subscriptions">My Subscriptions</Link></Button>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }

    return (
        <div className="loggedin-background">
          <Grid>
            <Row className="show-grid loggedin-nav">
              <Col xs={4} className="loggedin-nav-button">
                <Link to="/subscriptions">
                  <i className="fa fa-tags fa-lg nav-icon"></i>
                  <div className="nav-icon-title">My<br/>Subscriptions</div>
                </Link>
              </Col>
              <Col xs={4} className="loggedin-nav-button">
                <Link to="/newsubscription" className="nav-selected">
                  <i className="fa fa-plus fa-lg nav-icon"></i>
                  <div className="nav-icon-title">New<br/>Subscription</div>
                </Link>
              </Col>
              <Col xs={4} className="loggedin-nav-button">
                <Link to="/accountinfo">
                    <i className="fa fa-user-circle fa-lg nav-icon"></i>
                    <div className="nav-icon-title">Account<br/>Information</div>
                </Link>
              </Col>
            </Row>
            <Row className="show-grid loggedin-margin-box">
              <Col className="loggedin-content">
                  {content}
              </Col>
            </Row>
          </Grid>
        </div>
      )
  }
}