import React, { useContext } from 'react';
import { Row, Col, Button, Image, CloseButton } from 'react-bootstrap';
import { CartContext } from '../Contexts/CartContext';

const Cart = () => {
  const {cartElements,openCart, setOpenCart,total,setCartElements} = useContext(CartContext);
  const handleElement = (item)=>{
    const updatedCart = cartElements.filter((Element)=> Element.id !== item.id);
    setCartElements(updatedCart);
  }
  const handleIncrement = (item) =>{
    const updatedCart = cartElements.map((Element)=>{
      if(Element.id === item.id){
        return {...Element, quantity: Element.quantity + 1};
      }else{
        return Element;
      }
    })
    setCartElements(updatedCart);
  }
  const handleDecrement = (item)=>{
    const updatedCart = cartElements.map((Element)=>{
      if(Element.id === item.id){
        return {...Element, quantity: Element.quantity - 1};
      }else{
        return Element;
      }
    }).filter((Element)=> Element.quantity > 0);
    setCartElements(updatedCart);
  }

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
                  <Button onClick={()=>handleDecrement(item)}>-</Button>
                  <Button onClick={()=>handleIncrement(item)} className=' me-3 ms-2'>+</Button>
                  {item.quantity} 
              </Col>
              <Row>
                <Col className='text-end'>
                  <Button className='ms-3 text-bg-danger' onClick={()=>handleElement(item)}>Remove</Button>
                </Col>
              </Row>
            </Row>
          ))}

          <div className="mt-4 text-end pe-3">
            <h5>
              Total <span className="fw-normal">{total}</span>
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
