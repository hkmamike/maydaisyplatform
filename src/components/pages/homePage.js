import React, { Component } from 'react';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';

export default class Homepage extends Component {
 render() {
    return (
      <div className="no-padding">
        <div className="home-image-container">
          <div className="home-image"></div>
        </div>

        <div className="how-it-works">
          <h2> How <span className="home-company-name">One Bloom</span> Works </h2>
          <h3 className="home-123"> AS SIMPLE AS 1,2,3 </h3>
          <Grid>
            <Row className="show-grid">
              <Col sm={4}><Glyphicon glyph="list-alt" className="icons"/>
                <h3 className="icon-title">Subscribe</h3>
                <div className="icon-description">Send weekly mystery flowers to your loved one. Let us know who the lucky one is.</div>
              </Col>
              <Col sm={4}><Glyphicon glyph="question-sign" className="icons"/>
                <h3 className="icon-title">Receive Update</h3>
                <div className="icon-description">2 days before delivery, we email you the details about the upcoming flowers, and you can update your card on our website.</div>
              </Col>
              <Col sm={4}><Glyphicon glyph="heart" className="icons"/>
                <h3 className="icon-title">Surprise</h3>
                <div className="icon-description">Your loved one receive weekly mystery flower, prepared with heart by our designers and fresh cut from the farm!</div>
              </Col>
            </Row>
          </Grid>
        </div>

      </div>
    )
  }
}
