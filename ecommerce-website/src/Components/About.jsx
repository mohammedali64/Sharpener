import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const About = () => {
  return (
    <>
      <Container className="py-5">
        <h2 className="text-center fw-bold display-6 about-title mb-4">ABOUT</h2>
        <Row className="align-items-center justify-content-center">
          <Col md={4} className="text-center mb-4 mb-md-0">
            <Image
              src="https://prasadyash2411.github.io/ecom-website/img/Band%20Members.png"
              roundedCircle
              fluid
              className="about-img"
            />
          </Col>
          <Col md={6}>
            <p className="about-text">
              Lorem ipsum carrots enhanced rebates. Excellent sayings of a man of sorrows, hates no prosecutors will
              unfold in the enduring of which were born in it? Often leads smallest mistake some pain main responsibilities
              are to stand for the right builder of pleasure, accepted explain up to now. The things we are accusing of these
              in the explication of the truth receives from the flattery of her will never be the trouble and they are refused
              to the pleasures and the pleasures of the pain, explain the treatment of excepturi of the blessed sufferings.
              I never said will unfold in him receives at another time he may please the one that those works...
            </p>
          </Col>
        </Row>
      </Container>

      <footer className="footer text-center py-4">
        <h3 className="text-white fw-bold mb-3 text-black-50">The Generics</h3>
        <div className="d-flex justify-content-center gap-4">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="YouTube" width="30" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" alt="Spotify" width="30" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/1384/1384053.png" alt="Facebook" width="30" />
          </a>
        </div>
      </footer>
    </>
  );
};

export default About;
