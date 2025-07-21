import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const useSignIn = () => {
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('email',email);
      navigate('/');
      return userCredential;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return { login };
};

export default useSignIn;