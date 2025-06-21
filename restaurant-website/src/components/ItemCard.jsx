import React from 'react'

const ItemCard = (props) => {
  return (
    <div style={{ borderBottom: '2px solid #333', paddingBottom: '8px', marginLeft:'15px', marginRight:'15px'}} className='flex flex-row justify-between'>
        <div>
          <p className='font-bold'>{props.item.title}</p>
          <p>{props.item.description}</p>
          <p className='font-bold text-amber-900'>${props.item.price}</p>
        </div>
        <div>
          <label for="Amount" className='font-bold'>Amount</label>
          <input type='number' id='Amount' className='Amount bg-amber-50 w-10 rounded-sm' style={{marginLeft:'10px', textAlign:'center'}}></input>
          <div className='flex justify-end'>
            <button className='font-bold text-white' style={{ paddingTop: 2, paddingBottom: 2, paddingLeft: '25px', paddingRight: '25px', marginTop:'10px',backgroundColor:'brown',borderRadius:'20px'}}>+Add</button>
          </div>
        </div>
    </div>
  )
}

export default ItemCard
