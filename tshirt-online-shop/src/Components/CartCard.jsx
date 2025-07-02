import React, { useContext } from 'react';
import { TshirtContext } from '../Context/TshirtContext';

const CartCard = ({ item }) => {
  const { cartItems, setCartItems } = useContext(TshirtContext);

  const handleIncrement = () => {
    const updatedItems = cartItems.map((cartItem) =>
      cartItem.id === item.id && cartItem.size === item.size
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    setCartItems(updatedItems);
  };
  const handleDecrement = async() => {
    const currentItem = cartItems.find((cartItem)=>{
      return cartItem.id === item.id && cartItem.size === item.size
    })
    if(currentItem.quantity === 1){
      const crudUrl = `https://crudcrud.com/api/fa93ec610abd45eea8098c80a0b9f5d4/cart/${currentItem._id}`;
      await fetch(crudUrl, {
        method: 'DELETE',
      });
    }

    const updatedItems = cartItems
      .map((cartItem) =>
        cartItem.id === item.id && cartItem.size === item.size
          ? { ...cartItem, quantity: cartItem.quantity - 1,}
          : cartItem
      )
      .filter((item) => item.quantity > 0);
      console.log(updatedItems);
    setCartItems(updatedItems);
  };

  return (
    <div className='flex flex-row justify-between pt-6 text-white'>
      <div>
        <p>{item.name}</p>
        <p>${item.price}</p>
        <p>Size: {item.size}</p>
        <p>Qty: {item.quantity}</p>
      </div>
      <div>
        <button onClick={handleIncrement} className='bg-amber-600 px-4'>+</button>
        <button onClick={handleDecrement} className='bg-amber-600 px-4 ml-3'>-</button>
        <p></p>
      </div>
    </div>
  );
};

export default CartCard;
