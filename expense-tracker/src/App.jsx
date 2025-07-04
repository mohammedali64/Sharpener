import './App.css';
import AuthForm from './Components/AuthForm';
import Home from './Components/Home';
import Profile from './Components/Profile';
import PrivateRoute from './Components/PrivateRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
      <Routes>
        <Route path="/auth" element={<AuthForm />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
  );
}

export default App;
