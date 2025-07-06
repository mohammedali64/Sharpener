import React, { useEffect, useState } from 'react'
import { firebaseApiKey } from '../Api keys/signup.env';
import { useNavigate } from 'react-router-dom';
import GetData from '../Hooks/GetData';
import { useDispatch } from 'react-redux';
import { logout } from '../Store/authSlice';
import { setExpenses } from '../Store/expenseSlice';

const Profile = () => {
    const navigate = useNavigate();
    const [name,setName] = useState('');
    const [url,setUrl] = useState('');

    const dispatch = useDispatch();
    
    useEffect(() => {
    const fetchUserData = async () => {
      const data = await GetData();
      console.log(data);
      setName(data?.displayName || '');
      setUrl(data?.photoUrl || '');
    };
    fetchUserData();
  }, []);
    
    const handleUpdate = async(event)=>{
        event.preventDefault();
        try{
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${firebaseApiKey}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idToken: localStorage.getItem('token'),
                    displayName: name,
                    photoUrl: url,
                    returnSecureToken:true,
                })
            })
            const data = await response.json();
            alert("User data update complete");
            console.log(data);
        }catch(error){
            console.error(error);
            alert(error);
        }
    }

    const handleVerification = async()=>{
        try{
            console.log("success");
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${firebaseApiKey}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idToken: localStorage.getItem('token'),
                    requestType:"VERIFY_EMAIL",
                })
            })
            const data = await response.json();
            console.log(data);
        }catch(error){
            console.error(error);
        }
    }
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('isLoggedIn');
        dispatch(logout())
        dispatch(setExpenses({expenses:[]}));
        navigate("/auth");
    }
  return (
    <div>
      <div className='flex grid-cols-2 justify-between py-3 border-b-gray-600 border-b-2'>
        <div>
            Winners never quit.Quitters never win.
        </div>
        <button className='bg-purple-300 px-3 rounded-3xl cursor-pointer' type='button' onClick={handleLogout}>
            Logout
        </button>
      </div>
      <div className='w-screen mt-10 border-b-[1px] pb-5 flex justify-center items-center'>
        <form onSubmit={handleUpdate}>
        <div className='flex flex-row justify-between'>
            <div className='text-3xl font-bold'>Contact Details</div>
            <button className='cursor-pointer border-2 border-red-600 p-1 rounded-sm' type='button' onClick={()=> navigate("/")}>Cancel</button>
        </div>
        <div className='flex flex-row justify-between py-5 jus'>
            <div className='pr-3'>
                <label htmlFor="name">Full Name: </label>
                <input onChange={(e)=>setName(e.target.value)} required id='name' name='name' className='border-2 rounded-md' value={name}/>
            </div>
            <div>
                <label htmlFor='photoUrl'>Profile Photo URL: </label>
                <input onChange={(e)=>setUrl(e.target.value)} type='url' required id='photoUrl' name='photoUrl' className='border-2 rounded-md' value={url}/>
            </div>
        </div>
        <div className='flex flex-row'>
            <div>
                <button className='border-[1px] px-2 rounded-lg bg-red-300 mr-5' type='submit'>Update</button>
            </div>
            <div>
                <button className='border-[1px] px-2 rounded-lg bg-red-300' type='button' onClick={handleVerification}>Verfy Email</button>
            </div>
        </div>
        </form>
      </div>
    </div>
  )
}

export default Profile
