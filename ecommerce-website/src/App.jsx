import React, { useContext, useState } from 'react';
import { CartContext } from './Contexts/CartContext';
import AuthContext from './Contexts/auth-context';
import Header from './Components/Header';
import Cart from './Components/Cart';
import Products from './Components/Products';
import About from './Components/About';
import Home from './Components/Home';
import ContactUs from './Components/ContactUs';
import ProductDetail from './Components/ProductDetail';
import AuthForm from './pages/AuthPage';
import Layout from './Components/Layout/Layout';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const userDataDb = 'https://movies-flix-c8ce1-default-rtdb.asia-southeast1.firebasedatabase.app/userData.json';
  const [openCart, setOpenCart] = useState(false);
  const [cartElements, setCartElements] = useState([]);
  const [total, setTotal] = useState('');
  
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const productsArr = [
    { id: 1, title: 'Colors', price: 100, imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png' },
    { id: 2, title: 'Black and white Colors', price: 50, imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png' },
    { id: 3, title: 'Yellow and Black Colors', price: 70, imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png' },
    { id: 4, title: 'Blue Color', price: 100, imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png' },
  ];

  return (
    <CartContext.Provider value={{ productsArr, cartElements, setCartElements, openCart, setOpenCart, total, setTotal, userDataDb }}>
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        {!isLoggedIn ? (
          <>
            <Layout />
            <AuthForm />
          </>
        ) : (
          <>
            <Header setOpenCart={setOpenCart} openCart={openCart} />
            <Cart openCart={openCart} setOpenCart={setOpenCart} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/products/:productId" element={<ProductDetail />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        )}
      </div>
    </CartContext.Provider>
  );
}

export default App;
