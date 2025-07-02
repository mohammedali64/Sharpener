import React, { useCallback, useEffect } from 'react'

const CartHook = async (cartItems) => {
    const url = 'https://crudcrud.com/api/fa93ec610abd45eea8098c80a0b9f5d4/cart';
    console.log(cartItems);
    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItems),
    })
    const data = await response.json();
    console.log(data);
    

}

export default CartHook
