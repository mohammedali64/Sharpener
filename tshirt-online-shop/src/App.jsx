import { useState } from 'react';
import './App.css'
import Header from './Components/Header'
import Home from './Components/Home'
import { TshirtContext } from './Context/TshirtContext';
import Cart from './Components/Cart';

function App() {
    const [cartItems,setCartItems] = useState([]);
    const [cart,setCart] = useState(false);

  const [tshirts, setTshirts] = useState([
  { id: 1, name: 'T-Shirt 1', description: "100% cotton", price: 10, L: 50, M: 10, S: 20 },
  { id: 2, name: 'T-Shirt 2', description: "50% cotton 50% nylon", price: 20, L: 21, M: 13, S: 15 },
  { id: 3, name: 'T-Shirt 3', description: "100% nylon", price: 30, L: 12, M: 17, S: 10 }
]);


  return (
    <div>
      <TshirtContext.Provider value={{tshirts,cartItems,setCartItems,cart,setCart,setTshirts}}>
      <div>
        <Header/>
      </div>
      <div>
        <Home/>
      </div>
      <div>
        <Cart/>
      </div>
      </TshirtContext.Provider>
    </div>
  )
}

export default App
