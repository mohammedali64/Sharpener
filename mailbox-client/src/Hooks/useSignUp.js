import React from 'react'
import { firebase_api_key } from '../../Api_Keys/firebaseApi'
import { useNavigate } from 'react-router-dom';

const useSignUp = () => {
    const navigate = useNavigate();
    const signUp = async (email, password) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebase_api_key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      }
    );
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.error.message);
    }
    localStorage.setItem('token',data.idToken);
    localStorage.setItem('email',data.email);
    navigate("/");
    return data;
  };

  return { signUp };
}

export default useSignUp
