import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  token: '',
  email: '',
  isLoggedIn: false,
  login: (token,email) => {},
  logout: () => {},

});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const initialEmail = localStorage.getItem('email');
  const [token, setToken] = useState(initialToken);
  const [userEmail,setUserEmail] = useState(initialEmail);

  const userLoggedIn = !!token;

  const loginHandler = (token,email) => {
    setToken(token);
    setUserEmail(email);
    console.log(email);
    localStorage.setItem('token', token);
    localStorage.setItem('email',email);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  };

  const contextValue = {
    token: token,
    email:userEmail,
    isLoggedIn: userLoggedIn,
    login: loginHandler,
    logout: logoutHandler,

  };

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
