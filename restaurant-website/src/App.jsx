import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import { CartContext } from './Contexts/CartContext';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount,setTotalAmount] = useState("");

  const arr = [
        {id:"1",title:"Sushi",description:"Finest fish and veggies", price:"22.00"},
        {id:"2",title:"Pizza",description:"Cheesy goodness", price:"19.00"},
        {id:"3",title:"Tacos",description:"Tasty beef", price:"16.00"},
        {id:"4",title:"Salad",description:"Healthy choice", price:"15.00"},
    ]

  return (
    <div
      className="flex flex-col w-screen min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-photo/blur-coffee-cafe-shop-restaurant-with-bokeh-background-xd_1421-472.jpg?ga=GA1.1.1741055421.1750503274&semt=ais_hybrid&w=740')`,
      }}
    >
      <CartContext.Provider value={{isCartOpen,setIsCartOpen,arr,cartItems,setCartItems,totalAmount,setTotalAmount}}>
      <div className="flex w-screen fixed z-50">
        <Header />
      </div>
      <div
        className="flex items-center justify-center flex-col gap-10"
        style={{ marginTop: '10%' }}
      >
        <Home />
      </div>
      </CartContext.Provider>
    </div>
  );
}

export default App;