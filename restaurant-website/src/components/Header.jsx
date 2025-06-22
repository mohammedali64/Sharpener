import React, { useState,useContext } from 'react';
import './Header.css';
import { FaShoppingCart } from 'react-icons/fa'; // using react-icons
import CartCard from './CartCard';
import { CartContext } from '../Contexts/CartContext';

const Header = () => {
  const{isCartOpen,setIsCartOpen,cartItems,setTotalAmount} = useContext(CartContext);
  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
    let sum = 0;
    for(let i = 0; i < cartItems.length; i++){
      sum += cartItems[i].price;
    }
    setTotalAmount(sum);
  };

  return (
    <div className="flex flex-col w-screen justify-center items-center relative">
      <header className="header">
        <h1 className="logo">ReactMeals</h1>
        <button className="cart-button" onClick={handleCartToggle}>
          <FaShoppingCart className="icon" />
          <span>Your Cart</span>
          <span className="badge">{cartItems.length}</span>
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