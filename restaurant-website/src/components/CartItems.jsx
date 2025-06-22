import React,{useState,useContext} from 'react'
import { CartContext } from '../Contexts/CartContext'

const CartItems = () => {
    const {cartItems} = useContext(CartContext);
  return (
    <div>
      <div className='flex flex-row justify-between font-bold text-xl'>
        <div>Item</div>
        <div>Qty</div>
        <div>price</div>
      </div>
      {cartItems.map((item)=>(
        <div className='flex flex-row justify-between items-center'>
            <div className='flex justify-center items-center'>{item.name}</div>
            <div>{item.no}</div>
            <div>${item.price}</div>
        </div>
      ))}
    </div>
  )
}

export default CartItems
