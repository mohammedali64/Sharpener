import React, { useState, useContext } from 'react';
import { TshirtContext } from '../Context/TshirtContext';

const ItemCard = (props) => {
  const [value, setValue] = useState('');
  const { cartItems, setCartItems } = useContext(TshirtContext);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!value) {
      alert('Please select a size.');
      return;
    }

    const newCart = {
      id: props.tshirt.id,
      name: props.tshirt.name,
      price: props.tshirt.price,
      size: value,
      quantity: 1,
    };

    const existingItem = cartItems.find(
      (item) => item.id === newCart.id && item.size === newCart.size
    );

    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === newCart.id && item.size === newCart.size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, newCart]);
    }

    setValue('');
  };

  return (
    <div className='bg-amber-300 w-[40%] my-4 p-4 rounded'>
      <div className='flex flex-row justify-between'>
        <div>
          <p className='font-bold'>{props.tshirt.name}</p>
          <p>${props.tshirt.price}</p>
          <p className='text-sm'>{props.tshirt.description}</p>
        </div>
        <form onSubmit={handleFormSubmit} className='flex flex-col'>
          {['L', 'M', 'S'].map((size) => (
            <label key={size}>
              <input
                type='radio'
                name={`size-${props.tshirt.id}`}
                value={size}
                checked={value === size}
                onChange={(e) => setValue(e.target.value)}
              />
              {size} ({props.tshirt[size]} pieces avaliable)
            </label>
          ))}
          <button type='submit' className='bg-blue-800 text-white mt-2 px-2 py-1 rounded'>
            Add to Cart
          </button>
        </form>
      </div>
    </div>
  );
};

export default ItemCard;
