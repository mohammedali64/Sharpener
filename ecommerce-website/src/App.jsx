import React, { useState } from 'react';
import Products from './Components/Products';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import Cart from './Components/Cart';
import { CartContext } from './Contexts/CartContext';
import { Route, Routes } from 'react-router-dom';
import About from './Components/About';
import Home from './Components/Home';

function App() {
  const [openCart, setOpenCart] = useState(false);
  const[cartElements,setCartElements] = useState([]);
  const [total,setTotal] = useState("");

  const productsArr = [
  {
    id:1,
    title: 'Colors',
    price: 100,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
  },
  {
    id:2,
    title: 'Black and white Colors',
    price: 50,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
  },
  {
    id:3,
    title: 'Yellow and Black Colors',
    price: 70,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
  },
  {
    id:4,
    title: 'Blue Color',
    price: 100,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
  }
];
  return (
    <CartContext.Provider value={{productsArr,cartElements,setCartElements,openCart,setOpenCart,total,setTotal}}>
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Header setOpenCart={setOpenCart} openCart={openCart} />
      <Cart openCart={openCart} setOpenCart={setOpenCart} />
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/store' element = {<Products />}/>
      <Route path='/about' element={<About/>}/>
      </Routes>
    </div>
    </CartContext.Provider>
  );
}

export default App;
