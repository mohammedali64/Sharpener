import React from 'react'
import { firebase_api_key } from '../../Api_Keys/firebaseApi'

const useSignUp = () => {
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
    return data;
  };

  return { signUp };
}

export default useSignUp
