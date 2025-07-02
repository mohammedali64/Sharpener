import React, { useEffect } from 'react'

const RetriveCartHook = async() => {
    const url = 'https://crudcrud.com/api/fa93ec610abd45eea8098c80a0b9f5d4/cart'
    const response = await fetch(url);
    const data = await response.json();
    return data;
  
}

export default RetriveCartHook
