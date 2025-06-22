import React,{useContext} from 'react'
import { CartContext } from '../Contexts/CartContext'
import ItemCard from './ItemCard';

const CartItems = () => {
    const {cartItems,setCartItems,setTotalAmount} = useContext(CartContext);

    const handleQuantityChange = (id,delta)=>{
        const updatedItems = cartItems.map((item)=>{
            if(item.id === id){
                const newQuantity = Math.max(0, item.no + delta);
                return{
                    ...item,
                    no: newQuantity,
                    price: item.iprice * newQuantity,
                }
            }
            return item;
        }).filter(item=>item.no > 0);
        setCartItems(updatedItems);
        const total = updatedItems.reduce((sum, item) => sum + item.price, 0);
        setTotalAmount(total);
    }

  return (
    <div>
      {cartItems.map((item)=>(
        <div className='border-b-2 border-amber-900 flex flex-row justify-between'>
        <div className='flex flex-col justify-start items-start w-[30%]'>
            <p className='text-2xl font-bold'>{item.name}</p>
            <div className='flex flex-row'>
                <div style={{marginRight:'60px'}}>${item.iprice}</div>
                <div>x{item.no}</div>
            </div>
        </div>
        <div className='flex justify-center items-center'>
            <button onClick={()=>handleQuantityChange(item.id,-1)} style={{ paddingLeft:'16px', paddingRight:'16px', paddingTop:'3px', paddingBottom:'3px', color:'brown', border:'2px solid gray',marginRight:'5px'}}>- </button>
            <button onClick={()=>handleQuantityChange(item.id,1)} style={{ paddingLeft:'16px', paddingRight:'16px', paddingTop:'3px', paddingBottom:'3px',color:'brown', border:'2px solid gray'}}>+</button>
        </div>
        </div>
      ))}
    </div>
  )
}

export default CartItems
