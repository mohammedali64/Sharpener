import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import AuthForm from './components/AuthForm'
import MailCompose from './components/MailCompose'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'

function App() {

  return (
    <>
      <Routes>
        <Route path='/auth' element={<PublicRoute><AuthForm/></PublicRoute>}/>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/compose" element={<PrivateRoute><MailCompose/></PrivateRoute>}/>
      </Routes>
    </>
  )
}

export default App
