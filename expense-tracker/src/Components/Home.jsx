import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
    const handleNavigate = () =>{
        navigate("/profile");
    }
  return (
    <div>
        <div className='flex grid-cols-2 justify-between border-b-2 py-5'>
            <div>
                Hello expense Tracker.
            </div>
            <div className='bg-purple-200 px-3 rounded-3xl'>
                <button className='text-blue-700 cursor-pointer' onClick={handleNavigate}>Profile</button>
            </div>
        </div>
        <div className='mt-10'>
            <button onClick={()=> navigate("/newExpense")} className='bg-cyan-500 px-3 rounded-lg ml-2'>Add New Expense</button>
        </div>
    </div>
  )
}

export default Home

