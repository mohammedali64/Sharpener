import React,{useContext} from 'react'
import ItemCard from './ItemCard'
import { CartContext } from '../Contexts/CartContext';

const Items = () => {
  const {arr} = useContext(CartContext);
    
  return (
    <div className='flex flex-col gap-6 '>
      {arr.map((item)=>(
        <div >
            <ItemCard item={item}/>
        </div>
      ))}
    </div>
  )
}

export default Items
