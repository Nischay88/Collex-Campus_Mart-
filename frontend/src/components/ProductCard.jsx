import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ id, image, title, condition, price }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-image-container">
        <div className="product-image-placeholder">
          {image || '📦'}
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <div className="product-details">
          <span className={`product-condition condition-${condition.toLowerCase().replace(' ', '-')}`}>
            {condition}
          </span>
          <span className="product-price">${price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

