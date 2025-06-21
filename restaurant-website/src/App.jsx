import { useState } from 'react'
import './App.css'
import Header from './components/Header';
import Home from './components/Home';

function App() {
  
  return (
    <>
    <div className='flex w-screen'>
      <Header/>
    </div>
      <div className=' flex items-center justify-center h-screen py-10'>
        <Home/>
      </div>
      
    </>
  )
}

export default App