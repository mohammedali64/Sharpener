import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Items from './components/Items';

function App() {
  return (
    <div
      className="flex flex-col w-screen min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-photo/blur-coffee-cafe-shop-restaurant-with-bokeh-background-xd_1421-472.jpg?ga=GA1.1.1741055421.1750503274&semt=ais_hybrid&w=740')`,
      }}
    >
      <div className="flex w-screen">
        <Header />
      </div>
      <div
        className="flex items-center justify-center flex-col gap-10"
        style={{ marginTop: '10%' }}
      >
        <Home />
      </div>
    </div>
  );
}

export default App;