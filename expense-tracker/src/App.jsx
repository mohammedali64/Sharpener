import './App.css';
import AuthForm from './Components/AuthForm';
import Home from './Components/Home';
import Profile from './Components/Profile';
import PrivateRoute from './Components/PrivateRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForgotPassword from './Components/ForgotPassword';
import AddExpense from './Components/AddExpense';

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
        <Route
          path="/forgotPassword"
          element={
              <ForgotPassword />
          }
        />
        <Route
          path="/newExpense"
          element={
            <PrivateRoute>
              <AddExpense />
            </PrivateRoute>
          }
        />
      </Routes>
      
  );
}

export default App;
