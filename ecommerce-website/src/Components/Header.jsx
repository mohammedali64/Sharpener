import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { CartContext } from '../Contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const { setOpenCart,openCart,cartElements,setToken,setLoggedIn } = useContext(CartContext);
  const handleLogout = ()=>{
    setToken(null);
    setLoggedIn(false);
    navigate('/auth');
  }
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="#home">The Generics</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">HOME</Nav.Link>
            <Nav.Link href="/products">STORE</Nav.Link>
            <Nav.Link href='/about'>ABOUT</Nav.Link>
            <Nav.Link href='/contactus'>CONTACT US</Nav.Link>
          </Nav>
          <Button variant="outline-info" onClick={() => setOpenCart(!openCart)}>
            Cart <sup>{cartElements.length}</sup>
          </Button>
          <Button onClick={()=> handleLogout()}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default React.memo(Header);
