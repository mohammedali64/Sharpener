import React, { useContext, useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { CartContext } from '../Contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const navigate = useNavigate();
  const { productsArr, cartElements, setCartElements, setTotal, crudApi } = useContext(CartContext);
  const email = localStorage.getItem('email');
  const safeEmail = email ? email.replace(/[@.]/g, '') : '';
  const userCartApi = `${crudApi}-${safeEmail}`;

  useEffect(() => {
    const totalAmount = cartElements.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(totalAmount);
  }, [cartElements, setTotal]);

  const handleCartArray = async (product) => {
    const cartElement = {
      id: product.id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    };

    const existingItem = cartElements.find(item => item.id === cartElement.id);

    if (existingItem) {
      const updatedCart = cartElements.map(item =>
        item.id === cartElement.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartElements(updatedCart);

      if (existingItem.crudId) {
        const updatedItem = updatedCart.find(i => i.id === cartElement.id);
        await fetch(`${userCartApi}/${existingItem.crudId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedItem),
        });
      }

    } else {
      try {
        const response = await fetch(userCartApi, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cartElement),
        });

        if (!response.ok) throw new Error('Failed to save cart item');

        const data = await response.json();
        console.log("Saved to crudcrud with ID:", data._id);

        const newItemWithCrudId = {
          ...cartElement,
          crudId: data._id,
        };

        const updatedCart = [...cartElements, newItemWithCrudId];
        console.log(updatedCart);
        setCartElements(updatedCart);

      } catch (error) {
        console.error('Error saving cart item:', error.message);
      }
    }
  };

  return (
    <Container fluid className="py-5 px-4">
      <h2 className="text-center display-5 fw-bold mb-5">MUSIC</h2>
      <Row className="justify-content-center">
        {productsArr.map((product, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
            <Card style={{ width: '18rem' }} className="shadow-sm">
              <Card.Img
                variant="top"
                src={product.imageUrl}
                onClick={() => navigate(`/products/${product.id}`)}
                style={{ cursor: 'pointer' }}
              />
              <Card.Body>
                <Card.Title className="fw-semibold">{product.title}</Card.Title>
                <Card.Text className="mb-2">${product.price}</Card.Text>
                <Button variant="primary" onClick={() => handleCartArray(product)}>
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default React.memo(Products);
