import React, { useState } from 'react';
import './Header.css';
import { FaShoppingCart } from 'react-icons/fa'; // using react-icons
import CartCard from './CartCard';

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="flex flex-col w-screen justify-center items-center relative">
      <header className="header">
        <h1 className="logo">ReactMeals</h1>
        <button className="cart-button" onClick={handleCartToggle}>
          <FaShoppingCart className="icon" />
          <span>Your Cart</span>
          <span className="badge">0</span>
        </button>
      </header>
      {isCartOpen && (
        <>
          <div className="fixed inset-0 backdrop-blur-md z-10 bg-black opacity-70"></div>
          <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[32%] bg-white rounded-2xl z-20">
            <CartCard onClose={() => setIsCartOpen(false)} />
          </div>
        </>
      )}
    </div>
  );
};

export default Header;