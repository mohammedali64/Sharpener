import React from 'react'

const CartCard = ({onClose}) => {
  return (
    <div style={{paddingLeft:'15px', paddingRight:'10px', paddingTop:'15px'}}>
      <div style={{paddingBottom:'10px'}}>
        <p>Sushi</p>
      </div>
      <div className='flex justify-between' style={{paddingBottom:'10px'}}>
        <p className='text-2xl font-bold'>Total Amount</p>
        <p className='text-2xl font-bold'>$50</p>
      </div>
      <div className='flex justify-end' style={{paddingBottom:'2%'}}>
        <button style={{ paddingTop: 4, paddingBottom: 4, paddingLeft: '25px', paddingRight: '25px', marginTop:'10px',borderRadius:'20px',border:'1px solid gray'}} onClick={onClose}>Close</button>
        <button style={{ paddingTop: 4, paddingBottom: 4, paddingLeft: '25px', paddingRight: '25px', marginTop:'10px',borderRadius:'20px', marginLeft:'5px',backgroundColor:'brown',color:'white'}}>Order</button>
      </div>
    </div>
  )
}

export default CartCard
