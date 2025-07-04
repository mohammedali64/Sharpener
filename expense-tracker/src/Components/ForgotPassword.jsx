import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { firebaseApiKey } from '../Api keys/signup.env';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${firebaseApiKey}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "requestType":"PASSWORD_RESET",
                "email": email,
            })
        })
        const data = await response.json();
        console.log(data);
        }catch(err){
            console.log(err);
        }
    }
  return (
    <div  className="flex items-center justify-center min-h-screen bg-gray-600">
      <div className="bg-white p-6 rounded-md shadow-2xl w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Entered the Email which you have registered.
        </h2>
            <div>
                <form onSubmit={handleSubmit} className='flex justify-center items-center flex-col'>
                    <input type="email" onChange={(e)=>setEmail(e.target.value)} className='border-2 w-full rounded-md'/>
                    <button type='submit' className='bg-red-400 px-8 py-1 mt-5 rounded-sm'>Send Link</button>
                </form>
            </div>
            <div className='flex justify-center mt-10'>
                <p className='text-sm'>Already a user.<button onClick={()=>navigate("/auth")} className='text-blue-800 cursor-pointer'>Login</button></p>
            </div>
      </div>
    </div>
  )
}

export default ForgotPassword
