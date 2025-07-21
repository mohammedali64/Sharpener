import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import AuthForm from './components/AuthForm';
import MailCompose from './components/MailCompose';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import useVerifyToken from './Hooks/useVerifyToken';
import Inbox from './components/Inbox';
import Sent from './components/Sent';

function App() {
  const { user, loading } = useVerifyToken();

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">Loading...</div>;
  }

  return (
    <>
      <Routes>
        <Route path='/auth' element={<PublicRoute user={user}><AuthForm /></PublicRoute>} />
        <Route path="/" element={<PrivateRoute user={user}><Home user={user} /></PrivateRoute>}>
          <Route path="/inbox" index element={<Inbox />} />
          <Route path="/compose" element={<MailCompose user={user} />} />
          <Route path="/sent" element={<Sent />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;