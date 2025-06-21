import React from 'react'
import ItemCard from './ItemCard'

const Items = () => {
    const arr = [
        {title:"Sushi",description:"Finest fish and veggies", price:"22.99"},
        {title:"Pizza",description:"Cheesy goodness", price:"19.99"},
        {title:"Tacos",description:"Tasty beef", price:"16.99"},
        {title:"Salad",description:"Healthy choice", price:"14.99"},
    ]
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
