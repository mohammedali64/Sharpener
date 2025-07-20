import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import AuthForm from './components/AuthForm'

function App() {

  return (
    <>
      <Routes>
        <Route path='/auth' element={<AuthForm/>}/>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
