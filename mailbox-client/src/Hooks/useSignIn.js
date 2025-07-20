import { useNavigate } from 'react-router-dom';
import { firebase_api_key } from '../../Api_Keys/firebaseApi';

const useSignIn = () => {
  const navigate = useNavigate();
  const login = async (email, password) => {
    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebase_api_key}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error.message);
    }
    localStorage.setItem('token',data.idToken);
    localStorage.setItem('email',data.email);
    navigate('/');
    return data;
  };

  return { login };
};

export default useSignIn;
