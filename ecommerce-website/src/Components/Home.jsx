import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';

const Home = () => {
  const tourData = [
    { date: 'JUL 16', city: 'DETROIT, MI', venue: 'DTE ENERGY MUSIC THEATRE' },
    { date: 'JUL 19', city: 'TORONTO, ON', venue: 'BUDWEISER STAGE' },
    { date: 'JUL 22', city: 'BRISTOW, VA', venue: 'JIGGY LUBE LIVE' },
    { date: 'JUL 29', city: 'PHOENIX, AZ', venue: 'AK-CHIN PAVILION' },
    { date: 'AUG 2', city: 'LAS VEGAS, NV', venue: 'T-MOBILE ARENA' },
    { date: 'AUG 7', city: 'CONCORD, CA', venue: 'CONCORD PAVILION' },
  ];

  return (
    <>
      <div className="home-header text-center text-white d-flex flex-column justify-content-center align-items-center">
        <h1 className="display-2 fw-bold text-black-50">The Generics</h1>
        <Button variant="outline-info" className="album-btn mt-3">
          Get our Latest Album
        </Button>
        <div className="play-button mt-3">
          <div className="play-icon">&#9658;</div>
        </div>
      </div>

      <Container className="py-5">
        <h2 className="text-center fw-bold mb-4 tour-title">TOURS</h2>
        {tourData.map((tour, index) => (
          <Row key={index} className="align-items-center border-bottom py-2">
            <Col xs={2} className="fw-bold">{tour.date}</Col>
            <Col xs={3} className="text-secondary">{tour.city}</Col>
            <Col xs={4} className="text-uppercase">{tour.venue}</Col>
            <Col xs={3} className="text-end">
              <Button variant="info" className="text-white fw-bold px-4">
                BUY TICKETS
              </Button>
            </Col>
          </Row>
        ))}
      </Container>

      <footer className="footer text-center py-4">
        <h3 className="fw-bold mb-3 gray-text">The Generics</h3>
        <div className="d-flex justify-content-center gap-4">
          <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" width="30" alt="YouTube" /></a>
          <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" width="30" alt="Spotify" /></a>
          <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384053.png" width="30" alt="Facebook" /></a>
        </div>
      </footer>
    </>
  );
};

export default Home;
