import React from 'react';
import './Header.css';
import { FaShoppingCart } from 'react-icons/fa'; // using react-icons

const Header = () => {
  return (
    <header className="header">
      <h1 className="logo">ReactMeals</h1>
      <button className="cart-button">
        <FaShoppingCart className="icon" />
        <span>Your Cart</span>
        <span className="badge">0</span>
      </button>
    </header>
  );
};

export default Header;
