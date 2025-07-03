import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
    const handleNavigate = () =>{
        navigate("/profile");
    }
  return (
    <div className='flex grid-cols-2 justify-between border-b-2 py-5'>
      <div>
        Hello expense Tracker.
      </div>
      <div className='bg-purple-200 px-3 rounded-3xl'>
        Your Profile is incomplete.<button className='text-blue-700 cursor-pointer' onClick={handleNavigate}>Complete now</button>
      </div>
    </div>
  )
}

export default Home

