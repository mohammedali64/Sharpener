import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand href="#home" className="fs-3 fw-bold ">The Generics</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">HOME</Nav.Link>
            <Nav.Link href="#store">STORE</Nav.Link>
            <Nav.Link href="#about">ABOUT</Nav.Link>
          </Nav>
          <Button variant="outline-light" className="px-4">Cart <sup>0</sup></Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
