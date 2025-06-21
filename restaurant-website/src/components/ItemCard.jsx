import React from 'react'

const ItemCard = (props) => {
  return (
    <div style={{ borderBottom: '2px solid #333', paddingBottom: '8px', marginLeft:'15px', marginRight:'15px'}}>
      <p className='font-bold'>{props.item.title}</p>
      <p>{props.item.description}</p>
      <p className='font-bold text-amber-900'>${props.item.price}</p>
    </div>
  )
}

export default ItemCard
