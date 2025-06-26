import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

const productsArr = [
  {
    title: 'Colors',
    price: 100,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
  },
  {
    title: 'Black and white Colors',
    price: 50,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
  },
  {
    title: 'Yellow and Black Colors',
    price: 70,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
  },
  {
    title: 'Blue Color',
    price: 100,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
  }
];

const Products = () => {
  return (
    <Container fluid className="py-5 px-4">
      <h2 className="text-center display-5 fw-bold mb-5">MUSIC</h2>
      <Row className="justify-content-center">
        {productsArr.map((product, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
            <Card style={{ width: '18rem' }} className="shadow-sm">
              <Card.Img variant="top" src={product.imageUrl} />
              <Card.Body>
                <Card.Title className="fw-semibold">{product.title}</Card.Title>
                <Card.Text className="mb-2">${product.price}</Card.Text>
                <Button variant="primary" disabled>Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
