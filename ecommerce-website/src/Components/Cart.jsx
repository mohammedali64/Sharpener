import React from 'react';
import { Row, Col, Button, Image, CloseButton } from 'react-bootstrap';

const Cart = ({ openCart, setOpenCart }) => {
  const cartElements = [
    {
      title: 'Colors',
      price: 100,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
      quantity: 2,
    },
    {
      title: 'Black and white Colors',
      price: 50,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
      quantity: 3,
    },
    {
      title: 'Yellow and Black Colors',
      price: 70,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
      quantity: 1,
    },
  ];

  const total = cartElements.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      {openCart && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '400px',
            height: '100vh',
            backgroundColor: 'white',
            padding: '20px',
            boxShadow: '-2px 0 8px rgba(0,0,0,0.2)',
            zIndex: 1000,
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 style={{ fontFamily: 'cursive', fontWeight: 'bold' }}>CART</h3>
            <CloseButton onClick={() => setOpenCart(false)} />
          </div>

          <Row className="text-uppercase fw-bold text-center border-bottom pb-2 mb-3">
            <Col>Item</Col>
            <Col>Price</Col>
            <Col>Quantity</Col>
          </Row>

          {cartElements.map((item, idx) => (
            <Row key={idx} className="align-items-center text-center mb-3">
              <Col>
                <Image src={item.imageUrl} alt={item.title} style={{ width: '60px' }} thumbnail />
                <div>{item.title}</div>
              </Col>
              <Col>${item.price}</Col>
              <Col>{item.quantity}</Col>
            </Row>
          ))}

          <div className="mt-4 text-end pe-3">
            <h5>
              Total <span className="fw-normal">${total}</span>
            </h5>
          </div>

          <div className="d-flex justify-content-center mt-3">
            <Button variant="info" size="lg" className="fw-bold">
              PURCHASE
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
