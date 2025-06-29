import React, { useContext } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { CartContext } from '../Contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const navigate = useNavigate();
  const {productsArr,cartElements,setCartElements,setTotal} = useContext(CartContext);
  const handleCartArray = (product)=>{
    console.log(product);
    const cartElement = {
      id: product.id,
      title:product.title,
      price:product.price,
      imageUrl:product.imageUrl,
      quantity:1
    }
    const existingItem = cartElements.find(item => item.id === cartElement.id);
  if (existingItem) {
    const updatedCart = cartElements.map(item =>
      item.id === cartElement.id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartElements(updatedCart);
  } else {
    setCartElements([...cartElements, cartElement]);
  }
  }
  setTotal(cartElements.reduce((acc, item) => acc + item.price * item.quantity, 0));
  return (
    <Container fluid className="py-5 px-4">
      <h2 className="text-center display-5 fw-bold mb-5">MUSIC</h2>
      <Row className="justify-content-center">
        {productsArr.map((product, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
            <Card style={{ width: '18rem' }} className="shadow-sm">
              <Card.Img variant="top" src={product.imageUrl} onClick={()=>navigate(`/products/${product.id}`)}/>
              <Card.Body>
                <Card.Title className="fw-semibold">{product.title}</Card.Title>
                <Card.Text className="mb-2">${product.price}</Card.Text>
                <Button variant="primary" onClick={()=>handleCartArray(product)}>Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
