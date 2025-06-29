import React, { useContext } from 'react';
import { Row, Col, Button, Image, CloseButton } from 'react-bootstrap';
import { CartContext } from '../Contexts/CartContext';

const Cart = () => {
  const { cartElements, openCart, setOpenCart, total, setCartElements, crudApi } = useContext(CartContext);
  const email = localStorage.getItem('email');
  const safeEmail = email ? email.replace(/[@.]/g, '') : '';
  const userCartApi = `${crudApi}-${safeEmail}`;

  const updateCrudCrud = async (crudId, updatedItem) => {
    try {
      await fetch(`${userCartApi}/${crudId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem),
      });
    } catch (err) {
      console.error('Error updating item in crudcrud:', err);
    }
  };

  const deleteFromCrudCrud = async (crudId) => {
    try {
      await fetch(`${userCartApi}/${crudId}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.error('Error deleting item from crudcrud:', err);
    }
  };

  const handleIncrement = async (item) => {
    const updatedCart = cartElements.map((element) => {
      if (element.id === item.id) {
        const updatedItem = { ...element, quantity: element.quantity + 1 };
        if (element.crudId) updateCrudCrud(element.crudId, updatedItem);
        return updatedItem;
      }
      return element;
    });
    setCartElements(updatedCart);
  };

  const handleDecrement = async (item) => {
    let updatedCart = cartElements.map((element) => {
      if (element.id === item.id) {
        const updatedItem = { ...element, quantity: element.quantity - 1 };
        if (updatedItem.quantity > 0 && element.crudId) updateCrudCrud(element.crudId, updatedItem);
        return updatedItem;
      }
      return element;
    });

    updatedCart = updatedCart.filter((item) => item.quantity > 0);

    if (item.quantity === 1 && item.crudId) {
      await deleteFromCrudCrud(item.crudId);
    }

    setCartElements(updatedCart);
  };

  const handleElement = async (item) => {
    const updatedCart = cartElements.filter((element) => element.id !== item.id);
    setCartElements(updatedCart);
    if (item.crudId) {
      await deleteFromCrudCrud(item.crudId);
    }
  };

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
              <Col>
                <Button onClick={() => handleDecrement(item)}>-</Button>
                <Button onClick={() => handleIncrement(item)} className="me-3 ms-2">+</Button>
                {item.quantity}
              </Col>
              <Row>
                <Col className="text-end">
                  <Button className="ms-3 text-bg-danger" onClick={() => handleElement(item)}>Remove</Button>
                </Col>
              </Row>
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
