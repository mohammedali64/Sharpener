import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../Contexts/CartContext';

const ProductDetail = () => {
  const { productsArr } = useContext(CartContext);
  const { productId } = useParams();
  const product = productsArr.find(item => item.id == productId);

  if (!product) {
    return <div className="text-center mt-5">Product not found.</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-md-5 text-center">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="img-fluid rounded shadow"
          />
        </div>

        <div className="col-md-7">
          <h6 className="text-muted">Painting</h6>
          <h3>{product.title}</h3>
          <p><strong>Price:</strong> {product.price}</p>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
