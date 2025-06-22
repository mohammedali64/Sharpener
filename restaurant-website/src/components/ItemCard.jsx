import React,{useContext, useState}from 'react'
import { CartContext } from '../Contexts/CartContext'

const ItemCard = (props) => {
  const {setCartItems,cartItems} = useContext(CartContext);
  const [count,setCount] = useState("");
  const handleAddToCart = () => {
    const quantity = Number(count);
    if (isNaN(quantity) || count === "") return;
    if(count == 0){
      setCartItems(cartItems.filter((item)=>item.id !== props.item.id));
      return;
    }

  const newItem = {
    id: props.item.id,
    name: props.item.title,
    no: Number(count),
    iprice:props.item.price,
    price: props.item.price * count,
  };

  if (cartItems.find(item => item.id === newItem.id)){
    const updatedItems = cartItems.map(item =>
      item.id === newItem.id
        ? {
            ...item,
            no:newItem.no,
            price:newItem.price,
          }
        : item
    );
    setCartItems(updatedItems);
  } else {
    setCartItems([...cartItems, newItem]);
  }
};
  return (
    <div style={{ borderBottom: '2px solid #333', paddingBottom: '8px', marginLeft:'15px', marginRight:'15px'}} className='flex flex-row justify-between'>
        <div>
          <p className='font-bold text-xl'>{props.item.title}</p>
          <p>{props.item.description}</p>
          <p className='font-bold text-amber-900'>${props.item.price}</p>
        </div>
        <div>
          <label for="Amount" className='font-bold'>Quantity</label>
          <input type='number' min='1' step='1' id='Amount' onChange={(e)=>(setCount(e.target.value))} className='Amount bg-amber-50 w-10 rounded-sm' style={{marginLeft:'10px', textAlign:'center'}}></input>
          <div className='flex justify-end'>
            <button onClick={handleAddToCart} className='font-bold text-white' style={{ paddingTop: 2, paddingBottom: 2, paddingLeft: '25px', paddingRight: '25px', marginTop:'10px',backgroundColor:'brown',borderRadius:'20px'}}>+Add</button>
          </div>
        </div>
    </div>
  )
}

export default ItemCard
