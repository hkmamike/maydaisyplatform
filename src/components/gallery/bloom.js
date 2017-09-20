import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class GalleryBloom extends Component {

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
              <h2>Gallery: <span className="gallery-title">Bloom</span></h2>
              <div></div>
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row className="show-grid gallery-pic-container">
              <Col sm={4} className="gallery-pic-b1 gallery-pic">
                <div className="gallery-pic-shade"></div>
                <div className="gallery-pic-text">
                <div className="gallery-pic-title">Bloom</div>
                <div>sample vase arrangement.</div>
                </div>
              </Col>
              <Col sm={4} className="gallery-pic-b2 gallery-pic">
                <div className="gallery-pic-shade"></div>
                <div className="gallery-pic-text">
                <div className="gallery-pic-title">Bloom</div>
                <div>sample bouquet.</div>
                </div>
              </Col>
              <Col sm={4} className="gallery-pic-b3 gallery-pic">
                <div className="gallery-pic-shade"></div>
                <div className="gallery-pic-text">
                <div className="gallery-pic-title">Bloom</div>
                <div>sample vase arrangement.</div>
                </div>
              </Col>
          </Row>
        </Grid>
        <Grid>
          <Row className="show-grid gallery-pic-container">
              <Col sm={4} className="gallery-pic-b4 gallery-pic">
                <div className="gallery-pic-shade"></div>
                <div className="gallery-pic-text">
                <div className="gallery-pic-title">Bloom</div>
                <div>sample vase arrangement.</div>
                </div>
              </Col>
              <Col sm={4} className="gallery-pic-b5 gallery-pic">
                <div className="gallery-pic-shade"></div>
                <div className="gallery-pic-text">
                <div className="gallery-pic-title">Bloom</div>
                <div>sample vase arrangement.</div>
                </div>
              </Col>
              <Col sm={4} className="gallery-pic-b6 gallery-pic">
                <div className="gallery-pic-shade"></div>
                <div className="gallery-pic-text">
                <div className="gallery-pic-title">Bloom</div>
                <div>sample bouquet.</div>
                </div>
              </Col>
          </Row>
        </Grid>
        <Grid>
          <Row className="show-grid gallery-pic-container">
              <Col sm={4} className="gallery-pic-b7 gallery-pic">
                <div className="gallery-pic-shade"></div>
                <div className="gallery-pic-text">
                <div className="gallery-pic-title">Bloom</div>
                <div>sample vase arrangement.</div>
                </div>
              </Col>
              <Col sm={4} className="gallery-pic-b8 gallery-pic">
                <div className="gallery-pic-shade"></div>
                <div className="gallery-pic-text">
                <div className="gallery-pic-title">Bloom</div>
                <div>sample bouquet.</div>
                </div>
              </Col>
              <Col sm={4} className="gallery-pic-b9 gallery-pic">
                <div className="gallery-pic-shade"></div>
                <div className="gallery-pic-text">
                <div className="gallery-pic-title">Bloom</div>
                <div>sample bouquet.</div>
                </div>
              </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
