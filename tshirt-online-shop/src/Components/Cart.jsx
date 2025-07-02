import React, { useContext } from 'react';
import { TshirtContext } from '../Context/TshirtContext';
import CartCard from './CartCard';

const Cart = () => {
  const { cartItems, cart, setCart,tshirts,setCartItems,setTshirts } = useContext(TshirtContext);

  const handleOrder = ()=>{
    const updatedTshirts = tshirts.map((tshirt)=>{
         const cartMatch = cartItems.filter((item)=>item.id === tshirt.id);
         if(cartMatch.length === 0) return tshirt;
         const updated = {...tshirt};
         cartMatch.forEach(item=>{
            updated[item.size] = updated[item.size]-item.quantity;
         })
         return updated;
    })
    setTshirts(updatedTshirts);
    setCartItems([]);
    setCart(false)
  }
  if (!cart) return null;

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-40"></div>

      <div className="fixed top-1/2 left-1/2 w-[90%] sm:w-[60%] lg:w-[40%] transform -translate-x-1/2 -translate-y-1/2 bg-cyan-700 text-white p-6 rounded-xl shadow-xl z-50 max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          cartItems.map((item, index) => (
            <CartCard key={`${item.id}-${item.size}-${index}`} item={item} />
          ))
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCart(false)}
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            Close
          </button>
          <button onClick={handleOrder} className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded">
            Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
