import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const useSignUp = () => {
  const navigate = useNavigate();

  const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
      localStorage.setItem('email',email);
      return userCredential;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return { signUp };
};

export default useSignUp;