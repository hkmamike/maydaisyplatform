import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class GallerySimple extends Component {

  constructor() {
    super();
  }

  render() {
    const selectRegion = this.props.selectRegion;

    return (
      <div className="no-padding gallery-container">
        <Grid>
          <Row>
            <Col sm={12}>
              <h2>Gallery: <span className="gallery-title">Simple</span></h2>
              <div></div>
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row className="show-grid gallery-pic-container">
              <Col sm={4} className="gallery-pic-s1 gallery-pic">
                <div className="gallery-pic-shade"></div>
                <div className="gallery-pic-text">
                  <div className="gallery-pic-title">Simple</div>
                  <div>sample vase arrangement.</div>
                </div>
              </Col>
              <Col sm={4} className="gallery-pic-s2 gallery-pic">
                <div className="gallery-pic-shade"></div>
                <div className="gallery-pic-text">
                  <div className="gallery-pic-title">Simple</div>
                  <div>sample vase arrangement.</div>
                </div>
              </Col>
              <Col sm={4} className="gallery-pic-s3 gallery-pic">
                <div className="gallery-pic-shade"></div>
                <div className="gallery-pic-text">
                  <div className="gallery-pic-title">Simple</div>
                  <div>sample vase arrangement.</div>
                </div>
              </Col>
          </Row>
        </Grid>
        <Grid>
          <Row className="show-grid gallery-pic-container">
              <Col sm={4} className="gallery-pic-s4 gallery-pic">
                <div className="gallery-pic-shade"></div>
                <div className="gallery-pic-text">
                  <div className="gallery-pic-title">Simple</div>
                  <div>sample vase arrangement.</div>
                </div>
              </Col>
              <Col sm={4} className="gallery-pic-s5 gallery-pic">
                <div className="gallery-pic-shade"></div>
                <div className="gallery-pic-text">
                  <div className="gallery-pic-title">Simple</div>
                  <div>sample vase arrangement.</div>
                </div>
              </Col>
              <Col sm={4} className="gallery-pic-s6 gallery-pic">
                <div className="gallery-pic-shade"></div>
                <div className="gallery-pic-text">
                  <div className="gallery-pic-title">Simple</div>
                  <div>sample vase arrangement.</div>
                </div>
              </Col>
          </Row>
        </Grid>
        <Grid>
          <Row className="show-grid gallery-pic-container">
              <Col sm={4} className="gallery-pic-s7 gallery-pic">
                <div className="gallery-pic-shade"></div>
                <div className="gallery-pic-text">
                  <div className="gallery-pic-title">Simple</div>
                  <div>sample vase arrangement.</div>
                </div>
              </Col>
              <Col sm={4} className="gallery-pic-s8 gallery-pic">
                <div className="gallery-pic-shade"></div>
                <div className="gallery-pic-text">
                  <div className="gallery-pic-title">Simple</div>
                  <div>sample wrapped arrangement.</div>
                </div>
              </Col>
              <Col sm={4} className="gallery-pic-s9 gallery-pic">
                <div className="gallery-pic-shade"></div>
                <div className="gallery-pic-text">
                  <div className="gallery-pic-title">Simple</div>
                  <div>sample wrapped arrangement.</div>
                </div>
              </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
