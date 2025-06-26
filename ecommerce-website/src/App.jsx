import React, { useState } from 'react';
import Products from './Components/Products';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import Cart from './Components/Cart';

function App() {
  const [openCart, setOpenCart] = useState(false); // moved here

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Header setOpenCart={setOpenCart} openCart={openCart} />
      <Products />
      <Cart openCart={openCart} setOpenCart={setOpenCart} />
    </div>
  );
}

export default App;
