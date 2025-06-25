import React, { useContext } from 'react';
import { TshirtContext } from '../Context/TshirtContext';

const Header = () => {
  const { cart, setCart, cartItems } = useContext(TshirtContext);
  return (
    <div className='flex flex-row w-screen justify-between bg-amber-900 py-5 items-center'>
      <div className='ml-7'>
        <h1 className='text-4xl font-bold text-white'>T-Shirt Bank</h1>
      </div>
      <div className='mr-7'>
        <button
          className='bg-amber-400 px-4 py-2 rounded font-bold'
          onClick={() => setCart(!cart)}
        >
          Cart ({cartItems.length})
        </button>
      </div>
    </div>
  );
};

export default React.memo(Header);
