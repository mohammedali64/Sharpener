import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import AuthForm from './components/AuthForm'
import MailCompose from './components/MailCompose'

function App() {

  return (
    <>
      <Routes>
        <Route path='/auth' element={<AuthForm/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/compose" element={<MailCompose/>}/>
      </Routes>
    </>
  )
}

export default App
