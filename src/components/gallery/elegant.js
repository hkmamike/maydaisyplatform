import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class GalleryElegant extends Component {

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
              <h2>Gallery: <span className="gallery-title">Elegant</span></h2>
              <div></div>
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row className="show-grid gallery-pic-container">
              <Col sm={4} className="gallery-pic-m1 gallery-pic">
                <div className="gallery-pic-shade"></div>
                <div className="gallery-pic-text">
                    <div className="gallery-pic-title">Elegant</div>
                    <div>sample vase arrangement.</div>
                </div>
              </Col>
              <Col sm={4} className="gallery-pic-m2 gallery-pic">
                <div className="gallery-pic-shade"></div>
                <div className="gallery-pic-text">
                <div className="gallery-pic-title">Elegant</div>
                <div>sample vase arrangement.</div>
                </div>
              </Col>
              <Col sm={4} className="gallery-pic-m3 gallery-pic">
                <div className="gallery-pic-shade"></div>
                <div className="gallery-pic-text">
                <div className="gallery-pic-title">Elegant</div>
                <div>sample vase arrangement.</div>
                </div>
              </Col>
          </Row>
        </Grid>
        <Grid>
          <Row className="show-grid gallery-pic-container">
              <Col sm={4} className="gallery-pic-m4 gallery-pic">
                <div className="gallery-pic-shade"></div>
                <div className="gallery-pic-text">
                <div className="gallery-pic-title">Elegant</div>
                <div>sample vase arrangement.</div>
                </div>
              </Col>
              <Col sm={4} className="gallery-pic-m5 gallery-pic">
                <div className="gallery-pic-shade"></div>
                <div className="gallery-pic-text">
                <div className="gallery-pic-title">Elegant</div>
                <div>sample vase arrangement.</div>
                </div>
              </Col>
              <Col sm={4} className="gallery-pic-m6 gallery-pic">
                <div className="gallery-pic-shade"></div>
                <div className="gallery-pic-text">
                <div className="gallery-pic-title">Elegant</div>
                <div>sample bouquet.</div>
                </div>
              </Col>
          </Row>
        </Grid>
        <Grid>
          <Row className="show-grid gallery-pic-container">
              <Col sm={4} className="gallery-pic-m7 gallery-pic">
                <div className="gallery-pic-shade"></div>
                <div className="gallery-pic-text">
                <div className="gallery-pic-title">Elegant</div>
                <div>sample bouquet.</div>
                </div>
              </Col>
              <Col sm={4} className="gallery-pic-m8 gallery-pic">
                <div className="gallery-pic-shade"></div>
                <div className="gallery-pic-text">
                <div className="gallery-pic-title">Elegant</div>
                <div>sample vase arrangement.</div>
                </div>
              </Col>
              <Col sm={4} className="gallery-pic-m9 gallery-pic">
                <div className="gallery-pic-shade"></div>
                <div className="gallery-pic-text">
                <div className="gallery-pic-title">Elegant</div>
                <div>sample vase arrangement.</div>
                </div>
              </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
