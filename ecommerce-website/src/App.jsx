import React from 'react';
import Products from './Components/Products';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';

function App() {
  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Header />
      <Products />
    </div>
  );
}

export default App;
