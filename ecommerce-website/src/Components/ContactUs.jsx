import React, { useContext, useState } from 'react'
import { CartContext } from '../Contexts/CartContext';

const ContactUs = () => {
    const {userDataDb} = useContext(CartContext);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const handleSubmit = async(event)=>{
        event.preventDefault();
        const user = {
            id:Math.random(),
            name:name,
            email:email,
            phone:phone
        }
        await fetch(userDataDb,{
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        
    }
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Contact Form</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm">
        <div className="mb-3">
          <label htmlFor="name" className="form-label fw-bold">Name</label>
          <input onChange={(e)=> setName(e.target.value)} type="text" className="form-control" id="name" placeholder="Enter your name" required />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold">Email address</label>
          <input onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" id="email" placeholder="Enter your email" required />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label fw-bold">Phone Number</label>
          <input onChange={(e)=>setPhone(e.target.value)} type="tel" className="form-control" id="phone" placeholder="Enter your phone number" required />
        </div>

        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  )
}

export default ContactUs
