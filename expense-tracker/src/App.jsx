import './App.css'
import AuthForm from './Components/AuthForm'
import { BrowserRouter,Router, Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import Profile from './Components/Profile'

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<AuthForm/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </>
  )
}

export default App
