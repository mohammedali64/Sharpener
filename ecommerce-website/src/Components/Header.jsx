import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { CartContext } from '../Contexts/CartContext';
import AuthContext from '../Contexts/auth-context';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const { setOpenCart, openCart, cartElements } = useContext(CartContext);
  const authCtx = useContext(AuthContext);

  const handleLogout = () => {
    authCtx.logout();       
    navigate('/');          
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">The Generics</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">HOME</Nav.Link>
            <Nav.Link as={Link} to="/products">STORE</Nav.Link>
            <Nav.Link as={Link} to="/about">ABOUT</Nav.Link>
            <Nav.Link as={Link} to="/contactus">CONTACT US</Nav.Link>
          </Nav>
          <div className="d-flex gap-2">
            <Button variant="outline-info" onClick={() => setOpenCart(!openCart)}>
              Cart <sup>{cartElements.length}</sup>
            </Button>
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
            <Button onClick={()=>navigate('/profile')}>
              Profile
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default React.memo(Header);
