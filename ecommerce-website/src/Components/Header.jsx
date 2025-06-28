import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { CartContext } from '../Contexts/CartContext';

const Header = () => {
  const { setOpenCart,openCart,cartElements } = useContext(CartContext);
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="#home">The Generics</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">HOME</Nav.Link>
            <Nav.Link href="/store">STORE</Nav.Link>
            <Nav.Link href='/about'>ABOUT</Nav.Link>
          </Nav>
          <Button variant="outline-info" onClick={() => setOpenCart(!openCart)}>
            Cart <sup>{cartElements.length}</sup>
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default React.memo(Header);
