import { useState } from 'react'
import './App.css'
import Header from './components/Header';
import Home from './components/Home';
import Items from './components/Items';

function App() {
  
  return (
    <>
    <div className='flex w-screen'>
      <Header/>
    </div>
      <div className=' flex items-center justify-center  flex-col gap-10' style={{marginTop:'10%',}}>
        <Home/>
      </div>
      
    </>
  )
}

export default App